import HouseIcon from '@/shared/ui/HouseIcon';
import { Link } from '@inertiajs/react';

export default function PublicHeader() {
    return (
        <header className="border-b border-gray-200 px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                <Link
                    href={route('welcome')}
                    className="flex items-center gap-2 whitespace-nowrap text-2xl font-bold tracking-tight text-accent-500 hover:text-accent-600 sm:text-4xl"
                >
                    <HouseIcon className="size-6 shrink-0 sm:size-8" />
                    Room Makeover
                </Link>

                <nav className="flex items-center gap-2 text-sm font-bold sm:gap-4 sm:text-xl">
                    <Link
                        href={route('login')}
                        className="whitespace-nowrap text-gray-600 hover:text-gray-900"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="whitespace-nowrap rounded-md bg-accent-500 px-3 py-1.5 text-white hover:bg-accent-600 sm:px-4 sm:py-2"
                    >
                        Register
                    </Link>
                </nav>
            </div>
        </header>
    );
}
