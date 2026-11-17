import HouseIcon from '@/shared/ui/HouseIcon';
import { Link } from '@inertiajs/react';

export default function PublicHeader() {
    return (
        <header className="border-b border-gray-200 px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <Link
                    href={route('welcome')}
                    className="flex items-center gap-2 text-4xl font-bold tracking-tight text-accent-500 hover:text-accent-600"
                >
                    <HouseIcon className="size-8" />
                    Room Makeover
                </Link>

                <nav className="flex items-center gap-4 text-xl font-bold">
                    <Link
                        href={route('login')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-md bg-accent-500 px-4 py-2 text-white hover:bg-accent-600"
                    >
                        Register
                    </Link>
                </nav>
            </div>
        </header>
    );
}
