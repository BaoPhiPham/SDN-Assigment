# Frontend Architecture

## Cấu trúc thư mục đã được tổ chức lại

```
src/
├── components/          # Reusable UI Components
│   ├── Navbar.tsx      # Navigation bar component
│   └── ProductCard.tsx # Product card component
│
├── views/              # Page-level Components (Smart Components)
│   ├── Auth.tsx        # Login/Register page
│   ├── Storefront.tsx  # Product listing page
│   ├── ProductDetail.tsx # Product detail page
│   ├── UserProfile.tsx # User profile page
│   └── AdminDashboard.tsx # Admin management page
│
├── services/           # API Service Layer
│   ├── api.ts          # Base API service với fetch wrapper
│   ├── authService.ts  # Authentication APIs
│   ├── brandService.ts # Brand management APIs
│   ├── productService.ts # Product APIs
│   └── index.ts        # Export tất cả services
│
├── hooks/              # Custom React Hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useProducts.ts  # Products data hook
│   └── index.ts        # Export tất cả hooks
│
├── utils/              # Utility Functions
│   ├── validators.ts   # Form validation functions
│   ├── formatters.ts   # Data formatting functions
│   ├── storage.ts      # LocalStorage wrapper
│   └── index.ts        # Export tất cả utils
│
├── types.ts            # TypeScript type definitions
├── constants.ts        # Mock data và constants
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Các tầng trong kiến trúc

### 1. Component Layer (Presentation Layer)
**Mục đích**: Hiển thị UI, nhận props và render

**Đặc điểm**:
- Không chứa business logic
- Nhận data qua props
- Có thể tái sử dụng
- Stateless hoặc có local UI state đơn giản

**Ví dụ**: `Navbar.tsx`, `ProductCard.tsx`

### 2. View Layer (Container/Page Layer)
**Mục đích**: Quản lý state của page, kết nối components với services

**Đặc điểm**:
- Chứa business logic của page
- Sử dụng hooks để fetch data
- Compose nhiều components
- Handle user interactions

**Ví dụ**: `Storefront.tsx`, `ProductDetail.tsx`

### 3. Service Layer (Data Access Layer)
**Mục đích**: Giao tiếp với Backend API

**Đặc điểm**:
- Centralized API calls
- Error handling
- Request/Response transformation
- Type-safe với TypeScript

**Ví dụ**: `authService.ts`, `productService.ts`

### 4. Hooks Layer (Custom Logic Layer)
**Mục đích**: Tái sử dụng logic giữa các components

**Đặc điểm**:
- Encapsulate stateful logic
- Side effects management
- Reusable across components

**Ví dụ**: `useAuth.ts`, `useProducts.ts`

### 5. Utils Layer (Helper Layer)
**Mục đích**: Pure functions không có side effects

**Đặc điểm**:
- Pure functions
- No side effects
- Testable
- Reusable

**Ví dụ**: `validators.ts`, `formatters.ts`

## Data Flow

```
User Interaction
    ↓
View Component
    ↓
Custom Hook (optional)
    ↓
Service Layer
    ↓
API Backend
    ↓
Response
    ↓
Service Layer (transform)
    ↓
Custom Hook (state update)
    ↓
View Component (re-render)
    ↓
UI Update
```

## Best Practices

### 1. Component Organization
- Một component một file
- Props interface ở đầu file
- Export default ở cuối file

### 2. Type Safety
- Sử dụng TypeScript cho tất cả code
- Define types trong `types.ts`
- Sử dụng `type` imports khi cần

### 3. State Management
- Local state cho UI state
- Custom hooks cho shared state
- Props drilling tối đa 2-3 levels

### 4. API Calls
- Tất cả API calls qua service layer
- Không gọi fetch trực tiếp trong components
- Centralized error handling

### 5. Code Style
- ESLint + Prettier
- Consistent naming conventions
- Comments cho complex logic

## Naming Conventions

### Files
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Services: camelCase with 'Service' suffix (e.g., `authService.ts`)
- Utils: camelCase (e.g., `validators.ts`)

### Variables
- Constants: UPPER_SNAKE_CASE (e.g., `MOCK_PRODUCTS`)
- Functions: camelCase (e.g., `validateEmail`)
- Components: PascalCase (e.g., `ProductCard`)
- Types/Interfaces: PascalCase (e.g., `Product`, `User`)

## Testing Strategy (Future)

```
src/
├── components/
│   ├── Navbar.tsx
│   └── Navbar.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts
└── utils/
    ├── validators.ts
    └── validators.test.ts
```

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

## Các lỗi đã sửa

1. ✅ TypeScript import errors - Sử dụng `type` imports
2. ✅ Enum syntax error - Chuyển sang const object
3. ✅ Unused React imports - Xóa imports không cần thiết
4. ✅ ESLint errors - Fix tất cả linting issues
5. ✅ Cấu trúc thư mục - Thêm services, hooks, utils layers

## Next Steps

1. Kết nối với Backend API thật
2. Implement authentication flow
3. Add loading states và error handling
4. Add unit tests
5. Add E2E tests
6. Optimize performance (React.memo, useMemo, useCallback)
7. Add state management library nếu cần (Zustand, Redux)
