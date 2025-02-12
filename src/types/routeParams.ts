import { appRoutes } from '@/global/routes';
import { generatePath } from 'react-router';

export type PhotoDetailsParams = Parameters<
  typeof generatePath<(typeof appRoutes)['photoDetails']['url']>
>[1] &
  Record<string, string>;

export type PhotosViewSearchParams = {
  q?: string;
};
