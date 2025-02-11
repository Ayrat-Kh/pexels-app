import { PhotosResult, PhotoResult } from '@/types';
import { BaseApiOptions } from '@/types/api';
import { pexelRequest } from './pexelRequest';

const PAGE_SIZE = 80;

export async function getPhotos(
  pageIndex = 1,
  { signal }: BaseApiOptions
): Promise<PhotosResult> {
  const URL = `/curated?page=${pageIndex}&per_page=${PAGE_SIZE}`;
  return pexelRequest(URL, { method: 'GET', signal }).then(
    (r) => r.json() as Promise<PhotosResult>
  );
}

export async function searchPhotos(
  query: string,
  pageIndex = 1,
  { signal }: BaseApiOptions
): Promise<PhotosResult> {
  const URL = `/search?query=${query}&page=${pageIndex}&per_page=${PAGE_SIZE}`;
  return pexelRequest(URL, { method: 'GET', signal }).then(
    (r) => r.json() as Promise<PhotosResult>
  );
}

export async function getPhoto(
  id: number,
  { signal }: BaseApiOptions
): Promise<PhotoResult> {
  const URL = `photos/${id}`;
  return pexelRequest(URL, { method: 'GET', signal }).then(
    (r) => r.json() as Promise<PhotoResult>
  );
}
