# PerfumeHub Frontend

Modern React + TypeScript frontend application for PerfumeHub e-commerce platform.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── views/           # Page-level components
│   ├── Auth.tsx
│   ├── Storefront.tsx
│   ├── ProductDetail.tsx
│   ├── UserProfile.tsx
│   └── AdminDashboard.tsx
├── services/        # API service layer
│   ├── api.ts           # Base API service
│   ├── authService.ts   # Authentication APIs
│   ├── brandService.ts  # Brand management APIs
│   └── productService.ts # Product APIs
├── hooks/           # Custom React hooks
│   ├── useAuth.ts
│   └── useProducts.ts
├── utils/           # Utility functions
│   ├── validators.ts    # Form validation
│   ├── formatters.ts    # Data formatting
│   └── storage.ts       # LocalStorage wrapper
├── types.ts         # TypeScript type definitions
├── constants.ts     # Mock data and constants
├── App.tsx          # Main app component
└── main.tsx         # App entry point
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run prettier

# Fix formatting
npm run prettier:fix
```

## Architecture

### Component Layer
- Reusable UI components with props interface
- Presentational components focused on UI

### View Layer
- Page-level components
- Handle user interactions and state management
- Compose multiple components

### Service Layer
- API communication
- Data fetching and mutations
- Centralized error handling

### Hooks Layer
- Custom React hooks for shared logic
- State management
- Side effects handling

### Utils Layer
- Pure utility functions
- Validators, formatters, helpers
- No side effects

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

## Features

- User authentication (login/register)
- Product browsing and filtering
- Product detail view
- User profile management
- Admin dashboard for brand management
- Responsive design
- Type-safe development
