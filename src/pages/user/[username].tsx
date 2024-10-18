import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import UserProfile from '@/components/UserProfile';
import RepositoryList from '@/components/RepositoryList';
import { User } from '@/types/User';

const UserPage = () => {
    const router = useRouter();
    const { username } = router.query;

    const [userData, setUserData] = useState<User | null>(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(20);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (username) {
            fetchUserData(username as string);
        }
    }, [username]);

    useEffect(() => {
        if (userData) {
            fetchRepos(userData.repos_url, currentPage);
        }
    }, [currentPage, userData]);

    const fetchUserData = async (username: string) => {
        setLoading(true);
        setError('');
        try {
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) throw new Error('User not found');
            const user = await userResponse.json();
            setUserData(user);

            // Fetch initial repos
            await fetchRepos(user.repos_url, currentPage);
            const totalReposResponse = await fetch(user.repos_url);
            const totalRepos = await totalReposResponse.json();
            setTotalCount(totalRepos.length);
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

    const totalPages = Math.ceil(totalCount / perPage);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-bold mb-2 md:mb-0"><Image src="/Logo2.png" alt='leRoi codes' width={50} height={50}/></div>
                    <h1 className="text-3xl text-center md:text-left">GitHub Profile: {username}</h1>
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-grow container mx-auto p-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {userData && <UserProfile user={userData} />}
                {repos.length > 0 && <RepositoryList repos={repos} />}
                
                {/* Pagination Controls */}
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

export default UserPage;
