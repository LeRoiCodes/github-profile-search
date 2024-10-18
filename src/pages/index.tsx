
import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';
import RepositoryList from '@/components/RepositoryList';
import ThemeToggle from '@/components/ThemeToggle';
import { User } from '@/types/User';
import Image from 'next/image';

const HomePage = () => {
    const [userData, setUserData] = useState<User | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [repos, setRepos] = useState<any[]>([]); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(20);
    const [totalCount, setTotalCount] = useState(0);

    const handleSearch = async (username: string) => {
        setLoading(true);
        setError('');
        setUserData(null)
        setRepos([])
        setTotalCount(0)
        setCurrentPage(1); // Reset to first page on new search

        try {
            const userResponse = await fetch(`https://api.github.com/users/${username}`);


            if (userResponse.status === 403) {
            const rateLimitResponse = await fetch('https://api.github.com/rate_limit');
            const rateLimitData = await rateLimitResponse.json();
            const resetTime = new Date(rateLimitData.rate.reset * 1000);
            throw new Error( `Rate limit exceeded. Try again at ${resetTime.toLocaleTimeString()}.`);
        } else if (!userResponse.ok) {
            throw new Error('User not found');
        }
            const user = await userResponse.json();

            // Fetch repositories for the first page
            await fetchRepos(user.repos_url, 1);

            // Get total count for pagination
            const totalCountResponse = await fetch(user.repos_url);
            const totalRepos = await totalCountResponse.json();
            setTotalCount(totalRepos.length); // Set the total count
            setUserData(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchRepos = async (reposUrl: string, page: number) => {
        setLoading(true);
        setError('');

        try {
            const reposResponse = await fetch(`${reposUrl}?per_page=${perPage}&page=${page}`);
            const repositories = await reposResponse.json();

            setRepos(repositories);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userData) {
            fetchRepos(userData.repos_url, currentPage); // Fetch repos for the current page
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, userData]); // Fetch whenever currentPage or userData changes

    const totalPages = Math.ceil(totalCount / perPage);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-bold mb-2 md:mb-0"><Image src="/Logo2.png" alt='leRoi codes' width={50} height={50}/></div>
                    <h1 className="text-3xl text-center md:text-left">GitHub Profile Search</h1>
                    <ThemeToggle  />
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4">
                <SearchBar onSearch={handleSearch} />
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {userData && <UserProfile user={userData} />}
                {repos.length > 0 && <RepositoryList repos={repos} />}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="bg-blue-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="self-center dark:text-white">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="bg-blue-600 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
            <footer className="bg-blue-600 text-white p-4">
                <div className="container mx-auto text-center">
                    &copy; {new Date().getFullYear()} Leroi Coded with love
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

