"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Plus,
  Minus,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"

interface PortfolioProps {
  userId: string
  isPremium: boolean
}

interface Holding {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  value: number
  gainLoss: number
  gainLossPercent: number
  sector: string
}

interface PortfolioSummary {
  totalValue: number
  totalGainLoss: number
  totalGainLossPercent: number
  dayChange: number
  dayChangePercent: number
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

export default function Portfolio({ userId, isPremium }: PortfolioProps) {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [summary, setSummary] = useState<PortfolioSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolioData()
  }, [userId])

  const fetchPortfolioData = async () => {
    try {
      // Mock portfolio data - in production, fetch from database
      const mockHoldings: Holding[] = [
        {
          symbol: "BOAB",
          name: "Bank of Africa Benin",
          quantity: 100,
          avgPrice: 4000,
          currentPrice: 4250,
          value: 425000,
          gainLoss: 25000,
          gainLossPercent: 6.25,
          sector: "Banking",
        },
        {
          symbol: "ETIT",
          name: "Ecobank Transnational",
          quantity: 50,
          avgPrice: 12000,
          currentPrice: 12500,
          value: 625000,
          gainLoss: 25000,
          gainLossPercent: 4.17,
          sector: "Banking",
        },
        {
          symbol: "PALC",
          name: "Palm Côte d'Ivoire",
          quantity: 75,
          avgPrice: 7000,
          currentPrice: 6750,
          value: 506250,
          gainLoss: -18750,
          gainLossPercent: -3.57,
          sector: "Agriculture",
        },
        {
          symbol: "ONTBF",
          name: "ONATEL Burkina Faso",
          quantity: 200,
          avgPrice: 3600,
          currentPrice: 3800,
          value: 760000,
          gainLoss: 40000,
          gainLossPercent: 5.56,
          sector: "Telecommunications",
        },
      ]

      const totalValue = mockHoldings.reduce((sum, holding) => sum + holding.value, 0)
      const totalGainLoss = mockHoldings.reduce((sum, holding) => sum + holding.gainLoss, 0)
      const totalCost = mockHoldings.reduce((sum, holding) => sum + holding.avgPrice * holding.quantity, 0)

      const mockSummary: PortfolioSummary = {
        totalValue,
        totalGainLoss,
        totalGainLossPercent: (totalGainLoss / totalCost) * 100,
        dayChange: 15750,
        dayChangePercent: 0.68,
      }

      setHoldings(mockHoldings)
      setSummary(mockSummary)
    } catch (error) {
      console.error("Error fetching portfolio data:", error)
    } finally {
      setLoading(false)
    }
  }

  const sectorAllocation = holdings.reduce(
    (acc, holding) => {
      const existing = acc.find((item) => item.sector === holding.sector)
      if (existing) {
        existing.value += holding.value
      } else {
        acc.push({ sector: holding.sector, value: holding.value })
      }
      return acc
    },
    [] as { sector: string; value: number }[],
  )

  const performanceData = [
    { month: "Jan", value: 2000000 },
    { month: "Feb", value: 2150000 },
    { month: "Mar", value: 2080000 },
    { month: "Apr", value: 2250000 },
    { month: "May", value: 2180000 },
    { month: "Jun", value: 2317000 },
  ]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <CardDescription>Loading your portfolio...</CardDescription>
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

  if (!summary) return null

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₣{summary.totalValue.toLocaleString()}</div>
            <div className="flex items-center mt-2">
              {summary.dayChange >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm">
                {summary.dayChange >= 0 ? "+" : ""}₣{summary.dayChange.toLocaleString()} ({summary.dayChangePercent}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`${summary.totalGainLoss >= 0 ? "bg-gradient-to-br from-green-500 to-green-600" : "bg-gradient-to-br from-red-500 to-red-600"} text-white`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              {summary.totalGainLoss >= 0 ? (
                <TrendingUp className="h-5 w-5 mr-2" />
              ) : (
                <TrendingDown className="h-5 w-5 mr-2" />
              )}
              Total P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {summary.totalGainLoss >= 0 ? "+" : ""}₣{summary.totalGainLoss.toLocaleString()}
            </div>
            <div className="text-sm mt-2">
              {summary.totalGainLossPercent >= 0 ? "+" : ""}
              {summary.totalGainLossPercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{holdings.length}</div>
            <div className="text-sm mt-2">Active positions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Best Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+{Math.max(...holdings.map((h) => h.gainLossPercent)).toFixed(1)}%</div>
            <div className="text-sm mt-2">
              {holdings.find((h) => h.gainLossPercent === Math.max(...holdings.map((h) => h.gainLossPercent)))?.symbol}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Holdings</CardTitle>
                  <CardDescription>Current positions in your portfolio</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Position
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding) => (
                  <div key={holding.symbol} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-blue-600 text-sm">{holding.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{holding.symbol}</h4>
                          <p className="text-sm text-gray-600">{holding.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {holding.sector}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">₣{holding.value.toLocaleString()}</div>
                        <div
                          className={`text-sm flex items-center ${holding.gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {holding.gainLoss >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {holding.gainLoss >= 0 ? "+" : ""}₣{holding.gainLoss.toLocaleString()} (
                          {holding.gainLossPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Quantity</p>
                        <p className="font-semibold">{holding.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Price</p>
                        <p className="font-semibold">₣{holding.avgPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current Price</p>
                        <p className="font-semibold">₣{holding.currentPrice.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="h-5 w-5 mr-2" />
                  Sector Allocation
                </CardTitle>
                <CardDescription>Portfolio distribution by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sectorAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ sector, percent }) => `${sector} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sectorAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`₣${value.toLocaleString()}`, "Value"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Allocation Details</CardTitle>
                <CardDescription>Breakdown by sector and risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorAllocation.map((allocation, index) => (
                    <div key={allocation.sector}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="font-medium">{allocation.sector}</span>
                        </div>
                        <span className="font-semibold">₣{allocation.value.toLocaleString()}</span>
                      </div>
                      <Progress value={(allocation.value / summary.totalValue) * 100} className="h-2" />
                      <p className="text-xs text-gray-600 mt-1">
                        {((allocation.value / summary.totalValue) * 100).toFixed(1)}% of portfolio
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Portfolio Performance
              </CardTitle>
              <CardDescription>6-month portfolio value trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis formatter={(value) => `₣${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value: number) => [`₣${value.toLocaleString()}`, "Portfolio Value"]} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
