import { NextResponse } from "next/server"

// Market Indices API endpoint
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "all"

  try {
    // In production, this would calculate real indices from constituent stocks

    if (type === "main") {
      const mainIndices = [
        {
          name: "SinaibrainStock Composite",
          symbol: "SBSC",
          value: 1584.25 + (Math.random() - 0.5) * 20,
          change: 18.75 + (Math.random() - 0.5) * 10,
          changePercent: 1.2 + (Math.random() - 0.5) * 0.5,
          volume: 2450000 + Math.floor(Math.random() * 500000),
          marketCap: "₣2.4T",
          constituents: 45,
          description: "Comprehensive index of all listed BRVM stocks",
          methodology: "Market cap weighted with quarterly rebalancing",
          baseDate: "2020-01-01",
          baseValue: 1000,
        },
        {
          name: "BRVM Banking Index",
          symbol: "BRVMBANK",
          value: 892.45 + (Math.random() - 0.5) * 15,
          change: 21.3 + (Math.random() - 0.5) * 8,
          changePercent: 2.45 + (Math.random() - 0.5) * 0.8,
          volume: 1200000 + Math.floor(Math.random() * 300000),
          marketCap: "₣890B",
          constituents: 12,
          description: "Index tracking major banking institutions",
          methodology: "Equal weighted banking sector index",
          baseDate: "2021-01-01",
          baseValue: 500,
        },
      ]

      return NextResponse.json({
        success: true,
        data: mainIndices,
        lastUpdated: new Date().toISOString(),
      })
    }

    if (type === "sectors") {
      const sectorIndices = [
        {
          sector: "Banking & Finance",
          value: 892.45 + (Math.random() - 0.5) * 15,
          change: 21.3 + (Math.random() - 0.5) * 8,
          changePercent: 2.45 + (Math.random() - 0.5) * 0.8,
          weight: 35.2,
          topStock: "BOAB",
          constituents: ["BOAB", "SGBC", "ETIT", "BIDC"],
          marketCap: "₣890B",
        },
        {
          sector: "Telecommunications",
          value: 456.78 + (Math.random() - 0.5) * 10,
          change: 5.6 + (Math.random() - 0.5) * 3,
          changePercent: 1.24 + (Math.random() - 0.5) * 0.5,
          weight: 18.5,
          topStock: "ONTBF",
          constituents: ["ONTBF", "SNTS"],
          marketCap: "₣445B",
        },
        {
          sector: "Agriculture",
          value: 678.9 + (Math.random() - 0.5) * 12,
          change: -8.45 + (Math.random() - 0.5) * 4,
          changePercent: -1.23 + (Math.random() - 0.5) * 0.6,
          weight: 22.8,
          topStock: "PALC",
          constituents: ["PALC", "BICC", "SOGC"],
          marketCap: "₣548B",
        },
        {
          sector: "Energy",
          value: 234.56 + (Math.random() - 0.5) * 8,
          change: -3.2 + (Math.random() - 0.5) * 2,
          changePercent: -1.35 + (Math.random() - 0.5) * 0.4,
          weight: 12.1,
          topStock: "TTLC",
          constituents: ["TTLC", "PETR"],
          marketCap: "₣290B",
        },
        {
          sector: "Industrial",
          value: 345.67 + (Math.random() - 0.5) * 9,
          change: 4.8 + (Math.random() - 0.5) * 2.5,
          changePercent: 1.41 + (Math.random() - 0.5) * 0.3,
          weight: 11.4,
          topStock: "SIVC",
          constituents: ["SIVC", "CFAC", "NEIC"],
          marketCap: "₣274B",
        },
      ]

      return NextResponse.json({
        success: true,
        data: sectorIndices,
        lastUpdated: new Date().toISOString(),
      })
    }

    // Default: return all indices data
    const allData = {
      mainIndices: [
        {
          name: "SinaibrainStock Composite",
          symbol: "SBSC",
          value: 1584.25,
          change: 18.75,
          changePercent: 1.2,
          volume: 2450000,
          constituents: 45,
        },
      ],
      sectorIndices: [
        {
          sector: "Banking & Finance",
          value: 892.45,
          change: 21.3,
          changePercent: 2.45,
          weight: 35.2,
        },
      ],
      performance: {
        "1D": { value: 1584.25, change: 1.2 },
        "1W": { value: 1568.4, change: 2.8 },
        "1M": { value: 1542.8, change: 4.5 },
        "3M": { value: 1498.6, change: 8.2 },
        "6M": { value: 1456.3, change: 12.8 },
        "1Y": { value: 1398.9, change: 18.5 },
      },
    }

    return NextResponse.json({
      success: true,
      data: allData,
      source: "SinaibrainStock Index Engine",
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in indices API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch indices data" }, { status: 500 })
  }
}
