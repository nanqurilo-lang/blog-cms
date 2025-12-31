
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { KeyRound, ArrowRight } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }

    // 🔥 dummy success
    localStorage.removeItem("reset_email")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur border bg-gradient-to-br from-gray-100 to-blue-200  shadow-xl p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
            <KeyRound className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Reset Password</h1>
            <p className="text-xs text-gray-500">Blog CMS</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Create a strong new password for your account.
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2 border border-red-200">
            {error}
          </div>
        )}

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition"
        >
          Reset Password
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-5">
          Password updated securely · © {new Date().getFullYear()}
        </p>
      </form>
    </div>
  )
}
