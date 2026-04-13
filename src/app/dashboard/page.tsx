import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight, Clock, Users, DollarSign, CalendarCheck } from 'lucide-react'

export default async function DashboardHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // 1. Busca os dados do Perfil no Banco de Dados
  // Pegamos apenas a coluna 'slug' para checar o onboarding
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('slug, pix_key, full_name')
    .eq('id', user.id)
    .single()

  // Se o profissional não tem o link público ou a chave PIX, obrigamos o Onboarding!
  if (!profile || !profile.slug) {
    redirect('/dashboard/onboarding')
  }

  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
      
      {/* Header do Dashbobaord Principal */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Fala, {profile.full_name?.split(' ')[0] || 'Autônomo'}! 👋</h1>
          <p className="text-slate-500 mt-1">Aqui está o resumo do seu negócio hoje.</p>
        </div>
        
        <Link href={`/${profile.slug}`} target="_blank" className="bg-white border border-slate-200 text-slate-700 hover:text-primary-600 hover:border-primary-300 font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm">
          <span>Ver meu Link Público</span>
          <ArrowUpRight size={18} />
        </Link>
      </div>

      {/* Cards de Métricas (MOCK) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Faturamento (Mês)</span>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <DollarSign size={20} className="stroke-[2.5px]"/>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800">R$ 3.450</h3>
            <p className="text-xs font-bold text-green-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={14} /> +12% vs mês passado
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Agendamentos</span>
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
              <CalendarCheck size={20} className="stroke-[2.5px]"/>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800">42</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">12 a confirmar</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Taxa de Presença</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <Users size={20} className="stroke-[2.5px]"/>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800">98%</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">Sinal PIX fez efeito!</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Horas Trabalhadas</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <Clock size={20} className="stroke-[2.5px]"/>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800">128h</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">Neste mês</p>
          </div>
        </div>
      </div>

      {/* Próximos Atendimentos */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mt-4 w-full">
         <h2 className="text-xl font-bold text-slate-800 mb-6">Agenda de Hoje</h2>
         <div className="flex flex-col justify-center items-center py-16 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <CalendarCheck size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">Nenhum agendamento para hoje</h3>
            <p className="text-slate-500 text-sm max-w-sm">Compartilhe seu link público no instagram para que seus clientes comecem a agendar sozinhos.</p>
            <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-md text-sm">
              Compartilhar Link
            </button>
         </div>
      </div>
      
    </div>
  )
}
