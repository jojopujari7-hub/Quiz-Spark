# QuizBot

## Overview

QuizBot is a full-stack web application that generates AI-powered, 10-question quizzes on any topic. Users provide a topic and 3+ seed questions, and the system generates an engaging quiz with multiple-choice questions, fun facts, and educational content. Built with a React frontend and Express backend, the application uses PostgreSQL for data persistence and shadcn/ui components for a polished user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight React router. The application has three main routes:
- Home page (`/`) - Quiz creation interface
- Quiz page (`/quiz/:id`) - Interactive quiz-taking experience
- 404 page - Fallback for unknown routes

**State Management**: React Query (@tanstack/react-query) handles server state management, caching, and data fetching. Local component state managed with React hooks.

**UI Components**: shadcn/ui component library (New York style variant) built on Radix UI primitives. Uses Tailwind CSS for styling with a custom design system including CSS variables for theming.

**Form Handling**: React Hook Form with Zod validation for type-safe form schemas.

**Design Pattern**: The frontend follows a component-based architecture with clear separation between pages, UI components, and utility functions. Custom hooks abstract common functionality (toast notifications, mobile detection).

### Backend Architecture

**Framework**: Express.js server running on Node.js with TypeScript.

**API Structure**: RESTful API with the following endpoints:
- `POST /api/quizzes` - Creates a new quiz from topic and seed questions
- `GET /api/quizzes/:id` - Retrieves a specific quiz by ID

**Quiz Generation**: Template-based system in `server/quizGenerator.ts` that creates questions using predefined patterns for different question types (true/false, multiple choice, fill-in-the-blank). The generator shuffles answer options and adds fun facts to enhance educational value.

**Request Validation**: Zod schemas validate incoming requests before processing, with human-readable error messages via zod-validation-error.

**Data Storage Layer**: Abstracted through an `IStorage` interface with a `DatabaseStorage` implementation, making it easy to swap storage backends if needed.

**Development vs Production**: 
- Development mode uses Vite middleware for HMR and serves frontend through the Express server
- Production mode serves pre-built static files from the `dist/public` directory
- Build process bundles both frontend (via Vite) and backend (via esbuild) with selective dependency bundling to optimize cold start times

### Data Storage

**Database**: PostgreSQL accessed through Drizzle ORM.

**Schema**: Single `quizzes` table with the following structure:
- `id` - UUID primary key (auto-generated)
- `topic` - Text field for quiz topic
- `seed_questions` - Array of user-provided example questions
- `generated_questions` - JSONB column storing array of quiz question objects
- `created_at` - Timestamp of creation

**Type Safety**: Drizzle generates TypeScript types from the schema. Zod schemas (via drizzle-zod) provide runtime validation matching the database schema.

**Migrations**: Drizzle Kit manages schema migrations with configuration in `drizzle.config.ts`. Migrations output to `./migrations` directory.

### Deployment Considerations

**Replit Integration**: 
- Custom Vite plugin (`vite-plugin-meta-images.ts`) automatically updates Open Graph and Twitter card meta tags with the correct Replit deployment domain
- Replit-specific dev tools (cartographer, dev-banner) load only in development
- Runtime error overlay for better debugging experience

**Build Strategy**: The build script (`script/build.ts`) uses a selective bundling approach - commonly used dependencies are bundled with the server code while less critical ones remain external. This reduces the number of file system calls during cold starts, improving startup performance.

**Environment Variables**: `DATABASE_URL` is required for database connectivity.

## External Dependencies

### UI & Styling
- **shadcn/ui** - Component library based on Radix UI primitives
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- **Lucide React** - Icon library
- **class-variance-authority** - Type-safe variant styling
- **Radix UI** - Headless UI primitives for accessibility

### Data Fetching & Forms
- **@tanstack/react-query** - Server state management and caching
- **React Hook Form** - Form state and validation
- **Zod** - Schema validation for both client and server

### Backend
- **Express** - Web server framework
- **Drizzle ORM** - Type-safe SQL query builder and ORM
- **PostgreSQL** - Relational database (via `pg` driver)
- **connect-pg-simple** - PostgreSQL session store (imported but not actively used in current routes)

### Development Tools
- **Vite** - Frontend build tool and dev server
- **TypeScript** - Type safety across the stack
- **esbuild** - Fast JavaScript bundler for server code
- **tsx** - TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-cartographer** - Code navigation in development
- **@replit/vite-plugin-dev-banner** - Development mode indicator
- **@replit/vite-plugin-runtime-error-modal** - Error overlay for better DX