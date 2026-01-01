
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Lock } from "lucide-react"
import Link from "next/link"

const BASE_URL = "https://393rb0pp-5001.inc1.devtunnels.ms/api"

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("subodh.qurilo@gmail.com")
  const [password, setPassword] = useState("nan123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {

      console.log("Logging in with:", JSON.stringify({
          email,
          password,
        }),)
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Login failed")
      }

      // ✅ Save token & user
      localStorage.setItem("cms_token", result.data.token)
      localStorage.setItem("cms_user", JSON.stringify(result.data.user))

      // ✅ Redirect
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur bg-gradient-to-br from-gray-100 to-blue-200 shadow-xl p-6"
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
