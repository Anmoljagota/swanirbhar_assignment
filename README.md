## Course Management App
This is a Course Management App built with React and Chakra UI. The app allows users to view courses, enroll in them, track their progress, and add new courses with lessons.

## Features

- **Home Page**: Displays a list of courses and a button to add a new course.
- **Add Course**: Allows teachers to add a new course with multiple lessons.
- **Single Course Page**: Displays the details of a selected course, including its lessons. Users can enroll in the course and mark lessons as completed.
- **Progress Tracking**: Tracks user progress based on the completion status of lessons.
Technologies Used
React: For building the user interface.
Redux: For state management.
Chakra UI: For styling and UI components.
Axios: For making API requests.
React Router: For client-side routing.
Installation
Clone the repository:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Anmoljagota/swanirbhar_assignment.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the app**:
    ```bash
    npm start
    ```
## Usage

### Home Page

The home page displays a list of courses. There is a button that allows teachers to add a new course. Each course item includes the title, number of students, number of lessons, and a brief description.

### Adding a New Course

Teachers can click on the "Create course" button to open a modal where they can enter the course title, description, and add multiple lessons. Each lesson includes a title and material.

### Single Course Page

When a user clicks on a course item, they are redirected to the single course page. This page displays detailed information about the course, including its lessons. Users can enroll in the course and mark lessons as completed or not completed. 

### Progress Tracking

The app tracks user progress based on the completion status of lessons. A circular progress indicator displays the percentage of completed lessons for each course.

## File Structure

### Home.jsx

Displays the home page with a list of courses and a button to add a new course.

### Login.jsx

Provides user authentication by validating email and password.

### SingleCourse.jsx

Displays the details of a selected course, including its lessons. Users can enroll in the course and mark lessons as completed.

### CourseItems.jsx

A component to display individual course items in the course list.

### AddCourse.jsx

Allows users to add a new course with multiple lessons.

### Lessons.jsx

Displays individual lessons within a course, allowing users to mark them as completed or not completed.

## Redux Actions and Reducers

### action.js

Contains actions for fetching courses, adding a new course, and marking lessons as completed.

### reducer.js

Contains reducers for handling the state changes based on the dispatched actions.

## Components

### Sidebar

A sidebar component for navigation.

### CourseItems

A component to display individual course items in the course list.

### AddCourse

A modal component to add a new course with multiple lessons.

### Navbar

A navbar component for the application.

### Lessons

A component to display individual lessons within a course, allowing users to mark them as completed or not completed.

### User

A component to handle user login.

## API Endpoints

The app interacts with the following API endpoints:

- `GET /courses`: Fetch all courses.
- `GET /courses/:id`: Fetch details of a single course.
- `PATCH /courses/:id`: Update the number of students enrolled in a course.
- `POST /courses`: Add a new course.

