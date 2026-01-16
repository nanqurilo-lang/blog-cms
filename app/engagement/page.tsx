

"use client"

import { useEffect, useState } from "react"
import { Search, Trash2 } from "lucide-react"

const BASE_URL = "https://393rb0pp-5001.inc1.devtunnels.ms"

type Inquiry = {
  id: string
  name: string
  email: string
  message: string
  blog?: { title: string }
  status: "read" | "unread"
  date: string
}

export default function Page() {
  const [list, setList] = useState<Inquiry[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    fetchInquiries()
  }, [])

  /* ---------------- FETCH LIST ---------------- */
  async function fetchInquiries() {
    try {
      const token = localStorage.getItem("cms_token")
      if (!token) return console.error("cms_token missing")

      const res = await fetch(`${BASE_URL}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      })

      const json = await res.json()
      const data = Array.isArray(json?.data) ? json.data : []

      setList(data)

      if (data.length) {
        selectInquiry(data[0].id)
      }
    } catch (err) {
      console.error("Inquiry list error", err)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- FETCH DETAIL ---------------- */
  async function selectInquiry(id: string) {
    try {
      setSelectedId(id)
      setDetail(null)

      const token = localStorage.getItem("cms_token")
      if (!token) return

      const res = await fetch(`${BASE_URL}/api/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      })

      const json = await res.json()
      setDetail(json?.data ?? null)
    } catch (err) {
      console.error("Inquiry detail error", err)
    }
  }

  /* ---------------- DELETE ---------------- */
  async function deleteInquiry(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    )
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("cms_token")
      if (!token) return console.error("cms_token missing")

      const res = await fetch(`${BASE_URL}/api/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await res.json()
      if (!json?.success) {
        alert("Failed to delete inquiry")
        return
      }

      setList((prev) => prev.filter((item) => item.id !== id))

      if (selectedId === id) {
        setSelectedId(null)
        setDetail(null)
      }
    } catch (err) {
      console.error("Delete inquiry error", err)
    }
  }

  /* ---------------- FILTER ---------------- */
  const filteredList = list.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-6">
      {/* Filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-[320px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or message"
            className="w-full rounded-lg border bg-white py-2 pl-10 pr-3 text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border bg-white px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Read</option>
            <option>Unread</option>
          </select>
        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Message</th>
                <th className="p-3">Blog</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No inquiries found
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => selectInquiry(item.id)}
                    className={`border-t cursor-pointer ${
                      selectedId === item.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="p-3">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.email}
                      </div>
                    </td>

                    <td className="p-3 text-gray-600 truncate max-w-[260px]">
                      {item.message}
                    </td>

                    <td className="p-3">{item.blog?.title ?? "-"}</td>

                    <td className="p-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          item.status === "unread"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      <Trash2
                        size={16}
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteInquiry(item.id)
                        }}
                        className="mx-auto cursor-pointer text-gray-400 hover:text-red-500"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        <div className="w-[320px] rounded-xl border bg-white p-4">
          {!detail ? (
            <div className="text-sm text-gray-500">
              Select an inquiry
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                  {detail.initials}
                </div>
                <div>
                  <div className="font-medium">{detail.name}</div>
                  <div className="text-xs text-gray-500">
                    {detail.email}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs text-gray-500">Blog</div>
                <div className="text-sm text-blue-600">
                  {detail.blog?.title}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Message :</span>
                  <span>
                    {new Date(detail.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-2 rounded-lg bg-gray-100 p-3 text-xs text-gray-700 leading-relaxed">
                  {detail.message}
                </div>
              </div>

              <a
                href={detail.replyMail}
                className="mt-6 block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white"
              >
                Reply via Mail
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
