import { Dimension } from '@/types';

export const getAspectRatio = ({ width, height }: Dimension): number => {
  return width / height;
};
