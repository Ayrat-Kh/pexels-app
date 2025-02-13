import { expect, test } from 'vitest';
import { computeMasonryLayout } from './utils';

const mockedBreakpoints = [
  { break: 156, gap: 5, columnCount: 2 },
  { break: 350, gap: 5, columnCount: 3 },
  { gap: 5, columnCount: 4 },
];

const renderItems = [
  { width: 100, height: 40, id: '1' },
  { width: 100, height: 40, id: '2' },
  { width: 100, height: 40, id: '3' },
  { width: 100, height: 40, id: '4' },
  { width: 100, height: 40, id: '5' },
  { width: 100, height: 40, id: '6' },
  { width: 100, height: 40, id: '7' },
  { width: 100, height: 40, id: '8' },
  { width: 100, height: 40, id: '9' },
];

test('should compute 3 column grid', () => {
  const { visibleItems, columnCount, totalHeight } = computeMasonryLayout({
    containerTop: 50,
    containerHeight: 50,
    containerWidth: 310,
    breakpoints: mockedBreakpoints,
    items: renderItems,
    tolerance: 0,
  });

  expect(columnCount).toEqual(3);
  expect(totalHeight).toEqual(130);
  expect(visibleItems).toHaveLength(6);
  expect(visibleItems).toEqual([
    // second rwo
    {
      style: expect.objectContaining({
        left: 0,
        top: 45, // 40 from first row + 5 gap
      }),
      itemIndex: 3,
    },
    {
      style: expect.objectContaining({
        left: 105, // 100 from first column + 5 gap
        top: 45, // 40 from first row + 5 gap
      }),
      itemIndex: 4,
    },
    {
      style: expect.objectContaining({
        left: 210, // 205 from 2 prev columns + 5 gap
        top: 45,
      }),
      itemIndex: 5,
    },
    // third row
    {
      style: expect.objectContaining({
        left: 0,
        top: 90,
      }),
      itemIndex: 6,
    },
    {
      style: expect.objectContaining({
        left: 105,
        top: 90,
      }),
      itemIndex: 7,
    },
    {
      style: expect.objectContaining({
        left: 210,
        top: 90,
      }),
      itemIndex: 8,
    },
  ]);
});

test('should compute 2 column grid', () => {
  const { columnCount } = computeMasonryLayout({
    containerTop: 50,
    containerHeight: 50,
    containerWidth: 140,
    breakpoints: mockedBreakpoints,
    items: renderItems,
    tolerance: 0,
  });

  expect(columnCount).toEqual(2);
});

test('should evenly fill 2 columns', () => {
  const { visibleItems } = computeMasonryLayout({
    containerTop: 0,
    containerHeight: 50,
    containerWidth: 155,
    breakpoints: mockedBreakpoints,
    items: [
      { width: 75, height: 40, id: '1' },
      { width: 75, height: 20, id: '2' },
      { width: 75, height: 20, id: '3' },
    ],
    tolerance: 0,
  });

  expect(visibleItems).toEqual([
    {
      style: expect.objectContaining({
        left: 0,
        top: 0, // 40 from first row + 5 gap
      }),
      itemIndex: 0,
    },
    {
      style: expect.objectContaining({
        left: 80, // 100 from first column + 5 gap
        top: 0, // 40 from first row + 5 gap
      }),
      itemIndex: 1,
    },
    {
      style: expect.objectContaining({
        left: 80, // 205 from 2 prev columns + 5 gap
        top: 25,
      }),
      itemIndex: 2,
    },
  ]);
});
