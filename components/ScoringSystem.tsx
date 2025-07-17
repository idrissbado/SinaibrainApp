"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, TrendingUp, Shield, Zap, Star, Award, BarChart3, Brain } from "lucide-react"

interface StockScore {
  symbol: string
  name: string
  overallScore: number
  technicalScore: number
  fundamentalScore: number
  sentimentScore: number
  riskScore: number
  aiScore: number
  recommendation: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL"
  priceTarget: number
  confidence: number
}

interface SectorScore {
  sector: string
  score: number
  trend: "UP" | "DOWN" | "NEUTRAL"
  momentum: number
  outlook: string
}

interface MarketScore {
  overall: number
  volatility: number
  liquidity: number
  sentiment: number
  trend: "BULLISH" | "BEARISH" | "NEUTRAL"
}

export default function ScoringSystem() {
  const [stockScores, setStockScores] = useState<StockScore[]>([])
  const [sectorScores, setSectorScores] = useState<SectorScore[]>([])
  const [marketScore, setMarketScore] = useState<MarketScore | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScoringData()
  }, [])

  const fetchScoringData = async () => {
    try {
      // Mock comprehensive scoring data
      const mockStockScores: StockScore[] = [
        {
          symbol: "BOAB",
          name: "Bank of Africa Benin",
          overallScore: 85,
          technicalScore: 78,
          fundamentalScore: 92,
          sentimentScore: 88,
          riskScore: 25,
          aiScore: 87,
          recommendation: "BUY",
          priceTarget: 4850,
          confidence: 89,
        },
        {
          symbol: "ETIT",
          name: "Ecobank Transnational",
          overallScore: 82,
          technicalScore: 85,
          fundamentalScore: 79,
          sentimentScore: 84,
          riskScore: 30,
          aiScore: 83,
          recommendation: "BUY",
          priceTarget: 13200,
          confidence: 85,
        },
        {
          symbol: "SGBC",
          name: "Société Générale Burkina",
          overallScore: 75,
          technicalScore: 72,
          fundamentalScore: 78,
          sentimentScore: 76,
          riskScore: 35,
          aiScore: 74,
          recommendation: "HOLD",
          priceTarget: 9200,
          confidence: 78,
        },
        {
          symbol: "PALC",
          name: "Palm Côte d'Ivoire",
          overallScore: 68,
          technicalScore: 65,
          fundamentalScore: 71,
          sentimentScore: 62,
          riskScore: 45,
          aiScore: 69,
          recommendation: "HOLD",
          priceTarget: 7100,
          confidence: 72,
        },
        {
          symbol: "ONTBF",
          name: "ONATEL Burkina Faso",
          overallScore: 79,
          technicalScore: 82,
          fundamentalScore: 76,
          sentimentScore: 81,
          riskScore: 28,
          aiScore: 80,
          recommendation: "BUY",
          priceTarget: 4200,
          confidence: 83,
        },
      ]

      const mockSectorScores: SectorScore[] = [
        {
          sector: "Banking & Finance",
          score: 82,
          trend: "UP",
          momentum: 78,
          outlook: "Strong fundamentals and regulatory support",
        },
        {
          sector: "Telecommunications",
          score: 75,
          trend: "UP",
          momentum: 65,
          outlook: "Digital transformation driving growth",
        },
        {
          sector: "Agriculture",
          score: 68,
          trend: "NEUTRAL",
          momentum: 45,
          outlook: "Seasonal factors and climate concerns",
        },
        {
          sector: "Energy",
          score: 62,
          trend: "DOWN",
          momentum: 35,
          outlook: "Transition challenges and price volatility",
        },
        {
          sector: "Industrial",
          score: 71,
          trend: "UP",
          momentum: 58,
          outlook: "Infrastructure development opportunities",
        },
      ]

      const mockMarketScore: MarketScore = {
        overall: 76,
        volatility: 32,
        liquidity: 68,
        sentiment: 78,
        trend: "BULLISH",
      }

      setStockScores(mockStockScores)
      setSectorScores(mockSectorScores)
      setMarketScore(mockMarketScore)
    } catch (error) {
      console.error("Error fetching scoring data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "STRONG_BUY":
      case "BUY":
        return "bg-green-100 text-green-800"
      case "HOLD":
        return "bg-yellow-100 text-yellow-800"
      case "SELL":
      case "STRONG_SELL":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Scoring System</CardTitle>
          <CardDescription>Loading intelligent scoring data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
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
      {/* Market Overview Score */}
      {marketScore && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>Market Intelligence Score</span>
            </CardTitle>
            <CardDescription>AI-powered market assessment and sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{marketScore.overall}</div>
                <div className="text-sm text-gray-600 mb-2">Overall Score</div>
                <Badge className={getScoreColor(marketScore.overall)}>{marketScore.trend}</Badge>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Market Sentiment</span>
                  <span>{marketScore.sentiment}%</span>
                </div>
                <Progress value={marketScore.sentiment} className="h-2 mb-3" />
                <div className="flex justify-between text-sm mb-1">
                  <span>Liquidity</span>
                  <span>{marketScore.liquidity}%</span>
                </div>
                <Progress value={marketScore.liquidity} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Volatility</span>
                  <span>{marketScore.volatility}%</span>
                </div>
                <Progress value={marketScore.volatility} className="h-2 mb-3" />
                <div className="text-xs text-gray-500">Lower is better for volatility</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">Market Grade</div>
                  <div className="text-lg font-bold">
                    {marketScore.overall >= 80 ? "A" : marketScore.overall >= 60 ? "B" : "C"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="stocks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stocks">Stock Scores</TabsTrigger>
          <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
          <TabsTrigger value="methodology">AI Methodology</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Stock Intelligence Scores</span>
              </CardTitle>
              <CardDescription>Comprehensive AI-driven stock analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockScores.map((stock) => (
                  <Card key={stock.symbol} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-4 gap-6">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-lg">{stock.symbol}</h4>
                            <Badge className={getRecommendationColor(stock.recommendation)}>
                              {stock.recommendation.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{stock.name}</p>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">Confidence: {stock.confidence}%</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-center mb-3">
                            <div className="text-3xl font-bold">{stock.overallScore}</div>
                            <div className="text-sm text-gray-600">Overall Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">₣{stock.priceTarget.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Price Target</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Technical</span>
                              <span>{stock.technicalScore}%</span>
                            </div>
                            <Progress value={stock.technicalScore} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Fundamental</span>
                              <span>{stock.fundamentalScore}%</span>
                            </div>
                            <Progress value={stock.fundamentalScore} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Sentiment</span>
                              <span>{stock.sentimentScore}%</span>
                            </div>
                            <Progress value={stock.sentimentScore} className="h-2" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>AI Score</span>
                              <span>{stock.aiScore}%</span>
                            </div>
                            <Progress value={stock.aiScore} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Risk Level</span>
                              <span>{stock.riskScore}%</span>
                            </div>
                            <Progress value={stock.riskScore} className="h-2" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Brain className="h-4 w-4 text-blue-600" />
                            <span className="text-xs text-gray-600">AI-Powered Analysis</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Sector Intelligence Analysis</span>
              </CardTitle>
              <CardDescription>AI-driven sector performance and outlook assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {sectorScores.map((sector) => (
                  <Card key={sector.sector}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-lg">{sector.sector}</h4>
                        <div className="flex items-center space-x-2">
                          {sector.trend === "UP" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : sector.trend === "DOWN" ? (
                            <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                          ) : (
                            <Shield className="h-4 w-4 text-yellow-600" />
                          )}
                          <Badge className={getScoreColor(sector.score)}>{sector.trend}</Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Sector Score</span>
                            <span>{sector.score}/100</span>
                          </div>
                          <Progress value={sector.score} className="h-3" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Momentum</span>
                            <span>{sector.momentum}%</span>
                          </div>
                          <Progress value={sector.momentum} className="h-2" />
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h5 className="text-sm font-medium mb-1">AI Outlook</h5>
                          <p className="text-sm text-gray-600">{sector.outlook}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methodology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Scoring Methodology</span>
              </CardTitle>
              <CardDescription>Understanding our intelligent scoring algorithms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span>Technical Analysis (25%)</span>
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Moving averages and trend analysis</li>
                      <li>• RSI, MACD, and momentum indicators</li>
                      <li>• Support and resistance levels</li>
                      <li>• Volume and price action patterns</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-green-600" />
                      <span>Fundamental Analysis (30%)</span>
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Financial ratios and metrics</li>
                      <li>• Revenue and profit growth</li>
                      <li>• Balance sheet strength</li>
                      <li>• Industry comparison</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <span>Market Sentiment (20%)</span>
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• News sentiment analysis</li>
                      <li>• Social media monitoring</li>
                      <li>• Analyst recommendations</li>
                      <li>• Market psychology indicators</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span>Risk Assessment (15%)</span>
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Volatility measurements</li>
                      <li>• Beta and correlation analysis</li>
                      <li>• Liquidity risk evaluation</li>
                      <li>• Sector and country risk</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-indigo-600" />
                      <span>AI Enhancement (10%)</span>
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Machine learning predictions</li>
                      <li>• Pattern recognition</li>
                      <li>• Alternative data analysis</li>
                      <li>• Ensemble model scoring</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">Scoring Scale</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>90-100:</span>
                        <span className="text-green-600 font-medium">Exceptional</span>
                      </div>
                      <div className="flex justify-between">
                        <span>80-89:</span>
                        <span className="text-green-600 font-medium">Strong</span>
                      </div>
                      <div className="flex justify-between">
                        <span>70-79:</span>
                        <span className="text-yellow-600 font-medium">Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span>60-69:</span>
                        <span className="text-yellow-600 font-medium">Fair</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Below 60:</span>
                        <span className="text-red-600 font-medium">Weak</span>
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
