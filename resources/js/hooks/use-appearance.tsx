import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    // Force light mode - remove any dark class
    document.documentElement.classList.remove('dark');
};

export function initializeTheme() {
    // Force light mode
    applyTheme('light');

    // Set light mode in storage
    localStorage.setItem('appearance', 'light');
    setCookie('appearance', 'light');
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('light');

    const updateAppearance = useCallback((mode: Appearance) => {
        // Always force light mode
        setAppearance('light');

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', 'light');

        // Store in cookie for SSR...
        setCookie('appearance', 'light');

        applyTheme('light');
    }, []);

    useEffect(() => {
        // Always force light mode
        updateAppearance('light');
    }, [updateAppearance]);

    return { appearance: 'light' as const, updateAppearance } as const;
}
