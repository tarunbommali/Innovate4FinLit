# Implementation Plan: Financial Literacy Platform for Bharat

## Overview

This implementation plan breaks down the development of the offline-first gamified financial literacy platform into discrete, manageable tasks. The focus is on building a working hackathon prototype (Phase 1) that demonstrates core offline functionality, student-focused scenarios, decision-based learning, and Indian cultural context.

The implementation follows a bottom-up approach: database → backend services → API layer → frontend shell → offline functionality → UI components → integration → polish.

## Tasks

- [ ] 1. Database Setup and Schema Creation
  - Create PostgreSQL database and configure connection
  - Implement schema using Prisma ORM (users, scenarios, decisions, progress, rules, badges, user_badges tables)
  - Create database indexes for performance
  - Set up database migrations
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

- [ ] 2. Seed Database with Sample Scenarios
  - Create at least 15 student-focused scenarios covering 3 themes (savings, budgeting, fraud prevention)
  - Include Indian cultural context (₹ currency, festivals, UPI, Indian names)
  - Define choices with consequences and score changes
  - Create rules for offline evaluation
  - Create badge definitions (first scenario, 10 scenarios, perfect score)
  - _Requirements: 3.3, 3.4, 3A.1, 3A.2, 3A.3, 3A.4, 3A.5, 3A.6, 3A.7, 3A.8, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6_

- [ ] 3. Backend Core Setup
  - Initialize Node.js/Express project with TypeScript
  - Configure environment variables (.env file)
  - Set up Prisma client
  - Create basic Express server with CORS and JSON middleware
  - Implement health check endpoint
  - _Requirements: 6.1, 6.3, 11.3, 11.5_

- [ ] 4. Authentication Service Implementation
  - [ ] 4.1 Implement user registration
    - Create registration endpoint (POST /api/v1/auth/register)
    - Validate input (name, email, password, userGroup)
    - Hash password with bcrypt (10+ salt rounds)
    - Create user in database
    - Return JWT token and user profile
    - _Requirements: 1.1, 11.1_
  
  - [ ]* 4.2 Write property test for user registration
    - **Property 1: User Registration Creates Valid Accounts**
    - **Validates: Requirements 1.1, 11.1**
  
  - [ ] 4.3 Implement user login
    - Create login endpoint (POST /api/v1/auth/login)
    - Validate credentials
    - Compare password with bcrypt
    - Generate JWT token (24-hour expiration)
    - Return token and user profile
    - _Requirements: 1.2, 11.2_
  
  - [ ]* 4.4 Write property test for valid login
    - **Property 2: Valid Login Returns Valid JWT**
    - **Validates: Requirements 1.2, 11.2**
  
  - [ ] 4.5 Implement JWT verification middleware
    - Create middleware to verify JWT tokens
    - Extract user information from token
    - Reject invalid/expired tokens with 401
    - _Requirements: 1.3, 11.2_
  
  - [ ]* 4.6 Write property test for invalid token rejection
    - **Property 3: Invalid Tokens Are Rejected**
    - **Validates: Requirements 1.3**
  
  - [ ]* 4.7 Write property test for duplicate email prevention
    - **Property 4: Duplicate Email Registration Prevention**
    - **Validates: Requirements 1.4**

- [ ] 5. User Service Implementation
  - [ ] 5.1 Implement get user profile
    - Create endpoint (GET /api/v1/users/profile)
    - Require authentication
    - Return user profile from database
    - _Requirements: 5.3_
  
  - [ ] 5.2 Implement update user profile
    - Create endpoint (PUT /api/v1/users/profile)
    - Allow updating name, language preference
    - Validate input
    - _Requirements: 5.3_
  
  - [ ] 5.3 Implement get user progress
    - Create endpoint (GET /api/v1/users/progress)
    - Return completed scenarios, score history, badges, theme progress
    - _Requirements: 5.3, 5.4_
  
  - [ ] 5.4 Implement update user progress
    - Create endpoint (POST /api/v1/users/progress)
    - Support idempotent updates with clientEventId
    - Update completed scenarios and score
    - _Requirements: 5.1, 5.2, 5.6_

- [ ] 6. Scenario Engine Implementation
  - [ ] 6.1 Implement get scenarios by user group
    - Create endpoint (GET /api/v1/scenarios?userGroup={group}&theme={theme})
    - Filter scenarios by user group
    - Optional theme filtering
    - Return scenario list with all required fields
    - _Requirements: 3.1, 3.2_
  
  - [ ]* 6.2 Write property test for user group filtering
    - **Property 8: User Group Scenario Filtering**
    - **Validates: Requirements 3.1**
  
  - [ ]* 6.3 Write property test for scenario data completeness
    - **Property 9: Scenario Data Completeness**
    - **Validates: Requirements 3.2**
  
  - [ ] 6.4 Implement get scenario by ID
    - Create endpoint (GET /api/v1/scenarios/:scenarioId)
    - Return full scenario details including choices
    - Handle not found errors
    - _Requirements: 3.2_

- [ ] 7. Decision Engine Implementation
  - [ ] 7.1 Implement decision evaluation
    - Create endpoint (POST /api/v1/decisions)
    - Accept decision with clientEventId for idempotency
    - Evaluate choice against rules
    - Calculate score change
    - Update user's financial score
    - Generate feedback with explanation
    - Check for badge milestones
    - Return decision result with feedback
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.7, 21.2_
  
  - [ ]* 7.2 Write property test for decision processing completeness
    - **Property 10: Decision Processing Completeness**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**
  
  - [ ]* 7.3 Write property test for idempotent operation processing
    - **Property 7: Idempotent Operation Processing**
    - **Validates: Requirements 2.6, 6.4**
  
  - [ ]* 7.4 Write property test for milestone badge awarding
    - **Property 17: Milestone Badge Awarding**
    - **Validates: Requirements 21.2**
  
  - [ ] 7.5 Implement get decision history
    - Create endpoint (GET /api/v1/decisions/history)
    - Return user's past decisions with outcomes
    - Support pagination
    - _Requirements: 5.4_
  
  - [ ] 7.6 Implement get peer statistics
    - Create endpoint (GET /api/v1/decisions/peer-stats/:scenarioId)
    - Calculate choice distribution percentages
    - Return anonymized aggregate statistics
    - _Requirements: 18.2_

- [ ] 8. Rules Engine Implementation
  - [ ] 8.1 Implement get cached rules
    - Create endpoint (GET /api/v1/rules/cached?userGroup={group})
    - Return rules for offline evaluation
    - Include score changes and feedback
    - _Requirements: 4.5, 10.1, 10.2_
  
  - [ ] 8.2 Implement offline evaluation logic
    - Create service method for local rule evaluation
    - Match scenario and choice to rule
    - Return score change and feedback
    - Mark as approximate evaluation
    - _Requirements: 4.5, 10.1_

- [ ] 9. Checkpoint - Backend Services Complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Frontend Project Setup
  - Initialize Next.js 14+ project with TypeScript
  - Configure Tailwind CSS
  - Set up PWA configuration (next-pwa)
  - Configure Workbox for Service Worker
  - Set up i18next for internationalization
  - Create basic folder structure (components, services, hooks, contexts)
  - _Requirements: 2.1, 16.6_

- [ ] 11. IndexedDB Setup
  - [ ] 11.1 Create IndexedDB schema with Dexie.js
    - Define stores: users, scenarios, decisions, progress, rules, assets
    - Create indexes for efficient queries
    - Implement database initialization
    - _Requirements: 2.7_
  
  - [ ] 11.2 Create IndexedDB service layer
    - Implement CRUD operations for each store
    - Create sync queue management functions
    - Implement cache management for scenarios and rules
    - _Requirements: 2.3, 2.4, 3.5_

- [ ] 12. Service Worker Implementation
  - [ ] 12.1 Configure Workbox caching strategies
    - Set up precaching for app shell
    - Configure runtime caching for API calls
    - Set up image caching strategy
    - _Requirements: 2.1, 2.2_
  
  - [ ] 12.2 Implement background sync
    - Register background sync event
    - Process sync queue from IndexedDB
    - Send queued decisions to API
    - Handle sync failures with retry logic
    - _Requirements: 2.5, 2.6_
  
  - [ ]* 12.3 Write property test for background sync
    - **Property 6: Background Sync Processes All Queued Operations**
    - **Validates: Requirements 2.5**

- [ ] 13. Authentication Context and Components
  - [ ] 13.1 Create AuthContext
    - Implement React context for auth state
    - Store JWT token in localStorage
    - Provide login, register, logout functions
    - Handle token expiration
    - _Requirements: 1.2, 1.6_
  
  - [ ] 13.2 Create LoginForm component
    - Build form with email and password fields
    - Implement form validation
    - Call login API
    - Handle errors and display messages
    - Redirect on success
    - _Requirements: 1.2_
  
  - [ ] 13.3 Create RegisterForm component
    - Build form with name, email, password, userGroup fields
    - Implement form validation
    - Call register API
    - Handle duplicate email errors
    - Redirect on success
    - _Requirements: 1.1, 1.4_

- [ ] 14. Scenario Components
  - [ ] 14.1 Create ScenarioList component
    - Fetch scenarios from API or IndexedDB (offline)
    - Display scenarios grouped by theme
    - Show difficulty indicators
    - Handle loading and error states
    - _Requirements: 3.1, 3.2_
  
  - [ ] 14.2 Create ScenarioCard component
    - Display scenario title, context, and cultural context
    - Show visual assets (images, icons)
    - Render choices as interactive buttons
    - Use color coding for visual appeal
    - _Requirements: 3.2, 17.1, 17.2, 23.5_
  
  - [ ] 14.3 Create ChoiceButton component
    - Display choice text and icon
    - Handle click events
    - Show loading state during evaluation
    - _Requirements: 3.2_
  
  - [ ] 14.4 Create FeedbackModal component
    - Display decision feedback with explanation
    - Show score change with visual indicator
    - Use color coding (green/red/yellow)
    - Display tips and consequences
    - Show earned badges if any
    - _Requirements: 4.3, 14.2, 14.3, 17.3, 21.1, 21.3_

- [ ] 15. Decision Flow Implementation
  - [ ] 15.1 Implement decision submission logic
    - Check online/offline status
    - Generate clientEventId
    - Submit decision to API (online) or queue in IndexedDB (offline)
    - Handle offline evaluation with Rules Engine
    - Update local state optimistically
    - _Requirements: 2.3, 2.4, 4.1, 4.5_
  
  - [ ]* 15.2 Write property test for offline operation queuing
    - **Property 5: Offline Operation Queuing**
    - **Validates: Requirements 2.3, 2.4**
  
  - [ ]* 15.3 Write property test for offline-online score reconciliation
    - **Property 11: Offline-Online Score Reconciliation**
    - **Validates: Requirements 4.6**
  
  - [ ] 15.4 Implement consequence application
    - Apply score changes to user profile
    - Update completed scenarios list
    - Check for badge milestones
    - Update theme progress
    - _Requirements: 14.1, 14.4, 5.1_

- [ ] 16. Progress Dashboard Components
  - [ ] 16.1 Create ProgressDashboard component
    - Display current financial score prominently
    - Show score trend chart (Chart.js)
    - Display theme progress bars
    - Show earned badges
    - _Requirements: 5.3, 14.6, 22.1, 22.2, 22.3, 22.4, 22.5, 22.6_
  
  - [ ] 16.2 Create ScoreChart component
    - Render line chart of score over time
    - Use Chart.js for visualization
    - Handle empty state (no history yet)
    - _Requirements: 22.1_
  
  - [ ] 16.3 Create BadgeDisplay component
    - Display earned badges with icons
    - Show badge descriptions on hover
    - Highlight newly earned badges
    - _Requirements: 21.2, 22.6_
  
  - [ ] 16.4 Create Leaderboard component
    - Fetch and display peer statistics
    - Show anonymized rankings
    - Display user's relative position
    - _Requirements: 18.2, 18.3, 18.5_

- [ ] 17. Internationalization Setup
  - [ ] 17.1 Create translation files
    - Create English (en) translation file
    - Create Hindi (hi) translation file
    - Include UI text, scenario templates, feedback messages
    - _Requirements: 16.1, 16.3, 16.4_
  
  - [ ] 17.2 Implement language switcher
    - Create LanguageSwitcher component
    - Store language preference in user profile
    - Update i18next on language change
    - Cache translations in IndexedDB for offline
    - _Requirements: 16.2, 16.5, 16.7_
  
  - [ ] 17.3 Apply translations to components
    - Use i18next hooks in all components
    - Translate scenario content dynamically
    - Handle fallback to English
    - _Requirements: 16.3, 16.7_

- [ ] 18. Visual Enhancements
  - [ ] 18.1 Add visual assets
    - Create or source icons for financial themes
    - Add illustrations for scenarios
    - Optimize images for low bandwidth (WebP, compression)
    - _Requirements: 17.1, 17.2, 17.7_
  
  - [ ] 18.2 Implement color coding system
    - Define color palette (green, red, yellow, neutral)
    - Apply colors to feedback, score changes, decisions
    - Ensure WCAG AA contrast ratios
    - _Requirements: 17.3, 19.2_
  
  - [ ] 18.3 Create visual progress indicators
    - Implement progress bars for themes
    - Add animated score change indicators
    - Create visual milestone celebrations
    - _Requirements: 17.4, 21.5_

- [ ] 19. Accessibility Implementation
  - [ ] 19.1 Implement keyboard navigation
    - Ensure all interactive elements are keyboard accessible
    - Add focus indicators
    - Implement logical tab order
    - _Requirements: 19.1_
  
  - [ ] 19.2 Add semantic HTML and ARIA labels
    - Use semantic HTML elements
    - Add alt text to all images
    - Add ARIA labels where needed
    - _Requirements: 19.3, 19.4_
  
  - [ ] 19.3 Implement responsive text sizing
    - Use relative units (rem, em)
    - Test text resizing up to 200%
    - Ensure layout doesn't break
    - _Requirements: 19.5_

- [ ] 20. Demo Mode Implementation
  - [ ] 20.1 Create demo landing page
    - Add "Try Demo" button on landing page
    - Create DemoLanding component
    - Explain demo limitations
    - _Requirements: 24.1, 24.6_
  
  - [ ] 20.2 Implement guest session
    - Create temporary session in sessionStorage
    - Allow access to 3-5 sample scenarios
    - Track demo progress locally
    - Show all core features (scoring, feedback, progress)
    - _Requirements: 24.2, 24.3, 24.4_
  
  - [ ] 20.3 Implement demo-to-registered conversion
    - Prompt guest users to register
    - Offer to transfer demo progress
    - Migrate decisions and scores on registration
    - _Requirements: 24.5, 24.7_
  
  - [ ]* 20.4 Write property test for demo progress transfer
    - **Property 19: Demo Progress Transfer**
    - **Validates: Requirements 24.7**

- [ ] 21. Offline Indicator and Network Detection
  - Create NetworkStatus component
  - Display online/offline indicator
  - Show sync status (syncing, synced, pending)
  - Notify user when sync completes
  - _Requirements: 10.3_

- [ ] 22. Indian Cultural Context Implementation
  - [ ] 22.1 Implement currency formatting
    - Create utility function for ₹ formatting
    - Use Indian number format (lakhs, crores)
    - Apply to all monetary displays
    - _Requirements: 23.1_
  
  - [ ]* 22.2 Write property test for Indian currency consistency
    - **Property 18: Indian Currency Consistency**
    - **Validates: Requirements 23.1**
  
  - [ ] 22.3 Verify cultural scenario content
    - Ensure scenarios reference Indian festivals
    - Include UPI and digital wallet scenarios
    - Use Indian names and locations
    - Address Indian financial challenges
    - _Requirements: 23.2, 23.3, 23.4, 23.5, 23.6_

- [ ] 23. Integration Testing and Bug Fixes
  - Test complete user flows (register → play → progress)
  - Test offline-online transitions
  - Test sync queue processing
  - Test badge awarding
  - Test demo mode conversion
  - Fix any bugs discovered
  - _Requirements: All_

- [ ] 24. API Response Structure Standardization
  - [ ] 24.1 Create response wrapper utilities
    - Implement success response wrapper
    - Implement error response wrapper
    - Apply to all API endpoints
    - _Requirements: 6.6_
  
  - [ ]* 24.2 Write property test for consistent API response structure
    - **Property 14: Consistent API Response Structure**
    - **Validates: Requirements 6.6**

- [ ] 25. Property Test Suite Completion
  - [ ]* 25.1 Write property test for scenario completion tracking
    - **Property 12: Scenario Completion Tracking**
    - **Validates: Requirements 5.1**
  
  - [ ]* 25.2 Write property test for score trend recording
    - **Property 13: Score Trend Recording**
    - **Validates: Requirements 5.2**
  
  - [ ]* 25.3 Write property test for decision consequences application
    - **Property 15: Decision Consequences Application**
    - **Validates: Requirements 14.1**
  
  - [ ]* 25.4 Write property test for decision feedback color coding
    - **Property 16: Decision Feedback Color Coding**
    - **Validates: Requirements 17.3**

- [ ] 26. Documentation and Polish
  - Create README with setup instructions
  - Document API endpoints (OpenAPI/Swagger)
  - Add code comments for complex logic
  - Create deployment guide
  - Prepare demo script for hackathon presentation
  - _Requirements: 6.5_

- [ ] 27. Final Checkpoint - Prototype Complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional property-based tests that can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Focus on Phase 1 features only; Phase 2 features (ML pipeline, advanced analytics, CI/CD) are deferred
- The implementation prioritizes working functionality over perfect code for hackathon submission
