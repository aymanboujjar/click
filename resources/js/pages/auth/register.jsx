import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useCallback } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
        phone: '',
        address: '',
    });

    const submit = useCallback((e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }, [post, reset]);

    return (
        <AuthLayout title="Join CLICKTEE" description="Create your account to start shopping for amazing products">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-900">Full Name</Label>
                        <div className="relative">
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Enter your full name"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-900">Email Address</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="name@example.com"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-semibold text-gray-900">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Create a strong password"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-900">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm your password"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">Phone Number <span className="text-gray-500 font-normal">(Optional)</span></Label>
                        <div className="relative">
                            <Input
                                id="phone"
                                type="tel"
                                tabIndex={5}
                                autoComplete="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                                placeholder="Enter your phone number"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.phone} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-semibold text-gray-900">Address <span className="text-gray-500 font-normal">(Optional)</span></Label>
                        <div className="relative">
                            <Input
                                id="address"
                                type="text"
                                tabIndex={6}
                                autoComplete="street-address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                disabled={processing}
                                placeholder="Enter your address"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.address} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-6 w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        tabIndex={7}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-3" />}
                        {processing ? 'Creating account...' : 'Create Account'}
                    </Button>
                </div>

                <div className="text-center pt-4 border-t border-gray-200/50">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <TextLink href={route('login')} tabIndex={8} className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                            Sign in
                        </TextLink>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
