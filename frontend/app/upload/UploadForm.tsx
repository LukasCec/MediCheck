"use client";

import { useState } from "react";

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [user, setUser] = useState("");
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("user", user || "anonymous");

        setStatus("uploading");

        try {
            const res = await fetch("http://localhost:8000/upload-document-tesseract/", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setMessage("Upload successful! Extracted text: " + data.extracted_text);
                setFile(null);
                setUser("");
            } else {
                throw new Error(data.detail || "Upload failed.");
            }
        } catch (err: any) {
            setStatus("error");
            setMessage(err.message);
        }
    }

    return (
        <form onSubmit={handleUpload} className="space-y-4 max-w-lg">
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*,.pdf"
                className="block w-full border p-2 rounded"
                required
            />
            <input
                type="text"
                placeholder="Enter your name (optional)"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="block w-full border p-2 rounded"
            />
            <button
                type="submit"
                className="bg-[#1e9b8e] hover:bg-[#17776c] text-white px-6 py-2 rounded"
                disabled={status === "uploading"}
            >
                {status === "uploading" ? "Uploading..." : "Upload Document"}
            </button>

            {status === "success" && <p className="text-green-600">{message}</p>}
            {status === "error" && <p className="text-red-600">Error: {message}</p>}
        </form>
    );
}
