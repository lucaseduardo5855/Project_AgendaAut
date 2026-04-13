'use client'

import { useState } from 'react'
import { ArrowRight, Link as LinkIcon, Wallet, Loader2, AlertCircle } from 'lucide-react'
import { setupProfile } from './actions'

export function SetupForm({ userId, fallbackName }: { userId: string; fallbackName: string }) {
  const [slug, setSlug] = useState(() => fallbackName.toLowerCase().replace(/[^a-z0-9]/g, ''))
  const [pixKey, setPixKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    
    if (!slug.trim()) {
      setError('O link da agenda é obrigatório.')
      return
    }
    if (!pixKey.trim()) {
      setError('A chave PIX é obrigatória para proteger seus agendamentos.')
      return
    }

    setLoading(true)
    const result = await setupProfile(slug.trim().toLowerCase(), pixKey.trim())
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // Se der sucesso, a própria Server Action faz o REDIRECT
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl relative">
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" />
          <span className="leading-tight">{error}</span>
        </div>
      )}

      {/* Input de SLUG */}
      <div className="mb-6">
        <label className="block text-white font-bold mb-2 text-sm">Seu Link Exclusivo</label>
        <p className="text-slate-400 text-xs mb-3">Esse é o link que você vai postar no Insta ou mandar no WhatsApp.</p>
        
        <div className="flex bg-white/5 rounded-xl border border-white/10 overflow-hidden focus-within:border-primary-400 focus-within:bg-white/10 transition-all shadow-inner">
          <div className="bg-black/20 flex items-center justify-center px-4 border-r border-white/10">
            <span className="text-slate-400 font-medium text-sm flex items-center gap-1">
              <LinkIcon size={14} /> agenda.ai/
            </span>
          </div>
          <input 
            type="text" 
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            placeholder="seu-nome-ou-clinica"
            className="w-full bg-transparent text-white font-bold text-base py-3 px-4 focus:outline-none placeholder-slate-500"
            disabled={loading}
          />
        </div>
      </div>

      {/* Input de Chave PIX */}
      <div className="mb-8">
        <label className="block text-white font-bold mb-2 text-sm">Chave PIX Recebedora</label>
        <p className="text-slate-400 text-xs mb-3">Onde o robô deve exigir que o cliente deposite o "sinal de garantia"?</p>
        
        <div className="flex bg-white/5 rounded-xl border border-white/10 overflow-hidden focus-within:border-primary-400 focus-within:bg-white/10 transition-all shadow-inner">
          <div className="bg-black/20 flex items-center justify-center px-4 border-r border-white/10">
            <Wallet size={16} className="text-slate-400" />
          </div>
          <input 
            type="text" 
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder="Seu CPF, Email, Celular ou Aleatória..."
            className="w-full bg-transparent text-white font-medium text-sm py-3 px-4 focus:outline-none placeholder-slate-500"
            disabled={loading}
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg hover:shadow-primary-600/50"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Configurando Automações...
          </>
        ) : (
          <>
            Finalizar e Entrar no Painel <ArrowRight size={20} />
          </>
        )}
      </button>
      
      <p className="text-center text-xs text-slate-500 mt-6 font-medium">
        Você poderá alterar estas informações depois, nas <br/>configurações do painel.
      </p>
    </form>
  )
}
