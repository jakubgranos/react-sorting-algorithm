/**
 * This file contains all functions that are used to sort or modify the array of numbers
 */
import {
  AlgorithmsOptions,
  AlgorithmSpeedOptions,
} from '@contexts/useSortingVisualizerContext';
import quickSortGenerator from '@algorithms/quickSort';
import mergeSortGenerator from '@algorithms/mergeSort';

type HandleSortProps = {
  algorithm: AlgorithmsOptions;
  array: number[];
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
  algorithmSpeed: AlgorithmSpeedOptions;
};

/**
 * Handles sorting of the array based on the selected algorithm.
 * Uses generators to perform step-by-step sorting and updates the array with animations.
 */
export const handleSort = ({
  algorithm,
  array,
  setArray,
  setIsSorting,
  algorithmSpeed,
}: HandleSortProps) => {
  switch (algorithm) {
    case 'quickSort':
      let quickSortedArray = quickSortGenerator(array);

      // Update array with quick sort algorithm
      updateArrayWithDelay(
        quickSortedArray,
        setArray,
        setIsSorting,
        algorithmSpeed,
        (bars, value) => {
          const { low, high, pi, sorted } = value;

          // Highlight the current segment being processed
          bars.forEach((bar, index) => {
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

            if (index >= low && index <= high) {
              bar.classList.add('segment');
            }

            if (sorted) {
              bar.classList.add('sorted');
              setIsSorting(false);
            }
          });
        }
      );
      break;
    case 'mergeSort':
      let mergeSortedArray = mergeSortGenerator(array);

      // Update array with merge sort algorithm
      updateArrayWithDelay(
        mergeSortedArray,
        setArray,
        setIsSorting,
        algorithmSpeed,
        (bars, value) => {
          const { left, middle, right, sorted } = value;

          // Highlight the current segment being processed
          bars.forEach((bar, index) => {
            if (index >= left && index <= right) {
              bar.classList.add('segment');
            }

            if (index === left) {
              bar.classList.add('left');
            } else if (index === middle) {
              bar.classList.add('middle');
            } else if (index === right) {
              bar.classList.add('right');
            }

            if (sorted) {
              bar.classList.add('sorted');
            }
          });
        }
      );
      break;
  }
};

/**
 * Updates the array with a delay to create an animation effect.
 * Uses the provided generator to get the next step in the sorting process.
 *
 * @param generator - The generator function for the sorting algorithm.
 * @param setArray - Function to update the array state.
 * @param setIsSorting - Function to update the sorting state.
 * @param algorithmSpeed - Speed of the sorting algorithm.
 * @param updateBars - Function to update the visual representation of the array bars.
 */
export const updateArrayWithDelay = (
  generator: Generator<any, void, unknown>,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
  algorithmSpeed: AlgorithmSpeedOptions,
  updateBars: (bars: NodeListOf<Element>, value: any) => void
) => {
  // start from setIsSorting to true, to prevent the user from clicking the buttons while sorting
  setIsSorting(true);

  const intervalId = setInterval(() => {
    const { done, value } = generator.next();
    if (done) {
      clearInterval(intervalId);
      setIsSorting(false);
      return;
    }

    setArray([...value.arraySnapshot]);

    const bars = document.querySelectorAll('.array-bar');
    if (!bars.length) {
      return;
    }

    updateBars(bars, value);

    // Add a slight delay before removing the classes to ensure colors are visible
    setTimeout(() => {
      bars.forEach((bar) => {
        bar.classList.remove(
          'left',
          'middle',
          'right',
          'low',
          'high',
          'pivot',
          'segment'
        );
      });
      /**
       * timeout timer for removing the classes is set to 100ms less than the algorithm speed
       * to ensure the classes are removed before the next update
       * animations purpose
       */
    }, sortAlgorithmSpeed(algorithmSpeed) - 100);
  }, sortAlgorithmSpeed(algorithmSpeed));
};

/**
 * Returns the delay time based on the selected algorithm speed.
 * @param algorithmSpeed - Speed of the sorting algorithm.
 * @returns The delay time in milliseconds.
 */
export const sortAlgorithmSpeed = (algorithmSpeed: AlgorithmSpeedOptions) => {
  let speedNumber = 0;

  switch (algorithmSpeed) {
    case 'normal':
      speedNumber = 700;
      break;
    case 'fast':
      speedNumber = 400;
      break;
    case 'slow':
      speedNumber = 1500;
      break;
    default:
      speedNumber = 700;
  }

  return speedNumber;
};
