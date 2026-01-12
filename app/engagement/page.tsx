"use client"

import { Search, Trash2 } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] p-6">
      {/* Top Filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search by name, blog or date"
            className="w-full rounded-lg border bg-white py-2 pl-10 pr-3 text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status</span>
          <select className="rounded-lg border bg-white px-3 py-2 text-sm">
            <option>All</option>
            <option>Read</option>
            <option>Unread</option>
          </select>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Table Section */}
        <div className="flex-1 overflow-hidden rounded-xl border bg-white">
          <table className="w-full border-collapse text-sm">
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
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">
                    <div className="font-medium">Shreya Singh</div>
                    <div className="text-xs text-gray-500">
                      shreyasingh@gmail...
                    </div>
                  </td>

                  <td className="p-3 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing eli...
                  </td>

                  <td className="p-3">Blog 1</td>

                  <td className="p-3">05/01/2026</td>

                  <td className="p-3">
                    {i === 0 ? (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                        Unread
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                        Read
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    <Trash2
                      size={16}
                      className="mx-auto cursor-pointer text-gray-500 hover:text-red-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Detail Panel */}
        <div className="w-[320px] rounded-xl border bg-white p-4">
          {/* User */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
              SS
            </div>
            <div>
              <div className="font-medium">Shreya Singh</div>
              <div className="text-xs text-gray-500">
                shreyasingh@gmail.com
              </div>
            </div>
          </div>

          {/* Blog */}
          <div className="mt-5">
            <div className="text-xs text-gray-500">Blog</div>
            <div className="text-sm text-blue-600">
              Lorem ipsum dolor sis...
            </div>
          </div>

          {/* Message */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Message :</span>
              <span>05/01/2026</span>
            </div>

            <div className="mt-2 rounded-lg bg-gray-100 p-3 text-xs text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
          </div>

          {/* Button */}
          <button className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white">
            Reply via Mail
          </button>
        </div>
      </div>
    </div>
  )
}
