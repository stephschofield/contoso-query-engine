"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AgentDetails {
  id: string
  name: string
  department: string
  hire_date: string
  total_calls: number
  avg_call_duration: number
  compliance_score: number
}

interface CallHistory {
  date: string
  mutual_silence: number
  sentiment_beginning: number
  sentiment_ending: number
  crosstalk: number
  compliance_score: number
}

interface CoachingRecommendation {
  category: string
  priority: "high" | "medium" | "low"
  recommendation: string
  impact: string
}

export default function AgentDrillDown({ params }: { params: { id: string } }) {
  const [agent, setAgent] = useState<AgentDetails | null>(null)
  const [callHistory, setCallHistory] = useState<CallHistory[]>([])
  const [recommendations, setRecommendations] = useState<CoachingRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockAgent: AgentDetails = {
      id: params.id,
      name: "Sarah Johnson",
      department: "Customer Service",
      hire_date: "2023-03-15",
      total_calls: 1247,
      avg_call_duration: 8.5,
      compliance_score: 87,
    }

    const mockCallHistory: CallHistory[] = [
      {
        date: "2024-01-15",
        mutual_silence: 12.5,
        sentiment_beginning: 0.7,
        sentiment_ending: 0.8,
        crosstalk: 8.2,
        compliance_score: 85,
      },
      {
        date: "2024-01-16",
        mutual_silence: 15.2,
        sentiment_beginning: 0.6,
        sentiment_ending: 0.7,
        crosstalk: 12.1,
        compliance_score: 82,
      },
      {
        date: "2024-01-17",
        mutual_silence: 9.8,
        sentiment_beginning: 0.8,
        sentiment_ending: 0.9,
        crosstalk: 6.5,
        compliance_score: 92,
      },
      {
        date: "2024-01-18",
        mutual_silence: 18.7,
        sentiment_beginning: 0.4,
        sentiment_ending: 0.6,
        crosstalk: 15.3,
        compliance_score: 78,
      },
      {
        date: "2024-01-19",
        mutual_silence: 11.2,
        sentiment_beginning: 0.7,
        sentiment_ending: 0.8,
        crosstalk: 7.8,
        compliance_score: 88,
      },
      {
        date: "2024-01-20",
        mutual_silence: 8.5,
        sentiment_beginning: 0.9,
        sentiment_ending: 0.9,
        crosstalk: 4.2,
        compliance_score: 95,
      },
    ]

    const mockRecommendations: CoachingRecommendation[] = [
      {
        category: "Mutual Silence",
        priority: "high",
        recommendation: "Focus on active listening techniques and reduce dead air by asking follow-up questions",
        impact: "Could improve customer satisfaction by 15-20%",
      },
      {
        category: "Cross-talk",
        priority: "medium",
        recommendation: "Practice patience and allow customers to finish speaking before responding",
        impact: "Will reduce customer frustration and improve call flow",
      },
      {
        category: "Opening Sentiment",
        priority: "low",
        recommendation: "Use more positive language and energy in call openings",
        impact: "Sets better tone for entire conversation",
      },
    ]

    setTimeout(() => {
      setAgent(mockAgent)
      setCallHistory(mockCallHistory)
      setRecommendations(mockRecommendations)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agent details...</p>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Agent not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/reports/results">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Results
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                <p className="text-sm text-gray-600">
                  {agent.department} • Agent ID: {agent.id}
                </p>
              </div>
            </div>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Schedule Coaching
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Calls</p>
                  <p className="text-2xl font-bold text-gray-900">{agent.total_calls.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Call Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{agent.avg_call_duration}min</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                  <p className="text-2xl font-bold text-gray-900">{agent.compliance_score}%</p>
                </div>
                {agent.compliance_score >= 90 ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tenure</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.floor((Date.now() - new Date(agent.hire_date).getTime()) / (1000 * 60 * 60 * 24 * 30))}mo
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
            <TabsTrigger value="recommendations">Coaching Recommendations</TabsTrigger>
            <TabsTrigger value="compliance">Compliance History</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mutual Silence Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Mutual Silence Trend</CardTitle>
                  <CardDescription>Percentage of call time with no speech</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      mutual_silence: {
                        label: "Mutual Silence %",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={callHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="mutual_silence"
                          stroke="var(--color-mutual_silence)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-mutual_silence)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Cross-talk Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Cross-talk Trend</CardTitle>
                  <CardDescription>Percentage of overlapping speech</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      crosstalk: {
                        label: "Cross-talk %",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={callHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="crosstalk"
                          stroke="var(--color-crosstalk)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-crosstalk)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className={`border-l-4 ${getPriorityColor(rec.priority)}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{rec.category}</CardTitle>
                      <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{rec.recommendation}</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Expected Impact:</strong> {rec.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Score Trend</CardTitle>
                <CardDescription>Overall compliance performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    compliance_score: {
                      label: "Compliance Score",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={callHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="compliance_score"
                        stroke="var(--color-compliance_score)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-compliance_score)", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
