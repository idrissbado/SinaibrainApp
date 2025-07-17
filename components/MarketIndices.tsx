"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, BarChart3, Activity } from "lucide-react"

interface MarketIndex {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  constituents: number
  description: string
}

interface SectorIndex {
  sector: string
  value: number
  change: number
  changePercent: number
  weight: number
  topStock: string
}

interface IndexPerformance {
  period: string
  value: number
  change: number
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function MarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([])
  const [sectorIndices, setSectorIndices] = useState<SectorIndex[]>([])
  const [performance, setPerformance] = useState<IndexPerformance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIndicesData()
  }, [])

  const fetchIndicesData = async () => {
    try {
      // Mock comprehensive indices data
      const mockIndices: MarketIndex[] = [
        {
          name: "SinaibrainStock Composite",
          symbol: "SBSC",
          value: 1584.25,
          change: 18.75,
          changePercent: 1.2,
          volume: 2450000,
          marketCap: "₣2.4T",
          constituents: 45,
          description: "Comprehensive index of all listed BRVM stocks",
        },
        {
          name: "BRVM Banking Index",
          symbol: "BRVMBANK",
          value: 892.45,
          change: 21.3,
          changePercent: 2.45,
          volume: 1200000,
          marketCap: "₣890B",
          constituents: 12,
          description: "Index tracking major banking institutions",
        },
        {
          name: "West Africa Growth Index",
          symbol: "WAGI",
          value: 2156.8,
          change: -12.45,
          changePercent: -0.57,
          volume: 850000,
          marketCap: "₣1.2T",
          constituents: 25,
          description: "High-growth companies across West Africa",
        },
        {
          name: "WAEMU ESG Index",
          symbol: "WAEMUESG",
          value: 1245.6,
          change: 8.9,
          changePercent: 0.72,
          volume: 450000,
          marketCap: "₣650B",
          constituents: 18,
          description: "Environmental, Social, and Governance focused index",
        },
      ]

      const mockSectorIndices: SectorIndex[] = [
        {
          sector: "Banking & Finance",
          value: 892.45,
          change: 21.3,
          changePercent: 2.45,
          weight: 35.2,
          topStock: "BOAB",
        },
        {
          sector: "Telecommunications",
          value: 456.78,
          change: 5.6,
          changePercent: 1.24,
          weight: 18.5,
          topStock: "ONTBF",
        },
        {
          sector: "Agriculture",
          value: 678.9,
          change: -8.45,
          changePercent: -1.23,
          weight: 22.8,
          topStock: "PALC",
        },
        {
          sector: "Energy",
          value: 234.56,
          change: -3.2,
          changePercent: -1.35,
          weight: 12.1,
          topStock: "TTLC",
        },
        {
          sector: "Industrial",
          value: 345.67,
          change: 4.8,
          changePercent: 1.41,
          weight: 11.4,
          topStock: "SIVC",
        },
      ]

      const mockPerformance: IndexPerformance[] = [
        { period: "1D", value: 1584.25, change: 1.2 },
        { period: "1W", value: 1568.4, change: 2.8 },
        { period: "1M", value: 1542.8, change: 4.5 },
        { period: "3M", value: 1498.6, change: 8.2 },
        { period: "6M", value: 1456.3, change: 12.8 },
        { period: "1Y", value: 1398.9, change: 18.5 },
      ]

      setIndices(mockIndices)
      setSectorIndices(mockSectorIndices)
      setPerformance(mockPerformance)
    } catch (error) {
      console.error("Error fetching indices data:", error)
    } finally {
      setLoading(false)
    }
  }

  const chartData = [
    { time: "09:00", value: 1565.2 },
    { time: "10:00", value: 1568.45 },
    { time: "11:00", value: 1572.8 },
    { time: "12:00", value: 1570.15 },
    { time: "13:00", value: 1575.6 },
    { time: "14:00", value: 1578.9 },
    { time: "15:00", value: 1582.3 },
    { time: "16:00", value: 1584.25 },
  ]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Indices</CardTitle>
          <CardDescription>Loading market indices...</CardDescription>
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
      {/* Main Indices Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((index, i) => (
          <Card key={index.symbol} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{index.symbol}</CardTitle>
                  <CardDescription className="text-xs">{index.name}</CardDescription>
                </div>
                <Badge variant={index.change >= 0 ? "default" : "destructive"} className="text-xs">
                  {index.constituents} stocks
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{index.value.toFixed(2)}</div>
                <div className="flex items-center space-x-2">
                  {index.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${index.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {index.change >= 0 ? "+" : ""}
                    {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Vol: {(index.volume / 1000000).toFixed(1)}M • Cap: {index.marketCap}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="chart" className="space-y-6">
        <TabsList>
          <TabsTrigger value="chart">Index Chart</TabsTrigger>
          <TabsTrigger value="sectors">Sector Performance</TabsTrigger>
          <TabsTrigger value="performance">Historical Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>SinaibrainStock Composite Index</span>
              </CardTitle>
              <CardDescription>Real-time intraday performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip formatter={(value: number) => [value.toFixed(2), "Index Value"]} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Today's sector movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorIndices.map((sector, index) => (
                    <div key={sector.sector} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="font-medium text-sm">{sector.sector}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{sector.value.toFixed(2)}</div>
                          <div
                            className={`text-xs flex items-center ${sector.change >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {sector.change >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {sector.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <Progress value={Math.abs(sector.changePercent) * 10} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Weight: {sector.weight}%</span>
                        <span>Leader: {sector.topStock}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Composition</CardTitle>
                <CardDescription>Index weight distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sectorIndices}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ sector, weight }) => `${sector.split(" ")[0]} ${weight.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="weight"
                    >
                      {sectorIndices.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Weight"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Historical Performance</span>
              </CardTitle>
              <CardDescription>Index performance across different time periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {performance.map((perf) => (
                  <Card key={perf.period}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-sm font-medium text-gray-600 mb-2">{perf.period}</div>
                      <div className="text-2xl font-bold mb-1">{perf.value.toFixed(2)}</div>
                      <div className={`text-sm ${perf.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {perf.change >= 0 ? "+" : ""}
                        {perf.change.toFixed(1)}%
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
