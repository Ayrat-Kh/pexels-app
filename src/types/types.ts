import { Dimension } from './misc';

export type PhotosResult = {
  page: number;
  per_page: number;
  photos: PhotoResult[];
  next_page: string;
  total_results: number;
};

export type PhotoResult = Dimension & {
  id: string | number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PhotoImageSrc;
  liked: boolean;
  alt: string;
};

type PhotoImageSrc = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};
