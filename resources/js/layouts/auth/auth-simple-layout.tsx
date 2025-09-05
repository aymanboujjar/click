import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-orange-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-gray-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 bg-orange-300 rounded-full opacity-30 animate-pulse delay-500"></div>
            <div className="absolute bottom-1/4 left-12 w-10 h-10 bg-orange-100 rounded-full opacity-40 animate-pulse delay-700"></div>

            <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-6">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-1">
                        {/* Logo and Branding */}
                        <div className="flex flex-col items-center">
                            <Link href={route('home')} className="flex flex-col items-center gap-3 font-medium group transition-transform hover:scale-105">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl  shadow-xl group-hover:shadow-2xl transition-all duration-300 p-2">
                                    <img
                                        src="/images/Picsart_25-06-27_11-57-09-084.png"
                                        alt="CLICKTEE Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-3xl font-bold text-orange-500 tracking-tight">
                                    CLICKTEE
                                </span>
                            </Link>

                            <div className="space-y-3 text-center">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
                                <p className="text-gray-600 max-w-sm leading-relaxed">{description}</p>
                            </div>
                        </div>

                        {/* Auth Form Card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-2xl p-6 transition-all duration-300 hover:shadow-3xl">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
