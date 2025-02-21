# Next.js Project Setup

This guide will help you get started with running this Next.js project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18.17.0 or later)
- npm (Node Package Manager) or yarn
- Git (for version control)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory and add your environment variables:

```plaintext
NEXT_PUBLIC_BASE_API=your_api_url
# Add other environment variables here
```

## Running the Project

### Development Mode

To run the project in development mode with hot-reload:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```
