import { UserProfileType } from '@/types';

const UserProfile = ({ user }: { user: UserProfileType }) => {
 
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4 dark:bg-gray-800 dark:text-white">
            <div className="flex items-center">
                <img src={user.avatar_url} alt={user.login} className="w-32 h-32 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-bold">{user.login}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{user.bio || 'No bio available.'}</p>
                    <p className="text-gray-500 dark:text-gray-400">{user.location || 'Location not specified.'}</p>
                    <p className="mt-2">
                        <span className="font-semibold">{user.public_repos}</span> public repositories
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

