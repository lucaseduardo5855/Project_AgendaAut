-- 1. Tabela de Perfis do Profissional (Autônomo)
-- Esta tabela é vinculada ao usuário cadastrado na Autenticação do Supabase.
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT, -- Ex: "Barbearia do Minhoca" (Adicionado na Fase 4)
  category TEXT, -- Ex: "Beleza e Cuidados" (Adicionado na Fase 4)
  slug TEXT UNIQUE, -- Ex: agenda.ai/joaobarbeiro (Para ser o link dele)
  pix_key TEXT, -- Chave PIX do profissional para receber o sinal
  working_hours JSONB, -- Ex: { "seg": ["09:00", "18:00"] }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativa políticas de segurança (RLS) para o Profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profissionais podem ver e editar apenas seu próprio perfil." ON profiles
  FOR ALL USING (auth.uid() = id);
CREATE POLICY "Qualquer pessoa pode buscar um perfil pelo slug para agendar." ON profiles
  FOR SELECT USING (true);


-- 2. Tabela de Serviços (O que o profissional oferece)
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL, -- Ex: "Corte de Cabelo"
  duration_minutes INTEGER NOT NULL, -- Ex: 30
  price DECIMAL(10,2) NOT NULL, -- Ex: 50.00
  requires_pix_deposit BOOLEAN DEFAULT false, -- Cobrar sinal antes?
  deposit_amount DECIMAL(10,2) DEFAULT 0, -- Ex: 10.00 de sinal
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profissional gerencia seus próprios serviços." ON services 
  FOR ALL USING (auth.uid() = profile_id);
CREATE POLICY "Qualquer pessoa logada ou não pode ver os serviços de um perfil público." ON services 
  FOR SELECT USING (true);


-- 3. Tabela de Agendamentos (Feitos pelos Clientes)
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE RESTRICT NOT NULL,
  client_name TEXT NOT NULL,
  client_whatsapp TEXT NOT NULL,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL, -- Ex: 2026-05-10 14:00
  status TEXT DEFAULT 'pending_payment', -- pending_payment, confirmed, canceled, completed
  payment_id TEXT, -- Caso tenha ID de transação do Mercado Pago no futuro
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profissional gerencia agendamentos da própria agenda." ON appointments 
  FOR ALL USING (auth.uid() = profile_id);
-- Clientes anônimos podem criar (inserir) um agendamento novo
CREATE POLICY "Clientes inserem agendamentos." ON appointments 
  FOR INSERT WITH CHECK (true);


-- Função que cadastra automaticamente um perfil quando o profissional cria uma conta na Autenticação
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que liga a Autenticação do Supabase -> Tabela Public Profiles
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
