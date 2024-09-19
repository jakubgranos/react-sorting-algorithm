/**
 * QuickSort function generator to sort an array of numbers.
 * This function uses the QuickSort algorithm, which is a divide-and-conquer algorithm.
 */
const quickSortGenerator = function* (
  array: number[]
): Generator<any, void, unknown> {
  const quickSort = function* (
    arr: number[],
    low: number,
    high: number
  ): Generator<any, void, unknown> {
    if (low < high) {
      const pi = partition(arr, low, high);
      yield { arraySnapshot: [...arr], low, high, pi };

      yield* quickSort(arr, low, pi - 1);
      yield* quickSort(arr, pi + 1, high);
    }
  };

  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  yield* quickSort(array, 0, array.length - 1);
  yield { arraySnapshot: [...array], sorted: true };
};

export default quickSortGenerator;
