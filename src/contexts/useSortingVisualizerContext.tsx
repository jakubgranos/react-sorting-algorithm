import { browserStorage } from '@helpers/browserStorage';
import generateNewArray from '@helpers/generateNewArray';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * Export types for the Sorting Visualizer options
 */
export type AlgorithmsOptions = 'quickSort' | 'mergeSort';
export type AlgorithmSpeedOptions = 'normal' | 'fast' | 'slow';

// Simplified type for the state hook
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Define the properties for the SortingVisualizerContext
 */
type SortingVisualizerContextProps = {
  // Array length
  arraySize: number;
  setArraySize: StateSetter<number>;

  // Array of numbers
  array: number[];
  setArray: StateSetter<number[]>;

  // states for algorithm selection
  selectedAlgorithm: AlgorithmsOptions;
  setSelectedAlgorithm: StateSetter<AlgorithmsOptions>;

  // checking the state of sorting
  isSorting: boolean;
  setIsSorting: StateSetter<boolean>;

  // state for algorithm speed
  algorithmSpeed: AlgorithmSpeedOptions;
  setAlgorithmSpeed: StateSetter<AlgorithmSpeedOptions>;

  // state for prevent user from sorting multiple times one array
  sortedOnce: boolean;
  setSortedOnce: StateSetter<boolean>;
};

// Create context with types for the Sorting Visualizer
const SortingVisualizerContext = createContext<SortingVisualizerContextProps>(
  {} as SortingVisualizerContextProps
);

/**
 * SortingVisualizerProvider component
 * Provides the context to the children components to avoid prop drilling
 */
export const SortingVisualizerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  /**
   * All possible states for the Sorting Visualizer
   */
  // Number() to make sure value from local storage is a number not a string
  const [arraySize, setArraySize] = useState<number>(
    Number(browserStorage.arraySize.get()) || 20
  );
  // Set the default algorithm to quick sort
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmsOptions>(
    (browserStorage.selectedAlgorithm.get() as AlgorithmsOptions) || 'quickSort'
  );
  // Set the default algorithm speed to normal
  const [algorithmSpeed, setAlgorithmSpeed] = useState<AlgorithmSpeedOptions>(
    (browserStorage.algorithmSpeed.get() as AlgorithmSpeedOptions) || 'normal'
  );

  const [array, setArray] = useState<number[]>(() =>
    generateNewArray({ range: arraySize, max: 100 })
  );

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortedOnce, setSortedOnce] = useState<boolean>(false);

  /**
   * Init default values for the browser storage
   *
   * to prevent re-rendering of the component don't put here
   * dependency [] of useEffect
   */
  useEffect(() => {
    browserStorage.arraySize.set(String(arraySize));
    browserStorage.algorithmSpeed.set(algorithmSpeed);
    browserStorage.selectedAlgorithm.set(selectedAlgorithm);
  }, []);

  return (
    <SortingVisualizerContext.Provider
      value={{
        arraySize,
        setArraySize,
        array,
        setArray,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isSorting,
        setIsSorting,
        algorithmSpeed,
        setAlgorithmSpeed,
        sortedOnce,
        setSortedOnce,
      }}
    >
      {children}
    </SortingVisualizerContext.Provider>
  );
};

/**
 * Custom hook to use the SortingVisualizerContext
 * Reduces the need to import and use SortingVisualizerContext directly
 */
export const useSortingVisualizerContext = () => {
  const context = useContext(SortingVisualizerContext);
  /**
   * Checks if context is in the provider, if not throw an error
   */
  if (!context) {
    throw new Error(
      'useSortingVisualizerContext must be used within a SortingVisualizerProvider'
    );
  }

  return context;
};
