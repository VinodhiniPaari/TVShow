# TVShow
TV Show Application

**Overview**

This project is a full-stack TV Show listing application built using React 19 for the frontend and Spring Boot 3.3.8 for the backend. The application provides TV show listings with search, filtering, sorting, pagination, and an interactive UI. The backend serves data using a REST API with H2 in-memory database and provides API documentation via Swagger.

**How to Run the Project**
**Prerequisites**
Node.js (for frontend)
Java 17 (for backend)
Maven
Docker (Optional, for containerized setup)

**Running the Frontend**
cd frontend
npm install
npm start
Frontend will be available at http://localhost:3000/

**Running the Backend**
cd backend
mvn spring-boot:run
Backend will be available at http://localhost:8080/

**Running via Docker (Optional)**
docker-compose up --build

**API Documentation**
Swagger UI: http://localhost:8080/swagger-ui/index.html#/

**Tech Stack**

**Frontend**
Framework: React 19
Styling: Bootstrap 5
API Communication: REST API (fetch/axios)
State Management: Context API with useReducer
**Backend**
Framework: Spring Boot 3.3.8
Programming Language: Java 17
Database: H2 (In-memory database)
API Documentation: Swagger/OpenAPI via Springdoc
Dependency Management: Maven
Development Tools: Lombok, Spring Boot DevTools

**Features**
**UI Functionalities**
TV Show Listing with Pagination
Grid & Detail View for TV Shows
Search, Sort, and Filter Features
Pagination with Page Size Selection & Manual Page Entry (Custom Implementation)
Auto-Scroll for Infinite Loading (Lazy Loading Concept)
TV Show Details on Hover/Click
Responsive UI with Basic UX Enhancements

**Backend Functionalities**
REST API for TV Show Data
CRUD Operations for TV Shows
API Documentation with Swagger
Exception Handling with Custom Errors
CORS Configuration for Cross-Origin Requests
Data Transfer Objects (DTOs) for Efficient API Responses
Repository Pattern for Database Interactions

**Best Practices Followed**

**Frontend**
Component-Based Architecture in React
State Management using Context API + useReducer
Performance Optimization: Lazy Loading, Memoization
Responsive Design: CSS Media Queries, Bootstrap Grid
Security Best Practices: Input Validation, CORS Handling
Organized Folder Structure: Components, Services, Context, Styles, Utils
Reusable Components: Common UI Components, Pagination, Cards
Code Quality: Code Splitting (React.lazy, Suspense), Utility Functions (Debounce, Sorting, Filtering), Optimized API Calls (Pagination, Caching Strategy)

**Backend**
Separation of Concerns: Modular, maintainable code
MVC Pattern: Clear separation of data (Model), UI (Controller), and Business Logic (Service)
Error Handling: Custom exceptions for better debugging
Swagger Integration: Easy API visualization and testing
CORS Handling: Secure API access from different origins
Use of DTOs: Reducing network overhead with structured responses
Repository Pattern: Decoupling business logic from database access
Maven Wrapper: Ensures consistent build across environments

**Folder Structure**
**Frontend**
📂 src/
 ├── 📂 components/
 │   ├── TVShowCard.js
 │   ├── ShowDetails.js
 │   ├── Pagination.js
 │   ├── Loader.js
 │
 ├── 📂 pages/
 │   ├── Home.js
 │
 ├── 📂 store/
 │   ├── store.js
 │   ├── tvShowSlice.js
 │
 ├── 📂 services/
 │   ├── apiService.js
 │
 ├── 📂 styles/
 │   ├── TVShowList.css
 │   ├── ShowDetails.css
 │
 ├── 📂 assets/
 │
 ├── Routes.js
 ├── App.js
 ├── index.js

**Backend**
📂 tv-show-api/
 ├── 📂 mvn/               # Maven Wrapper
 ├── 📂 data/              # Data files (if required)
 ├── 📂 src/main/
 │   ├── 📂 java/com/example/tvshowapi/
 │   │   ├── TvShowApiApplication.java
 │   │   │
 │   │   ├── 📂 config/
 │   │   │   ├── AppConfig.java
 │   │   │   ├── CorsConfig.java
 │   │   │   ├── SwaggerConfig.java
 │   │   │
 │   │   ├── 📂 controller/
 │   │   │   ├── TVShowController.java
 │   │   │
 │   │   ├── 📂 dto/
 │   │   │   ├── TVShowResponse.java
 │   │   │
 │   │   ├── 📂 exception/
 │   │   │   ├── TVShowExceptions.java
 │   │   │
 │   │   ├── 📂 model/
 │   │   │   ├── TVShow.java
 │   │   │
 │   │   ├── 📂 repository/
 │   │   │   ├── TVShowRepository.java
 │   │   │
 │   │   ├── 📂 service/
 │   │   │   ├── TVMazeService.java
 │   │   │   ├── TVShowService.java
 │   │   │
 │   │   ├── 📂 utils/
 │   │   │   ├── TVTitleFileReader.java
 │   │   │
 │   │   ├── 📂 resources/
 │   │   │   ├── tvtitles.txt
 │   │   │   ├── application.properties

**Future Enhancements**
Accessibility Improvements (ARIA Labels, Keyboard Navigation)
Additional Filter Options in UI
Enhanced UX and UI Improvements
Better DB Schema (Currently structured in a single file, needs modularization
