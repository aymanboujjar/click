import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Palette, Sparkles, ArrowRight } from 'lucide-react';
import { TransText } from '@/components/TransText';

export default function Home() {
    return (
        <AppShell>
            <Head title="Home - Clicktee" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    
                    <div className="relative container mx-auto px-6 py-16 md:py-24">
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <div className="mb-6">
                                <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    <TransText 
                                        en="Welcome to Clicktee"
                                        fr="Bienvenue sur Clicktee"
                                        ar="مرحباً بك في Clicktee"
                                    />
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                <TransText 
                                    en="Create Your Perfect"
                                    fr="Créez Votre"
                                    ar="أنشئ"
                                />
                                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    {' '}<TransText 
                                        en="T-Shirt"
                                        fr="T-Shirt Parfait"
                                        ar="قميصك المثالي"
                                    />
                                </span>
                                <br />
                                <span className="text-3xl md:text-4xl text-gray-700">
                                    <TransText 
                                        en="or Shop Our Collection"
                                        fr="ou Parcourez Notre Collection"
                                        ar="أو تسوق مجموعتنا"
                                    />
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                <TransText 
                                    en="Choose your path: Browse our curated collection of premium products or design your own custom t-shirt with your unique artwork."
                                    fr="Choisissez votre chemin : Parcourez notre collection soigneusement sélectionnée de produits premium ou créez votre propre t-shirt personnalisé avec votre œuvre unique."
                                    ar="اختر مسارك: تصفح مجموعتنا المختارة بعناية من المنتجات المميزة أو صمم قميصك المخصص الخاص بك مع تصميمك الفريد."
                                />
                            </p>
                        </div>

                        {/* Main Options Cards */}
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                            {/* Browse Products Option */}
                            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 hover:border-orange-300 bg-white rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <ShoppingBag className="h-10 w-10 text-white" />
                                    </div>
                                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                                        <TransText 
                                            en="Browse Products"
                                            fr="Parcourir les Produits"
                                            ar="تصفح المنتجات"
                                        />
                                    </CardTitle>
                                    <CardDescription className="text-lg text-gray-600">
                                        <TransText 
                                            en="Explore our curated collection of premium products"
                                            fr="Explorez notre collection soigneusement sélectionnée de produits premium"
                                            ar="استكشف مجموعتنا المختارة بعناية من المنتجات المميزة"
                                        />
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <ul className="space-y-4 mb-8 text-gray-700">
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span><TransText en="Premium quality products" fr="Produits de qualité premium" ar="منتجات عالية الجودة" /></span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span><TransText en="Multiple categories to choose from" fr="Plusieurs catégories au choix" ar="فئات متعددة للاختيار من بينها" /></span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span><TransText en="Fast and free shipping" fr="Livraison rapide et gratuite" ar="شحن سريع ومجاني" /></span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span><TransText en="Secure checkout process" fr="Processus de paiement sécurisé" ar="عملية دفع آمنة" /></span>
                                        </li>
                                    </ul>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        <Link href={route('products.index')}>
                                            <TransText en="View Products" fr="Voir les Produits" ar="عرض المنتجات" />
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Create Custom Design Option */}
                            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 hover:border-orange-300 bg-white rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Palette className="h-10 w-10 text-white" />
                                    </div>
                                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                                        <TransText 
                                            en="Create Custom Design"
                                            fr="Créer un Design Personnalisé"
                                            ar="إنشاء تصميم مخصص"
                                        />
                                    </CardTitle>
                                    <CardDescription className="text-lg text-gray-600">
                                        <TransText 
                                            en="Design your own unique t-shirt with your artwork"
                                            fr="Créez votre propre t-shirt unique avec votre œuvre"
                                            ar="صمم قميصك الفريد الخاص بك مع تصميمك"
                                        />
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <ul className="space-y-4 mb-8 text-gray-700">
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            <span><TransText en="Upload your own design" fr="Téléchargez votre propre design" ar="قم بتحميل تصميمك الخاص" /></span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            <span><TransText en="Choose white or black t-shirt" fr="Choisissez un t-shirt blanc ou noir" ar="اختر قميص أبيض أو أسود" /></span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            <span><TransText en="Adjust design position and size" fr="Ajustez la position et la taille du design" ar="اضبط موضع وحجم التصميم" /></span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            <span><TransText en="See live preview before ordering" fr="Voir l'aperçu en direct avant de commander" ar="شاهد معاينة مباشرة قبل الطلب" /></span>
                                        </li>
                                    </ul>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        <Link href={route('custom.tshirt')}>
                                            <TransText en="Start Designing" fr="Commencer à Créer" ar="ابدأ التصميم" />
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Features Section */}
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    <TransText 
                                        en="Why Choose Clicktee?"
                                        fr="Pourquoi Choisir Clicktee?"
                                        ar="لماذا تختار Clicktee؟"
                                    />
                                </h2>
                                <p className="text-lg text-gray-600">
                                    <TransText 
                                        en="We make it easy to find what you love or create something unique"
                                        fr="Nous facilitons la recherche de ce que vous aimez ou la création de quelque chose d'unique"
                                        ar="نسهل عليك العثور على ما تحبه أو إنشاء شيء فريد"
                                    />
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-4xl mb-4">🚚</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        <TransText en="Free Shipping" fr="Livraison Gratuite" ar="شحن مجاني" />
                                    </h3>
                                    <p className="text-gray-600">
                                        <TransText 
                                            en="On all orders, no minimum purchase required"
                                            fr="Sur toutes les commandes, aucun achat minimum requis"
                                            ar="على جميع الطلبات، لا يوجد حد أدنى للشراء"
                                        />
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-4xl mb-4">✨</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        <TransText en="Premium Quality" fr="Qualité Premium" ar="جودة ممتازة" />
                                    </h3>
                                    <p className="text-gray-600">
                                        <TransText 
                                            en="High-quality materials and printing"
                                            fr="Matériaux et impression de haute qualité"
                                            ar="مواد وطباعة عالية الجودة"
                                        />
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                                    <div className="text-4xl mb-4">🎨</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        <TransText en="Custom Designs" fr="Designs Personnalisés" ar="تصاميم مخصصة" />
                                    </h3>
                                    <p className="text-gray-600">
                                        <TransText 
                                            en="Full control over your design"
                                            fr="Contrôle total sur votre design"
                                            ar="تحكم كامل في تصميمك"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-8 left-8 w-12 h-12 bg-orange-200 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-8 right-8 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 right-12 w-8 h-8 bg-orange-300 rounded-full opacity-30 animate-pulse delay-500"></div>
                </div>
            </div>
        </AppShell>
    );
}

