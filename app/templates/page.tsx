"use client"

import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] p-10">
      <div className="flex gap-8">
        {/* Card 1 */}
        <div className="w-[360px] rounded-xl border-2 border-blue-600 bg-white p-4">
          <div className="relative h-[180px] w-full overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200"
              alt="Blog Template"
              fill
              className="object-cover"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold">Blog Template</h3>
          <p className="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>

          <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white font-medium">
            Use Template
          </button>
        </div>

        {/* Card 2 */}
        <div className="w-[360px] rounded-xl border-2 border-blue-600 bg-white p-4">
          <div className="relative h-[180px] w-full overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200"
              alt="Blog Template"
              fill
              className="object-cover"
            />
          </div>

          <h3 className="mt-4 text-lg font-semibold">Blog Template</h3>
          <p className="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>

          <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white font-medium">
            Use Template
          </button>
        </div>
      </div>
    </div>
  )
}
