/**
 * MergeSort function generator to sort an array of numbers.
 * This function uses the MergeSort algorithm, which is a divide-and-conquer algorithm.
 */
const mergeSortGenerator = function* (
  array: number[]
): Generator<any, void, unknown> {
  /**
   * Inner generator function to perform the merge sort.
   * @param arr - The array to be sorted.
   * @param left - The starting index of the array segment to be sorted.
   * @param right - The ending index of the array segment to be sorted.
   */
  const mergeSort = function* (
    arr: number[],
    left: number,
    right: number
  ): Generator<any, void, unknown> {
    // Base case: if the segment has more than one element
    if (left < right) {
      // Find the middle point to divide the array into two halves
      const middle = Math.floor((left + right) / 2);

      // Recursively sort the first half
      yield* mergeSort(arr, left, middle);
      // Recursively sort the second half
      yield* mergeSort(arr, middle + 1, right);

      // Merge the two halves
      yield* merge(arr, left, middle, right);
    }
  };

  /**
   * Merge function to merge two subarrays of arr[] from left to right.
   * This function is a generator that yields the state of the array at each step.
   *
   * @param {number[]} arr - The array to be sorted.
   * @param {number} left - The starting index of the left subarray.
   * @param {number} middle - The ending index of the left subarray and the starting index of the right subarray.
   * @param {number} right - The ending index of the right subarray.
   * @yields {object} - An object containing the current state of the array and the indices being processed.
   */
  const merge = function* (
    arr: number[],
    left: number,
    middle: number,
    right: number
  ): Generator<any, void, unknown> {
    // Calculate the sizes of the two subarrays to be merged
    const n1 = middle - left + 1;
    const n2 = right - middle;

    // Create temporary arrays to hold the elements of the subarrays
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    // Copy data to temporary arrays leftArray[] and rightArray[]
    for (let i = 0; i < n1; i++) {
      leftArray[i] = arr[left + i];
    }

    for (let j = 0; j < n2; j++) {
      rightArray[j] = arr[middle + 1 + j];
    }

    // Initial indexes of the first and second subarrays
    let i = 0,
      j = 0,
      k = left;

    // Merge the temporary arrays back into arr[left..right]
    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;

      // Yield the current state of the array and the indices being processed
      yield { arraySnapshot: [...arr], left, middle, right };
    }

    // Copy the remaining elements of leftArray[], if any
    while (i < n1) {
      arr[k] = leftArray[i];
      i++;
      k++;

      // Yield the current state of the array and the indices being processed
      yield { arraySnapshot: [...arr], left, middle, right };
    }

    // Copy the remaining elements of rightArray[], if any
    while (j < n2) {
      arr[k] = rightArray[j];
      j++;
      k++;

      // Yield the current state of the array and the indices being processed
      yield { arraySnapshot: [...arr], left, middle, right };
    }
  };

  // Start the merge sort process and yield the final sorted array
  yield* mergeSort(array, 0, array.length - 1);
  yield { arraySnapshot: [...array], sorted: true };
};

export default mergeSortGenerator;
