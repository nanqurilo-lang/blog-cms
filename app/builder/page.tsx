// "use client";

// import Builder from "@/components/builder/Builder";

// export default function BuilderPage() {
//   return <Builder />;
// }



"use client";

import { useSearchParams } from "next/navigation";
import Builder from "@/components/builder/Builder";

export default function BuilderPage() {
  const searchParams = useSearchParams();

  const templateId = searchParams.get("templateId"); // ✅ get id from URL

  return <Builder templateId={templateId} />;
}