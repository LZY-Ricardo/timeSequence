# TimeSequence Project Constitution

## Project Standards and Principles

### 1. Code Quality Standards

#### 1.1 TypeScript/JavaScript
- Use TypeScript for type safety
- Follow ES6+ standards
- Use async/await over callbacks
- Prefer functional programming patterns where appropriate

#### 1.2 React/Taro Best Practices
- Use functional components with Hooks
- Keep components small and focused (single responsibility)
- Use custom hooks for reusable logic
- Properly handle lifecycle with useEffect
- Avoid prop drilling - use Context API when needed

### 2. UI/UX Standards

#### 2.1 Responsive Design (CRITICAL)
- ✅ **MUST USE**: `rpx` units for all dimensions
- ❌ **NEVER USE**: Hardcoded `px` values
- Ensure compatibility across 4.7" - 6.8" screens
- Test on Xiaomi 15 (6.36" reference device)
- Handle safe areas for notch screens

#### 2.2 Design System Compliance
- Strictly follow color palette defined in kaifa.md
- Use CSS variables for consistency
- Card radius: 24rpx
- Page padding: 32rpx
- Follow spacing guidelines

#### 2.3 Accessibility
- Proper contrast ratios
- Touch targets minimum 44rpx x 44rpx
- Meaningful labels for screen readers

### 3. Performance Standards

#### 3.1 Load Time
- Initial page load < 3 seconds
- Tab switching < 300ms
- Calendar rendering < 500ms

#### 3.2 Optimization
- Lazy load images and heavy components
- Virtualize long lists (倒数日, 节假日)
- Cache黄历data locally
- Optimize re-renders with React.memo

### 4. Data Management

#### 4.1 Local Storage
- Use Taro.setStorage for persistence
- Implement data versioning
- Handle storage quotas gracefully

#### 4.2 API Integration
- Centralized API service layer
- Error handling and retry logic
- Request/response interceptors
- Loading states for all async operations

### 5. Testing Standards

#### 5.1 Unit Tests
- Test utilities and helper functions
- Test custom hooks
- Minimum 70% code coverage for utilities

#### 5.2 Integration Tests
- Test page navigation flows
- Test data persistence
- Test calendar interactions

#### 5.3 Manual Testing
- Test on real Xiaomi 15 device
- Test all 5 tab pages
- Test date switching and navigation
- Test倒数日CRUD operations

### 6. Code Organization

#### 6.1 Directory Structure
```
src/
├── pages/          # Page components (5 tabs)
├── components/     # Reusable components
├── hooks/          # Custom hooks
├── services/       # API and data services
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── constants/      # Constants and configs
└── styles/         # Global styles and variables
```

#### 6.2 File Naming
- Components: PascalCase (e.g., `CalendarView.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAlmanac.ts`)
- Utils: camelCase (e.g., `dateHelper.ts`)
- Types: PascalCase with 'I' prefix (e.g., `IAlmanacData.ts`)

### 7. Git Practices

#### 7.1 Commit Messages
- Use conventional commits format
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore

#### 7.2 Branching
- Main branch only for this project (as per user preference)
- Commit frequently with meaningful messages

### 8. Documentation

#### 8.1 Code Comments
- JSDoc for public functions
- Inline comments for complex logic
- Document gotchas and workarounds

#### 8.2 README Updates
- Keep development setup instructions current
- Document environment variables
- List known issues and limitations

## Quality Gates

### Gate 1: Before Starting Implementation
- [ ] All design mockups reviewed
- [ ] Data models defined
- [ ] API contracts documented
- [ ] Technical unknowns resolved

### Gate 2: During Development
- [ ] Code follows rpx unit standards
- [ ] Components match design system
- [ ] No console errors or warnings
- [ ] Performance benchmarks met

### Gate 3: Before Release
- [ ] All functional requirements met
- [ ] Manual testing on Xiaomi 15 passed
- [ ] No critical bugs
- [ ] Documentation updated
