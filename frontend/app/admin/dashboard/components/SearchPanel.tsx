
export default function SearchPanel() {
    return (
        <div className=" rounded-xl p-4 bg-[#dcdcdc]">
            <h2 className=" text-md font-semibold text-white bg-[#1e9b8e] px-4 py-2 rounded-t-md mb-4">
                Search by
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {["Patient", "Id", "Date", "Document"].map((label) => (
                    <button
                        key={label}
                        className="border border-[#1e9b8e] text-[#1e9b8e] px-4 py-1 rounded-full text-sm hover:bg-[#1e9b8e] hover:text-white transition"
                    >
                        {label}
                    </button>
                ))}
            </div>
            <input
                type="text"
                placeholder="Enter patient's name"
                className="w-full border px-3 py-2 rounded-lg"
            />
        </div>

    );
}
