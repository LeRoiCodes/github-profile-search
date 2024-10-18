# GitHub User Profile Search Application

A web application built with Next.js, TypeScript, and Tailwind CSS that allows users to search for GitHub profiles by username and view relevant information, including user avatars, bios, and public repositories.


## Features

- **Search Functionality**: Users can input a GitHub username to fetch and display their profile information.
- **User Profile Display**: Shows avatar, username, bio, location (if available), and the number of public repositories.
- **Repository List**: Displays a list of the user's public repositories, including names, descriptions, star counts, and fork counts.
- **Pagination**: If a user has more than 20 repositories, pagination is implemented to navigate through repositories.
- **Responsive Design**: The application is fully responsive and looks great on various screen sizes.
- **Theme Toggle**: Users can switch between light and dark themes for better accessibility.

## Bonus
- **Loading and Error Handling**: Displays loading indicators and error messages for better user experience.
- **Dynamic Routing**: Each user's profile can be accessed via a dynamic route (e.g., `/user/octocat`).

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- GitHub API

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/github-user-profile-search.git

2. Navigate into the project directory:

   ```bash
   cd github-user-profile-search

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install

### Running Application

1. To run the application in development mode, use the following command:

    ```bash
    npm run dev
    # or
    yarn dev

2. Open your browser and go to http://localhost:3000 to view the application.