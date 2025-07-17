"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  User,
  Lock,
  Brain,
  Search,
  FileText,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Database,
  Zap,
} from "lucide-react"

interface RAGChatbotProps {
  isPremium: boolean
}

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  sources?: string[]
  confidence?: number
  category?: "analysis" | "news" | "data" | "general"
}

interface KnowledgeSource {
  title: string
  type: "report" | "news" | "data" | "analysis"
  relevance: number
  date: string
}

export default function RAGChatbot({ isPremium }: RAGChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI-powered trading assistant with access to real-time market data, financial reports, and news. I use Retrieval Augmented Generation (RAG) to provide you with accurate, source-backed insights. How can I help you today?",
      timestamp: new Date(),
      confidence: 95,
      category: "general",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate RAG processing
    setTimeout(() => {
      const { response, sources, confidence, category } = generateRAGResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
        sources,
        confidence,
        category,
      }
      setMessages((prev) => [...prev, botMessage])
      setKnowledgeSources(generateKnowledgeSources(input))
      setIsLoading(false)
    }, 2000)
  }

  const generateRAGResponse = (userInput: string) => {
    const input = userInput.toLowerCase()

    if (input.includes("boab") || input.includes("bank of africa")) {
      return {
        response: `Based on my analysis of recent financial reports and market data, Bank of Africa Benin (BOAB) shows strong fundamentals:

**Current Analysis:**
- Stock Price: ₣4,250 (+3.03% today)
- P/E Ratio: 12.5 (below sector average of 15.2)
- ROE: 15.2% (above industry benchmark)
- Debt-to-Equity: 0.45 (healthy leverage)

**Key Insights from Recent Reports:**
- Q3 2024 earnings beat expectations by 8%
- Net interest margin improved to 4.2%
- Loan portfolio grew 12% YoY
- Strong capital adequacy ratio at 14.8%

**AI Recommendation:** BUY with 85% confidence
**Price Target:** ₣4,850 (14% upside potential)

*Sources: BRVM Financial Reports, Central Bank Data, Market Analysis*`,
        sources: ["BRVM Q3 2024 Report", "BCEAO Banking Sector Analysis", "Market Data Feed"],
        confidence: 85,
        category: "analysis" as const,
      }
    }

    if (input.includes("market") || input.includes("brvm") || input.includes("index")) {
      return {
        response: `**BRVM Market Overview (Real-time Analysis):**

**Market Performance:**
- BRVM Composite Index: 158.42 (+1.2% today)
- Total Market Cap: ₣2.4T
- Trading Volume: 64,170 shares
- Active Stocks: 45 listed companies

**Sector Performance:**
- Banking: +2.1% (Leading sector)
- Telecommunications: +0.8%
- Agriculture: -0.5%
- Energy: -1.2%

**AI Market Sentiment:** BULLISH (78% confidence)
- Positive momentum indicators
- Increased institutional activity
- Strong macroeconomic fundamentals

**Key Drivers:**
- Regional economic growth at 4.2%
- Stable CFA franc
- Increased foreign investment

*Sources: BRVM Real-time Data, Economic Indicators, News Analysis*`,
        sources: ["BRVM Market Data", "WAEMU Economic Report", "Reuters Africa"],
        confidence: 78,
        category: "data" as const,
      }
    }

    if (input.includes("news") || input.includes("latest")) {
      return {
        response: `**Latest Market News & Analysis:**

**Breaking News (Last 24 hours):**
1. **BRVM announces new digital trading platform** - Expected to increase liquidity by 25%
2. **Ecobank reports strong Q4 results** - Net profit up 18% YoY
3. **West African economic growth revised upward** - IMF raises forecast to 4.5%

**AI News Sentiment Analysis:**
- Overall Market Sentiment: POSITIVE (82%)
- Banking Sector: VERY POSITIVE (89%)
- Technology Adoption: BULLISH trend

**Impact Assessment:**
- Short-term: Positive momentum likely to continue
- Medium-term: Digital transformation driving growth
- Long-term: Regional integration benefits

*Sources: Financial Times Africa, Bloomberg, Local News Aggregation*`,
        sources: ["Financial Times", "Bloomberg Africa", "BRVM Press Releases"],
        confidence: 82,
        category: "news" as const,
      }
    }

    return {
      response: `I understand you're asking about the West African financial markets. My RAG system has access to:

**Real-time Data Sources:**
- Live BRVM market data
- Financial statements and reports
- Economic indicators
- News and market sentiment

**Analysis Capabilities:**
- Technical analysis with 15+ indicators
- Fundamental analysis and valuation
- Risk assessment and scoring
- Market sentiment analysis

**What I can help with:**
- Stock analysis and recommendations
- Market trends and insights
- Portfolio optimization
- Risk management strategies
- Economic impact analysis

Could you be more specific about what you'd like to analyze? I can provide detailed insights backed by multiple data sources.`,
      sources: ["Market Data APIs", "Financial Reports Database", "News Aggregation"],
      confidence: 90,
      category: "general" as const,
    }
  }

  const generateKnowledgeSources = (query: string): KnowledgeSource[] => {
    return [
      {
        title: "BRVM Q3 2024 Financial Report",
        type: "report",
        relevance: 95,
        date: "2024-10-15",
      },
      {
        title: "West African Banking Sector Analysis",
        type: "analysis",
        relevance: 88,
        date: "2024-11-01",
      },
      {
        title: "BCEAO Monetary Policy Update",
        type: "news",
        relevance: 82,
        date: "2024-11-10",
      },
      {
        title: "Real-time Market Data Feed",
        type: "data",
        relevance: 100,
        date: "2024-11-15",
      },
    ]
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "analysis":
        return <BarChart3 className="h-4 w-4 text-blue-600" />
      case "news":
        return <FileText className="h-4 w-4 text-green-600" />
      case "data":
        return <Database className="h-4 w-4 text-purple-600" />
      default:
        return <Lightbulb className="h-4 w-4 text-orange-600" />
    }
  }

  if (!isPremium) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>RAG AI Assistant</span>
            </div>
            <Badge variant="secondary">
              <Lock className="h-3 w-3 mr-1" />
              Premium Feature
            </Badge>
          </CardTitle>
          <CardDescription>Advanced AI with Retrieval Augmented Generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <Brain className="h-16 w-16 text-gray-400 mx-auto" />
            <h3 className="text-lg font-semibold">RAG AI Assistant Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Get AI-powered insights backed by real-time data, financial reports, and market analysis with source
              attribution.
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Search className="h-4 w-4" />
                <span>Knowledge Retrieval</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span>Source Attribution</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Zap className="h-4 w-4" />
                <span>Instant Insights</span>
              </div>
            </div>
            <Button className="mt-6">Upgrade to Premium</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="h-[700px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>RAG AI Assistant</span>
              <Badge className="bg-blue-100 text-blue-800">
                <Zap className="h-3 w-3 mr-1" />
                Powered by RAG
              </Badge>
            </CardTitle>
            <CardDescription>AI assistant with real-time knowledge retrieval and source attribution</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "bot" && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900 border"
                      }`}
                    >
                      {message.type === "bot" && (
                        <div className="flex items-center space-x-2 mb-2">
                          {getCategoryIcon(message.category)}
                          <span className="text-xs font-medium text-gray-600">
                            {message.category?.toUpperCase() || "GENERAL"}
                          </span>
                          {message.confidence && (
                            <Badge variant="outline" className="text-xs">
                              {message.confidence}% confidence
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                      {message.sources && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Sources:</p>
                          <div className="flex flex-wrap gap-1">
                            {message.sources.map((source, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-xs mt-2 opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                    {message.type === "user" && (
                      <div className="flex-shrink-0">
                        <User className="h-8 w-8 p-1 bg-gray-100 text-gray-600 rounded-full" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-lg border">
                      <div className="flex items-center space-x-2 mb-2">
                        <Search className="h-4 w-4 text-blue-600 animate-spin" />
                        <span className="text-xs font-medium text-gray-600">RETRIEVING KNOWLEDGE</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="flex space-x-2 mt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about stocks, markets, or get AI-powered analysis..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Sources Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Knowledge Sources</span>
            </CardTitle>
            <CardDescription>Real-time data sources and references</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {knowledgeSources.map((source, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {source.type.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500">{source.relevance}%</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{source.title}</h4>
                  <p className="text-xs text-gray-500">{source.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">RAG Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="sources">Sources</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Search className="h-4 w-4 text-blue-600" />
                  <span>Real-time knowledge retrieval</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span>Source attribution</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  <span>Confidence scoring</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Brain className="h-4 w-4 text-orange-600" />
                  <span>Context-aware responses</span>
                </div>
              </TabsContent>
              <TabsContent value="sources" className="space-y-2 text-sm">
                <div>• BRVM Market Data</div>
                <div>• Financial Reports</div>
                <div>• Economic Indicators</div>
                <div>• News & Analysis</div>
                <div>• Company Filings</div>
                <div>• Regulatory Updates</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
