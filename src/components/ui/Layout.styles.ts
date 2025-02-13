import { styled } from 'styled-components';
import type { PropsWithChildren } from 'react';

const alignment = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
} as const;

type PageLayoutProps = PropsWithChildren<{
  $direction?: 'column' | 'row';
  $align?: keyof typeof alignment;
  $isCentered?: boolean;
}>;

export const PageLayout = styled.div<PageLayoutProps>(
  ({ $direction, $isCentered, $align }) => ({
    width: '100%',
    height: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: $direction === 'row' ? 'row' : 'column',
    justifyContent: $isCentered ? 'center' : 'flex-start',
    alignItems: $isCentered
      ? alignment['center']
      : alignment[$align ?? 'start'],
  })
);
