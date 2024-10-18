import Image from 'next/image';
import { useEffect, useState } from 'react';



const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            setIsDarkMode(currentTheme === 'dark');
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const newTheme = !isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
        >
            {isDarkMode ? (<Image src='/idea (1).png' alt='dark mode' width={50} height={50} />) : (<Image src='/idea.png' alt='light mode' width={50} height={50} />) }
        </button>
    );
};

export default ThemeToggle;
