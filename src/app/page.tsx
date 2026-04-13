import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle, Calendar, Smartphone, DollarSign, MessageCircle, PieChart, Check, Share2 } from "lucide-react";

export default function Home({ searchParams }: { searchParams: { error?: string, code?: string } }) {
  
  // Se o Supabase jogar erros de e-mail expirados para a home (devido ao template antigo):
  if (searchParams.error) {
    redirect(`/auth?error=${encodeURIComponent("O link de e-mail expirou ou seu provedor já o verificou previamenente. Peça um novo link fazendo login.")}`)
  }

  // Se o Supabase mandar o código PKCE para a Home por engano:
  if (searchParams.code) {
    redirect(`/auth/callback?code=${searchParams.code}`)
  }
  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* HEADER LIMPO E FLUIDO */}
      <header className="w-full bg-white border-b border-border-subtle sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-primary-600 text-2xl font-black tracking-tight">agenda.ai</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#como-funciona" className="hidden md:block text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors duration-300">
              Como Funciona
            </Link>
            <Link href="#planos" className="hidden md:block text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors duration-300">
              Planos
            </Link>
            <Link href="/auth" className="hidden sm:block text-sm font-semibold text-foreground hover:text-primary-600 ml-4">
              Entrar
            </Link>
            <Link href="/auth" className="text-sm font-black text-white bg-primary-600 hover:bg-primary-700 px-5 py-2.5 rounded-full transition-shadow hover:shadow-lg hover:shadow-primary-600/20">
              Teste Grátis
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-background">
        
        {/* HERO SECTION */}
        <section className="w-full px-6 py-16 md:py-28 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Lado Esquerdo do Hero (Textos) */}
          <div className="flex flex-col flex-1 items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm mb-6 border border-primary-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              Chega de perder tempo no zap
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-6">
              Organize sua agenda e fature <span className="text-primary-600">sem levar calotes.</span>
            </h1>
            
            <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
              O agendador feito para autônomos. Seu cliente acessa seu link, escolhe o horário, paga o sinal via PIX e o sistema avisa ele um dia antes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/auth" className="flex items-center justify-center font-bold text-white bg-foreground hover:bg-black px-8 py-4 rounded-full text-lg transition-transform hover:scale-105">
                Começar agora 🚀
              </Link>
            </div>
          </div>

          {/* Lado Direito do Hero (Mockup / App Visual) */}
          <div className="flex-1 w-full relative flex justify-center lg:justify-end">
            {/* Efeito Neon / Sombra Roxa Brilhante bem forte saindo de trás do celular */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[650px] bg-primary-500 rounded-full blur-[100px] opacity-40"></div>
            
            {/* O Grande Fundo Roxo da Foto 2 (Círculo sólido grande) */}
            <div className="absolute top-1/2 left-0 sm:left-1/4 lg:left-1/2 -translate-y-1/2 w-[800px] h-[800px] lg:w-[1200px] lg:h-[1200px] bg-primary-600 rounded-full hidden sm:block"></div>
            
            {/* O "Mockup" Mobile em CSS puro, agora com z-index alto pra ficar em cima do fundo */}
            <div className="relative z-10 w-[300px] h-[600px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden flex flex-col transform hover:-translate-y-4 hover:shadow-primary-600/30 transition-all duration-500">
              <div className="h-24 bg-primary-700 flex flex-col justify-end p-5 text-white">
                <span className="text-sm opacity-80">Agenda de hoje</span>
                <span className="text-2xl font-black">Seu Negócio</span>
              </div>
              <div className="flex-1 bg-slate-50 p-4 flex flex-col gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">14:00</h4>
                    <p className="text-xs text-slate-500">Novo Cliente - Serviço</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                    PIX Pago
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center opacity-60">
                  <div>
                    <h4 className="font-bold text-slate-800">15:00</h4>
                    <p className="text-xs text-slate-500">Horário Livre</p>
                  </div>
                </div>
              </div>
              {/* Notinha flutuante simulando whatsapp */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs shrink-0"><MessageCircle size={14}/></div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Status Enviado</p>
                  <p className="text-slate-500">"Agendamento Confirmado!"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Benefícios (Cards brancos no fundo off-white) */}
        <section className="w-full py-24 px-6 border-t border-border-subtle bg-slate-50">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-16">
            <span className="text-primary-600 font-bold tracking-wider text-sm mb-3 uppercase">Benefícios</span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Mais <span className="text-primary-600">organização</span>, menos dores de cabeça
            </h2>
            <p className="text-slate-500 max-w-2xl">
              Nossa plataforma ataca as piores dores de quem atende por hora: a perda de tempo respondendo mensagem e os clientes que marcam e somem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start transition hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                <DollarSign size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Fim do "No-Show"</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Condicione seus agendamentos ao pagamento de um sinal via PIX. Quem pagou, aparece.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start transition hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                <Smartphone size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Lembretes Automáticos</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Você para de ser secretária. O sistema envia a confirmação e lembrete direto no WhatsApp do cliente.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start transition hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
                <Calendar size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Seu Link Público</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Coloque "agenda.ai/seunome" na bio do seu Insta. O cliente vê horários livres e já se agenda.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: Passo a Passo (Premium Dark Purple Modal) */}
        <section id="como-funciona" className="w-full pt-32 pb-24 px-6 bg-[#170530] overflow-hidden relative rounded-t-[3rem] md:rounded-t-[6rem] -mt-8 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          {/* Luzes de fundo / Nebulosa */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            
            {/* Lado Esquerdo - Celular Exemplo Chat */}
            <div className="flex-1 flex justify-center lg:justify-start relative">
               {/* Efeito Glow Roxo por trás do celular (Aura central) */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[500px] md:h-[700px] bg-primary-500/40 rounded-full blur-[100px] opacity-60 -z-10 pointer-events-none"></div>
              
              <div className="relative w-[320px] h-[640px] bg-[#efeae2] rounded-[3rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden">
                {/* iPhone Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-slate-900 rounded-b-3xl z-20"></div>
                
                {/* Status Bar Fake */}
                <div className="absolute top-0 w-full h-8 flex justify-between items-center px-6 z-10 text-[10px] font-bold text-white pt-1">
                   <span>09:41</span>
                   <div className="flex gap-1 items-center">
                     <span className="opacity-80">5G</span>
                     <div className="w-5 h-2.5 bg-white rounded-sm"></div>
                   </div>
                </div>

                {/* Header do App */}
                <div className="bg-[#5b21b6] h-24 pt-10 px-5 flex items-center justify-between text-white relative z-0">
                  <span className="cursor-pointer text-lg font-light">←</span> 
                  <span className="font-medium text-[15px] tracking-wide">Horários Livres</span>
                  <span className="cursor-pointer"><Share2 size={18}/></span>
                </div>
                
                <div className="p-5 flex flex-col gap-6 text-sm relative z-0 bg-white h-full overflow-y-auto pb-10">
                  <div>
                    <h4 className="font-bold text-slate-800 text-[15px] mb-1">Horários Livres:</h4>
                    <h5 className="font-black text-slate-900 text-xl">Ju</h5>
                  </div>
                  
                  {/* Dia 1 */}
                  <div className="flex flex-col gap-3">
                     <p className="text-center text-[11px] font-bold text-slate-600 font-sans tracking-tight">sex., 22/01/2021</p>
                     <div className="flex flex-wrap gap-2 justify-center px-1">
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">14:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">15:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">15:30</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">16:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">17:00</div>
                     </div>
                     <div className="w-[80%] mx-auto h-px bg-slate-100 mt-2"></div>
                  </div>

                  {/* Dia 2 */}
                  <div className="flex flex-col gap-3">
                     <p className="text-center text-[11px] font-bold text-slate-600 font-sans tracking-tight">ter., 26/01/2021</p>
                     <div className="flex flex-wrap gap-2 justify-center px-1">
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">09:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">10:30</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">11:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">14:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">14:30</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">15:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">15:30</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">16:00</div>
                     </div>
                     <div className="w-[80%] mx-auto h-px bg-slate-100 mt-2"></div>
                  </div>

                  {/* Dia 3 */}
                  <div className="flex flex-col gap-3">
                     <p className="text-center text-[11px] font-bold text-slate-600 font-sans tracking-tight">qua., 27/01/2021</p>
                     <div className="flex flex-wrap gap-2 justify-center px-1">
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">10:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">10:30</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">11:00</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">13:30</div>
                       <div className="bg-[#6b31c4] text-white py-1.5 px-3 rounded-md text-[11px] font-medium shadow-sm cursor-pointer hover:bg-opacity-90">14:00</div>
                     </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Lado Direito - Steps */}
            <div className="flex-1 flex flex-col relative pt-10 lg:pt-0">
              <span className="text-[#ffcc00] font-bold text-sm uppercase mb-2 tracking-widest leading-none drop-shadow-sm">O Novo Padrão</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">
                Assuma o controle do seu <span className="text-primary-400">dia a dia.</span>
              </h2>
              
              <div className="flex flex-col gap-6 relative">
                {/* Linha vertical conectando os passos (Decorativo) - Cor de vidro no escuro */}
                <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-white/10 -z-10 hidden md:block"></div>
                
                {/* Glass Card Dark Mode 1 */}
                <div className="group flex items-start gap-5 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-primary-400 hover:shadow-[0_0_30px_rgba(138,63,252,0.2)] cursor-default relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-primary-600 shadow-inner flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors border border-white/5">
                    <span className="text-4xl font-black text-white drop-shadow-sm">1</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">Acessar o Link</h4>
                    <p className="text-slate-300 font-medium leading-relaxed">Você recebe seu link <span className="text-white font-bold opacity-80">agendador.com/seu-nome</span>. Sem precisar instalar apps, seu cliente já abre sua grade completa do Insta.</p>
                  </div>
                </div>

                {/* Glass Card Dark Mode 2 */}
                <div className="group flex items-start gap-5 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-primary-400 hover:shadow-[0_0_30px_rgba(138,63,252,0.2)] cursor-default relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-primary-600 shadow-inner flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors border border-white/5">
                    <span className="text-4xl font-black text-white drop-shadow-sm">2</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">Escolher e Pagar</h4>
                    <p className="text-slate-300 font-medium leading-relaxed">Deixe o cliente se agendar sozinho e pagar um "Sinal Pix" imediato ali mesmo. Segurança para o seu bolso e da sua empresa.</p>
                  </div>
                </div>

                {/* Glass Card Dark Mode 3 */}
                <div className="group flex items-start gap-5 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-primary-400 hover:shadow-[0_0_30px_rgba(138,63,252,0.2)] cursor-default relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-primary-600 shadow-inner flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors border border-white/5">
                    <span className="text-4xl font-black text-white drop-shadow-sm">3</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">Pronto! Piloto Automático</h4>
                    <p className="text-slate-300 font-medium leading-relaxed">Sua agenda aparece bloqueada automaticamente, você não move 1 dedo. Nós enviamos lembretes no dia seguinte.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION: Análise Gráfica / Dashboard */}
        {/* SECTION: Análise Gráfica / Dashboard */}
        <section className="w-full py-24 px-6 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Lado Esquerdo: Textos */}
            <div className="flex-1 text-left flex flex-col items-start z-10 w-full">
               <h2 className="text-3xl md:text-5xl font-light text-primary-600 mb-6 tracking-tight">Análise <span className="font-bold">Gráfica</span></h2>
               <p className="text-slate-500 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
                 Obtenha uma visão geral de seu negócio de autônomo com facilidade e dados claros.
               </p>

               <ul className="flex flex-col gap-6 mb-12 w-full">
                  <li className="flex items-start gap-4">
                     <CheckCircle size={28} className="text-primary-500 shrink-0 mt-0.5" strokeWidth={2.5}/>
                     <span className="text-slate-600 text-lg font-medium">Evolução de agendamentos, clientes e vendas.</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <CheckCircle size={28} className="text-primary-500 shrink-0 mt-0.5" strokeWidth={2.5}/>
                     <span className="text-slate-600 text-lg font-medium">Serviços mais populares e bem-sucedidos.</span>
                  </li>
                  <li className="flex items-start gap-4">
                     <CheckCircle size={28} className="text-primary-500 shrink-0 mt-0.5" strokeWidth={2.5}/>
                     <span className="text-slate-600 text-lg font-medium">Dashboards gráficos intuitivos para análises descomplicadas.</span>
                  </li>
               </ul>

               <Link href="/auth" className="bg-[#218838] hover:bg-[#1e7e34] text-white font-bold py-4 px-8 rounded transition-colors shadow-lg hover:shadow-xl text-sm tracking-wider uppercase">
                  Testar Grátis hoje
               </Link>
            </div>

            {/* Lado Direito: Gráficos Mockados Responsivos (CSS Composition) */}
            <div className="flex-1 w-full flex items-center justify-center mt-12 lg:mt-0 perspective-1000">
               
               {/* Container relativo fixo para manter a proporção e prevenir quebra no mobile */}
               <div className="relative w-full max-w-[500px] h-[380px] sm:h-[450px] lg:h-[500px]">
                 
                 {/* 1. Bar Chart Flutuante (Atrás) */}
                 <div className="absolute top-0 right-0 lg:-right-8 w-[85%] sm:w-[420px] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-4 sm:p-6 flex flex-col transform lg:rotate-2 hover:rotate-0 transition-all duration-500 z-10 hover:z-40">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                       <h4 className="font-bold text-primary-700 text-xs sm:text-sm">Fluxo de Caixa Mensal</h4>
                       <div className="flex gap-1 sm:gap-2">
                          <span className="bg-green-100 text-green-700 text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-1 rounded">RECEBIMENTOS</span>
                          <span className="bg-red-100 text-red-700 text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-1 rounded">PAGAMENTOS</span>
                       </div>
                    </div>
                    <div className="flex-1 w-full flex items-end justify-between gap-1 sm:gap-2 border-b border-slate-100 pb-2 relative h-28 sm:h-40 lg:h-48">
                       <div className="absolute inset-x-0 bottom-1/3 h-px bg-slate-50"></div>
                       <div className="absolute inset-x-0 bottom-2/3 h-px bg-slate-50"></div>
                       
                       <div className="w-full flex items-end gap-1 px-1 z-10 h-full">
                          <div className="w-full bg-[#1e7e34] rounded-t-sm h-[40%] hover:h-[45%] transition-all"></div>
                          <div className="w-full bg-[#dc3545] rounded-t-sm h-[20%]"></div>
                          <div className="w-full bg-[#1e7e34] rounded-t-sm h-[60%] hover:h-[65%] transition-all"></div>
                          <div className="w-full bg-[#1e7e34] rounded-t-sm h-[55%]"></div>
                          <div className="w-full bg-[#dc3545] rounded-t-sm h-[45%]"></div>
                          <div className="w-full bg-[#1e7e34] rounded-t-sm h-[70%]"></div>
                          <div className="w-full bg-[#1e7e34] rounded-t-sm h-[80%]"></div>
                          <div className="w-full bg-[#dc3545] rounded-t-sm h-[30%]"></div>
                          <div className="w-full bg-[#1e7e34] rounded-t-sm h-[65%]"></div>
                          <div className="w-full bg-[#1e7e34] rounded-t-sm h-[90%]"></div>
                       </div>
                    </div>
                 </div>

                 {/* 2. Pie Chart Flutuante (Meio) */}
                 <div className="absolute top-[25%] lg:top-1/4 left-0 lg:-left-12 w-[70%] sm:w-[320px] bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-slate-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transform lg:-rotate-3 hover:rotate-0 transition-all duration-500 z-20 hover:z-40">
                     <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 shrink-0">
                       <div className="absolute inset-0 rounded-full border-[12px] sm:border-[16px] lg:border-[20px] border-[#8a3ffc] border-t-transparent border-r-transparent transform rotate-45"></div>
                       <div className="absolute inset-0 rounded-full border-[10px] sm:border-[12px] lg:border-[16px] border-[#ffcc00] border-b-transparent border-l-transparent transform -rotate-12"></div>
                       <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] lg:border-[12px] border-[#0ea5e9] border-r-transparent border-b-transparent transform rotate-[135deg]"></div>
                     </div>
                     <div className="flex flex-col gap-2 sm:gap-3 flex-1 w-full justify-center">
                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] lg:text-xs text-slate-500 font-medium"><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-[#0ea5e9]"></div> Avaliação Básica</div>
                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] lg:text-xs text-slate-500 font-medium"><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-[#8a3ffc]"></div> Consulta Geral</div>
                        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] lg:text-xs text-slate-500 font-medium"><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-[#ffcc00]"></div> Retorno</div>
                     </div>
                 </div>

                 {/* 3. Line Chart (Frente embaxo) */}
                 <div className="absolute bottom-2 sm:bottom-0 right-2 sm:right-auto sm:left-[35%] w-[80%] sm:w-[340px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-100 p-4 sm:p-5 flex flex-col z-30 transform hover:scale-105 transition-all duration-500 cursor-default">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                       <span className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">Faturamento</span>
                       <span className="text-[#1e7e34] font-bold text-[9px] sm:text-[10px] lg:text-xs bg-green-50 px-2 py-1 rounded">+18%</span>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 mb-2 sm:mb-3">R$ 5.480,00</h3>
                    {/* Linha pontilhada mock */}
                    <div className="h-12 sm:h-16 lg:h-20 w-full relative flex items-end">
                       <svg viewBox="0 0 100 30" className="w-full h-full stroke-primary-500 fill-none overflow-visible" preserveAspectRatio="none">
                          <path d="M0,25 C10,15 20,28 30,12 C40,5 50,22 60,18 C70,15 80,5 90,8 L100,5" strokeWidth="2.5"></path>
                          <circle cx="30" cy="12" r="2.5" className="fill-white stroke-primary-600 stroke-[1.5]"></circle>
                          <circle cx="60" cy="18" r="2.5" className="fill-white stroke-primary-600 stroke-[1.5]"></circle>
                          <circle cx="90" cy="8" r="2.5" className="fill-white stroke-primary-600 stroke-[1.5]"></circle>
                       </svg>
                       <div className="absolute top-[-5px] sm:top-0 left-[35%] bg-slate-800 text-white text-[8px] sm:text-[9px] lg:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shadow-lg">R$ 2.871,30 ✓</div>
                    </div>
                 </div>

               </div>
            </div>
          </div>
        </section>

        {/* SECTION: Planos */}
        <section id="planos" className="w-full py-32 px-6 bg-slate-50">
           <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
              Nossos <span className="text-primary-600">Planos</span>
            </h2>
            <p className="text-slate-500 max-w-lg mb-12">
              Escolha o plano que faz sentido para o momento atual do seu negócio. Comece grátis, faça o upgrade quando crescer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
              
              {/* Plano Grátis */}
              <div className="group bg-white rounded-3xl p-8 border border-slate-200 flex flex-col text-left transition-all duration-300 hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-600/10 hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">Iniciante</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-slate-800">Grátis</span>
                </div>
                <div className="h-px w-full bg-slate-100 mb-6 group-hover:bg-primary-100 transition-colors"></div>
                <ul className="flex flex-col gap-4 mb-8 flex-1">
                  <li className="flex gap-3 items-center text-slate-600"><CheckCircle size={20} className="text-green-500"/> Até 30 agendamentos / mês</li>
                  <li className="flex gap-3 items-center text-slate-600"><CheckCircle size={20} className="text-green-500"/> Link Personalizado</li>
                  <li className="flex gap-3 items-center text-slate-600"><CheckCircle size={20} className="text-green-500"/> Notificações por Email</li>
                  <li className="flex gap-3 items-center text-slate-300"><CheckCircle size={20}/> Cobrança via PIX</li>
                  <li className="flex gap-3 items-center text-slate-300"><CheckCircle size={20}/> Lembretes p/ WhatsApp</li>
                </ul>
                <Link href="/auth" className="w-full text-center font-bold text-primary-700 bg-primary-50 border border-primary-200 hover:bg-primary-100 hover:border-primary-300 py-4 rounded-xl transition-all shadow-sm">
                  Começar Grátis
                </Link>
              </div>

              {/* Plano Profissional */}
              {/* Plano Profissional */}
              <div className="group bg-[#170530] rounded-3xl p-8 border border-[#2a0e4f] shadow-[0_20px_50px_rgba(23,5,48,0.3)] flex flex-col text-left relative transform md:-translate-y-4 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(23,5,48,0.5)] hover:scale-[1.02] hover:border-primary-900">

                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ffcc00] text-yellow-900 font-bold px-4 py-1 text-sm rounded-full tracking-wider shadow-md">
                  MAIS ESCOLHIDO
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 shadow-sm">Profissional</h3>
                <div className="flex items-baseline gap-1 mb-6 text-white">
                  <span className="text-xl font-bold">R$</span>
                  <span className="text-5xl font-black">39</span>
                  <span className="text-xl font-bold">,90</span>
                  <span className="text-purple-200 ml-1">/ mês</span>
                </div>
                <div className="h-px w-full bg-white/20 mb-6"></div>
                <ul className="flex flex-col gap-5 mb-8 flex-1">
                  <li className="flex gap-3 items-center text-white font-medium"><CheckCircle size={20} className="text-[#ffcc00]"/> Agendamentos Ilimitados</li>
                  <li className="flex gap-3 items-center text-white font-medium"><CheckCircle size={20} className="text-[#ffcc00]"/> Link Personalizado PRO</li>
                  <li className="flex gap-3 items-center text-white font-medium"><CheckCircle size={20} className="text-[#ffcc00]"/> Cobrança de Sinal Automática (PIX)</li>
                  <li className="flex gap-3 items-center text-white font-medium"><CheckCircle size={20} className="text-[#ffcc00]"/> Lembretes de WhatsApp Ativos</li>
                  <li className="flex gap-3 items-center text-white font-medium"><CheckCircle size={20} className="text-[#ffcc00]"/> Relatório Financeiro</li>
                </ul>
                <Link href="/auth" className="w-full text-center font-bold text-yellow-900 bg-[#ffcc00] hover:bg-[#ffdb4d] py-4 rounded-xl transition-all shadow-lg hover:shadow-xl">
                  Assinar Profissional
                </Link>
              </div>

             </div>
            </div>
         </section>

        {/* SECTION: Registro / CTA Final (Dark Mode Premium) */}
        <section className="w-full py-24 px-6 bg-[#170530] relative overflow-hidden shadow-[inset_0_20px_50px_rgba(0,0,0,0.2)] border-t border-slate-900">
           {/* Formas no fundo pra dar o charme da landing page */}
           <div className="absolute top-0 right-0 w-[600px] h-[800px] bg-primary-600/30 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>
           
           <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
              <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 text-center">Sistema projetado para Autônomos</h2>
              <h3 className="text-white text-4xl md:text-5xl font-black mb-16 text-center">Comece a usar grátis <span className="text-[#ffcc00]">hoje mesmo</span></h3>

              <div className="w-full flex md:flex-row flex-col-reverse justify-center items-center gap-12 lg:gap-24">
                 
                 {/* Lado Esquerdo - Formulário de Cadastro */}
                 <div className="relative w-full max-w-[420px]">
                    {/* Efeito luminoso atrás do box */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary-500/30 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                    
                    <div className="w-full h-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col items-center">
                      <h4 className="text-white text-xl font-bold mb-6 text-center tracking-wide">Crie sua Conta Grátis</h4>
                      
                      <form className="flex flex-col gap-3 w-full">
                        {/* Nome do Negocio */}
                        <div className="flex bg-white/90 rounded-xl shadow-inner overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-400 transition-all">
                           <div className="w-12 shrink-0 bg-slate-100 flex items-center justify-center border-r border-slate-200 text-slate-400 text-base">🏢</div>
                           <input type="text" placeholder="Nome da sua empresa" className="w-full bg-transparent text-slate-800 text-sm py-3 px-4 focus:outline-none placeholder-slate-400" />
                        </div>
                        
                        {/* Nome do Dono */}
                        <div className="flex bg-white/90 rounded-xl shadow-inner overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-400 transition-all">
                           <div className="w-12 shrink-0 bg-slate-100 flex items-center justify-center border-r border-slate-200 text-slate-400 text-base">👤</div>
                           <input type="text" placeholder="Seu nome e sobrenome" className="w-full bg-transparent text-slate-800 text-sm py-3 px-4 focus:outline-none placeholder-slate-400" />
                        </div>

                        {/* Email */}
                        <div className="flex bg-white/90 rounded-xl shadow-inner overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-400 transition-all">
                           <div className="w-12 shrink-0 bg-slate-100 flex items-center justify-center border-r border-slate-200 text-slate-400 text-base">✉️</div>
                           <input type="email" placeholder="Email" className="w-full bg-transparent text-slate-800 text-sm py-3 px-4 focus:outline-none placeholder-slate-400" />
                        </div>

                        {/* WhatsApp */}
                        <div className="flex bg-white/90 rounded-xl shadow-inner overflow-hidden focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-400 transition-all">
                           <div className="w-12 shrink-0 bg-slate-100 flex items-center justify-center border-r border-slate-200 text-slate-400 text-base">📞</div>
                           <input type="tel" placeholder="(  ) _____-____" className="w-full bg-transparent text-slate-800 text-sm py-3 px-4 focus:outline-none placeholder-slate-400" />
                        </div>

                        {/* Ramo */}
                        <div className="flex bg-white/90 rounded-xl shadow-inner overflow-hidden relative focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-400 transition-all">
                           <select className="w-full bg-transparent text-slate-800 text-sm py-3 px-4 appearance-none focus:outline-none cursor-pointer">
                             <option value="">Autônomo</option>
                             <option value="estetica">Beleza e Estética</option>
                             <option value="saude">Saúde e Bem-Estar</option>
                             <option value="consultoria">Aulas e Consultoria</option>
                             <option value="outros">Outras Modalidades</option>
                           </select>
                           <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none pb-1"><span className="text-slate-400 text-xs">▼</span></div>
                        </div>

                        <button type="button" className="w-full bg-[#218838] hover:bg-[#1e7e34] text-white font-bold py-3 rounded mt-2 transition-colors shadow-md flex justify-center items-center gap-2 cursor-pointer">
                          ✔ EXPERIMENTAR
                        </button>

                        <div className="flex flex-col items-center mt-3 gap-6">
                          <p className="text-center text-[10px] text-white/70 leading-relaxed max-w-[280px]">
                            Ao clicar em Experimentar você concorda com o <Link href="#" className="font-bold hover:text-white transition-colors">Termos de Uso</Link> e <Link href="#" className="font-bold hover:text-white transition-colors">Política de privacidade</Link>
                          </p>
                          
                          <Link href="/auth" className="text-center text-xs font-bold text-white hover:text-primary-200 transition-colors">
                            Já é nosso cliente? Clique Aqui!
                          </Link>
                        </div>
                      </form>
                    </div>
                 </div>

                 {/* Lado Direito - Features */}
                 <div className="w-full max-w-md flex flex-col gap-4">
                    <ul className="flex flex-col gap-5">
                       <li className="flex items-center gap-4 text-white font-medium text-lg tracking-wide"><div className="bg-green-500/20 p-1.5 rounded-full"><Check size={18} className="text-green-400"/></div> Agendamento Online</li>
                       <li className="flex items-center gap-4 text-white font-medium text-lg tracking-wide"><div className="bg-green-500/20 p-1.5 rounded-full"><Check size={18} className="text-green-400"/></div> Lembretes e Alertas Inteligentes</li>
                       <li className="flex items-center gap-4 text-white font-medium text-lg tracking-wide"><div className="bg-green-500/20 p-1.5 rounded-full"><Check size={18} className="text-green-400"/></div> Envio de Notificações via WhatsApp</li>
                       <li className="flex items-center gap-4 text-white font-medium text-lg tracking-wide"><div className="bg-green-500/20 p-1.5 rounded-full"><Check size={18} className="text-green-400"/></div> Controle Automático de Faltas</li>
                       <li className="flex items-center gap-4 text-white font-medium text-lg tracking-wide"><div className="bg-green-500/20 p-1.5 rounded-full"><Check size={18} className="text-green-400"/></div> Cobrança de Sinal via PIX</li>
                       <li className="flex items-center gap-4 text-white font-medium text-lg tracking-wide"><div className="bg-green-500/20 p-1.5 rounded-full"><Check size={18} className="text-green-400"/></div> Relatório de Lucros do Mês</li>
                       <li className="flex items-center gap-4 text-white font-medium text-lg tracking-wide"><div className="bg-green-500/20 p-1.5 rounded-full"><Check size={18} className="text-green-400"/></div> Organização Instantânea da Agenda</li>
                       <li className="text-[#ffcc00] font-bold mt-2 ml-[3.25rem]">e muito mais...</li>
                    </ul>
                 </div>

              </div>
           </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="flex flex-col max-w-xs">
            <span className="text-primary-600 text-2xl font-black tracking-tight mb-4">agenda.ai</span>
            <p className="text-slate-500 text-sm">A ferramenta definitiva para o autônomo brasileiro ganhar tempo e proteger seu faturamento.</p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-slate-800">Produto</span>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Como funciona</Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Planos</Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Funcionalidades</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-slate-800">Empresa</span>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Termos de Uso</Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Privacidade</Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Contato</Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-100 pt-8 flex items-center justify-between">
          <p className="text-sm text-slate-400">© 2026 Agenda.ai. Todos os direitos reservados.</p>
          <div className="flex gap-4">
             {/* Icons Sociais iriam aqui */}
          </div>
        </div>
      </footer>

    </div>
  );
}
