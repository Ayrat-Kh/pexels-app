import { styled } from '@linaria/react';
import type { FC, PropsWithChildren } from 'react';

const alignment = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
} as const;

type PageLayoutProps = PropsWithChildren<{
  direction?: 'column' | 'row';
  align?: keyof typeof alignment;
  isCentered?: boolean;
}>;

export const PageLayout = styled.div<PageLayoutProps>`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: ${({ direction }: PageLayoutProps) =>
    direction === 'row' ? 'row' : 'column'};
  justify-content: ${({ isCentered }: PageLayoutProps) =>
    isCentered ? 'center' : 'flex-start'};
  align-items: ${({ isCentered, align }: PageLayoutProps) => {
    let finalAlign = align ?? 'start';

    if (isCentered) {
      finalAlign = 'center';
    }

    return alignment[finalAlign];
  }};
` satisfies FC<PageLayoutProps> as FC<PageLayoutProps>;
