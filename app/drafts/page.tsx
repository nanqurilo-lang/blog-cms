// import React from 'react'

// const page = () => {
//   return (
//     <div>Drafts</div>
//   )
// }

// export default page



// "use client"

// import React from "react"
// import Image from "next/image"
// import { MoreVertical, Search } from "lucide-react"

// const posts = [
//   {
//     id: 1,
//     title: "Lorem ipsum dolor sit amet, consectetur",
//     desc:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a",
//     image:
//       "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200",
//     updated: "12/12/2025",
//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor sit amet, consectetur",
//     desc:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a",
//     image:
//       "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200",
//     updated: "12/12/2025",
//   },
// ]

// export default function Page() {
//   return (
//     <div className="p-6 bg-white min-h-screen space-y-6">
//       {/* Search */}
//       <div className="relative w-72">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//         <input
//           placeholder="Search posts"
//           className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="relative rounded-xl border border-blue-500 overflow-hidden bg-white"
//           >
//             {/* Kebab */}
//             <button className="absolute top-2 right-2 z-10 bg-blue-600 p-1.5 rounded-md text-white">
//               <MoreVertical size={16} />
//             </button>

//             {/* Image */}
//             <div className="relative h-44 w-full">
//               <Image
//                 src={post.image}
//                 alt="post"
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             {/* Content */}
//             <div className="p-4 space-y-2">
//               <h3 className="font-semibold leading-snug text-gray-900">
//                 {post.title}
//               </h3>

//               <p className="text-sm text-gray-500 leading-relaxed">
//                 {post.desc}
//               </p>

//               <p className="text-xs text-gray-400">
//                 Last edited on : {post.updated}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }






"use client"

import React, { useState } from "react"
import Image from "next/image"
import { MoreVertical, Search, Pencil, Save, Trash2 } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200",
    updated: "12/12/2025",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200",
    updated: "12/12/2025",
  },
]

export default function Page() {
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const handleAction = (action: string, postId: number) => {
    setOpenMenu(null)

    if (action === "edit") {
      console.log("Edit post:", postId)
    }

    if (action === "template") {
      console.log("Save as template:", postId)
    }

    if (action === "delete") {
      console.log("Delete post:", postId)
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen space-y-6">
      {/* Search */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          placeholder="Search posts"
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative rounded-xl border border-blue-500 overflow-hidden bg-white"
          >
            {/* Kebab Button */}
            <button
              onClick={() =>
                setOpenMenu(openMenu === post.id ? null : post.id)
              }
              className="absolute top-2 right-2 z-20 bg-blue-600 p-1.5 rounded-md text-white"
            >
              <MoreVertical size={16} />
            </button>

            {/* Dropdown */}
            {openMenu === post.id && (
              <div className="absolute top-10 right-2 z-30 w-48 bg-white border rounded-lg shadow-lg">
                <button
                  onClick={() => handleAction("edit", post.id)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => handleAction("template", post.id)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Save size={16} /> Save as template
                </button>

                <button
                  onClick={() => handleAction("delete", post.id)}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}

            {/* Image */}
            <div className="relative h-44 w-full">
              <Image
                src={post.image}
                alt="post"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold leading-snug text-gray-900">
                {post.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {post.desc}
              </p>

              <p className="text-xs text-gray-400">
                Last edited on : {post.updated}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
