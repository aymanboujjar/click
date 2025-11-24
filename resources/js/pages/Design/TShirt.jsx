import React, { useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { TransText } from '@/components/TransText';
import { useAppContext } from '@/context/appContext';
import { ArrowLeft, Upload, X, ShoppingCart, RotateCw, Move, Maximize2, Minimize2, RotateCcw, Shirt } from 'lucide-react';

export default function TShirtDesign() {
    const { selectedLanguage } = useAppContext();
    // T-shirt customization state
    const [selectedColor, setSelectedColor] = useState('white');
    const [frontDesign, setFrontDesign] = useState(null);
    const [frontDesignPreview, setFrontDesignPreview] = useState(null);
    const [backDesign, setBackDesign] = useState(null);
    const [backDesignPreview, setBackDesignPreview] = useState(null);
    const [activeSide, setActiveSide] = useState('front'); // 'front' or 'back' - which side is being adjusted
    
    // Design adjustment state (shared for both sides, or separate if needed)
    const [frontPosition, setFrontPosition] = useState({ x: 50, y: 50 });
    const [frontScale, setFrontScale] = useState(50);
    const [frontRotation, setFrontRotation] = useState(0);
    
    const [backPosition, setBackPosition] = useState({ x: 50, y: 50 });
    const [backScale, setBackScale] = useState(50);
    const [backRotation, setBackRotation] = useState(0);
    
    const previewRef = useRef(null);
    const previewTshirtImage = '/images/white.jpg'; // Always render the white tee in the live preview
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const handleFrontDesignUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFrontDesign(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFrontDesignPreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setActiveSide('front');
        }
    };

    const handleBackDesignUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setBackDesign(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackDesignPreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setActiveSide('back');
        }
    };

    const removeFrontDesign = () => {
        setFrontDesign(null);
        setFrontDesignPreview(null);
        setFrontPosition({ x: 50, y: 50 });
        setFrontScale(50);
        setFrontRotation(0);
    };

    const removeBackDesign = () => {
        setBackDesign(null);
        setBackDesignPreview(null);
        setBackPosition({ x: 50, y: 50 });
        setBackScale(50);
        setBackRotation(0);
    };

    const resetAdjustments = () => {
        if (activeSide === 'front') {
            setFrontPosition({ x: 50, y: 50 });
            setFrontScale(50);
            setFrontRotation(0);
        } else {
            setBackPosition({ x: 50, y: 50 });
            setBackScale(50);
            setBackRotation(0);
        }
    };

    // Convert scale percentage to actual scale (50% = 1.0, 0% = 0.5, 100% = 1.5)
    const getScaleValue = (scaleValue) => {
        return 0.5 + (scaleValue / 100);
    };

    // Get current adjustment values based on active side
    const getCurrentPosition = () => activeSide === 'front' ? frontPosition : backPosition;
    const getCurrentScale = () => activeSide === 'front' ? frontScale : backScale;
    const getCurrentRotation = () => activeSide === 'front' ? frontRotation : backRotation;
    
    const setCurrentPosition = (pos) => {
        if (activeSide === 'front') {
            setFrontPosition(pos);
        } else {
            setBackPosition(pos);
        }
    };
    
    const setCurrentScale = (scaleValue) => {
        if (activeSide === 'front') {
            setFrontScale(scaleValue);
        } else {
            setBackScale(scaleValue);
        }
    };
    
    const setCurrentRotation = (rot) => {
        if (activeSide === 'front') {
            setFrontRotation(rot);
        } else {
            setBackRotation(rot);
        }
    };

    const addToCart = () => {
        if (!selectedColor || (!frontDesign && !backDesign)) {
            const message = selectedLanguage === 'fr' 
                ? 'Veuillez sélectionner une couleur de t-shirt et télécharger au moins un design (devant ou dos).'
                : selectedLanguage === 'ar'
                ? 'يرجى اختيار لون القميص وتحميل تصميم واحد على الأقل (أمامي أو خلفي).'
                : 'Please select a t-shirt color and upload at least one design (front or back).';
            alert(message);
            return;
        }

        const formData = new FormData();
        if (csrfToken) {
            formData.append('_token', csrfToken);
        }
        formData.append('color', selectedColor);
        formData.append('quantity', 1);
        
        // Front design
        if (frontDesign) {
            formData.append('front_design', frontDesign);
            formData.append('front_position_x', frontPosition.x);
            formData.append('front_position_y', frontPosition.y);
            formData.append('front_scale', frontScale);
            formData.append('front_rotation', frontRotation);
        }
        
        // Back design
        if (backDesign) {
            formData.append('back_design', backDesign);
            formData.append('back_position_x', backPosition.x);
            formData.append('back_position_y', backPosition.y);
            formData.append('back_scale', backScale);
            formData.append('back_rotation', backRotation);
        }

        router.post(route('custom.tshirt.add-to-cart'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                // Reset form after successful submission
                setSelectedColor('white');
                setFrontDesign(null);
                setFrontDesignPreview(null);
                setBackDesign(null);
                setBackDesignPreview(null);
                setFrontPosition({ x: 50, y: 50 });
                setFrontScale(50);
                setFrontRotation(0);
                setBackPosition({ x: 50, y: 50 });
                setBackScale(50);
                setBackRotation(0);
                setActiveSide('front');
            },
            onError: (errors) => {
                console.error('Error adding to cart:', errors);
            }
        });
    };

    return (
        <AppShell>
            <Head title="Design Your T-Shirt" />

            <div className="bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 min-h-screen">
                <div className="container mx-auto px-6 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('home')}
                            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors font-medium mb-4"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <TransText en="Back to Home" fr="Retour à l'Accueil" ar="العودة للصفحة الرئيسية" />
                        </Link>

                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                <TransText 
                                    en="Design Your Custom T-Shirt"
                                    fr="Créez Votre T-Shirt Personnalisé"
                                    ar="صمم قميصك المخصص"
                                />
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                <TransText 
                                    en="Create your unique t-shirt design. Choose your color, upload your artwork, adjust it perfectly, and bring your vision to life."
                                    fr="Créez votre design de t-shirt unique. Choisissez votre couleur, téléchargez votre œuvre, ajustez-la parfaitement et donnez vie à votre vision."
                                    ar="أنشئ تصميم قميصك الفريد. اختر لونك، ارفع تصميمك، اضبطه بشكل مثالي، وحقق رؤيتك."
                                />
                            </p>
                        </div>
                    </div>

                    {/* Main Design Section */}
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white border-2 border-orange-200 rounded-3xl p-8 md:p-12 shadow-xl">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Left Side - Preview */}
                                <div className="space-y-6">
                                <div className="text-center">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            <TransText en="Live Preview" fr="Aperçu en Direct" ar="معاينة مباشرة" />
                                        </h2>
                                        
                                        {/* T-Shirt Preview with Design Overlay */}
                                        <div className="space-y-4">
                                            {/* Front View */}
                                            {frontDesignPreview && (
                                                <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
                                                    <div className="text-sm text-gray-600 mb-2 font-medium">
                                                        <TransText en="Front" fr="Devant" ar="أمامي" />
                                                    </div>
                                                    <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                                                        <img
                                                            src={previewTshirtImage}
                                                            alt="White T-shirt front preview"
                                                            className="w-full h-auto"
                                                        />
                                                        {/* Front Design Overlay */}
                                                        <div
                                                            className="absolute"
                                                            style={{
                                                                top: `${frontPosition.y}%`,
                                                                left: `${frontPosition.x}%`,
                                                                transform: `translate(-50%, -50%) scale(${getScaleValue(frontScale)}) rotate(${frontRotation}deg)`,
                                                                transformOrigin: 'center center',
                                                                pointerEvents: 'none',
                                                                maxWidth: '60%',
                                                                maxHeight: '60%',
                                                            }}
                                                        >
                                                            <img
                                                                src={frontDesignPreview}
                                                                alt="Front design overlay"
                                                                className="w-full h-auto"
                                                                style={{ 
                                                                    filter: selectedColor === 'black' 
                                                                        ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))' 
                                                                        : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Back View */}
                                            {backDesignPreview && (
                                                <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
                                                    <div className="text-sm text-gray-600 mb-2 font-medium">
                                                        <TransText en="Back" fr="Dos" ar="خلفي" />
                                                    </div>
                                                    <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                                                        <img
                                                            src={previewTshirtImage}
                                                            alt="White T-shirt back preview"
                                                            className="w-full h-auto"
                                                        />
                                                        {/* Back Design Overlay */}
                                                        <div
                                                            className="absolute"
                                                            style={{
                                                                top: `${backPosition.y}%`,
                                                                left: `${backPosition.x}%`,
                                                                transform: `translate(-50%, -50%) scale(${getScaleValue(backScale)}) rotate(${backRotation}deg)`,
                                                                transformOrigin: 'center center',
                                                                pointerEvents: 'none',
                                                                maxWidth: '60%',
                                                                maxHeight: '60%',
                                                            }}
                                                        >
                                                            <img
                                                                src={backDesignPreview}
                                                                alt="Back design overlay"
                                                                className="w-full h-auto"
                                                                style={{ 
                                                                    filter: selectedColor === 'black' 
                                                                        ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))' 
                                                                        : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
                                                                }}
                                                            />
                                                </div>
                                            </div>
                                        </div>
                                            )}
                                            
                                            {!frontDesignPreview && !backDesignPreview && (
                                                <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
                                                    <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                                                        <img
                                                            src={previewTshirtImage}
                                                            alt="White T-shirt preview"
                                                            className="w-full h-auto opacity-50"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                        {/* Color Selection */}
                                        <div className="flex justify-center gap-4 mt-6">
                                            <button
                                                onClick={() => setSelectedColor('white')}
                                                className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                                                    selectedColor === 'white'
                                                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                <TransText en="White" fr="Blanc" ar="أبيض" />
                                            </button>
                                            <button
                                                onClick={() => setSelectedColor('black')}
                                                className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                                                    selectedColor === 'black'
                                                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                <TransText en="Black" fr="Noir" ar="أسود" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Controls */}
                                <div className="space-y-6">
                                    {/* Step 1: Upload Front Design */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            <TransText 
                                                en="Step 1: Upload Front Design"
                                                fr="Étape 1 : Télécharger le Design Avant"
                                                ar="الخطوة 1: رفع التصميم الأمامي"
                                            />
                                        </h3>
                                        {!frontDesignPreview ? (
                                            <div className="border-2 border-dashed border-orange-300 rounded-2xl p-6 text-center hover:border-orange-400 transition-colors bg-orange-50">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFrontDesignUpload}
                                                    className="hidden"
                                                    id="front-design-upload"
                                                />
                                                <label htmlFor="front-design-upload" className="cursor-pointer">
                                                    <Upload className="h-10 w-10 text-orange-400 mx-auto mb-3" />
                                                    <h4 className="text-gray-900 font-bold text-base mb-1">
                                                        <TransText 
                                                            en="Click to upload front design"
                                                            fr="Cliquez pour télécharger le design avant"
                                                            ar="انقر لرفع التصميم الأمامي"
                                                        />
                                                    </h4>
                                                    <p className="text-gray-600 text-xs mb-1">
                                                        <TransText 
                                                            en="PNG, JPG up to 10MB"
                                                            fr="PNG, JPG jusqu'à 10 Mo"
                                                            ar="PNG، JPG حتى 10 ميجابايت"
                                                        />
                                                    </p>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={frontDesignPreview}
                                                            alt="Front design preview"
                                                            className="w-12 h-12 object-cover rounded-lg border-2 border-green-300"
                                                        />
                                                        <div>
                                                            <h4 className="font-bold text-green-800 text-sm">
                                                                <TransText 
                                                                    en="✓ Front Design Uploaded!"
                                                                    fr="✓ Design Avant Téléchargé !"
                                                                    ar="✓ تم رفع التصميم الأمامي!"
                                                                />
                                                            </h4>
                                                            <p className="text-green-600 text-xs">
                                                                <TransText 
                                                                    en="Click to adjust"
                                                                    fr="Cliquez pour ajuster"
                                                                    ar="انقر للضبط"
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setActiveSide('front')}
                                                            className={`text-xs ${activeSide === 'front' ? 'bg-orange-100 border-orange-300' : ''}`}
                                                        >
                                                            <TransText en="Adjust" fr="Ajuster" ar="ضبط" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={removeFrontDesign}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Step 2: Upload Back Design */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            <TransText 
                                                en="Step 2: Upload Back Design (Optional)"
                                                fr="Étape 2 : Télécharger le Design Dos (Optionnel)"
                                                ar="الخطوة 2: رفع التصميم الخلفي (اختياري)"
                                            />
                                        </h3>
                                        {!backDesignPreview ? (
                                            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors bg-blue-50">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                    onChange={handleBackDesignUpload}
                                                className="hidden"
                                                    id="back-design-upload"
                                                />
                                                <label htmlFor="back-design-upload" className="cursor-pointer">
                                                    <Upload className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                                                    <h4 className="text-gray-900 font-bold text-base mb-1">
                                                        <TransText 
                                                            en="Click to upload back design"
                                                            fr="Cliquez pour télécharger le design dos"
                                                            ar="انقر لرفع التصميم الخلفي"
                                                        />
                                                    </h4>
                                                    <p className="text-gray-600 text-xs mb-1">
                                                        <TransText 
                                                            en="PNG, JPG up to 10MB"
                                                            fr="PNG, JPG jusqu'à 10 Mo"
                                                            ar="PNG، JPG حتى 10 ميجابايت"
                                                        />
                                                    </p>
                                                    <p className="text-blue-600 font-medium text-xs mt-1">
                                                        <TransText 
                                                            en="Optional - Add a different design for the back"
                                                            fr="Optionnel - Ajoutez un design différent pour le dos"
                                                            ar="اختياري - أضف تصميمًا مختلفًا للخلف"
                                                        />
                                                    </p>
                                            </label>
                                        </div>
                                    ) : (
                                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={backDesignPreview}
                                                            alt="Back design preview"
                                                            className="w-12 h-12 object-cover rounded-lg border-2 border-green-300"
                                                        />
                                                        <div>
                                                            <h4 className="font-bold text-green-800 text-sm">
                                                                <TransText 
                                                                    en="✓ Back Design Uploaded!"
                                                                    fr="✓ Design Dos Téléchargé !"
                                                                    ar="✓ تم رفع التصميم الخلفي!"
                                                                />
                                                            </h4>
                                                            <p className="text-green-600 text-xs">
                                                                <TransText 
                                                                    en="Click to adjust"
                                                                    fr="Cliquez pour ajuster"
                                                                    ar="انقر للضبط"
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setActiveSide('back')}
                                                            className={`text-xs ${activeSide === 'back' ? 'bg-orange-100 border-orange-300' : ''}`}
                                                        >
                                                            <TransText en="Adjust" fr="Ajuster" ar="ضبط" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={removeBackDesign}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Step 3: Adjust Design */}
                                    {(frontDesignPreview || backDesignPreview) && (
                                        <div className="border-t border-gray-200 pt-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    <TransText 
                                                        en={`Step 3: Adjust ${activeSide === 'front' ? 'Front' : 'Back'} Design`}
                                                        fr={`Étape 3 : Ajuster le Design ${activeSide === 'front' ? 'Avant' : 'Dos'}`}
                                                        ar={`الخطوة 3: ضبط التصميم ${activeSide === 'front' ? 'الأمامي' : 'الخلفي'}`}
                                                    />
                                                </h3>
                                                <div className="flex gap-2">
                                                    {frontDesignPreview && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setActiveSide('front')}
                                                            className={`text-xs ${activeSide === 'front' ? 'bg-orange-500 text-white border-orange-500' : ''}`}
                                                        >
                                                            <TransText en="Front" fr="Devant" ar="أمامي" />
                                                        </Button>
                                                    )}
                                                    {backDesignPreview && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setActiveSide('back')}
                                                            className={`text-xs ${activeSide === 'back' ? 'bg-orange-500 text-white border-orange-500' : ''}`}
                                                        >
                                                            <TransText en="Back" fr="Dos" ar="خلفي" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={resetAdjustments}
                                                        className="text-xs"
                                                    >
                                                        <TransText en="Reset" fr="Réinitialiser" ar="إعادة تعيين" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {(activeSide === 'front' && frontDesignPreview) || (activeSide === 'back' && backDesignPreview) ? (
                                                <div className="space-y-6">
                                                    {/* Position Controls */}
                                                    <div>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <Label className="flex items-center gap-2">
                                                                <Move className="h-4 w-4" />
                                                                <TransText en="Position" fr="Position" ar="الموضع" />
                                                            </Label>
                                                            <span className="text-sm text-gray-600">
                                                                X: {getCurrentPosition().x}% | Y: {getCurrentPosition().y}%
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <Label className="text-xs text-gray-600 mb-1 block">
                                                                    <TransText en="Horizontal (X)" fr="Horizontal (X)" ar="أفقي (X)" />
                                                                </Label>
                                                                <Slider
                                                                    value={[getCurrentPosition().x]}
                                                                    onValueChange={(value) => setCurrentPosition({ ...getCurrentPosition(), x: value[0] })}
                                                                    min={0}
                                                                    max={100}
                                                                    step={1}
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs text-gray-600 mb-1 block">
                                                                    <TransText en="Vertical (Y)" fr="Vertical (Y)" ar="عمودي (Y)" />
                                                                </Label>
                                                                <Slider
                                                                    value={[getCurrentPosition().y]}
                                                                    onValueChange={(value) => setCurrentPosition({ ...getCurrentPosition(), y: value[0] })}
                                                                    min={0}
                                                                    max={100}
                                                                    step={1}
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Size Control */}
                                                    <div>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <Label className="flex items-center gap-2">
                                                                <Maximize2 className="h-4 w-4" />
                                                                <TransText en="Size" fr="Taille" ar="الحجم" />
                                                            </Label>
                                                            <span className="text-sm text-gray-600">
                                                                {Math.round((getScaleValue(getCurrentScale()) * 100))}%
                                                            </span>
                                                        </div>
                                                        <Slider
                                                            value={[getCurrentScale()]}
                                                            onValueChange={(value) => setCurrentScale(value[0])}
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            className="w-full"
                                                        />
                                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                            <span><TransText en="Small" fr="Petit" ar="صغير" /></span>
                                                            <span><TransText en="Medium" fr="Moyen" ar="متوسط" /></span>
                                                            <span><TransText en="Large" fr="Grand" ar="كبير" /></span>
                                                        </div>
                                                    </div>

                                                    {/* Rotation Control */}
                                                    <div>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <Label className="flex items-center gap-2">
                                                                <RotateCw className="h-4 w-4" />
                                                                <TransText en="Rotation" fr="Rotation" ar="الدوران" />
                                                            </Label>
                                                            <span className="text-sm text-gray-600">
                                                                {getCurrentRotation()}°
                                                            </span>
                                                        </div>
                                                        <Slider
                                                            value={[getCurrentRotation()]}
                                                            onValueChange={(value) => setCurrentRotation(value[0])}
                                                            min={-180}
                                                            max={180}
                                                            step={1}
                                                            className="w-full"
                                                        />
                                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                            <span>-180°</span>
                                                            <span>0°</span>
                                                            <span>180°</span>
                                                        </div>
                                                        <div className="flex gap-2 mt-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setCurrentRotation(getCurrentRotation() - 15)}
                                                                className="flex-1"
                                                            >
                                                                <RotateCcw className="h-4 w-4 mr-1" />
                                                                -15°
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setCurrentRotation(0)}
                                                                className="flex-1"
                                                            >
                                                                Reset
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setCurrentRotation(getCurrentRotation() + 15)}
                                                                className="flex-1"
                                                            >
                                                                <RotateCw className="h-4 w-4 mr-1" />
                                                                +15°
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm text-center py-4">
                                                    <TransText 
                                                        en={`Please upload a ${activeSide} design first`}
                                                        fr={`Veuillez d'abord télécharger un design ${activeSide === 'front' ? 'avant' : 'dos'}`}
                                                        ar={`يرجى رفع تصميم ${activeSide === 'front' ? 'أمامي' : 'خلفي'} أولاً`}
                                                    />
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Step 4: Complete Your Order */}
                                    {(frontDesignPreview || backDesignPreview) && (
                                        <div className="border-t border-gray-200 pt-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                <TransText 
                                                    en="Step 4: Complete Your Order"
                                                    fr="Étape 4 : Finaliser Votre Commande"
                                                    ar="الخطوة 4: إكمال طلبك"
                                                />
                                            </h3>
                                        <div className="space-y-4">
                                            <Button
                                                size="lg"
                                                onClick={addToCart}
                                                    className="w-full py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 text-white border-0"
                                            >
                                                <ShoppingCart className="h-5 w-5 mr-2" />
                                                <TransText 
                                                    en="Add Custom T-Shirt to Cart - 149 DH"
                                                    fr="Ajouter le T-Shirt Personnalisé au Panier - 149 DH"
                                                    ar="إضافة القميص المخصص إلى السلة - 149 درهم"
                                                />
                                            </Button>
                                                <p className="text-center text-gray-600 text-sm">
                                                    <TransText 
                                                        en={`Your custom ${selectedColor} t-shirt${frontDesignPreview && backDesignPreview ? ' with front and back designs' : frontDesignPreview ? ' with front design' : ' with back design'}`}
                                                        fr={`Votre t-shirt ${selectedColor === 'white' ? 'blanc' : 'noir'} personnalisé${frontDesignPreview && backDesignPreview ? ' avec designs avant et dos' : frontDesignPreview ? ' avec design avant' : ' avec design dos'}`}
                                                        ar={`قميصك المخصص ${selectedColor === 'white' ? 'الأبيض' : 'الأسود'}${frontDesignPreview && backDesignPreview ? ' مع تصميمات أمامية وخلفية' : frontDesignPreview ? ' مع تصميم أمامي' : ' مع تصميم خلفي'}`}
                                                    />
                                            </p>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
