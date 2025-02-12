# Pexels-app

## Features

- **Masonry Grid Layout** – Beautifully arranges images for a seamless viewing experience.
- **Virtualized View** – Optimizes performance by rendering only visible images.
- **Search Functionality** – Quickly find images using keywords.
- **Detailed Image View** – Click on any image for an immersive preview.
- **Dynamic Imports** – Reduces initial package size for faster load times.
- **React Lazy + Suspense** – Enhances performance with lazy loading.
- **Built with Vite** – Lightning-fast development and build process.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/hossamabubakr/pexels-app.git
   cd pexels-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your API key:

   - Get API key from [Pexels API](https://www.pexels.com/api/).

   ```sh
   cp .env.local.example .env.local
   ```

   - Set `VITE_PEXELS_API_KEY` variable in `.env.local`:

4. Start the development server:

   ```sh
   npm run dev
   ```

## Build

To create a production build, run:

```sh
npm run build
```

## Test

To run tests:

```sh
npm run test
```
