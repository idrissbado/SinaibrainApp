# SinaibrainStock - AI-Powered Trading Intelligence Platform

## Overview

SinaibrainStock is a revolutionary AI-powered trading platform designed specifically for West African financial markets, with a primary focus on the BRVM (Bourse Régionale des Valeurs Mobilières). The platform combines advanced artificial intelligence, real-time market data, and comprehensive analytics to provide professional-grade trading intelligence.

## 🚀 Key Features

### 1. AI-Powered Intelligence
- **RAG (Retrieval Augmented Generation)** chatbot with real-time knowledge retrieval
- **Smart Scoring System** with proprietary algorithms rating stocks, sectors, and market conditions
- **Sentiment Analysis** from news, social media, and market data
- **Predictive Analytics** using machine learning models

### 2. Real-Time Market Data
- Live BRVM stock prices and market data
- Real-time portfolio tracking and analytics
- Market indices and sector performance
- Economic indicators and macroeconomic data

### 3. Professional Analytics
- **Technical Analysis** with 15+ indicators (RSI, MACD, Bollinger Bands, etc.)
- **Fundamental Analysis** with financial ratios and valuation metrics
- **Risk Assessment** with volatility measurements and risk scoring
- **Portfolio Optimization** with sector allocation and performance tracking

### 4. Comprehensive Market Coverage
- **45+ Listed Stocks** from BRVM
- **Multiple Sectors**: Banking, Telecommunications, Agriculture, Energy, Industrial
- **Market Indices**: Custom indices including SinaibrainStock Composite Index
- **Economic Data**: WAEMU region economic indicators and central bank data

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Recharts** for data visualization

### Backend
- **Next.js API Routes** for serverless functions
- **Supabase** for authentication and database
- **PostgreSQL** for data storage
- **Row Level Security (RLS)** for data protection

### Authentication
- **Multiple OAuth Providers**: Google, GitHub, LinkedIn, Twitter
- **Email/Password** authentication
- **Supabase Auth** with automatic profile creation
- **Premium tier** support

## 📊 API Endpoints

### Core Market Data
- `GET /api/brvm` - Real-time BRVM stock data
- `GET /api/indices` - Market indices and sector performance
- `GET /api/worldbank` - Macroeconomic indicators
- `GET /api/news` - Market news and updates

### AI & Analytics
- `GET /api/scoring` - AI-powered stock and market scoring
- `POST /api/rag` - RAG chatbot interactions
- `GET /api/portfolio` - Portfolio data and analytics
- `POST /api/portfolio` - Execute trades and transactions

### Authentication
- `GET /auth/callback` - OAuth callback handler
- Supabase Auth integration for user management

## 🗄️ Database Schema

### Core Tables
\`\`\`sql
-- User profiles with premium status
profiles (id, email, full_name, is_premium, subscription_tier, created_at, updated_at)

-- Stock information
stocks (id, symbol, name, sector, market_cap, created_at, updated_at)

-- Historical price data
stock_prices (id, stock_id, price, volume, change_amount, change_percent, timestamp)

-- User watchlists
user_watchlists (id, user_id, stock_id, created_at)

-- Chat sessions for AI interactions
chat_sessions (id, user_id, session_id, messages, created_at, updated_at)
\`\`\`

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Supabase account
- Environment variables configured

### Environment Variables
\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database Configuration
POSTGRES_URL=your_postgres_url
POSTGRES_PRISMA_URL=your_prisma_url
POSTGRES_URL_NON_POOLING=your_non_pooling_url
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DATABASE=your_db_name
POSTGRES_HOST=your_db_host
\`\`\`

### Installation Steps

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/sinaibrainstock.git
cd sinaibrainstock
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your configuration
\`\`\`

4. **Set up database**
\`\`\`bash
# Run the database setup script
npm run db:setup
\`\`\`

5. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

6. **Access the application**
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 📱 Mobile App Features

### Native Mobile Apps
- **iOS and Android** native applications
- **Offline capabilities** with cached data
- **Push notifications** for price alerts and news
- **Biometric authentication** (Face ID, Touch ID)
- **Real-time synchronization** with web platform

### Progressive Web App (PWA)
- **Installable** on mobile devices
- **Offline functionality** for portfolio viewing
- **Push notifications** support
- **Native-like experience**

## 🤖 AI & Machine Learning

### RAG (Retrieval Augmented Generation)
- **Knowledge Retrieval** from financial reports, news, and market data
- **Source Attribution** with confidence scoring
- **Real-time Updates** with latest market information
- **Context-Aware Responses** based on user queries

### Scoring Algorithms
- **Technical Analysis (25%)**: Moving averages, RSI, MACD, momentum indicators
- **Fundamental Analysis (30%)**: Financial ratios, growth metrics, balance sheet strength
- **Market Sentiment (20%)**: News sentiment, social media analysis, analyst recommendations
- **Risk Assessment (15%)**: Volatility, beta, liquidity risk, sector risk
- **AI Enhancement (10%)**: Machine learning predictions, pattern recognition

### Scoring Scale
- **90-100**: Exceptional
- **80-89**: Strong
- **70-79**: Good
- **60-69**: Fair
- **Below 60**: Weak

## 📈 Market Coverage

### BRVM Listed Companies
- **Banking Sector**: BOAB, SGBC, ETIT, BIDC
- **Telecommunications**: ONTBF, SNTS
- **Agriculture**: PALC, BICC, SOGC
- **Energy**: TTLC, PETR
- **Industrial**: SIVC, CFAC, NEIC

### Market Indices
- **SinaibrainStock Composite (SBSC)**: All listed stocks
- **BRVM Banking Index**: Banking sector performance
- **West Africa Growth Index**: High-growth companies
- **WAEMU ESG Index**: ESG-focused investments

### Economic Coverage
- **WAEMU Region**: 8 countries economic data
- **Central Bank Data**: BCEAO monetary policy and statistics
- **World Bank Indicators**: GDP, inflation, unemployment data
- **Currency Data**: CFA franc exchange rates

## 🔐 Security Features

### Authentication Security
- **OAuth 2.0** with multiple providers
- **JWT tokens** with secure refresh mechanism
- **Row Level Security (RLS)** in database
- **Session management** with automatic expiration

### Data Protection
- **Encryption at rest** for sensitive data
- **HTTPS enforcement** for all communications
- **API rate limiting** to prevent abuse
- **Input validation** and sanitization

### Privacy Compliance
- **GDPR compliance** for European users
- **Data minimization** principles
- **User consent management**
- **Right to deletion** support

## 🎯 Premium Features

### Free Tier
- Basic stock prices and charts
- Limited AI interactions
- Standard market data
- Basic portfolio tracking

### Premium Tier ($20/month)
- **Advanced AI Assistant** with RAG capabilities
- **Professional Charts** with technical indicators
- **Real-time Alerts** and notifications
- **Advanced Analytics** and scoring
- **Portfolio Optimization** tools
- **Macroeconomic Data** access
- **Priority Support**

## 🛠️ Development

### Code Structure
.
├── app/                    # Next.js app directory
│   ├── api/                # API routes (REST or handlers)
│   ├── auth/               # Authentication-related pages (e.g., login, register)
│   ├── dashboard/          # Dashboard views (real-time stock data, metrics)
│   └── globals.css         # Global styles
│
├── components/             # Reusable React components
│   ├── ui/                 # UI components (from shadcn/ui or custom)
│   └── [feature]/          # Feature-specific components (e.g., chatbot, charts)
│
├── lib/                    # Utility libraries and helper functions
│
├── scripts/                # Database and data pipeline scripts (e.g., seeders)
│
└── public/                 # Static assets (images, favicons, manifest, etc.)


### Key Components
- **StockChart**: Advanced charting with technical indicators
- **RAGChatbot**: AI-powered chat interface
- **ScoringSystem**: AI scoring display and analytics
- **Portfolio**: Portfolio management and tracking
- **MarketIndices**: Index performance and analytics

### API Design Patterns
- **RESTful endpoints** with consistent response format
- **Error handling** with proper HTTP status codes
- **Rate limiting** and request validation
- **Caching strategies** for performance optimization

## 🧪 Testing

### Unit Testing
\`\`\`bash
npm run test
\`\`\`

### Integration Testing
\`\`\`bash
npm run test:integration
\`\`\`

### E2E Testing
\`\`\`bash
npm run test:e2e
\`\`\`

## 📊 Performance Monitoring

### Metrics Tracked
- **API Response Times**
- **Database Query Performance**
- **User Engagement Metrics**
- **Error Rates and Monitoring**
- **Real-time Data Latency**

### Monitoring Tools
- **Vercel Analytics** for web performance
- **Supabase Monitoring** for database metrics
- **Custom Dashboards** for business metrics

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Code Standards
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

## 📞 Support

### Documentation
- **API Documentation**: Available at `/api/docs`
- **Component Storybook**: Available at `/storybook`
- **User Guide**: Available in the app help section

### Contact
- **Email**: support@sinaibrainstock.com
- **Website**: https://sinaibrainstock.com
- **GitHub**: https://github.com/idrissbado/SinaibrainApp

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Idriss BADO** - Founder & CEO
- **BRVM** - Market data provider
- **Supabase** - Backend infrastructure
- **Vercel** - Deployment platform
- **shadcn/ui** - Component library

---

**Built with ❤️ for West African Financial Markets**

*SinaibrainStock - Democratizing Access to Professional Trading Intelligence*
