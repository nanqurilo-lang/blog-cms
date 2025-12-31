"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

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
      // 🔥 Dummy login (API baad me connect karenge)
      if (email === "admin@blog.com" && password === "admin123") {
        localStorage.setItem("cms_token", "demo-token")
        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
    >
      <h1 className="text-2xl font-bold mb-1">CMS Login</h1>
      <p className="text-sm text-gray-500 mb-5">
        Login to manage your blog website
      </p>

      {error && (
        <div className="mb-3 text-sm text-red-500">{error}</div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@blog.com"
          className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </button>
    </form>
  )
}






// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"

// export default function LoginForm() {
//   const router = useRouter()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()

//     // dummy login
//     if (email === "admin@blog.com" && password === "admin123") {
//       localStorage.setItem("cms_token", "demo-token")
//       router.push("/dashboard")
//     } else {
//       setError("Invalid email or password")
//     }
//   }

//   return (
//     <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl w-[350px]">
//       <h1 className="text-xl font-bold mb-4">CMS Login</h1>

//       {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//       <input
//         type="email"
//         placeholder="Email"
//         className="border w-full mb-3 p-2 rounded"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="border w-full mb-4 p-2 rounded"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button className="w-full bg-black text-white py-2 rounded">
//         Login
//       </button>
//     </form>
//   )
// }
