import UploadForm from "./UploadForm";

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 p-6">
            <h1 className="text-2xl font-bold mb-4">Upload New Document</h1>
            <UploadForm />
        </div>
    );
}
