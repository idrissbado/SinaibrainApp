"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react"

interface StockAnalysisProps {
  symbol: string
  isPremium: boolean
}

interface TechnicalIndicator {
  name: string
  value: number
  signal: "BUY" | "SELL" | "HOLD"
  strength: number
  description: string
}

interface FundamentalData {
  pe_ratio: number
  pb_ratio: number
  roe: number
  debt_to_equity: number
  dividend_yield: number
  market_cap: string
  revenue_growth: number
  profit_margin: number
}

export default function StockAnalysis({ symbol, isPremium }: StockAnalysisProps) {
  const [technicalIndicators, setTechnicalIndicators] = useState<TechnicalIndicator[]>([])
  const [fundamentalData, setFundamentalData] = useState<FundamentalData | null>(null)
  const [priceTarget, setPriceTarget] = useState<number>(0)
  const [riskScore, setRiskScore] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalysisData()
  }, [symbol])

  const fetchAnalysisData = async () => {
    setLoading(true)
    try {
      // Mock comprehensive analysis data
      const mockTechnicalIndicators: TechnicalIndicator[] = [
        {
          name: "RSI (14)",
          value: 65.4,
          signal: "HOLD",
          strength: 70,
          description: "Relative Strength Index indicates moderate momentum",
        },
        {
          name: "MACD",
          value: 12.5,
          signal: "BUY",
          strength: 85,
          description: "MACD line above signal line, bullish momentum",
        },
        {
          name: "Moving Average (50)",
          value: 4180,
          signal: "BUY",
          strength: 75,
          description: "Price above 50-day moving average",
        },
        {
          name: "Bollinger Bands",
          value: 0.8,
          signal: "HOLD",
          strength: 60,
          description: "Price in middle of Bollinger Bands",
        },
        {
          name: "Stochastic",
          value: 72.3,
          signal: "SELL",
          strength: 65,
          description: "Stochastic in overbought territory",
        },
        {
          name: "Williams %R",
          value: -28.5,
          signal: "BUY",
          strength: 80,
          description: "Williams %R indicates oversold conditions",
        },
      ]

      const mockFundamental: FundamentalData = {
        pe_ratio: 12.5,
        pb_ratio: 1.8,
        roe: 15.2,
        debt_to_equity: 0.45,
        dividend_yield: 4.2,
        market_cap: "₣125.8B",
        revenue_growth: 8.5,
        profit_margin: 12.3,
      }

      setTechnicalIndicators(mockTechnicalIndicators)
      setFundamentalData(mockFundamental)
      setPriceTarget(4850)
      setRiskScore(35) // Low to moderate risk
    } catch (error) {
      console.error("Error fetching analysis data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "text-green-600 bg-green-100"
      case "SELL":
        return "text-red-600 bg-red-100"
      case "HOLD":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "BUY":
        return <TrendingUp className="h-4 w-4" />
      case "SELL":
        return <TrendingDown className="h-4 w-4" />
      case "HOLD":
        return <Activity className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "Low", color: "text-green-600 bg-green-100" }
    if (score < 60) return { level: "Moderate", color: "text-yellow-600 bg-yellow-100" }
    return { level: "High", color: "text-red-600 bg-red-100" }
  }

  const overallSignal = () => {
    const buySignals = technicalIndicators.filter((i) => i.signal === "BUY").length
    const sellSignals = technicalIndicators.filter((i) => i.signal === "SELL").length
    const holdSignals = technicalIndicators.filter((i) => i.signal === "HOLD").length

    if (buySignals > sellSignals && buySignals > holdSignals) return "BUY"
    if (sellSignals > buySignals && sellSignals > holdSignals) return "SELL"
    return "HOLD"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stock Analysis - {symbol}</CardTitle>
          <CardDescription>Loading comprehensive analysis...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Stock Analysis - {symbol}</CardTitle>
              <CardDescription>Comprehensive technical and fundamental analysis</CardDescription>
            </div>
            <div className="text-right">
              <Badge className={`${getSignalColor(overallSignal())} px-3 py-1`}>
                {getSignalIcon(overallSignal())}
                <span className="ml-1 font-semibold">{overallSignal()}</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="technical" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="targets">Price Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-6">
          {/* Technical Indicators Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Buy Signals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {technicalIndicators.filter((i) => i.signal === "BUY").length}
                </div>
                <p className="text-sm text-gray-600">out of {technicalIndicators.length} indicators</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
                  Sell Signals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {technicalIndicators.filter((i) => i.signal === "SELL").length}
                </div>
                <p className="text-sm text-gray-600">out of {technicalIndicators.length} indicators</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-yellow-600" />
                  Hold Signals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {technicalIndicators.filter((i) => i.signal === "HOLD").length}
                </div>
                <p className="text-sm text-gray-600">out of {technicalIndicators.length} indicators</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Technical Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Indicators</CardTitle>
              <CardDescription>Detailed analysis of key technical indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {technicalIndicators.map((indicator, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold">{indicator.name}</h4>
                        <Badge className={`${getSignalColor(indicator.signal)} px-2 py-1 text-xs`}>
                          {getSignalIcon(indicator.signal)}
                          <span className="ml-1">{indicator.signal}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{indicator.value}</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Signal Strength</span>
                        <span>{indicator.strength}%</span>
                      </div>
                      <Progress value={indicator.strength} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-600">{indicator.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fundamental" className="space-y-6">
          {fundamentalData && (
            <>
              {/* Valuation Metrics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">P/E Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{fundamentalData.pe_ratio}</div>
                    <p className="text-sm text-gray-600">Price to Earnings</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">P/B Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{fundamentalData.pb_ratio}</div>
                    <p className="text-sm text-gray-600">Price to Book</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">ROE</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{fundamentalData.roe}%</div>
                    <p className="text-sm text-gray-600">Return on Equity</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Dividend Yield</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{fundamentalData.dividend_yield}%</div>
                    <p className="text-sm text-gray-600">Annual Dividend</p>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Health</CardTitle>
                  <CardDescription>Key financial metrics and ratios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Market Cap</span>
                        <span className="font-semibold">{fundamentalData.market_cap}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Revenue Growth</span>
                        <span className="font-semibold text-green-600">+{fundamentalData.revenue_growth}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Profit Margin</span>
                        <span className="font-semibold">{fundamentalData.profit_margin}%</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Debt to Equity</span>
                        <span className="font-semibold">{fundamentalData.debt_to_equity}</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Financial Strength</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Potential</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                  Risk Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{riskScore}/100</div>
                <Badge className={`${getRiskLevel(riskScore).color} mt-2`}>{getRiskLevel(riskScore).level} Risk</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Volatility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18.5%</div>
                <p className="text-sm text-gray-600">30-day volatility</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Beta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1.2</div>
                <p className="text-sm text-gray-600">vs BRVM Index</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
              <CardDescription>Comprehensive risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Market Risk</span>
                    <span>Medium (40%)</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Liquidity Risk</span>
                    <span>Low (25%)</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Credit Risk</span>
                    <span>Low (20%)</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Operational Risk</span>
                    <span>Medium (35%)</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-600">Target Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₣{priceTarget.toLocaleString()}</div>
                <p className="text-sm text-green-600">+14.1% upside potential</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-600">Stop Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₣3,950</div>
                <p className="text-sm text-red-600">-7.1% downside protection</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-600">Support Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₣4,100</div>
                <p className="text-sm text-blue-600">Key support zone</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Price Targets & Recommendations</CardTitle>
              <CardDescription>Analyst consensus and price projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Price Levels</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Resistance 1</span>
                        <span className="font-semibold">₣4,400</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Resistance 2</span>
                        <span className="font-semibold">₣4,650</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Current Price</span>
                        <span className="font-semibold text-blue-600">₣4,250</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Support 1</span>
                        <span className="font-semibold">₣4,100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Support 2</span>
                        <span className="font-semibold">₣3,950</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Recommendations</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Strong fundamentals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Positive technical momentum</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Monitor market volatility</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm">Sector headwinds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
