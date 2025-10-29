# Project Overview

This is a Next.js project for SocialHub, a social media management hub. The frontend design is based on a Figma project. It uses Supabase for the backend and provides user authentication and a dashboard.

## Building and Running

To build and run this project, you need to have Node.js and npm installed.

1.  **Install dependencies:**

    ```bash
    npm i
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

3.  **Create a production build:**

    ```bash
    npm run build
    ```

4.  **Start the production server:**

    ```bash
    npm run start
    ```

5.  **Lint the code:**

    ```bash
    npm run lint
    ```

## Development Conventions

*   **Framework:** The project uses the [Next.js](https://nextjs.org/) framework.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) is used for styling, with `tailwind.config.ts` for configuration.
*   **UI Components:** The project uses a combination of custom components and components from [Radix UI](https://www.radix-ui.com/).
*   **Authentication:** User authentication is handled by [Supabase](https://supabase.io/).
*   **Code Quality:** [ESLint](https://eslint.org/) is used for linting the code.
*   **Type Checking:** [TypeScript](https://www.typescriptlang.org/) is used for static type checking.

## Features

### Random Search

The random search feature allows users to get a list of random content based on a category and a description. The content is currently mocked, but it demonstrates the flow of the feature.