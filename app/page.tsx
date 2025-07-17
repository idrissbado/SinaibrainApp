import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Globe,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Smartphone,
  Brain,
  Database,
  Target,
  LineChart,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SinaibrainStock
              </h1>
              <p className="text-xs text-gray-500">AI-Powered Trading Intelligence</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#mobile" className="text-gray-600 hover:text-blue-600 transition-colors">
              Mobile App
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="#founder" className="text-gray-600 hover:text-blue-600 transition-colors">
              Founder
            </Link>
            <Link href="/login">
              <Button variant="outline" className="hover:bg-blue-50 bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl"></div>
        <div className="relative z-10">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Star className="h-3 w-3 mr-1" />
            AI-Powered West African Trading Platform
          </Badge>
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SinaibrainStock
            </span>
            <br />
            <span className="text-4xl md:text-5xl">Intelligence Platform</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI-powered trading platform combining RAG technology, real-time market intelligence, and
            Bloomberg-style analytics for West African financial markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button
                size="lg"
                className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
              >
                Start Trading with AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-4 text-lg border-2 hover:bg-blue-50 bg-transparent"
              >
                View Live Dashboard
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-Time RAG AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Mobile App Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800">Platform Features</Badge>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional Trading Intelligence</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade tools powered by AI and machine learning for comprehensive market analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">RAG AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Advanced Retrieval Augmented Generation AI that analyzes market data, news, and reports for intelligent
                insights.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Smart Scoring</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Proprietary scoring algorithms that rate stocks, sectors, and market conditions with AI-driven
                precision.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <LineChart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Market Indices</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Custom indices and benchmarks for West African markets with real-time tracking and analysis.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <Database className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Data Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed">
                Seamless integration with company databases, APIs, and external data sources for comprehensive analysis.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Mobile Experience</Badge>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Trade Anywhere, Anytime</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Full-featured mobile app with offline capabilities, push notifications, and seamless synchronization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Native Mobile Apps</h4>
                  <p className="text-gray-300">
                    iOS and Android apps with native performance and platform-specific features.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Real-Time Notifications</h4>
                  <p className="text-gray-300">Instant alerts for price movements, news, and AI-generated insights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Biometric Security</h4>
                  <p className="text-gray-300">Face ID, Touch ID, and advanced security features for safe trading.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Offline Mode</h4>
                  <p className="text-gray-300">
                    Access your portfolio and cached data even without internet connection.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-64 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-4 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-b from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="h-16 w-16 mx-auto mb-4 text-white" />
                      <h4 className="text-lg font-bold text-white mb-2">SinaibrainStock</h4>
                      <p className="text-sm text-blue-100">Mobile Trading App</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="mt-8 space-y-4">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Download for iOS
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Download for Android
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Meet the Visionary</Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Built by Innovation</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SinaibrainStock is the creation of a visionary entrepreneur dedicated to revolutionizing West African
              financial markets through AI.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-600 p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                      IB
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Idriss BADO</h4>
                    <p className="text-blue-100 mb-4">Founder & CEO</p>
                    <Badge className="bg-white/20 text-white">AI Visionary</Badge>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-xl font-semibold text-gray-900 mb-3">Vision & Mission</h5>
                      <p className="text-gray-600 leading-relaxed">
                        "My vision is to democratize access to sophisticated financial intelligence through AI.
                        SinaibrainStock represents the convergence of artificial intelligence, market expertise, and
                        African innovation - creating the most advanced trading platform for our region."
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xl font-semibold text-gray-900 mb-3">Innovation Focus</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Brain className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">AI & Machine Learning</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">Financial Technology</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">African Markets</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Database className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-600">Data Intelligence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready for AI-Powered Trading?</h3>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Join the future of West African financial markets with SinaibrainStock's revolutionary AI platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button
                size="lg"
                variant="secondary"
                className="px-10 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-4 text-lg border-2 border-white text-white hover:bg-white/10 bg-transparent"
              >
                View Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">SinaibrainStock</h4>
                  <p className="text-gray-400 text-sm">AI-Powered Trading Intelligence</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionary AI-powered platform for West African financial markets, combining advanced analytics with
                intelligent automation.
              </p>
              <p className="text-sm text-gray-500">
                Founded by Idriss BADO • © 2024 SinaibrainStock. All rights reserved.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    AI Features
                  </Link>
                </li>
                <li>
                  <Link href="#mobile" className="hover:text-white transition-colors">
                    Mobile App
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Access
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#founder" className="hover:text-white transition-colors">
                    Founder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
