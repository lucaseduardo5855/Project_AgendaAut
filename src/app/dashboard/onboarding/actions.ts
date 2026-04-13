'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function setupProfile(slug: string, pixKey: string) {
  const supabase = await createClient()

  // 1. Garantir que o usuário está tentado alterar apenas se estiver logado
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sessão inválida. Faça login novamente.' }
  }

  // 2. Verificar se o slug já existe (pois é UNIQUE no BD)
  // Pesquisamos por outro profile que já tenha este mesmo slug.
  const { data: existingSlug } = await supabase
    .from('profiles')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existingSlug && existingSlug.id !== user.id) {
    return { error: 'Este link já está sendo usado por outro profissional. Tente outro nome!' }
  }

  // 3. Atualizar o profile atual
  const { error } = await supabase
    .from('profiles')
    .update({ 
      slug: slug, 
      pix_key: pixKey 
    })
    .eq('id', user.id)

  if (error) {
    return { error: 'Ocorreu um erro no banco de dados. Tente novamente mais tarde.' }
  }

  // 4. Sucesso! Redirecionar para o painel principal
  redirect('/dashboard')
}
