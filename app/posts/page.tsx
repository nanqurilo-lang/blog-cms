// import React from 'react'

// function page() {
//   return (
//     <div>post</div>
//   )
// }

// export default page






"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  MoreVertical,
  Star,
  Eye,
  Heart,
  MessageSquare,
  Repeat,
  Pencil,
  EyeIcon,
  Trash2,
  Save,
} from "lucide-react"

const postsData = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: "Lorem ipsum dolor sit amet, consectetur",
  desc:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a",
  image:
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200",
  updated: "12/12/2025",
  views: 205,
  likes: 100,
  comments: 80,
  shares: 2,
  favourite: i % 3 === 0,
}))

export default function Page() {
  const [posts, setPosts] = useState(postsData)
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const toggleFavourite = (id: number) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, favourite: !p.favourite } : p
      )
    )
    setOpenMenu(null)
  }

  const handleView = (id: number) => {
    alert(`View post ID: ${id}`)
    setOpenMenu(null)
  }

  const handleEdit = (id: number) => {
    alert(`Edit post ID: ${id}`)
    setOpenMenu(null)
  }

  const handleSaveAsTemplate = (id: number) => {
    alert(`Post ${id} saved as template`)
    setOpenMenu(null)
  }

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this post?"
    )
    if (!confirmDelete) return

    setPosts(prev => prev.filter(p => p.id !== id))
    setOpenMenu(null)
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search posts"
          className="w-full max-w-sm rounded-md border px-4 py-2 text-sm focus:outline-none"
        />

        <select className="rounded-md border px-4 py-2 text-sm">
          <option>All</option>
          <option>Favourites</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`rounded-xl border-2 overflow-hidden bg-white ${
              index % 3 === 0 ? "border-yellow-400" : "border-blue-500"
            }`}
          >
            {/* Image */}
            <div className="relative h-44">
              <Image
                src={post.image}
                alt="post"
                fill
                className="object-cover"
              />

              {/* Kebab Button */}
              <button
                onClick={() =>
                  setOpenMenu(openMenu === post.id ? null : post.id)
                }
                className={`absolute top-3 right-3 p-1 rounded-md ${
                  index % 3 === 0 ? "bg-yellow-400" : "bg-blue-600"
                }`}
              >
                <MoreVertical size={16} className="text-white" />
              </button>

              {/* Dropdown Menu */}
              {openMenu === post.id && (
                <div className="absolute top-12 right-3 w-44 rounded-md border bg-white shadow-md z-50">
                  <button
                    onClick={() => handleView(post.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <EyeIcon size={14} /> View
                  </button>

                  <button
                    onClick={() => handleEdit(post.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <Pencil size={14} /> Edit
                  </button>

                  <button
                    onClick={() => handleSaveAsTemplate(post.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <Save size={14} /> Save as Template
                  </button>

                  <button
                    onClick={() => toggleFavourite(post.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <Star
                      size={14}
                      className={
                        post.favourite
                          ? "fill-yellow-400 text-yellow-400"
                          : ""
                      }
                    />
                    {post.favourite
                      ? "Remove Favourite"
                      : "Mark as Favourite"}
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm leading-snug">
                  {post.title}
                </h3>

                <Star
                  size={18}
                  className={
                    post.favourite
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </div>

              <p className="text-xs text-gray-500 line-clamp-3">
                {post.desc}
              </p>

              <p className="text-[11px] text-gray-400">
                Updated on · {post.updated}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye size={14} /> {post.views}
                </span>
                <span className="flex items-center gap-1 text-red-500">
                  <Heart size={14} /> {post.likes}
                </span>
                <span className="flex items-center gap-1 text-purple-500">
                  <MessageSquare size={14} /> {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Repeat size={14} /> {post.shares}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

