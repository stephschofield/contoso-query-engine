"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Settings, Play, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface QueryConfig {
  name: string
  description: string
  metrics: string[]
  agents: string[]
  dateRange: {
    start: string
    end: string
  }
  filters: {
    sentiment_window: string
    compliance_threshold: string
  }
}

export default function QueryBuilder() {
  const router = useRouter()
  const [config, setConfig] = useState<QueryConfig>({
    name: "",
    description: "",
    metrics: [],
    agents: [],
    dateRange: {
      start: "",
      end: "",
    },
    filters: {
      sentiment_window: "15",
      compliance_threshold: "80",
    },
  })

  const availableMetrics = [
    { id: "mutual_silence", label: "Mutual Silence (%)", description: "Periods with no speech detected" },
    { id: "sentiment_beginning", label: "Opening Sentiment", description: "Customer sentiment in first 30 seconds" },
    { id: "sentiment_ending", label: "Closing Sentiment", description: "Customer sentiment in last 30 seconds" },
    { id: "crosstalk", label: "Cross-talk (%)", description: "Overlapping speech detection" },
    { id: "branded_greeting", label: "Branded Greeting", description: "Required introduction compliance" },
    { id: "mobile_pitch", label: "Mobile Pitch", description: "Mobile service mention tracking" },
    { id: "truth_in_billing", label: "Truth in Billing", description: "Price accuracy compliance" },
  ]

  const availableAgents = [
    { id: "agent_001", name: "Sarah Johnson" },
    { id: "agent_002", name: "Mike Chen" },
    { id: "agent_003", name: "Lisa Rodriguez" },
    { id: "agent_004", name: "David Kim" },
    { id: "agent_005", name: "Emma Wilson" },
  ]

  const handleMetricChange = (metricId: string, checked: boolean) => {
    setConfig((prev) => ({
      ...prev,
      metrics: checked ? [...prev.metrics, metricId] : prev.metrics.filter((m) => m !== metricId),
    }))
  }

  const handleAgentChange = (agentId: string, checked: boolean) => {
    setConfig((prev) => ({
      ...prev,
      agents: checked ? [...prev.agents, agentId] : prev.agents.filter((a) => a !== agentId),
    }))
  }

  const handleRunQuery = async () => {
    // Simulate API call
    console.log("Running query with config:", config)

    // Navigate to results page with query config
    const queryParams = new URLSearchParams({
      config: JSON.stringify(config),
    })
    router.push(`/reports/results?${queryParams.toString()}`)
  }

  const handleSaveQuery = () => {
    // Save query logic
    console.log("Saving query:", config)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Query Builder</h1>
                <p className="text-sm text-gray-600">Build custom behavioral analytics reports</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveQuery}>
                <Save className="h-4 w-4 mr-2" />
                Save Query
              </Button>
              <Button onClick={handleRunQuery} disabled={config.metrics.length === 0}>
                <Play className="h-4 w-4 mr-2" />
                Run Query
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Query Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Query Details
                </CardTitle>
                <CardDescription>Name and describe your query for future reference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="query-name">Query Name</Label>
                  <Input
                    id="query-name"
                    placeholder="e.g., Weekly Agent Performance Review"
                    value={config.name}
                    onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="query-description">Description (Optional)</Label>
                  <Textarea
                    id="query-description"
                    placeholder="Describe what this query is used for..."
                    value={config.description}
                    onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Metrics Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Behavioral Metrics</CardTitle>
                <CardDescription>Choose which agent behaviors to analyze</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableMetrics.map((metric) => (
                    <div key={metric.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={metric.id}
                        checked={config.metrics.includes(metric.id)}
                        onCheckedChange={(checked) => handleMetricChange(metric.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={metric.id} className="font-medium cursor-pointer">
                          {metric.label}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Range */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Time Range
                </CardTitle>
                <CardDescription>Select the date range for your analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={config.dateRange.start}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, start: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={config.dateRange.end}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, end: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Agent Selection
                </CardTitle>
                <CardDescription>Choose specific agents or leave empty for all agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center space-x-3 p-2 border rounded hover:bg-gray-50">
                      <Checkbox
                        id={agent.id}
                        checked={config.agents.includes(agent.id)}
                        onCheckedChange={(checked) => handleAgentChange(agent.id, checked as boolean)}
                      />
                      <Label htmlFor={agent.id} className="cursor-pointer">
                        {agent.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Query Summary & Advanced Options */}
          <div className="space-y-6">
            {/* Query Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Query Summary</CardTitle>
                <CardDescription>Review your query configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Selected Metrics</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {config.metrics.length > 0 ? (
                      config.metrics.map((metric) => (
                        <Badge key={metric} variant="secondary">
                          {availableMetrics.find((m) => m.id === metric)?.label}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No metrics selected</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Selected Agents</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {config.agents.length > 0 ? (
                      config.agents.map((agentId) => (
                        <Badge key={agentId} variant="outline">
                          {availableAgents.find((a) => a.id === agentId)?.name}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">All agents</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Date Range</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {config.dateRange.start && config.dateRange.end
                      ? `${config.dateRange.start} to ${config.dateRange.end}`
                      : "Not specified"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
                <CardDescription>Fine-tune your analysis parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sentiment-window">Sentiment Analysis Window (seconds)</Label>
                  <Select
                    value={config.filters.sentiment_window}
                    onValueChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, sentiment_window: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="compliance-threshold">Compliance Threshold (%)</Label>
                  <Select
                    value={config.filters.compliance_threshold}
                    onValueChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        filters: { ...prev.filters, compliance_threshold: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="95">95%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Bottom Action Buttons */}
        <div className="flex justify-end gap-2 pt-6 border-t">
          <Button variant="outline" onClick={handleSaveQuery}>
            <Save className="h-4 w-4 mr-2" />
            Save Query
          </Button>
          <Button onClick={handleRunQuery} disabled={config.metrics.length === 0}>
            <Play className="h-4 w-4 mr-2" />
            Run Query
          </Button>
        </div>
      </main>
    </div>
  )
}
