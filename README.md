# Technology World Creator (TWC) Assignment

A full-stack web application with user authentication, dashboard, and profile management built with Node.js/Express backend and React frontend.

## Project Structure

```
TWSAssignment/
├── Backend/                 # Node.js/Express server
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── token.js        # Token management
│   │   ├── config/
│   │   │   └── db.js       # Database configuration
│   │   ├── controllers/
│   │   │   └── UserController.js
│   │   ├── models/
│   │   │   └── User.js
│   │   └── routes/
│   │       └── UserRoutes.js
│   └── package.json
│
├── Frontend/                # React application
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── Components/
│   │       ├── Auth/       # Login & Registration
│   │       ├── Dashboard/
│   │       ├── Header/
│   │       ├── Footer/
│   │       └── Profile/
│   └── package.json
│
└── README.md
```

## Features

- **User Authentication** - Registration and login functionality
- **User Dashboard** - Main user interface
- **User Profile** - Profile management
- **Responsive Design** - Header and footer components

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB or your configured database

## Installation

### Backend Setup

```bash
cd Backend
npm install
```

### Frontend Setup

```bash
cd Frontend
npm install
```

## Configuration

### Backend

Update your database configuration in `Backend/src/config/db.js` with your database credentials.

### Environment Variables

Create a `.env` file in the Backend directory with necessary environment variables (database URL, JWT secret, etc.).

## Running the Application

### Start Backend Server

```bash
cd Backend
node src/app.js
```

Server runs on configured port (typically http://localhost:3001)

### Start Frontend Development Server

```bash
cd Frontend
npm start
```

Frontend runs on http://localhost:3000

## API Routes

The application provides user authentication routes through:
- `Backend/src/routes/UserRoutes.js` - All user-related endpoints

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (or configured database)
- JWT for authentication

### Frontend
- React
- CSS Modules for styling
- Component-based architecture

## Contributing

Follow the existing project structure when adding new features.

## License

This project is part of the Technology World Creator assignment.

