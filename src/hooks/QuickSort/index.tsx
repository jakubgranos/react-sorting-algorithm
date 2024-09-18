
type QuickSortProps = {
  array: number[];
};

/**
 * QuickSort function to sort an array of numbers.
 * This function uses the QuickSort algorithm, which is a divide-and-conquer algorithm.
 */
const quickSort = async ({ array }: QuickSortProps): Promise<number[]> => {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[array.length - 1];
  const leftArray: number[] = [];
  const rightArray: number[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      leftArray.push(array[i]);
    } else {
      rightArray.push(array[i]);
    }
  }

  return [
    ...(await quickSort({ array: leftArray })),
    pivot,
    ...(await quickSort({ array: rightArray })),
  ];
};

export { quickSort };
