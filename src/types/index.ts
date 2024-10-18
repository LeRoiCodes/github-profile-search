export interface UserProfileType {
    login: string;
    avatar_url: string;
    bio: string;
    location?: string;
    public_repos: number;
    repos_url: string;
}

export interface RepositoryType {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
}
