'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Extrair os dados do formulário
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    let msg = error.message
    if (msg.includes('Invalid login credentials')) msg = 'Senha incorreta ou usuário não cadastrado.'
    if (msg.includes('Email not confirmed')) msg = 'Por favor, verifique seu e-mail (ou desative a trava de confirmação no painel do Supabase).'
    redirect(`/auth?error=${encodeURIComponent(msg)}`)
  }

  // Redireciona pro painel revalidando o cache
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Extrair os dados do formulário
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string

  // Cadastra o usuário e já manda os metadados para salvar o nome dele
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    let msg = error.message
    if (msg.includes('already registered')) msg = 'Este e-mail já está em uso.'
    if (msg.includes('security purposes')) msg = 'Aguarde alguns segundos antes de tentar criar outra conta.'
    redirect(`/auth?error=${encodeURIComponent(msg)}`)
  }

  // Se Supabase exige validação de e-mail, ele envia "user" na variável data, mas "session" vem nula!
  if (data?.user && !data?.session) {
    redirect('/auth?success=Conta criada com sucesso! Por favor, verifique sua caixa de e-mail para ativar sua conta.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    redirect(`/auth?error=${encodeURIComponent('Erro ao conectar com Google. Tente novamente.')}`)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/auth')
}
