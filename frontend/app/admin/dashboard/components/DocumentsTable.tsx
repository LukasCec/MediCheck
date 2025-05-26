"use client";
import { useEffect, useState } from "react";
import { Document } from "../types";
import { fetchDocuments } from "@/lib/api";

export default function DocumentsTable({ onSelect }: { onSelect: (doc: Document) => void }) {
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        fetchDocuments().then(setDocuments).catch(console.error);
    }, []);

    return (
        <div className="rounded-xl p-4 bg-[#dcdcdc]">
            <table className="w-full text-sm">
                <thead className="bg-[#1e9b8e] text-white">
                <tr>
                    <th className="py-2 px-3 text-left">User</th>
                    <th className="py-2 px-3 text-left">Date</th>
                    <th className="py-2 px-3 text-left">Filename</th>
                    <th className="py-2 px-3 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {documents.map((doc) => (
                    <tr
                        key={doc.id}
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => onSelect(doc)}
                    >
                        <td className="py-2 px-3">{doc.user}</td>
                        <td className="py-2 px-3">{doc.date}</td>
                        <td className="py-2 px-3">{doc.filename}</td>
                        <td className="py-2 px-3 text-center">
                            <button className="bg-[#1e9b8e] text-white px-3 py-1 rounded text-xs">
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
