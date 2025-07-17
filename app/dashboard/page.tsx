"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  LogOut,
  Crown,
  Search,
  Filter,
  Star,
  Eye,
  Bell,
  Settings,
  UserIcon,
  Brain,
  Target,
} from "lucide-react"
import { createClient } from "@/lib/supabase"
import StockChart from "@/components/StockChart"
import StockAnalysis from "@/components/StockAnalysis"
import RAGChatbot from "@/components/RAGChatbot"
import MarketIndices from "@/components/MarketIndices"
import ScoringSystem from "@/components/ScoringSystem"
import Portfolio from "@/components/Portfolio"

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  sector: string
  marketCap: string
}

interface UserProfile {
  id: string
  email: string
  full_name: string
  is_premium: boolean
}

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [stocks, setStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStock, setSelectedStock] = useState<string>("BOAB")
  const [searchTerm, setSearchTerm] = useState("")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [sortBy, setSortBy] = useState("changePercent")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
    fetchStockData()

    // Set up real-time updates (polling for MVP)
    const interval = setInterval(fetchStockData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    // Fetch user profile with premium status
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    setUserProfile({
      id: user.id,
      email: user.email || "",
      full_name: user.user_metadata?.full_name || "",
      is_premium: profile?.is_premium || false,
    })
  }

  const fetchStockData = async () => {
    try {
      const response = await fetch("/api/brvm")
      const data = await response.json()
      setStocks(data.stocks || [])
    } catch (error) {
      console.error("Error fetching stock data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const mockStocks: StockData[] = [
    {
      symbol: "BOAB",
      name: "Bank of Africa Benin",
      price: 4250,
      change: 125,
      changePercent: 3.03,
      volume: 15420,
      sector: "Banking",
      marketCap: "₣125.8B",
    },
    {
      symbol: "SGBC",
      name: "Société Générale Burkina",
      price: 8900,
      change: -200,
      changePercent: -2.2,
      volume: 8750,
      sector: "Banking",
      marketCap: "₣89.2B",
    },
    {
      symbol: "ETIT",
      name: "Ecobank Transnational",
      price: 12500,
      change: 350,
      changePercent: 2.88,
      volume: 22100,
      sector: "Banking",
      marketCap: "₣156.7B",
    },
    {
      symbol: "ONTBF",
      name: "ONATEL Burkina Faso",
      price: 3800,
      change: 75,
      changePercent: 2.01,
      volume: 5600,
      sector: "Telecommunications",
      marketCap: "₣45.3B",
    },
    {
      symbol: "PALC",
      name: "Palm Côte d'Ivoire",
      price: 6750,
      change: -125,
      changePercent: -1.82,
      volume: 12300,
      sector: "Agriculture",
      marketCap: "₣78.9B",
    },
    {
      symbol: "BICC",
      name: "Bourse Ivoirienne du Cacao",
      price: 2850,
      change: 85,
      changePercent: 3.07,
      volume: 9800,
      sector: "Agriculture",
      marketCap: "₣34.5B",
    },
    {
      symbol: "TTLC",
      name: "Total Côte d'Ivoire",
      price: 1950,
      change: -45,
      changePercent: -2.26,
      volume: 18500,
      sector: "Energy",
      marketCap: "₣67.8B",
    },
    {
      symbol: "SIVC",
      name: "Air Liquide Côte d'Ivoire",
      price: 5200,
      change: 180,
      changePercent: 3.58,
      volume: 7200,
      sector: "Industrial",
      marketCap: "₣23.4B",
    },
  ]

  const displayStocks = stocks.length > 0 ? stocks : mockStocks

  // Filter and sort stocks
  const filteredStocks = displayStocks
    .filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((stock) => sectorFilter === "all" || stock.sector === sectorFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "changePercent":
          return b.changePercent - a.changePercent
        case "volume":
          return b.volume - a.volume
        case "price":
          return b.price - a.price
        default:
          return 0
      }
    })

  const sectors = [...new Set(displayStocks.map((stock) => stock.sector))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Loading SinaibrainStock Dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Initializing AI-powered market intelligence</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SinaibrainStock
                </h1>
                <p className="text-sm text-gray-500">AI-Powered Trading Intelligence</p>
              </div>
              {userProfile?.is_premium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{userProfile?.full_name}</p>
                  <p className="text-xs text-gray-500">{userProfile?.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="indices">Indices</TabsTrigger>
            <TabsTrigger value="scoring">AI Scoring</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="chat">RAG AI</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Market Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Volume</CardTitle>
                  <BarChart3 className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">64,170</div>
                  <p className="text-xs opacity-90">+12% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Market Cap</CardTitle>
                  <DollarSign className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₣2.4T</div>
                  <p className="text-xs opacity-90">+5.2% this week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">AI Score</CardTitle>
                  <Brain className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">76</div>
                  <p className="text-xs opacity-90">Market Intelligence</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Top Performer</CardTitle>
                  <Target className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">+3.58%</div>
                  <p className="text-xs opacity-90">SIVC</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Stock List with Filters */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div>
                    <CardTitle className="text-xl">Live Stock Intelligence</CardTitle>
                    <CardDescription>Real-time prices with AI-powered insights and scoring</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Select value={sectorFilter} onValueChange={setSectorFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sectors</SelectItem>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="changePercent">% Change</SelectItem>
                        <SelectItem value="volume">Volume</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md"
                      onClick={() => setSelectedStock(stock.symbol)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-blue-600 text-sm">{stock.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold text-lg">{stock.symbol}</p>
                              <Badge variant="outline" className="text-xs">
                                {stock.sector}
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                <Brain className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{stock.name}</p>
                            <p className="text-xs text-gray-500">{stock.marketCap}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">₣{stock.price.toLocaleString()}</p>
                        <div className="flex items-center justify-end space-x-1">
                          {stock.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change} ({stock.changePercent}%)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Vol: {stock.volume.toLocaleString()}</p>
                      </div>
                      <div className="ml-4 flex flex-col space-y-1">
                        <Button variant="ghost" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <StockAnalysis symbol={selectedStock} isPremium={userProfile?.is_premium || false} />
          </TabsContent>

          <TabsContent value="charts">
            <StockChart symbol={selectedStock} isPremium={userProfile?.is_premium || false} />
          </TabsContent>

          <TabsContent value="indices">
            <MarketIndices />
          </TabsContent>

          <TabsContent value="scoring">
            <ScoringSystem />
          </TabsContent>

          <TabsContent value="portfolio">
            <Portfolio userId={userProfile?.id || ""} isPremium={userProfile?.is_premium || false} />
          </TabsContent>

          <TabsContent value="chat">
            <RAGChatbot isPremium={userProfile?.is_premium || false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
