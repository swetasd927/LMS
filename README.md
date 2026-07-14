# LMS Platform

A Learning Management System (LMS) inspired by platforms like Udemy and Coursera. The platform allows students to discover and learn courses, instructors to create and manage educational content, and administrators to manage the overall system.

## Phase 1 Goal

Build a functional LMS MVP where:

* Students can browse, enroll, and learn courses
* Instructors can create and publish courses
* Admins can manage users, categories, and course approvals

## Features

### Authentication

* User registration and login
* Forgot password functionality
* Role Based Access Control (Student, Instructor, Admin)
* Protected routes
* Profile management

### Public Website

* Landing page with featured courses and categories
* Course listing with search, filters, sorting, and pagination
* Course detail page with curriculum preview, instructor information, reviews, and related courses

### Student Module

* Student dashboard
* My Learning page
* Course progress tracking
* Lesson completion tracking
* Course reviews and ratings

### Instructor Module

* Instructor dashboard
* Course creation and management
* Curriculum builder with sections and lessons
* Upload videos and learning resources
* Student enrollment and progress monitoring

### Admin Module

* User management
* Course approval system
* Category management
* Platform statistics dashboard

## Core Modules

* Authentication System
* Course Management System
* Enrollment System
* Progress Tracking System
* Review System
* Notification System
* File Upload System

## Course Workflow

```txt
Admin creates categories
        ↓
Instructor creates course
        ↓
Course enters pending state
        ↓
Admin approves course
        ↓
Course becomes publicly available
        ↓
Student enrolls
        ↓
Student watches lessons
        ↓
Progress is tracked
        ↓
Course completed
```

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* TanStack Query
* React Hook Form
* Zod
* Ant Design

### Backend

* Node.js
* Express.js
* TypeScript
* JWT Authentication
* Bcrypt

### Database

* PostgreSQL
* Prisma ORM

### File Storage

* Cloudinary

## Database Entities

* User
* Role
* Course
* Category
* Section
* Lesson
* Enrollment
* Progress
* Review
* Notification

## Development Phases

### Phase 1.1

Authentication, RBAC, and database setup.

### Phase 1.2

Course CRUD, category management, and public pages.

### Phase 1.3

Enrollment system, learning module, and progress tracking.

### Phase 1.4

Instructor dashboard, admin dashboard, and reviews.

## Future Scope

Phase 2 will include:

* AI powered learning assistant
* Mock tests and quizzes
* Certificates
* Discussion forums
* Subscription plans
* Live classes
* Recommendation system
