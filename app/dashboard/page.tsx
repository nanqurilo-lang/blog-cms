
"use client"

import { useEffect, useState } from "react"
import {
  ThumbsUp,
  MessageCircle,
  HelpCircle,
  Pencil,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const BASE_URL = "https://393rb0pp-5001.inc1.devtunnels.ms"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [recentContent, setRecentContent] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  async function fetchDashboard() {
    try {
      setLoading(true)

      // ✅ CORRECT TOKEN KEY
      const token = localStorage.getItem("cms_token")

      if (!token) {
        console.error("❌ cms_token not found in localStorage")
        setLoading(false)
        return
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }

      const [
        statsRes,
        contentRes,
        activityRes,
        engagementRes,
      ] = await Promise.all([
        fetch(`${BASE_URL}/api/analytics/dashboard`, {
          headers,
          cache: "no-store",
        }),
        fetch(`${BASE_URL}/api/analytics/recent-content`, {
          headers,
          cache: "no-store",
        }),
        fetch(`${BASE_URL}/api/analytics/recent-activity`, {
          headers,
          cache: "no-store",
        }),
        fetch(`${BASE_URL}/api/analytics/engagement`, {
          headers,
          cache: "no-store",
        }),
      ])

      const statsJson = await statsRes.json()
      const contentJson = await contentRes.json()
      const activityJson = await activityRes.json()
      const engagementJson = await engagementRes.json()

      /* ---------------- NORMALIZE STATS ---------------- */
      setStats({
        totalPosts: statsJson?.data?.totalPosts ?? 0,
        totalViews: statsJson?.data?.totalViews ?? 0,
        totalComments: statsJson?.data?.totalComments ?? 0,
        totalEnquiry:
          typeof statsJson?.data?.totalEnquiry === "object"
            ? statsJson.data.totalEnquiry.total
            : statsJson?.data?.totalEnquiry ?? 0,
      })

      /* ---------------- LIST DATA ---------------- */
      setRecentContent(Array.isArray(contentJson?.data) ? contentJson.data : [])
      setActivity(Array.isArray(activityJson?.data) ? activityJson.data : [])

      /* ---------------- ENGAGEMENT ---------------- */
      const e = engagementJson?.data

      if (
        e &&
        Array.isArray(e.labels) &&
        Array.isArray(e.like) &&
        Array.isArray(e.comment) &&
        Array.isArray(e.enquiry)
      ) {
        const formatted = e.labels.map((label: string, i: number) => ({
          month: label,
          like: e.like[i] ?? 0,
          comment: e.comment[i] ?? 0,
          enquiry: e.enquiry[i] ?? 0,
        }))
        setChartData(formatted)
      } else {
        setChartData([])
      }
    } catch (err) {
      console.error("❌ Dashboard API error:", err)
      setChartData([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pl-10">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Welcome back, Admin</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Open Editor
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Stat title="Total Posts" value={stats?.totalPosts} />
        <Stat title="Views" value={stats?.totalViews} />
        <Stat title="Comments" value={stats?.totalComments} />
        <Stat title="Enquiries" value={stats?.totalEnquiry} />
        <Stat title="SEO Card" value="SEO" />
      </div>

      {/* CONTENT + ACTIVITY */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* RECENT CONTENT */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Recent Content</CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 text-left">
                    <th className="p-2">Title</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Last Updated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentContent.map((row) => (
                    <tr key={row.id} className="border-b">
                      <td className="p-2">{row.title}</td>
                      <td className="p-2">
                        <Badge
                          className={
                            row.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {new Date(row.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="p-2">
                        <Pencil className="h-4 w-4 cursor-pointer text-muted-foreground" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* RECENT ACTIVITY */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            {activity.length === 0 ? (
              <p className="text-muted-foreground">No activity</p>
            ) : (
              activity.map((a, i) => (
                <Activity
                  key={i}
                  text={a.message}
                  icon={
                    a.message?.toLowerCase().includes("like")
                      ? ThumbsUp
                      : a.message?.toLowerCase().includes("comment")
                      ? MessageCircle
                      : HelpCircle
                  }
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* ENGAGEMENT */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Blogs Engagement</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No engagement data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="like" strokeWidth={2} />
                <Line dataKey="comment" strokeWidth={2} />
                <Line dataKey="enquiry" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ title, value }: any) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{title}</p>
        <h2 className="text-xl font-semibold">{value ?? "-"}</h2>
      </CardContent>
    </Card>
  )
}

function Activity({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-blue-600" />
      <span>{text}</span>
    </div>
  )
}



