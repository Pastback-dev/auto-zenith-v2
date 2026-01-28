# AI Rules for Lovable Project

This document outlines the core technologies used in this project and provides clear guidelines on which libraries to use for specific functionalities. Adhering to these rules ensures consistency, maintainability, and optimal performance across the application.

## Tech Stack Overview

This project is built using a modern web development stack, focusing on performance, developer experience, and a rich user interface.

*   **Vite**: A fast build tool that provides an instant development server and optimized builds.
*   **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and developer productivity.
*   **React**: A declarative, component-based JavaScript library for building user interfaces.
*   **shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS, providing a consistent and accessible UI foundation.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs directly in your markup.
*   **React Router**: The standard library for routing in React applications, managing navigation and URL synchronization.
*   **Framer Motion**: A powerful and easy-to-use library for creating declarative animations and interactive components.
*   **@tanstack/react-query**: A robust data-fetching and caching library for managing server state in React applications.
*   **lucide-react**: A comprehensive icon library for adding scalable vector graphics to the UI.
*   **Zod & React Hook Form**: Libraries for robust form management and schema-based validation.

## Library Usage Guidelines

To maintain a consistent and efficient codebase, please follow these guidelines when implementing new features or modifying existing ones:

*   **UI Components**: Always prioritize `shadcn/ui` components. If a specific component is not available or requires significant deviation from its default behavior, create a new custom component using Tailwind CSS.
*   **Styling**: Use `Tailwind CSS` exclusively for all styling. Avoid inline styles, raw CSS files (except `index.css` for global styles), or other CSS-in-JS solutions.
*   **Routing**: Use `react-router-dom` for all navigation and routing within the application. Keep route definitions centralized in `src/App.tsx`.
*   **State Management (Server State)**: For fetching, caching, and synchronizing server data, use `@tanstack/react-query`.
*   **State Management (Client State)**: For local component state, use React's built-in `useState` and `useReducer` hooks.
*   **Animations**: For declarative and performant animations, use `framer-motion`.
*   **Icons**: Integrate icons using the `lucide-react` library.
*   **Forms & Validation**: Use `react-hook-form` for managing form state and `zod` for defining validation schemas.
*   **Toasts/Notifications**: For displaying transient messages to the user, use `sonner`.
*   **Utility Functions**: For combining Tailwind CSS classes, use the `cn` utility function (which leverages `clsx` and `tailwind-merge`).
*   **Date Handling**: For date selection and manipulation, use `react-day-picker` and `date-fns`.