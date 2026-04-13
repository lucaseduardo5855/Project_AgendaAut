import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SetupForm } from './SetupForm' // Client Component

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Verifica se ele já preencheu. Se sim, joga pro dashboard central.
  const { data: profile } = await supabase
    .from('profiles')
    .select('slug')
    .eq('id', user.id)
    .single()

  if (profile?.slug) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#170530] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-xl z-10 relative mt-10 md:mt-0">
        
        <div className="mb-10 text-center">
          <span className="text-primary-400 font-bold tracking-widest text-sm uppercase mb-3 block">Falta pouco!</span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            Configure sua <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Agenda Pública</span>
          </h1>
          <p className="text-slate-300 font-medium text-lg mx-auto max-w-md">
            Defina o link que você mandará para os clientes e qual chave PIX receberá os sinais automáticos.
          </p>
        </div>

        {/* O formulário interativo ficará em um Client Component para lidar com estados de URL e validação dinâmica */}
        <SetupForm userId={user.id} fallbackName={user.user_metadata?.full_name || ''} />

      </div>
    </div>
  )
}
