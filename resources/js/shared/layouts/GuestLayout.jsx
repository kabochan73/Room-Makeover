import HouseIcon from '@/shared/ui/HouseIcon';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <div className="hidden w-1/2 flex-col justify-between bg-accent-500 p-12 text-white lg:flex">
                <Link
                    href={route('welcome')}
                    className="flex items-center gap-2 text-2xl font-bold"
                >
                    <HouseIcon className="size-7" />
                    Room Makeover
                </Link>

                <p className="max-w-sm text-3xl font-bold leading-snug">
                    部屋を選んで、家具を置いて、雰囲気を確かめよう。
                </p>

                <p className="text-sm text-accent-100">
                    &copy; {new Date().getFullYear()} Room Makeover
                </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2">
                <Link
                    href={route('welcome')}
                    className="mb-8 flex items-center gap-2 text-2xl font-bold text-accent-500 lg:hidden"
                >
                    <HouseIcon className="size-7" />
                    Room Makeover
                </Link>

                <div className="w-full max-w-sm">{children}</div>
            </div>
        </div>
    );
}
