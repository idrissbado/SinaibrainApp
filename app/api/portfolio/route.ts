import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Portfolio API endpoint
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // In production, fetch real portfolio data from database
    // For now, return mock data
    const mockPortfolio = {
      summary: {
        totalValue: 2317000,
        totalGainLoss: 71250,
        totalGainLossPercent: 3.17,
        dayChange: 15750,
        dayChangePercent: 0.68,
        cashBalance: 125000,
        investedAmount: 2192000,
      },
      holdings: [
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
          weight: 18.4,
          lastUpdated: new Date().toISOString(),
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
          weight: 27.0,
          lastUpdated: new Date().toISOString(),
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
          weight: 21.9,
          lastUpdated: new Date().toISOString(),
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
          weight: 32.8,
          lastUpdated: new Date().toISOString(),
        },
      ],
      performance: [
        { date: "2024-06-01", value: 2000000 },
        { date: "2024-07-01", value: 2150000 },
        { date: "2024-08-01", value: 2080000 },
        { date: "2024-09-01", value: 2250000 },
        { date: "2024-10-01", value: 2180000 },
        { date: "2024-11-01", value: 2317000 },
      ],
      allocation: {
        sectors: [
          { sector: "Banking", value: 1050000, percentage: 45.4 },
          { sector: "Telecommunications", value: 760000, percentage: 32.8 },
          { sector: "Agriculture", value: 506250, percentage: 21.9 },
        ],
        riskProfile: {
          conservative: 25,
          moderate: 60,
          aggressive: 15,
        },
      },
      analytics: {
        sharpeRatio: 1.24,
        beta: 1.15,
        volatility: 18.5,
        maxDrawdown: -8.2,
        winRate: 67.5,
        avgHoldingPeriod: 145,
      },
    }

    return NextResponse.json({
      success: true,
      data: mockPortfolio,
      userId: user.id,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in portfolio API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { action, symbol, quantity, price } = await request.json()

    // In production, this would:
    // 1. Validate the transaction
    // 2. Check available funds
    // 3. Execute the trade
    // 4. Update portfolio in database
    // 5. Send notifications

    const mockTransaction = {
      id: `txn_${Date.now()}`,
      userId: user.id,
      action, // 'BUY' or 'SELL'
      symbol,
      quantity,
      price,
      value: quantity * price,
      fees: quantity * price * 0.001, // 0.1% fee
      timestamp: new Date().toISOString(),
      status: "COMPLETED",
    }

    return NextResponse.json({
      success: true,
      data: mockTransaction,
      message: `${action} order for ${quantity} shares of ${symbol} executed successfully`,
    })
  } catch (error) {
    console.error("Error in portfolio transaction:", error)
    return NextResponse.json({ success: false, error: "Failed to execute transaction" }, { status: 500 })
  }
}
