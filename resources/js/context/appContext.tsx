import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
    selectedLanguage: 'en' | 'fr' | 'ar';
    setSelectedLanguage: (lang: 'en' | 'fr' | 'ar') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [selectedLanguage, setSelectedLanguageState] = useState<'en' | 'fr' | 'ar'>(() => {
        // Get from localStorage or default to 'en'
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('selectedLanguage');
            if (saved === 'en' || saved === 'fr' || saved === 'ar') {
                return saved;
            }
        }
        return 'en';
    });

    const setSelectedLanguage = (lang: 'en' | 'fr' | 'ar') => {
        setSelectedLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedLanguage', lang);
            // Update HTML lang attribute
            document.documentElement.lang = lang;
        }
    };

    useEffect(() => {
        // Set initial HTML lang attribute
        if (typeof window !== 'undefined') {
            document.documentElement.lang = selectedLanguage;
        }
    }, [selectedLanguage]);

    return (
        <AppContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}

