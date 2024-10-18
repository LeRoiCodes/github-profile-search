export interface User {
    login: string;
    avatar_url: string;
    repos_url: string;
    bio: string;
    location?: string;
    public_repos: number;
}