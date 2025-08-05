"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Users, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

interface SavedReport {
  id: string
  name: string
  created_date: string
  metrics: string[]
  agent_count: number
  last_run: string
}

export default function Dashboard() {
  const [savedReports, setSavedReports] = useState<SavedReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockReports: SavedReport[] = [
      {
        id: "1",
        name: "Weekly Agent Performance",
        created_date: "2024-01-15",
        metrics: ["mutual_silence", "sentiment_beginning", "crosstalk"],
        agent_count: 25,
        last_run: "2024-01-20",
      },
      {
        id: "2",
        name: "Compliance Check - Truth in Billing",
        created_date: "2024-01-10",
        metrics: ["truth_in_billing", "branded_greeting"],
        agent_count: 15,
        last_run: "2024-01-19",
      },
      {
        id: "3",
        name: "Sentiment Analysis - Customer Satisfaction",
        created_date: "2024-01-08",
        metrics: ["sentiment_beginning", "sentiment_ending"],
        agent_count: 30,
        last_run: "2024-01-18",
      },
    ]

    setTimeout(() => {
      setSavedReports(mockReports)
      setLoading(false)
    }, 1000)
  }, [])

  const quickStats = [
    { label: "Active Agents", value: "127", icon: Users, color: "text-blue-600" },
    { label: "Reports This Week", value: "23", icon: FileText, color: "text-green-600" },
    { label: "Avg Response Time", value: "2.3s", icon: Clock, color: "text-orange-600" },
    { label: "Compliance Rate", value: "94%", icon: TrendingUp, color: "text-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Call Center Analytics Studio</h1>
              <p className="text-sm text-gray-600">Query Builder and Execution Platform</p>
            </div>
            <Link href="/query-builder">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Build New Report
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/query-builder" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Build New Report
                  </Button>
                </Link>
                <Link href="/agents" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Agent Directory
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Export All Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Saved Reports */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Saved Reports</CardTitle>
                <CardDescription>Your previously created reports and templates</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedReports.map((report) => (
                      <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{report.name}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              <span>Created: {new Date(report.created_date).toLocaleDateString()}</span>
                              <span>Last run: {new Date(report.last_run).toLocaleDateString()}</span>
                              <span>{report.agent_count} agents</span>
                            </div>
                            <div className="flex gap-2 mt-2">
                              {report.metrics.map((metric) => (
                                <Badge key={metric} variant="secondary" className="text-xs">
                                  {metric.replace(/_/g, " ")}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/reports/${report.id}`}>
                              <Button variant="outline" size="sm">
                                View Results
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              Run Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
