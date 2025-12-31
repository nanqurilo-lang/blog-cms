"use client"

import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  )
}



// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import LoginForm from "@/components/auth/LoginForm"

// export default function LoginPage() {
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("cms_token")
//     if (token) {
//       router.replace("/dashboard")
//     }
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <LoginForm />
//     </div>
//   )
// }
