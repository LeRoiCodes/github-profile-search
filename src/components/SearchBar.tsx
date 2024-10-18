import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (username: string) => void }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onSearch(username);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center mb-4">
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
