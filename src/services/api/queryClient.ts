import { API_MAX_RETRIES } from '@/global/api';
import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      retry: API_MAX_RETRIES,
    },
  },
});
