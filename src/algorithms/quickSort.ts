/**
 * QuickSort function generator to sort an array of numbers.
 * This function uses the QuickSort algorithm, which is a divide-and-conquer algorithm.
 */
const quickSortGenerator = function* (
  array: number[]
): Generator<any, void, unknown> {
  /**
   * Inner generator function to perform the quick sort.
   * @param arr - The array to be sorted.
   * @param low - The starting index of the array segment to be sorted.
   * @param high - The ending index of the array segment to be sorted.
   */
  const quickSort = function* (
    arr: number[],
    low: number,
    high: number
  ): Generator<any, void, unknown> {
    // Base case: if the segment has more than one element
    if (low < high) {
      // Partition the array and get the pivot index
      const pi = partition(arr, low, high);
      // Yield the current state of the array and pivot information
      yield { arraySnapshot: [...arr], low, high, pi };

      // Recursively sort the elements before the pivot
      yield* quickSort(arr, low, pi - 1);
      // Recursively sort the elements after the pivot
      yield* quickSort(arr, pi + 1, high);
    }
  };

  /**
   * Partition function to place the pivot element at the correct position
   * and arrange smaller elements to the left and larger elements to the right.
   * @param arr - The array to be partitioned.
   * @param low - The starting index of the segment to be partitioned.
   * @param high - The ending index of the segment to be partitioned.
   * @returns The index of the pivot element after partitioning.
   */
  const partition = (arr: number[], low: number, high: number): number => {
    // Choose the last element as the pivot
    const pivot = arr[high];
    // Index of the smaller element
    let i = low - 1;

    // Traverse through all elements and rearrange them based on the pivot
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        // Swap elements at i and j
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    // Swap the pivot element with the element at i+1
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  // Start the quick sort process
  yield* quickSort(array, 0, array.length - 1);
  // Yield the final sorted array
  yield { arraySnapshot: [...array], sorted: true };
};

export default quickSortGenerator;
