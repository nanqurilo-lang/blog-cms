// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Loader2 } from "lucide-react"
// import Link from "next/link"

// export default function LoginForm() {
//   const router = useRouter()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       // 🔥 Dummy login
//       if (email === "admin@blog.com" && password === "admin123") {
//         localStorage.setItem("cms_token", "demo-token")
//         router.push("/dashboard")
//       } else {
//         setError("Invalid email or password")
//       }
//     } catch {
//       setError("Something went wrong")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
//     >
//       <h1 className="text-2xl font-bold mb-1">CMS Login</h1>
//       <p className="text-sm text-gray-500 mb-5">
//         Login to manage your blog website
//       </p>

//       {error && (
//         <div className="mb-3 text-sm text-red-500">{error}</div>
//       )}

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">
//           Email Address
//         </label>
//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="admin@blog.com"
//           className="w-full border rounded-md px-3 py-2"
//         />
//       </div>

//       <div className="mb-2">
//         <label className="block text-sm font-medium mb-1">
//           Password
//         </label>
//         <input
//           type="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="••••••••"
//           className="w-full border rounded-md px-3 py-2"
//         />
//       </div>

//       <div className="text-right mb-4">
//         <Link
//           href="/forgot-password"
//           className="text-sm text-gray-600 hover:underline"
//         >
//           Forgot password?
//         </Link>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center"
//       >
//         {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//         Login
//       </button>
//     </form>
//   )
// }




"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (email === "admin@blog.com" && password === "admin123") {
        localStorage.setItem("cms_token", "demo-token")
        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur border border-gray-500 shadow-xl p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Blog CMS</h1>
            <p className="text-xs text-gray-500">Admin Login</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Sign in to manage your blog content
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2 border border-red-200">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@blog.com"
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>

        {/* Forgot */}
        <div className="text-right mb-5">
          <Link
            href="/forgot-password"
            className="text-xs text-gray-600 hover:text-black hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Login to Dashboard
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-5">
          © {new Date().getFullYear()} Blog CMS
        </p>
      </form>
    </div>
  )
}
