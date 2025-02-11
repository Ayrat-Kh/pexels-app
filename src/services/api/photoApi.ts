import { PhotosResult, PhotoResult } from '@/types';
import { BaseApiOptions } from '@/types/api';
import { pexelRequest } from './pexelRequest';

const PAGE_SIZE = 80;

export function getPhotos(
  pageIndex = 1,
  { signal }: BaseApiOptions
): Promise<PhotosResult> {
  const URL = `/curated?page=${pageIndex}&per_page=${PAGE_SIZE}`;
  return pexelRequest<PhotosResult>(URL, { method: 'GET', signal });
}

export function searchPhotos(
  query: string,
  pageIndex = 1,
  { signal }: BaseApiOptions
): Promise<PhotosResult> {
  const URL = `/search?query=${query}&page=${pageIndex}&per_page=${PAGE_SIZE}`;
  return pexelRequest<PhotosResult>(URL, { method: 'GET', signal });
}

export function getPhotoById(
  id: string,
  { signal }: BaseApiOptions
): Promise<PhotoResult> {
  const URL = `/photos/${id}`;
  return pexelRequest<PhotoResult>(URL, {
    method: 'GET',
    signal,
  });
}
