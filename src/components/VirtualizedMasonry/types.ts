export type VisibleItem = {
  style: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  itemIndex: number;
};

/**
 * top - current masonry scroll
 * height - total height with all images
 */
export type MasonryContainerData = { top: number; height: number };

export type MasonryBottomComponentProps = {
  scrollView: HTMLDivElement | null;
};

export type MasonryRenderItemProps<T> = {
  data: T;
  container: MasonryContainerData;
};
