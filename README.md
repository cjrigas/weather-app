# Weather App

A weather application built with Vite, TypeScript, React, Tailwind and Redux/RTK-Query. This app allows users to search for weather information by city and manage their favorite locations.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [Project Structure](#project-structure)

## Features
- Search for weather information by city.
- View current weather conditions.
- Add cities to favorites.
- View recent searches.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/cjrigas/weather-app.git
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

## Environment Variables

Before running the app, you need to set up your environment variables. Copy the .env.example file to a new file named .env and fill in the required values.

```bash
cp .env.example .env
```

## Running the App

To start the development server, run

```bash
npm run dev
```

## Building the App

To build the app for production, run:

```bash
npm run build
```

## Project Structure

```bash
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable components
├── hooks/           # Custom hooks
├── services/        # API services
├── store/           # Redux store and slices
├── App.tsx          # Main app component
├── index.css        # Global styles
├── main.tsx         # Entry point
```