import { Dimension } from '@/types';

export const aspectRatio = ({ width, height }: Dimension): number => {
  return width / height;
};
