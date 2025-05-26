import { Document } from "../types";

export default function ControlPanel({ selected }: { selected?: Document }) {
    if (!selected) {
        return (
            <div className="rounded-xl p-4 bg-[#dcdcdc] text-gray-500 italic">
                Select a document to see details.
            </div>
        );
    }

    return (
        <div className="rounded-xl p-4 bg-[#dcdcdc]">
            <h2 className="text-md font-semibold text-white bg-[#1e9b8e] px-4 py-2 rounded-t-md mb-4">
                Control Panel
            </h2>
            <div className="flex gap-4 items-center mb-4">
                <div className="w-16 h-16 bg-white border rounded flex items-center justify-center">
                    <span className="text-2xl">🖼️</span>
                </div>
                <div>
                    <div className="font-bold text-md text-[#1e9b8e]">{selected.filename}</div>
                    <div className="text-sm text-gray-700">
                        <span className="font-semibold text-[#1e9b8e]">Name:</span> {selected.user}
                    </div>
                    <div className="text-sm text-gray-700">
                        <span className="font-semibold text-[#1e9b8e]">Date:</span> {selected.date}
                    </div>
                </div>
            </div>
            <div>
                <div className="text-sm font-bold text-[#1e9b8e] mb-1">Extracted Text:</div>
                <textarea
                    readOnly
                    value={selected.extracted_text}
                    className="min-h-[100px] w-full bg-white p-2 rounded border text-sm text-gray-800"
                />
            </div>
        </div>
    );
}
