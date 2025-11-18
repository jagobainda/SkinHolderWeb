# 🎮 Skin Holder Web

A modern web application built with React, TypeScript, Tailwind, and Clean Architecture principles for tracking game skin prices across different marketplaces.

## 🚀 Tech Stack

### Core Technologies
- **[React 19](https://react.dev/)** - A JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript for better developer experience
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool for lightning-fast development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development

### State Management & Data Fetching
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management solution
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization for React

### Routing & Navigation
- **[React Router DOM](https://reactrouter.com/)** - Declarative routing for React applications

### HTTP Client
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client for API requests

## 📁 Project Structure

The project follows **Clean Architecture** principles with clear separation of concerns:

```
skin-holder-web/
├── public/                      # Static assets and public files
│   └── images/                  # Image resources
│
├── src/
│   ├── main.tsx                 # Application entry point
│   │
│   ├── app/                     # Application configuration
│   │                            # - Main App component
│   │                            # - Route definitions
│   │
│   ├── domain/                  # Business logic layer (framework-agnostic)
│   │   ├── models/              # Domain entities and DTOs
│   │   └── usecases/            # Application business rules
│   │
│   ├── data/                    # Data access layer
│   │   ├── datasources/         # External data sources (APIs)
│   │   └── repositories/        # Repository implementations
│   │
│   ├── presentation/            # Presentation layer
│   │   └── viewmodels/          # View-specific business logic
│   │
│   ├── ui/                      # UI components and pages
│   │   ├── components/          # Reusable React components
│   │   │   └── shared/          # Shared components across the app
│   │   ├── hooks/               # Custom React hooks
│   │   └── pages/               # Page components
│   │
│   └── styles/                  # Global styles and CSS
│
├── eslint.config.js             # ESLint configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── package.json                 # Project dependencies and scripts
```

## 🏗️ Architecture Overview

This project implements **Clean Architecture** with the following layers:

### 1. **Domain Layer** (`domain/`)
- Contains business entities and use cases
- Framework-agnostic and pure TypeScript
- Defines the core business rules

### 2. **Data Layer** (`data/`)
- Implements data sources and repositories
- Handles API communication
- Manages data persistence and caching

### 3. **Presentation Layer** (`presentation/`)
- ViewModels that orchestrate use cases
- Separates UI logic from UI rendering
- Makes components simpler and more testable

### 4. **UI Layer** (`ui/`)
- React components, pages, and hooks
- Handles user interaction and rendering
- Consumes ViewModels for business logic

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jagobainda/SkinHolderWeb.git
cd skin-holder-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the app for production to the `dist` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Runs ESLint to check code quality |

## 🔧 Configuration

### API Proxy
The project includes a Vite proxy configuration that redirects `/api` requests to `https://shapi.jagoba.dev`. This can be modified in `vite.config.ts`.

### TypeScript Paths
The project uses TypeScript path aliases configured in `tsconfig.json` for cleaner imports.

## 🎨 Styling

The project uses **Tailwind CSS 4** for styling with the official Vite plugin for optimal performance and development experience.

## 🔐 Features

- ✅ User authentication and authorization
- ✅ Protected routes
- ✅ Toast notifications
- ✅ Responsive design with Tailwind CSS
- ✅ Type-safe development with TypeScript
- ✅ Clean Architecture for maintainability

## 📝 License

This project is licensed under the terms specified in [LICENSE.txt](LICENSE.txt).
