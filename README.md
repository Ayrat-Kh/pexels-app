# Pexels-app

## Features

- **Masonry Grid Layout** – Beautifully arranges images for a seamless viewing experience.
- **Virtualized View** – Optimizes performance by rendering only visible images.
- **Search Functionality** – Quickly find images using keywords.
- **Dynamic Imports** – Reduces initial package size for faster load times.
- **React Lazy + Suspense** – Enhances performance with lazy loading.

## Installation

Project was built and tested using NodeJs 21.

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

   - Set `VITE_PEXELS_API_KEY` variable in `.env.local` file

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

## About masonry layout computation

It was a bit tricky to compute virtualized grid using flex or grid and keeping it virtualized at the same time, which is why was used absolute positioning.

## FAQ

In a dev mode requests can be canceled and it seems to be related to how react-query works and react's useEffect mounting/unmounting check in a dev mode. This isn't happening in production build.
