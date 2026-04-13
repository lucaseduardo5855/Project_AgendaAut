import { ReactNode } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CalendarDays, Settings, PieChart, Users, LogOut, Link as LinkIcon, Menu } from 'lucide-react'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-[#170530] text-slate-300 flex-col hidden md:flex transiton-all duration-300">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <span className="text-white text-2xl font-black tracking-tight">agenda.ai</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider px-2">Menu Principal</div>
          
          <Link href="/dashboard" className="flex items-center gap-3 bg-primary-600/20 text-white px-4 py-3 rounded-xl transition-colors border border-primary-500/30">
            <PieChart size={20} className="text-primary-400" />
            <span className="font-semibold text-sm">Visão Geral</span>
          </Link>
          
          <Link href="#" className="flex items-center gap-3 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl transition-colors">
            <CalendarDays size={20} />
            <span className="font-semibold text-sm">Minha Agenda</span>
          </Link>
          
          <Link href="#" className="flex items-center gap-3 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl transition-colors">
            <Users size={20} />
            <span className="font-semibold text-sm">Clientes</span>
          </Link>

          <Link href="#" className="flex items-center gap-3 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl transition-colors">
            <LinkIcon size={20} />
            <span className="font-semibold text-sm">Meu Link Público</span>
          </Link>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <Link href="#" className="flex items-center gap-3 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl transition-colors mb-2">
            <Settings size={20} />
            <span className="font-semibold text-sm">Configurações</span>
          </Link>
          <a href="/logout" className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 px-4 py-3 rounded-xl transition-colors cursor-pointer">
            <LogOut size={20} />
            <span className="font-semibold text-sm">Sair da Conta</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm md:shadow-none z-10 w-full relative">
           <div className="flex items-center gap-4">
             <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
               <Menu size={24} />
             </button>
             <h2 className="text-xl font-bold text-slate-800 hidden sm:block">Painel do Autônomo</h2>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200 shadow-sm">
                {user.user_metadata?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto w-full relative">
          {children}
        </div>
      </main>

    </div>
  )
}
