
export default function Navbar({ user }: { user?: string }) {
    return (
        <nav className="w-full bg-[#1e9b8e] text-white px-6 py-3 flex justify-between items-center shadow">
            <div className="text-xl font-semibold">MediCheck</div>

            {user ? (
                <div className="flex items-center gap-2">
                    <span className="font-medium">{user}</span>
                    <div className="w-8 h-8 rounded-full bg-white text-[#1e9b8e] flex items-center justify-center font-bold">
                        {user[0].toUpperCase()}
                    </div>
                </div>
            ) : (
                <a href="/login" className="text-sm font-medium hover:underline">
                    Login / Sign up
                </a>
            )}
        </nav>
    );
}
