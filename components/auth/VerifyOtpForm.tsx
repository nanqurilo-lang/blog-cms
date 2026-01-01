
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react"

const BASE_URL = "https://393rb0pp-5001.inc1.devtunnels.ms/api"

export default function VerifyOtpPage() {
  const router = useRouter()

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid OTP")
      }

      // ✅ OTP verified → go to reset password
      router.push("/reset-password")
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur bg-gradient-to-br from-gray-100 to-blue-200 shadow-xl p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Verify OTP</h1>
            <p className="text-xs text-gray-500">Blog CMS</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your registered email.
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2 border border-red-200">
            {error}
          </div>
        )}

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 text-center">
            One Time Password
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="••••••"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-lg border px-3 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying OTP
            </>
          ) : (
            <>
              Verify OTP
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-5">
          Secure verification · © {new Date().getFullYear()}
        </p>
      </form>
    </div>
  )
}
