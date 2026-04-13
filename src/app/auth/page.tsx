'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CalendarCheck, ArrowRight, Loader2, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'
import { login, signup, signInWithGoogle } from './actions'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get('error')
  const successMsg = searchParams.get('success')

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  
  // Guardamos os erros de cada campo para pintar o input de vermelho
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; confirm_password?: string }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Limpar erros anteriores
    setFieldErrors({})

    if (!isLogin) {
      const formData = new FormData(e.currentTarget)
      const errors: typeof fieldErrors = {}
      let hasError = false
      
      const email = formData.get('email') as string
      const confirmEmail = formData.get('confirm_email') as string
      if (email !== confirmEmail) {
        errors.email = 'Os e-mails não coincidem.'
        hasError = true
      }

      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirm_password') as string
      
      if (password !== confirmPassword) {
        errors.confirm_password = 'As senhas não coincidem.'
        hasError = true
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
      if (!passwordRegex.test(password)) {
        errors.password = 'A senha deve conter 1 letra Maiúscula e 1 número.'
        hasError = true
      }

      // Se achamos erros, a gente trava o envio e mostra eles na tela abaixo do input!
      if (hasError) {
        e.preventDefault()
        setFieldErrors(errors)
        return
      }
    }
    setLoading(true)
  }



  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* LADO ESQUERDO DO GRID */}
        <div className="hidden md:flex md:w-5/12 bg-primary-600 p-8 flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 border-[20px] border-white/10 rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 border-[30px] border-white/5 rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 cursor-pointer">
              <CalendarCheck className="text-white" size={24} />
              <span className="text-xl font-black tracking-tight">agenda.ai</span>
            </Link>

            <h1 className="text-3xl font-bold mb-3">
              {isLogin ? 'Bem-Vindo!' : 'Comece a decolar!'}
            </h1>
            <p className="text-primary-100 text-sm leading-relaxed pr-4">
              {isLogin 
                ? 'Faça login para gerenciar sua agenda e acompanhar seus ganhos reais e agendamentos.'
                : 'Crie sua conta agora e deixe o robô do WhatsApp trabalhar para você.'}
            </p>
          </div>

          <div className="relative z-10 text-xs text-primary-200">
            © {new Date().getFullYear()} Agenda.ai. Resolvendo problemas B2B.
          </div>
        </div>

        {/* LADO DIREITO MODULAR */}
        <div className="w-full md:w-7/12 p-6 sm:px-10 sm:py-8 flex flex-col justify-center bg-white relative">
          
          {/* Logo Mobile */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-4 text-primary-600">
            <div className="bg-primary-50 p-2 rounded-xl">
              <CalendarCheck size={20} />
            </div>
            <span className="text-xl font-black tracking-tight">agenda.ai</span>
          </div>

          <div className="mb-4 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {isLogin ? 'Faça Login' : 'Criar Conta'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isLogin ? 'Insira seus dados para continuar.' : 'É rápido, fácil e gratuito.'}
            </p>
          </div>

          {/* Erros Vindo do Backend (Supabase) */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm font-medium flex items-center gap-2">
              <AlertCircle size={18} />
              {errorMsg}
            </div>
          )}

          {/* Sucesso Vindo do Backend (Aviso de E-mail) */}
          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium flex items-center gap-2 shadow-sm">
              <CheckCircle size={18} />
              {successMsg}
            </div>
          )}

          {/* Formulário Wrapper para Server Action do Google */}
          <form action={signInWithGoogle}>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors mb-4 shadow-sm cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Entrar com Google
            </button>
          </form>

          <div className="flex items-center gap-4 mb-5">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ou com email</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <form action={isLogin ? login : signup} onSubmit={handleSubmit} className="flex flex-col gap-3">
            
            {!isLogin && (
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                   <User className="text-slate-400" size={18} />
                 </div>
                 <input 
                   type="text" 
                   name="full_name" 
                   required={!isLogin}
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:bg-white transition-all"
                   placeholder="Nome Completo"
                 />
               </div>
            )}

            <div className={!isLogin ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}>
              
              <div className="relative flex flex-col gap-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className={`${fieldErrors.email ? 'text-red-400' : 'text-slate-400'}`} size={18} />
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    onChange={() => setFieldErrors(prev => ({...prev, email: undefined}))}
                    className={`w-full bg-slate-50 border rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                      fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                    placeholder="seu@email.com"
                  />
                </div>
                {fieldErrors.email && <span className="text-xs text-red-500 ml-1 font-medium">{fieldErrors.email}</span>}
              </div>

              {!isLogin && (
                <div className="relative flex flex-col gap-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className={`${fieldErrors.email ? 'text-red-400' : 'text-slate-400'}`} size={18} />
                    </div>
                    <input 
                      type="email" 
                      name="confirm_email" 
                      required={!isLogin}
                      onChange={() => setFieldErrors(prev => ({...prev, email: undefined}))}
                      className={`w-full bg-slate-50 border rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                        fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500'
                      }`}
                      placeholder="Repita o e-mail"
                    />
                  </div>
                </div>
              )}

            </div>

            <div className={!isLogin ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}>
              
              <div className="relative flex flex-col gap-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className={`${fieldErrors.password ? 'text-red-400' : 'text-slate-400'}`} size={18} />
                  </div>
                  <input 
                    type="password" 
                    name="password" 
                    required
                    onChange={() => setFieldErrors(prev => ({...prev, password: undefined}))}
                    className={`w-full bg-slate-50 border rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                      fieldErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                    placeholder="Senha"
                    minLength={6}
                  />
                </div>
                {fieldErrors.password && <span className="text-xs text-red-500 ml-1 font-medium">{fieldErrors.password}</span>}
              </div>

              {!isLogin && (
                <div className="relative flex flex-col gap-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className={`${fieldErrors.confirm_password ? 'text-red-400' : 'text-slate-400'}`} size={18} />
                    </div>
                    <input 
                      type="password" 
                      name="confirm_password" 
                      required={!isLogin}
                      onChange={() => setFieldErrors(prev => ({...prev, confirm_password: undefined}))}
                      className={`w-full bg-slate-50 border rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                        fieldErrors.confirm_password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500'
                      }`}
                      placeholder="Repita a senha"
                      minLength={6}
                    />
                  </div>
                  {fieldErrors.confirm_password && <span className="text-xs text-red-500 ml-1 font-medium">{fieldErrors.confirm_password}</span>}
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-between items-center mt-1 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 w-3.5 h-3.5 cursor-pointer" />
                  <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">Lembrar de mim</span>
                </label>
                <Link href="#" className="text-xs text-primary-600 hover:text-primary-700 font-bold transition-colors cursor-pointer">
                  Esqueceu a senha?
                </Link>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 cursor-pointer bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5 shadow-primary-600/30"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Criar Conta Grátis'}
                  {isLogin && <ArrowRight size={18} />}
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center flex justify-center border-t border-slate-100 pt-4">
            <p className="text-slate-500 text-xs flex items-center justify-center gap-1">
              {isLogin ? 'Ainda não está aqui?' : 'Já possui conta?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                type="button"
                className="cursor-pointer font-bold text-primary-600 hover:text-primary-700 transition-colors"
                disabled={loading}
              >
                {isLogin ? 'Crie uma Conta' : 'Faça Sign In'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
