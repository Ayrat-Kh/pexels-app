import { BrowserRouter, Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/api/queryClient';
import { APP_ROUTES } from './global/routes';

import { Loading } from './components/Loading';
import { PageLayout } from './components/ui';

import '@/App.css';

const PhotosViewPage = lazy(() => import('@/components/PhotosViewPage'));
const PhotoDetailsPage = lazy(() => import('@/components/PhotoDetailsPage'));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <PageLayout $isCentered>
              <Loading />
            </PageLayout>
          }
        >
          <Routes>
            <Route
              path={APP_ROUTES.photosView.url}
              element={<PhotosViewPage />}
            />
            <Route
              path={APP_ROUTES.photoDetails.url}
              element={<PhotoDetailsPage />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
