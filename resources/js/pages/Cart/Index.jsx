import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TransText } from '@/components/TransText';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartIndex({ cartItems, total, auth }) {
    const { flash } = usePage().props;

    const updateQuantity = (item, newQuantity) => {
        if (newQuantity < 1) return;

        if (auth.user) {
            // For authenticated users
            router.put(route('cart.update', item.id), {
                quantity: newQuantity
            }, {
                preserveScroll: true,
            });
        } else {
            // For guest users
            router.put(route('cart.update.session', item.product.id), {
                quantity: newQuantity
            }, {
                preserveScroll: true,
            });
        }
    };

    const removeItem = (item) => {
        if (auth.user) {
            // For authenticated users
            router.delete(route('cart.remove', item.id), {
                preserveScroll: true,
            });
        } else {
            // For guest users
            router.delete(route('cart.remove.session', item.product.id), {
                preserveScroll: true,
            });
        }
    };

    const clearCart = () => {
        router.delete(route('cart.clear'), {
            preserveScroll: true,
        });
    };

    const proceedToCheckout = () => {
        if (auth.user) {
            router.get(route('orders.checkout'));
        } else {
            router.get(route('login'));
        }
    };

    return (
        <AppShell>
            <Head title="Shopping Cart" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        <TransText en="Shopping Cart" fr="Panier d'Achat" ar="سلة التسوق" />
                    </h1>
                    <p className="text-gray-600">
                        {cartItems.length === 0 ? (
                            <TransText en="Your cart is empty" fr="Votre panier est vide" ar="سلة التسوق فارغة" />
                        ) : (
                            <TransText 
                                en={`${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`}
                                fr={`${cartItems.length} article${cartItems.length !== 1 ? 's' : ''} dans votre panier`}
                                ar={`${cartItems.length} ${cartItems.length !== 1 ? 'عناصر' : 'عنصر'} في سلة التسوق`}
                            />
                        )}
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mb-6">
                            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                                <TransText en="Your cart is empty" fr="Votre panier est vide" ar="سلة التسوق فارغة" />
                            </h2>
                            <p className="text-gray-500">
                                <TransText 
                                    en="Start shopping to add items to your cart"
                                    fr="Commencez à faire vos achats pour ajouter des articles à votre panier"
                                    ar="ابدأ التسوق لإضافة عناصر إلى سلة التسوق"
                                />
                            </p>
                        </div>
                        <Link href={route('products.index')}>
                            <Button size="lg" className="flex items-center gap-2">
                                <TransText en="Continue Shopping" fr="Continuer les Achats" ar="متابعة التسوق" />
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id || item.product.id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                                                {item.is_custom ? (
                                                    <>
                                                        {/* T-shirt base image */}
                                                        <img
                                                            src={`/images/${item.tshirt_image || (item.custom_color === 'black' ? 'black.jpg' : 'white.jpg')}`}
                                                            alt={`${item.custom_color} T-shirt`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {/* Custom design overlay */}
                                                        {item.custom_design_path && (
                                                            <div className="absolute inset-2 bg-white/80 rounded flex items-center justify-center">
                                                                <img
                                                                    src={`/storage/${item.custom_design_path}`}
                                                                    alt="Custom Design"
                                                                    className="max-w-full max-h-full object-contain"
                                                                />
                                                            </div>
                                                        )}
                                                    </>
                                                ) : item.product.image ? (
                                                    <img
                                                        src={`/storage/${item.product.image}`}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        📷
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">
                                                            {item.is_custom ? (
                                                                <span className="text-orange-600">
                                                                    Custom T-Shirt ({item.custom_color})
                                                                </span>
                                                            ) : (
                                                                <Link
                                                                    href={route('products.show', item.product.id)}
                                                                    className="hover:text-blue-600 transition-colors"
                                                                >
                                                                    {item.product.name}
                                                                </Link>
                                                            )}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            {item.is_custom ? 'Custom Design' : item.product.category.name}
                                                        </p>
                                                        {item.is_custom && (
                                                            <div className="mt-1">
                                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                                    🎨 Custom Design
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeItem(item)}
                                                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                if (value >= 1 && value <= item.product.stock) {
                                                                    updateQuantity(item, value);
                                                                }
                                                            }}
                                                            min="1"
                                                            max={item.product.stock}
                                                            className="w-16 text-center"
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item, item.quantity + 1)}
                                                            disabled={item.quantity >= item.product.stock}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold">
                                                            {item.is_custom
                                                                ? (item.custom_price * item.quantity).toFixed(2)
                                                                : (item.product.price * item.quantity).toFixed(2)
                                                            } DH
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {item.is_custom ? item.custom_price : item.product.price} DH{' '}
                                                            <TransText en="each" fr="chacun" ar="لكل" />
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Stock Warning */}
                                                {item.quantity > item.product.stock && (
                                                    <p className="text-red-600 text-sm mt-2">
                                                        <TransText 
                                                            en={`Only ${item.product.stock} items available`}
                                                            fr={`Seulement ${item.product.stock} articles disponibles`}
                                                            ar={`${item.product.stock} عناصر متاحة فقط`}
                                                        />
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Clear Cart Button */}
                            <div className="flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={clearCart}
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                    <TransText en="Clear Cart" fr="Vider le Panier" ar="مسح السلة" />
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle>
                                        <TransText en="Order Summary" fr="Résumé de la Commande" ar="ملخص الطلب" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>
                                                <TransText en="Subtotal" fr="Sous-total" ar="المجموع الفرعي" />
                                            </span>
                                            <span>{total.toFixed(2)} DH</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>
                                                <TransText en="Shipping" fr="Livraison" ar="الشحن" />
                                            </span>
                                            <span>
                                                <TransText en="Free" fr="Gratuit" ar="مجاني" />
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>
                                                <TransText en="Tax" fr="Taxe" ar="الضريبة" />
                                            </span>
                                            <span>
                                                <TransText en="Calculated at checkout" fr="Calculé à la caisse" ar="يُحسب عند الدفع" />
                                            </span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>
                                            <TransText en="Total" fr="Total" ar="الإجمالي" />
                                        </span>
                                        <span>{total.toFixed(2)} DH</span>
                                    </div>

                                    <Button
                                        onClick={proceedToCheckout}
                                        size="lg"
                                        className="w-full"
                                    >
                                        {auth.user ? (
                                            <TransText en="Proceed to Checkout" fr="Passer à la Caisse" ar="المتابعة إلى الدفع" />
                                        ) : (
                                            <TransText en="Login to Checkout" fr="Se Connecter pour Payer" ar="تسجيل الدخول للدفع" />
                                        )}
                                    </Button>

                                    <Link href={route('products.index')}>
                                        <Button variant="outline" size="lg" className="w-full">
                                            <TransText en="Continue Shopping" fr="Continuer les Achats" ar="متابعة التسوق" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
