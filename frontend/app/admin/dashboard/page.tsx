"use client";
import { useState } from "react";
import { Document } from "./types";
import DocumentsTable from "./components/DocumentsTable";
import ControlPanel from "./components/ControlPanel";
import SearchPanel from "./components/SearchPanel";
import Navbar from "@/app/components/Navbar";

export default function DashboardPage() {
    const [selectedDoc, setSelectedDoc] = useState<Document | undefined>();

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Navbar user="Doctor" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <div className="space-y-6 col-span-1">
                    <SearchPanel />
                    <ControlPanel selected={selectedDoc} />
                </div>
                <div className="col-span-2">
                    <DocumentsTable onSelect={setSelectedDoc} />
                </div>
            </div>
        </div>
    );
}
