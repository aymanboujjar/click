import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import {
    ShoppingCart,
    User,
    Menu,
    X,
    Package,
    History,
    LogOut,
    Settings,
    ChevronDown
} from 'lucide-react';

export function Navbar() {
    const { auth, flash, cartCount } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logout = () => {
        router.post(route('logout'));
    };

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center space-x-3">
                        <img
                            src="/images/Picsart_25-06-27_11-57-09-084.png"
                            alt="ClickTee"
                            className="h-10 w-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <span className="text-3xl font-bold text-orange-500 tracking-tight">
                            CLICKTEE
                        </span>
                    </Link>


                    {/* Desktop Navigation */}
                    {/* <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href={route('products.index')}
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            href={route('categories.index')}
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Categories
                        </Link>
                    </div> */}

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        <Link href={route('cart.index')}>
                            <Button variant="ghost" size="sm" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
                                    >
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {/* User Menu */}
                        {auth.user ? (
                            <div className="relative">
                                <div className="hidden md:flex items-center space-x-4">
                                    {auth.user.role === 'admin' && (
                                        <Link href={route('admin.dashboard')}>
                                            <Button variant="outline" size="sm">
                                                Admin Panel
                                            </Button>
                                        </Link>
                                    )}

                                    {/* User Dropdown Menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                    {auth.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                {/* <span className="text-sm text-gray-700">{auth.user.name}</span> */}
                                                <ChevronDown className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-80 p-2">
                                            {/* User Info Card */}
                                            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg mb-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                                                        {auth.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{auth.user.name}</p>
                                                        <p className="text-sm text-gray-600">{auth.user.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <DropdownMenuSeparator />

                                            {/* Orders Card */}
                                            <DropdownMenuItem asChild className="p-0">
                                                <Link href={route('orders.index')} className="block">
                                                    <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                <History className="h-5 w-5 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">Orders</p>
                                                                <p className="text-sm text-gray-600">View your order history</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>

                                            {/* Settings Card */}
                                            {/* <DropdownMenuItem asChild className="p-0">
                                                <Link href={route('profile.edit')} className="block">
                                                    <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                                <Settings className="h-5 w-5 text-green-600" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">Settings</p>
                                                                <p className="text-sm text-gray-600">Manage your profile and account</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem> */}

                                            <DropdownMenuSeparator />

                                            {/* Logout Card */}
                                            <DropdownMenuItem asChild className="p-0">
                                                <button onClick={logout} className="w-full">
                                                    <div className="p-4 hover:bg-red-50 rounded-lg transition-colors">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                                <LogOut className="h-5 w-5 text-red-600" />
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="font-medium text-gray-900">Logout</p>
                                                                <p className="text-sm text-gray-600">Sign out of your account</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link href={route('login')}>
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* <Link
                                href={route('products.index')}
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link
                                href={route('categories.index')}
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Categories
                            </Link> */}

                            {auth.user ? (
                                <>
                                    <div className="px-3 py-2 border-t">
                                        {/* <div className="flex items-center space-x-2 mb-2">
                                            <User className="h-4 w-4 text-gray-600" />
                                            <span className="text-sm font-medium text-gray-700">{auth.user.name}</span>
                                        </div> */}

                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="block py-1 text-sm text-blue-600 hover:text-blue-800"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Admin Panel
                                            </Link>
                                        )}

                                        {/* <Link
                                            href={route('dashboard')}
                                            className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link> */}
                                        <Link
                                            href={route('orders.index')}
                                            className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Order History
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="block py-1 text-sm text-red-600 hover:text-red-800"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="px-3 py-2 border-t space-y-2">
                                    <Link
                                        href={route('login')}
                                        className="block text-center py-2 text-gray-700 hover:text-blue-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="block text-center py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
