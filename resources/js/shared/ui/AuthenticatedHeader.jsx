import HouseIcon from '@/shared/ui/HouseIcon';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedHeader() {
    const user = usePage().props.auth.user;

    return (
        <header className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                <Link
                    href={route('dashboard')}
                    className="flex items-center gap-2 whitespace-nowrap text-2xl font-bold tracking-tight text-accent-500 hover:text-accent-600 sm:text-4xl"
                >
                    <HouseIcon className="size-6 shrink-0 sm:size-8" />
                    Room Makeover
                </Link>

                <nav className="flex items-center gap-2 text-sm font-bold sm:gap-4 sm:text-xl">
                    <Link
                        href={route('profile.edit')}
                        className="max-w-[8rem] truncate rounded-md bg-accent-500 px-3 py-1.5 text-white hover:bg-accent-600 sm:max-w-none sm:px-4 sm:py-2"
                    >
                        {user.name}
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="whitespace-nowrap text-red-800 hover:text-red-900"
                    >
                        Log Out
                    </Link>
                </nav>
            </div>
        </header>
    );
}
