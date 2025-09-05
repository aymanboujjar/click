import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useCallback } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = useCallback((e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    }, [post, reset]);

    return (
        <AuthLayout  >
            <Head title="Log in" />

            {status && <div className="mb-6 text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-2xl p-4">{status}</div>}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-900">Email Address</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@example.com"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-900">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="h-14 px-4 text-base border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3 py-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-2 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded-md"
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-700 font-medium cursor-pointer">Remember me for 30 days</Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-3" />}
                        {processing ? 'Signing in...' : 'Sign In'}
                    </Button>
                </div>

                <div className="text-center pt-4 border-t border-gray-200/50">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <TextLink href={route('register')} tabIndex={6} className="text-orange-500 hover:text-orange-600 font-semibold transition-colors">
                            Create account
                        </TextLink>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
