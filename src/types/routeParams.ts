import { APP_ROUTES } from '@/global/routes';
import { generatePath } from 'react-router';

export type PhotoDetailsParams = Parameters<
  typeof generatePath<(typeof APP_ROUTES)['photoDetails']['url']>
>[1] &
  Record<string, string>;
