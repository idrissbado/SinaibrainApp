import { NextResponse } from "next/server"

// Mock BRVM data - in production, this would scrape or call BRVM API
const mockStockData = [
  {
    symbol: "BOAB",
    name: "Bank of Africa Benin",
    price: 4250 + Math.random() * 200 - 100,
    change: Math.random() * 300 - 150,
    changePercent: Math.random() * 6 - 3,
    volume: Math.floor(Math.random() * 20000) + 5000,
    sector: "Banking",
    marketCap: "₣125.8B",
  },
  {
    symbol: "SGBC",
    name: "Société Générale Burkina",
    price: 8900 + Math.random() * 400 - 200,
    change: Math.random() * 400 - 200,
    changePercent: Math.random() * 5 - 2.5,
    volume: Math.floor(Math.random() * 15000) + 3000,
    sector: "Banking",
    marketCap: "₣89.2B",
  },
  {
    symbol: "ETIT",
    name: "Ecobank Transnational",
    price: 12500 + Math.random() * 500 - 250,
    change: Math.random() * 500 - 250,
    changePercent: Math.random() * 4 - 2,
    volume: Math.floor(Math.random() * 25000) + 8000,
    sector: "Banking",
    marketCap: "₣156.7B",
  },
  {
    symbol: "ONTBF",
    name: "ONATEL Burkina Faso",
    price: 3800 + Math.random() * 150 - 75,
    change: Math.random() * 200 - 100,
    changePercent: Math.random() * 3 - 1.5,
    volume: Math.floor(Math.random() * 10000) + 2000,
    sector: "Telecommunications",
    marketCap: "₣45.3B",
  },
  {
    symbol: "PALC",
    name: "Palm Côte d'Ivoire",
    price: 6750 + Math.random() * 300 - 150,
    change: Math.random() * 250 - 125,
    changePercent: Math.random() * 4 - 2,
    volume: Math.floor(Math.random() * 18000) + 4000,
    sector: "Agriculture",
    marketCap: "₣78.9B",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In production, you would:
    // 1. Scrape BRVM website or call their API
    // 2. Parse the data
    // 3. Store in database
    // 4. Return formatted data

    const stocks = mockStockData.map((stock) => ({
      ...stock,
      price: Math.round(stock.price),
      change: Math.round(stock.change * 100) / 100,
      changePercent: Math.round(stock.changePercent * 100) / 100,
      lastUpdated: new Date().toISOString(),
    }))

    return NextResponse.json({
      success: true,
      stocks,
      marketSummary: {
        totalVolume: stocks.reduce((sum, stock) => sum + stock.volume, 0),
        advancers: stocks.filter((stock) => stock.change > 0).length,
        decliners: stocks.filter((stock) => stock.change < 0).length,
        unchanged: stocks.filter((stock) => stock.change === 0).length,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error fetching BRVM data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stock data" }, { status: 500 })
  }
}
