import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeHook() {
    const { systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return {
        isThemeReady: mounted,
        systemTheme: mounted ? systemTheme : undefined,
    };
}
