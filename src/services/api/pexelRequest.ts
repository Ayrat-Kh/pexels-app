export const pexelRequest = (url: string, init?: RequestInit) => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      ...init?.headers,
    },
    ...init,
  };
  return fetch(`${import.meta.env.VITE_PEXELS_BASE_URL}${url}`, options);
};
