import { BrowserRouter, Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/api/queryClient';
import { appRoutes } from './global/routes';

import '@/App.css';

const PhotosViewPage = lazy(() => import('@/ui/PhotosViewPage'));
const PhotoDetailsPage = lazy(() => import('@/ui/PhotoDetailsPage'));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={appRoutes.photosView.url}
              element={<PhotosViewPage />}
            />
            <Route
              path={appRoutes.photoDetails.url}
              element={<PhotoDetailsPage />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
