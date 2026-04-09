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

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { MoreVertical, Pencil, Save, Search, Trash2 } from "lucide-react"

const BUILDER_API_BASE_URL = "https://6jnqmj85-3000.inc1.devtunnels.ms"
const DRAFT_TEMPLATE_LIMIT = 20
const FALLBACK_DRAFT_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 700'%3E%3Crect width='1200' height='700' fill='%23eff6ff'/%3E%3Crect x='72' y='88' width='1056' height='524' rx='36' fill='%23dbeafe'/%3E%3Ctext x='50%25' y='47%25' text-anchor='middle' fill='%231d4ed8' font-family='Arial, sans-serif' font-size='54' font-weight='700'%3EDraft Template%3C/text%3E%3Ctext x='50%25' y='57%25' text-anchor='middle' fill='%23475569' font-family='Arial, sans-serif' font-size='28'%3EBuilder preview image not available%3C/text%3E%3C/svg%3E"

type DraftWidget = {
  type?: string
  general?: {
    src?: string
    bgImage?: string
    images?: string[]
  } | null
}

type DraftBlog = {
  _id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  lastSavedAt?: string | null
  updatedAt?: string | null
  draftContent?: {
    widgets?: DraftWidget[]
  } | null
}

type DraftBlogsResponse = {
  message?: string
  blogs?: DraftBlog[]
  pagination?: {
    currentPage?: number
    totalPages?: number
    hasNextPage?: boolean
  } | null
}

type DraftTemplate = {
  id: string
  title: string
  desc: string
  image: string
  updated: string
  slug: string
}

function normalizeDraftImage(image?: string) {
  if (!image || image.includes("via.placeholder.com")) {
    return FALLBACK_DRAFT_IMAGE
  }

  return image
}

function getDraftThumbnail(widgets?: DraftWidget[]) {
  if (!widgets?.length) {
    return FALLBACK_DRAFT_IMAGE
  }

  for (const widget of widgets) {
    if (
      widget.type === "image" &&
      typeof widget.general?.src === "string" &&
      widget.general.src
    ) {
      return widget.general.src
    }

    if (
      widget.type === "hero" &&
      typeof widget.general?.bgImage === "string" &&
      widget.general.bgImage
    ) {
      return widget.general.bgImage
    }

    if (
      widget.type === "image-carousel" &&
      Array.isArray(widget.general?.images) &&
      widget.general.images[0]
    ) {
      return widget.general.images[0]
    }
  }

  return FALLBACK_DRAFT_IMAGE
}

function mapBlogToDraftTemplate(blog: DraftBlog): DraftTemplate {
  return {
    id: blog._id,
    title: blog.title?.trim() || "Untitled draft template",
    desc: blog.description?.trim() || "Draft template saved from the builder.",
    image: normalizeDraftImage(getDraftThumbnail(blog.draftContent?.widgets)),
    updated: blog.lastSavedAt || blog.updatedAt || new Date().toISOString(),
    slug: blog.slug?.trim() || "",
  }
}

export default function Page() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [drafts, setDrafts] = useState<DraftTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchAllDraftTemplates() {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("cms_token") : null

      if (!token) {
        if (!isMounted) {
          return
        }

        setError("cms_token not found. Please log in again to load drafts.")
        setDrafts([])
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const allBlogs: DraftBlog[] = []
        let currentPage = 1
        let totalPages = 1

        while (currentPage <= totalPages) {
          const response = await fetch(
            `${BUILDER_API_BASE_URL}/api/builder/get/blog-template/draft?page=${currentPage}&limit=${DRAFT_TEMPLATE_LIMIT}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              cache: "no-store",
            },
          )

          let result: DraftBlogsResponse | null = null

          try {
            result = (await response.json()) as DraftBlogsResponse
          } catch {
            result = null
          }

          if (!response.ok) {
            throw new Error(result?.message || "Failed to fetch draft templates.")
          }

          allBlogs.push(...(result?.blogs || []))
          totalPages = result?.pagination?.totalPages || currentPage
          currentPage += 1
        }

        if (!isMounted) {
          return
        }

        setDrafts(allBlogs.map(mapBlogToDraftTemplate))
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Something went wrong while loading draft templates.",
        )
        setDrafts([])
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchAllDraftTemplates()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredDrafts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return drafts

    return drafts.filter((draft) =>
      [draft.title, draft.desc, draft.slug].join(" ").toLowerCase().includes(query),
    )
  }, [drafts, search])

  const handleAction = (action: string, postId: string) => {
    setOpenMenu(null)

    if (action === "edit") {
      console.log("Edit draft template:", postId)
    }

    if (action === "template") {
      console.log("Save draft as template:", postId)
    }

    if (action === "delete") {
      console.log("Delete draft template:", postId)
    }
  }

  return (
    <div className="min-h-screen space-y-6 bg-white p-6">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search drafts"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50/40 p-8 text-sm text-gray-500">
          Loading draft templates...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-sm text-red-600">
          {error}
        </div>
      ) : filteredDrafts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50/40 p-8 text-sm text-gray-500">
          No draft templates found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredDrafts.map((post) => (
            <div
              key={post.id}
              className="relative overflow-hidden rounded-xl border border-blue-500 bg-white"
            >
              <button
                onClick={() =>
                  setOpenMenu(openMenu === post.id ? null : post.id)
                }
                className="absolute right-2 top-2 z-20 rounded-md bg-blue-600 p-1.5 text-white"
                type="button"
              >
                <MoreVertical size={16} />
              </button>

              {openMenu === post.id && (
                <div className="absolute right-2 top-10 z-30 w-48 rounded-lg border bg-white shadow-lg">
                  <button
                    onClick={() => handleAction("edit", post.id)}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    type="button"
                  >
                    <Pencil size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleAction("template", post.id)}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    type="button"
                  >
                    <Save size={16} /> Save as template
                  </button>

                  <button
                    onClick={() => handleAction("delete", post.id)}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    type="button"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}

              <div className="relative h-44 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized={post.image.startsWith("data:")}
                />
              </div>

              <div className="space-y-2 p-4">
                <h3 className="font-semibold leading-snug text-gray-900">
                  {post.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-500">
                  {post.desc}
                </p>

                <p className="text-xs text-gray-400">
                  Last edited on : {new Date(post.updated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
