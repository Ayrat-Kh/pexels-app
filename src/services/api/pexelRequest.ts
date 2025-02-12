import { NotFoundError, UnknownError } from '@/global/errors';

export const pexelRequest = async <TResponse>(
  url: string,
  init?: RequestInit
): Promise<TResponse> => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      ...init?.headers,
    },
    ...init,
  };
  const response = await fetch(
    `${import.meta.env.VITE_PEXELS_BASE_URL}${url}`,
    options
  );

  if (response.ok) {
    return await response.json();
  }

  if (response.status === 404) {
    throw new NotFoundError();
  }

  throw new UnknownError();
};
