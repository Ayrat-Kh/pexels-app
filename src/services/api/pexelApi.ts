import { PhotosResult, PhotoResult } from '@/types';
import { BaseApiOptions } from '@/types/api';
import { pexelRequest } from './pexelRequest';
import { PEXEL_PAGE_SIZE } from '@/global/api';

/**
 * Fetch photos
 * @param pageIndex - default 1
 * @param { signal } - signal from AbortController
 * @returns paginated photos result
 */
export function getPhotos(
  pageIndex = 1,
  { signal }: BaseApiOptions
): Promise<PhotosResult> {
  const URL = `/curated?page=${pageIndex}&per_page=${PEXEL_PAGE_SIZE}`;
  return pexelRequest<PhotosResult>(URL, { method: 'GET', signal });
}

/**
 * Fetch photos
 * @param query - search query, non empty string
 * @param { signal } - signal from AbortController
 * @returns paginated photos result
 */
export function searchPhotos(
  query: string,
  pageIndex = 1,
  { signal }: BaseApiOptions
): Promise<PhotosResult> {
  const URL = `/search?query=${query}&page=${pageIndex}&per_page=${PEXEL_PAGE_SIZE}`;
  return pexelRequest<PhotosResult>(URL, { method: 'GET', signal });
}

/**
 * Fetch photos by d
 * @param id - photo id
 * @param { signal } - signal from AbortController
 * @returns photo data
 */
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
