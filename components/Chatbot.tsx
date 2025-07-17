"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Lock } from "lucide-react"

interface ChatbotProps {
  isPremium: boolean
}

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function Chatbot({ isPremium }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your BRVM trading assistant. I can help you with stock analysis, market trends, and investment strategies. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

    // Simulate AI response (in production, this would call OpenAI API)
    setTimeout(() => {
      const botResponse = generateBotResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("boab") || input.includes("bank of africa")) {
      return "Bank of Africa Benin (BOAB) is currently trading at ₣4,250, up 3.03% today. The stock has shown strong performance this quarter with good fundamentals. Would you like me to analyze its technical indicators?"
    }

    if (input.includes("price") || input.includes("stock")) {
      return "I can provide real-time stock prices for all BRVM listed companies. Which specific stock are you interested in? Popular ones include BOAB, SGBC, ETIT, and ONTBF."
    }

    if (input.includes("market") || input.includes("trend")) {
      return "The BRVM market is showing positive momentum today with increased trading volume. Banking stocks are leading the gains while telecom stocks are mixed. The overall market sentiment is bullish."
    }

    if (input.includes("invest") || input.includes("buy")) {
      return "For investment advice, I recommend diversifying across sectors. Consider the banking sector (BOAB, SGBC), telecommunications (ONTBF), and agriculture (PALC). Always do your own research and consider your risk tolerance."
    }

    return "I understand you're asking about the BRVM market. I can help with stock prices, market analysis, investment strategies, and company fundamentals. Could you be more specific about what you'd like to know?"
  }

  if (!isPremium) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            AI Trading Assistant
            <Badge variant="secondary">
              <Lock className="h-3 w-3 mr-1" />
              Premium Feature
            </Badge>
          </CardTitle>
          <CardDescription>Get AI-powered insights and trading recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto" />
            <h3 className="text-lg font-semibold">AI Assistant Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Chat with our AI assistant for personalized stock analysis, market insights, and investment
              recommendations.
            </p>
            <div className="space-y-2 max-w-sm mx-auto mt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Bot className="h-4 w-4" />
                <span>Real-time market analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Bot className="h-4 w-4" />
                <span>Investment recommendations</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Bot className="h-4 w-4" />
                <span>Risk assessment</span>
              </div>
            </div>
            <Button className="mt-6">Upgrade to Premium</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>AI Trading Assistant</span>
        </CardTitle>
        <CardDescription>Get personalized insights about BRVM stocks and market trends</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "bot" && (
                  <div className="flex-shrink-0">
                    <Bot className="h-8 w-8 p-1 bg-blue-100 text-blue-600 rounded-full" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</p>
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
                <Bot className="h-8 w-8 p-1 bg-blue-100 text-blue-600 rounded-full" />
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
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
            placeholder="Ask about stocks, market trends, or investment advice..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
