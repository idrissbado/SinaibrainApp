-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stocks table for BRVM data
CREATE TABLE IF NOT EXISTS stocks (
  id SERIAL PRIMARY KEY,
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sector TEXT,
  market_cap BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stock_prices table for historical data
CREATE TABLE IF NOT EXISTS stock_prices (
  id SERIAL PRIMARY KEY,
  stock_id INTEGER REFERENCES stocks(id),
  price DECIMAL(10,2) NOT NULL,
  volume INTEGER DEFAULT 0,
  change_amount DECIMAL(10,2) DEFAULT 0,
  change_percent DECIMAL(5,2) DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_watchlists table
CREATE TABLE IF NOT EXISTS user_watchlists (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  stock_id INTEGER REFERENCES stocks(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, stock_id)
);

-- Create chat_sessions table for chatbot history
CREATE TABLE IF NOT EXISTS chat_sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  session_id TEXT NOT NULL,
  messages JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample BRVM stocks
INSERT INTO stocks (symbol, name, sector, market_cap) VALUES
('BOAB', 'Bank of Africa Benin', 'Banking', 125800000000),
('SGBC', 'Société Générale Burkina', 'Banking', 89200000000),
('ETIT', 'Ecobank Transnational', 'Banking', 156700000000),
('ONTBF', 'ONATEL Burkina Faso', 'Telecommunications', 45300000000),
('PALC', 'Palm Côte d''Ivoire', 'Agriculture', 78900000000),
('BICC', 'Bourse Ivoirienne du Cacao et du Café', 'Agriculture', 34500000000),
('TTLC', 'Total Côte d''Ivoire', 'Energy', 67800000000),
('SIVC', 'Air Liquide Côte d''Ivoire', 'Industrial', 23400000000)
ON CONFLICT (symbol) DO NOTHING;

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Watchlist policies
CREATE POLICY "Users can view own watchlist" ON user_watchlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own watchlist" ON user_watchlists
  FOR ALL USING (auth.uid() = user_id);

-- Chat sessions policies
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own chat sessions" ON chat_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stock_prices_stock_id ON stock_prices(stock_id);
CREATE INDEX IF NOT EXISTS idx_stock_prices_timestamp ON stock_prices(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_user_watchlists_user_id ON user_watchlists(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
