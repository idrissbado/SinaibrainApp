"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Lock } from "lucide-react"

interface StockChartProps {
  symbol: string
  isPremium: boolean
}

interface ChartData {
  time: string
  price: number
  volume: number
}

export default function StockChart({ symbol, isPremium }: StockChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [timeframe, setTimeframe] = useState("1D")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChartData()
  }, [symbol, timeframe])

  const fetchChartData = async () => {
    setLoading(true)
    try {
      // In a real app, this would fetch from your API
      // For MVP, we'll generate mock data
      const mockData = generateMockChartData(timeframe)
      setChartData(mockData)
    } catch (error) {
      console.error("Error fetching chart data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockChartData = (period: string): ChartData[] => {
    const basePrice = 4250
    const dataPoints = period === "1D" ? 24 : period === "1W" ? 7 : 30
    const data: ChartData[] = []

    for (let i = 0; i < dataPoints; i++) {
      const variation = (Math.random() - 0.5) * 200
      const price = basePrice + variation + i * 10
      const volume = Math.floor(Math.random() * 1000) + 500

      data.push({
        time: period === "1D" ? `${i}:00` : `Day ${i + 1}`,
        price: Math.max(price, 3000),
        volume,
      })
    }

    return data
  }

  const premiumFeatures = ["Advanced Indicators", "Volume Analysis", "Historical Data", "Export Data"]

  if (!isPremium) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Stock Chart - {symbol}
            <Badge variant="secondary">
              <Lock className="h-3 w-3 mr-1" />
              Premium Feature
            </Badge>
          </CardTitle>
          <CardDescription>Upgrade to Premium to access advanced charting features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <Lock className="h-16 w-16 text-gray-400 mx-auto" />
            <h3 className="text-lg font-semibold">Premium Charts Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Get access to advanced technical analysis, real-time data, and professional trading tools.
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mt-6">
              {premiumFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button className="mt-6">Upgrade to Premium</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Stock Chart - {symbol}</CardTitle>
            <CardDescription>Real-time price movements and volume</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1D">1D</SelectItem>
                <SelectItem value="1W">1W</SelectItem>
                <SelectItem value="1M">1M</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
              <p>Loading chart data...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Price Chart */}
            <div>
              <h4 className="text-sm font-medium mb-2">Price Movement</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`₣${value.toLocaleString()}`, "Price"]} />
                  <Area type="monotone" dataKey="price" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Volume Chart */}
            <div>
              <h4 className="text-sm font-medium mb-2">Volume</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [value.toLocaleString(), "Volume"]} />
                  <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
