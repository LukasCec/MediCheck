import { Document } from "@/app/admin/dashboard/types";

export async function fetchDocuments(): Promise<Document[]> {
    const res = await fetch("http://localhost:8000/documents/", {
        cache: "no-store", // odporúčané pre Next.js 14
    });
    if (!res.ok) throw new Error("Failed to fetch documents");
    return res.json();
}
