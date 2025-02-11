import { BrowserRouter, Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/api/queryClient';

import './App.css';

const PhotosView = lazy(() => import('./features/PhotosView/PhotosView'));
const PhotoDetails = lazy(() => import('./features/PhotoDetails/PhotoDetails'));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PhotosView />} />
            <Route path="details/:photoId" element={<PhotoDetails />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
