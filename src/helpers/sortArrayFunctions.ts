/**
 * This file contains all functions that are used to sort or modify the array of numbers
 */
import { AlgorithmsOptions } from '@contexts/useSortingVisualizerContext';
import quickSortGenerator from '@algorithms/quickSort';

/**
 * Function that give us ability to delay the array update & animate the array bars
 */
const updateArrayWithDelay = (
  generator: Generator<any, void, unknown>,
  setArray: any
) => {
  const intervalId = setInterval(() => {
    const { done, value } = generator.next();
    if (done) {
      clearInterval(intervalId);
      return;
    }

    const { arraySnapshot, low, high, pi, ...otherProps } = value;

    setArray([...arraySnapshot]);

    const bars = document.querySelectorAll('.array-bar');
    /**
     * Checks if bars are available, to avoid errors with operations on empty array's
     */
    if (!bars.length) {
      return;
    }

    bars.forEach((bar, index) => {
      bar.classList.remove('low', 'high', 'pivot', 'segment', 'sorted');

      /**
       * Highlight the low, high and pivot index of the array
       * to show the current segment that the code is working on
       */
      switch (index) {
        case low:
          bar.classList.add('low');
          break;
        case high:
          bar.classList.add('high');
          break;
        case pi:
          bar.classList.add('pivot');
          break;
      }

      // highlight the segment that "code working on" currently
      if (index >= low && index <= high) {
        bar.classList.add('segment');
      }

      // highlight the sorted bars (on finnish)
      if (otherProps.sorted) {
        bar.classList.add('sorted');
      }
    });
  }, 500);
};

type HandleSortProps = {
  algorithm: AlgorithmsOptions;
  array: number[];
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
};

/**
 * There can be multiple sorting algorithms
 * choosing right algorithm and sorting the array with that algorithm
 */
export const handleSort = ({ algorithm, array, setArray }: HandleSortProps) => {
  switch (algorithm) {
    case 'quickSort':
      let sortedArray = quickSortGenerator(array);

      // Update the array with delay & ani
      updateArrayWithDelay(sortedArray, setArray);
      break;
  }
};
