"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Filter, Search, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface CallRecord {
  id: string
  agent_name: string
  agent_id: string
  call_start: string
  call_end: string
  mutual_silence: number
  sentiment_beginning: number
  sentiment_ending: number
  crosstalk: number
  branded_greeting: boolean
  mobile_pitch: boolean
  truth_in_billing: boolean
  duration: number
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<CallRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof CallRecord>("call_start")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    // Mock data generation based on query config
    const mockResults: CallRecord[] = [
      {
        id: "call_001",
        agent_name: "Sarah Johnson",
        agent_id: "agent_001",
        call_start: "2024-01-20T09:15:00Z",
        call_end: "2024-01-20T09:28:00Z",
        mutual_silence: 12.5,
        sentiment_beginning: 0.7,
        sentiment_ending: 0.8,
        crosstalk: 8.2,
        branded_greeting: true,
        mobile_pitch: false,
        truth_in_billing: true,
        duration: 780,
      },
      {
        id: "call_002",
        agent_name: "Mike Chen",
        agent_id: "agent_002",
        call_start: "2024-01-20T10:30:00Z",
        call_end: "2024-01-20T10:45:00Z",
        mutual_silence: 18.7,
        sentiment_beginning: 0.4,
        sentiment_ending: 0.6,
        crosstalk: 15.3,
        branded_greeting: false,
        mobile_pitch: true,
        truth_in_billing: true,
        duration: 900,
      },
      {
        id: "call_003",
        agent_name: "Lisa Rodriguez",
        agent_id: "agent_003",
        call_start: "2024-01-20T11:20:00Z",
        call_end: "2024-01-20T11:35:00Z",
        mutual_silence: 6.8,
        sentiment_beginning: 0.9,
        sentiment_ending: 0.9,
        crosstalk: 3.1,
        branded_greeting: true,
        mobile_pitch: true,
        truth_in_billing: true,
        duration: 900,
      },
    ]

    setTimeout(() => {
      setResults(mockResults)
      setLoading(false)
    }, 1500)
  }, [])

  const filteredResults = results.filter(
    (record) =>
      record.agent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.agent_id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedResults = [...filteredResults].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal
    }

    return 0
  })

  const handleSort = (field: keyof CallRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleExport = () => {
    // Export logic
    console.log("Exporting results...")
  }

  const formatSentiment = (value: number) => {
    if (value >= 0.7) return { label: "Positive", color: "text-green-600" }
    if (value >= 0.4) return { label: "Neutral", color: "text-yellow-600" }
    return { label: "Negative", color: "text-red-600" }
  }

  const getComplianceIcon = (compliant: boolean) => {
    return compliant ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Running your query...</p>
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
              <Link href="/query-builder">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Query Builder
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Query Results</h1>
                <p className="text-sm text-gray-600">{results.length} records found</p>
              </div>
            </div>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by agent name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Call Analysis Results</CardTitle>
            <CardDescription>Click on agent names to view detailed behavioral history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("agent_name")}>
                      Agent Name
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("call_start")}>
                      Call Time
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("duration")}>
                      Duration
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("mutual_silence")}>
                      Mutual Silence
                    </TableHead>
                    <TableHead>Opening Sentiment</TableHead>
                    <TableHead>Closing Sentiment</TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("crosstalk")}>
                      Cross-talk
                    </TableHead>
                    <TableHead>Compliance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedResults.map((record) => {
                    const openingSentiment = formatSentiment(record.sentiment_beginning)
                    const closingSentiment = formatSentiment(record.sentiment_ending)

                    return (
                      <TableRow key={record.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Link
                            href={`/agents/${record.agent_id}`}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {record.agent_name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(record.call_start).toLocaleDateString()}</div>
                            <div className="text-gray-500">{new Date(record.call_start).toLocaleTimeString()}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {Math.floor(record.duration / 60)}:{(record.duration % 60).toString().padStart(2, "0")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{record.mutual_silence.toFixed(1)}%</span>
                            {record.mutual_silence > 15 && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={openingSentiment.color}>
                            {openingSentiment.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={closingSentiment.color}>
                            {closingSentiment.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{record.crosstalk.toFixed(1)}%</span>
                            {record.crosstalk > 10 && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1" title="Branded Greeting">
                              {getComplianceIcon(record.branded_greeting)}
                            </div>
                            <div className="flex items-center gap-1" title="Mobile Pitch">
                              {getComplianceIcon(record.mobile_pitch)}
                            </div>
                            <div className="flex items-center gap-1" title="Truth in Billing">
                              {getComplianceIcon(record.truth_in_billing)}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
