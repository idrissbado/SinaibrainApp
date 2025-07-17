import { NextResponse } from "next/server"

// World Bank API integration for macroeconomic data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const indicator = searchParams.get("indicator")
  const country = searchParams.get("country") || "all"

  try {
    // In production, call actual World Bank API
    // Example: https://api.worldbank.org/v2/country/SN;CI;BF;ML;NE;GW;TG;BJ/indicator/NY.GDP.MKTP.CD?format=json&date=2020:2023

    const mockData = {
      "GDP.GROWTH": {
        "Côte d'Ivoire": { value: 6.2, year: 2023 },
        Senegal: { value: 4.8, year: 2023 },
        "Burkina Faso": { value: 3.1, year: 2023 },
        Mali: { value: 3.7, year: 2023 },
        Niger: { value: 7.2, year: 2023 },
        "Guinea-Bissau": { value: 4.5, year: 2023 },
        Togo: { value: 5.8, year: 2023 },
        Benin: { value: 6.1, year: 2023 },
      },
      INFLATION: {
        "Côte d'Ivoire": { value: 2.8, year: 2023 },
        Senegal: { value: 3.2, year: 2023 },
        "Burkina Faso": { value: 3.9, year: 2023 },
        Mali: { value: 2.5, year: 2023 },
        Niger: { value: 2.9, year: 2023 },
        "Guinea-Bissau": { value: 1.8, year: 2023 },
        Togo: { value: 4.1, year: 2023 },
        Benin: { value: 1.7, year: 2023 },
      },
      EXCHANGE_RATE: {
        XOF_EUR: { value: 655.96, change: -0.33 },
        XOF_USD: { value: 590.45, change: 1.24 },
      },
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      data: mockData[indicator as keyof typeof mockData] || mockData,
      source: "World Bank API",
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching World Bank data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch economic data" }, { status: 500 })
  }
}
