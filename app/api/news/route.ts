import { NextResponse } from "next/server"

// News and Market Updates API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "all"
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  try {
    // In production, this would integrate with:
    // - Reuters API
    // - Financial news providers
    // - Local news sources
    // - Social media sentiment

    const mockNews = [
      {
        id: "news_001",
        title: "BRVM Launches Advanced Digital Trading Platform",
        summary:
          "The new electronic trading system promises to increase market efficiency by 40% and reduce settlement times significantly.",
        content: `The Bourse Régionale des Valeurs Mobilières (BRVM) has officially launched its state-of-the-art digital trading platform, marking a significant milestone in West African capital markets development.

**Key Features:**
- Real-time order matching engine
- Advanced risk management systems
- Mobile trading capabilities
- Reduced settlement cycle (T+1)
- Enhanced market surveillance

**Impact Analysis:**
The new platform is expected to:
- Increase daily trading volumes by 25%
- Attract more retail investors
- Improve market liquidity
- Reduce transaction costs by 15%

**Market Response:**
Early trading sessions show positive response with increased participation from both institutional and retail investors. The BRVM Composite Index gained 1.2% on the launch day.

**CEO Statement:**
"This digital transformation positions BRVM as a leading exchange in Africa, providing world-class trading infrastructure for our growing market," said the BRVM CEO.`,
        category: "market",
        source: "BRVM Press Release",
        author: "Market News Team",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        sentiment: "positive",
        impact: "high",
        relatedStocks: ["BOAB", "SGBC", "ETIT"],
        tags: ["technology", "trading", "infrastructure"],
        imageUrl: "/api/placeholder/400/200",
      },
      {
        id: "news_002",
        title: "Ecobank Reports Record Q4 Earnings, Beats Expectations",
        summary:
          "Ecobank Transnational posts 18% YoY growth in net profit, driven by digital banking expansion and improved asset quality.",
        content: `Ecobank Transnational Incorporated (ETIT) has announced exceptional fourth-quarter results, significantly exceeding analyst expectations and demonstrating the strength of its pan-African banking strategy.

**Financial Highlights:**
- Net Profit: ₣12.4B (+18% YoY)
- Return on Equity: 16.8% (vs 14.2% previous year)
- Net Interest Margin: 4.5% (improved from 4.1%)
- Cost-to-Income Ratio: 52.3% (down from 55.8%)
- NPL Ratio: 2.8% (improved from 3.4%)

**Key Drivers:**
1. **Digital Banking Growth:** 45% increase in digital transactions
2. **Credit Expansion:** 15% growth in loan portfolio
3. **Fee Income:** 22% increase in non-interest income
4. **Operational Efficiency:** Successful cost optimization program

**Dividend Declaration:**
The board declared a dividend of ₣650 per share, representing a 5.2% yield at current market prices.

**Management Commentary:**
"Our strong performance reflects the successful execution of our digital transformation strategy and disciplined risk management," stated the Group CEO.

**Analyst Reactions:**
- Goldman Sachs: Upgraded to BUY with ₣14,000 target
- Standard Bank: Maintained OVERWEIGHT rating
- Ecobank Securities: Raised target to ₣13,500`,
        category: "earnings",
        source: "Company Filing",
        author: "Financial Reporter",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        sentiment: "very_positive",
        impact: "high",
        relatedStocks: ["ETIT"],
        tags: ["earnings", "banking", "digital transformation"],
        imageUrl: "/api/placeholder/400/200",
      },
      {
        id: "news_003",
        title: "West African Economic Growth Forecast Raised to 4.5%",
        summary:
          "IMF revises WAEMU region growth projections upward, citing strong domestic demand and improved business confidence.",
        content: `The International Monetary Fund (IMF) has revised its economic growth forecast for the West African Economic and Monetary Union (WAEMU) region upward to 4.5% for 2024, from the previous estimate of 4.2%.

**Key Economic Indicators:**
- GDP Growth: 4.5% (revised up from 4.2%)
- Inflation: Expected to moderate to 2.8%
- Current Account: Improving to -3.2% of GDP
- Fiscal Deficit: Narrowing to 4.1% of GDP
- Foreign Reserves: Stable at 4.2 months of imports

**Growth Drivers:**
1. **Infrastructure Investment:** Major projects across the region
2. **Agricultural Recovery:** Favorable weather conditions
3. **Digital Economy:** Rapid fintech and e-commerce growth
4. **Regional Integration:** Enhanced trade facilitation

**Sector Outlook:**
- **Banking:** Benefiting from economic expansion
- **Telecommunications:** 5G rollout driving growth
- **Agriculture:** Modernization initiatives showing results
- **Manufacturing:** Import substitution policies effective

**Currency Stability:**
The CFA franc remains stable against major currencies, supported by:
- Adequate foreign reserves
- Prudent monetary policy
- French Treasury guarantee

**Investment Implications:**
The improved outlook is expected to:
- Attract more foreign direct investment
- Boost equity market valuations
- Support currency stability
- Enhance sovereign credit ratings

**Regional Central Bank Statement:**
"The upward revision reflects the resilience of our economies and the effectiveness of coordinated policy responses," noted the BCEAO Governor.`,
        category: "economy",
        source: "IMF Report",
        author: "Economic Correspondent",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        sentiment: "positive",
        impact: "high",
        relatedStocks: ["BOAB", "SGBC", "ETIT", "ONTBF", "PALC"],
        tags: ["economy", "growth", "IMF", "WAEMU"],
        imageUrl: "/api/placeholder/400/200",
      },
      {
        id: "news_004",
        title: "Central Bank Maintains Key Interest Rate at 2.5%",
        summary:
          "BCEAO keeps monetary policy accommodative to support economic recovery while monitoring inflation pressures.",
        content: `The Central Bank of West African States (BCEAO) has decided to maintain its key policy rate at 2.5% during its latest monetary policy committee meeting, citing the need to balance growth support with price stability.

**Policy Decision Rationale:**
- Economic recovery remains fragile
- Inflation within target range (2.8% vs 3% target)
- Credit growth showing positive momentum
- External environment remains challenging

**Economic Assessment:**
The central bank noted:
- Gradual improvement in economic activity
- Stable banking sector conditions
- Adequate liquidity in the financial system
- Controlled inflationary pressures

**Forward Guidance:**
The BCEAO indicated it will:
- Continue monitoring economic developments
- Stand ready to adjust policy if needed
- Support financial sector stability
- Maintain exchange rate stability

**Market Impact:**
- Banking stocks expected to benefit from stable rates
- Bond yields likely to remain anchored
- Credit expansion to continue at current pace
- Currency stability reinforced

**Banking Sector Implications:**
- Net interest margins to remain stable
- Loan demand expected to increase gradually
- Asset quality improvements to continue
- Profitability outlook remains positive`,
        category: "monetary_policy",
        source: "BCEAO Press Release",
        author: "Central Bank Reporter",
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        sentiment: "neutral",
        impact: "medium",
        relatedStocks: ["BOAB", "SGBC", "ETIT"],
        tags: ["monetary policy", "interest rates", "central bank"],
        imageUrl: "/api/placeholder/400/200",
      },
      {
        id: "news_005",
        title: "Palm Oil Prices Surge on Supply Concerns",
        summary:
          "Global palm oil prices hit 6-month highs amid weather-related supply disruptions, benefiting West African producers.",
        content: `Palm oil prices have surged to six-month highs following supply disruptions in major producing regions, creating positive momentum for West African palm oil companies.

**Price Movement:**
- Crude Palm Oil: +12% to $890/MT
- Refined Palm Oil: +10% to $920/MT
- Palm Kernel Oil: +8% to $1,150/MT

**Supply Factors:**
1. **Weather Disruptions:** El Niño effects in Southeast Asia
2. **Production Cuts:** Reduced output in Malaysia and Indonesia
3. **Export Restrictions:** Some countries limiting exports
4. **Inventory Drawdown:** Global stocks at 3-year lows

**West African Impact:**
Regional producers are benefiting from:
- Higher selling prices
- Increased export opportunities
- Improved profit margins
- Enhanced investment attractiveness

**Company Implications:**
- **PALC:** Expected to see significant margin expansion
- **SOGC:** Increased revenue from palm operations
- **BICC:** Cocoa-palm diversification paying off

**Market Outlook:**
Analysts expect:
- Prices to remain elevated through Q1 2025
- Increased planting in West Africa
- Higher dividend payments from palm companies
- Potential M&A activity in the sector

**Sustainability Focus:**
Companies are emphasizing:
- Sustainable farming practices
- RSPO certification
- Environmental compliance
- Community development programs`,
        category: "commodities",
        source: "Commodity Research",
        author: "Commodities Analyst",
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        sentiment: "positive",
        impact: "medium",
        relatedStocks: ["PALC", "BICC"],
        tags: ["commodities", "palm oil", "agriculture"],
        imageUrl: "/api/placeholder/400/200",
      },
    ]

    // Filter by category if specified
    let filteredNews = mockNews
    if (category !== "all") {
      filteredNews = mockNews.filter((news) => news.category === category)
    }

    // Apply limit
    filteredNews = filteredNews.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: filteredNews,
      total: filteredNews.length,
      categories: ["market", "earnings", "economy", "monetary_policy", "commodities"],
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in news API:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch news data" }, { status: 500 })
  }
}
