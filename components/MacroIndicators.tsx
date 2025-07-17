"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Globe, Lock, DollarSign, BarChart3 } from "lucide-react"

interface MacroIndicatorsProps {
  isPremium: boolean
}

interface EconomicIndicator {
  name: string
  value: string
  change: number
  changePercent: number
  description: string
}

interface CountryData {
  country: string
  gdp: string
  inflation: number
  unemployment: number
  currency: string
}

export default function MacroIndicators({ isPremium }: MacroIndicatorsProps) {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([])
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMacroData()
  }, [])

  const fetchMacroData = async () => {
    try {
      // In production, this would fetch from World Bank API
      const mockIndicators: EconomicIndicator[] = [
        {
          name: "West Africa GDP Growth",
          value: "4.2%",
          change: 0.3,
          changePercent: 7.69,
          description: "Annual GDP growth rate for West African Economic and Monetary Union",
        },
        {
          name: "CFA Franc Exchange Rate",
          value: "655.96",
          change: -2.15,
          changePercent: -0.33,
          description: "XOF to EUR exchange rate",
        },
        {
          name: "Regional Inflation",
          value: "3.1%",
          change: -0.2,
          changePercent: -6.06,
          description: "Consumer price inflation in WAEMU region",
        },
        {
          name: "Foreign Direct Investment",
          value: "$2.8B",
          change: 450,
          changePercent: 19.15,
          description: "FDI inflows to WAEMU countries",
        },
      ]

      const mockCountryData: CountryData[] = [
        { country: "Côte d'Ivoire", gdp: "$70.99B", inflation: 2.8, unemployment: 3.1, currency: "XOF" },
        { country: "Senegal", gdp: "$27.68B", inflation: 3.2, unemployment: 6.9, currency: "XOF" },
        { country: "Burkina Faso", gdp: "$18.73B", inflation: 3.9, unemployment: 5.1, currency: "XOF" },
        { country: "Mali", gdp: "$17.51B", inflation: 2.5, unemployment: 7.8, currency: "XOF" },
        { country: "Niger", gdp: "$14.91B", inflation: 2.9, unemployment: 4.2, currency: "XOF" },
        { country: "Guinea-Bissau", gdp: "$1.55B", inflation: 1.8, unemployment: 6.3, currency: "XOF" },
        { country: "Togo", gdp: "$8.13B", inflation: 4.1, unemployment: 3.9, currency: "XOF" },
        { country: "Benin", gdp: "$17.39B", inflation: 1.7, unemployment: 2.4, currency: "XOF" },
      ]

      setIndicators(mockIndicators)
      setCountryData(mockCountryData)
    } catch (error) {
      console.error("Error fetching macro data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isPremium) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Macroeconomic Indicators
            <Badge variant="secondary">
              <Lock className="h-3 w-3 mr-1" />
              Premium Feature
            </Badge>
          </CardTitle>
          <CardDescription>Access comprehensive economic data for informed investment decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <Globe className="h-16 w-16 text-gray-400 mx-auto" />
            <h3 className="text-lg font-semibold">Economic Data Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Get access to real-time macroeconomic indicators, country-specific data, and global market trends.
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <BarChart3 className="h-4 w-4" />
                <span>GDP Growth Rates</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span>Exchange Rates</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>Inflation Data</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <span>FDI Flows</span>
              </div>
            </div>
            <Button className="mt-6">Upgrade to Premium</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Macroeconomic Indicators</CardTitle>
          <CardDescription>Loading economic data...</CardDescription>
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
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Macroeconomic Indicators</span>
          </CardTitle>
          <CardDescription>Key economic indicators for the West African region</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="indicators" className="w-full">
            <TabsList>
              <TabsTrigger value="indicators">Key Indicators</TabsTrigger>
              <TabsTrigger value="countries">Country Data</TabsTrigger>
            </TabsList>

            <TabsContent value="indicators" className="space-y-4">
              <div className="grid gap-4">
                {indicators.map((indicator, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{indicator.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{indicator.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{indicator.value}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            {indicator.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span className={`text-sm ${indicator.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {indicator.change >= 0 ? "+" : ""}
                              {indicator.changePercent}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="countries" className="space-y-4">
              <div className="grid gap-4">
                {countryData.map((country, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-lg">{country.country}</h4>
                        <Badge variant="outline">{country.currency}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">GDP</p>
                          <p className="font-semibold">{country.gdp}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Inflation</p>
                          <p className="font-semibold">{country.inflation}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Unemployment</p>
                          <p className="font-semibold">{country.unemployment}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
