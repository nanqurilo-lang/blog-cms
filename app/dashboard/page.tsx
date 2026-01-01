
"use client"

import {
  Eye,
  MessageSquare,
  FileText,
  Mail,
  ThumbsUp,
  MessageCircle,
  HelpCircle,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
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
        <Stat title="Total Posts" value="120" />
        <Stat title="Views" value="20,000" />
        <Stat title="Comments" value="10" />
        <Stat title="Enquiries" value="12" />
        <Stat title="Seo Card" value="Seo" />
      </div>

      {/* CONTENT + ACTIVITY */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* RECENT CONTENT */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Recent Content</CardTitle>
          </CardHeader>

          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="p-2">Title</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Last Updated</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { status: "Draft" },
                  { status: "Published" },
                  { status: "Published" },
                  { status: "Published" },
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">Blog - 1</td>
                    <td className="p-2">
                      <Badge
                        variant="secondary"
                        className={
                          row.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td className="p-2">12/12/2025</td>
                    <td className="p-2">
                      <Pencil className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* RECENT ACTIVITY */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <Activity icon={ThumbsUp} text="4 new likes on your recent blog." />
            <Activity icon={MessageCircle} text="Riya commented on your recent blog." />
            <Activity icon={MessageCircle} text="Riya commented on your recent blog." />
            <Activity icon={HelpCircle} text="You have a new enquiry." />
            <Activity icon={MessageCircle} text="Riya commented on your recent blog." />
          </CardContent>
        </Card>
      </div>

      {/* CHART PLACEHOLDER */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Blogs Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart will be added here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <Card className="relative overflow-hidden border-blue-500">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-blue-100 rotate-[-20deg] translate-x-10" />
      <CardContent className="relative p-4">
        <p className="text-xs text-muted-foreground">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </CardContent>
    </Card>
  )
}

function Activity({
  icon: Icon,
  text,
}: {
  icon: any
  text: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-blue-600" />
      <span>{text}</span>
    </div>
  )
}











