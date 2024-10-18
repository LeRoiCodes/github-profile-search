import { RepositoryType } from '@/types';

const RepositoryList = ({ repos }: { repos: RepositoryType[] }) => {

return (
    <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Repositories</h3>
        <ul>
            {repos.map((repo) => (
                <li key={repo.id} className="border-b py-2 last:border-b-0">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline dark:text-blue-400">
                        {repo.name}
                    </a>
                    <p className="text-gray-600 dark:text-gray-400">{repo.description || 'No description available.'}</p>
                    <p className="text-gray-500 dark:text-gray-400">⭐ {repo.stargazers_count} / 🍴 {repo.forks_count}</p>
                </li>
            ))}
        </ul>
    </div>
);
}

export default RepositoryList;
