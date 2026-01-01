
// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Mail, ArrowRight } from "lucide-react"

// export default function ForgotPasswordPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // 🔥 dummy store
//     localStorage.setItem("reset_email", email)
//     router.push("/verify-otp")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center  px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur bg-gradient-to-br from-gray-100 to-blue-200  shadow-xl p-6"
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-3">
//           <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
//             <Mail className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold">Forgot Password</h1>
//             <p className="text-xs text-gray-500">Blog CMS</p>
//           </div>
//         </div>

//         <p className="text-sm text-gray-600 mb-6">
//           Enter your registered email to receive a one-time password (OTP).
//         </p>

//         {/* Email Input */}
//         <div className="mb-5">
//           <label className="block text-sm font-medium mb-1 text-gray-700">
//             Email Address
//           </label>
//           <input
//             type="email"
//             required
//             placeholder="admin@blog.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
//           />
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           className="w-full rounded-lg bg-black text-white py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition"
//         >
//           Send OTP
//           <ArrowRight className="h-4 w-4" />
//         </button>

//         {/* Footer */}
//         <p className="text-xs text-gray-400 text-center mt-5">
//           Secure password recovery · © {new Date().getFullYear()}
//         </p>
//       </form>
//     </div>
//   )
// }





"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, ArrowRight, Loader2 } from "lucide-react"

const BASE_URL = "https://393rb0pp-5001.inc1.devtunnels.ms/api"

export default function ForgotPasswordPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/auth/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send OTP")
      }

      // ✅ store email (required for next step)
      localStorage.setItem("reset_email", email)

      // ⚠️ dev only (remove in prod)
      if (data.otp) {
        localStorage.setItem("dev_otp", data.otp)
      }

      // ✅ move to OTP page
      router.push("/verify-otp")
    } catch (err: any) {
      setError(err.message || "Failed to connect to server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur bg-gradient-to-br from-gray-100 to-blue-200 shadow-xl p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Forgot Password</h1>
            <p className="text-xs text-gray-500">Blog CMS</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Enter your registered email to receive a one-time password (OTP).
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2 border border-red-200">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="admin@blog.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
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
              Sending OTP
            </>
          ) : (
            <>
              Send OTP
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-5">
          Secure password recovery · © {new Date().getFullYear()}
        </p>
      </form>
    </div>
  )
}
