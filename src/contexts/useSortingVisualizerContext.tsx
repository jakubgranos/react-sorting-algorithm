import generateNewArray from '@helpers/generateNewArray';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

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
  arraySize: number;
  setArraySize: StateSetter<number>;
  array: number[];
  setArray: StateSetter<number[]>;
  selectedAlgorithm: AlgorithmsOptions;
  setSelectedAlgorithm: StateSetter<AlgorithmsOptions>;
  isSorting: boolean;
  setIsSorting: StateSetter<boolean>;
  algorithmSpeed: AlgorithmSpeedOptions;
  setAlgorithmSpeed: StateSetter<AlgorithmSpeedOptions>;
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
  const [arraySize, setArraySize] = useState<number>(20);
  const [array, setArray] = useState<number[]>(() =>
    generateNewArray({ range: arraySize, max: 100 })
  );
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmsOptions>('quickSort');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [algorithmSpeed, setAlgorithmSpeed] =
    useState<AlgorithmSpeedOptions>('normal');
  const [sortedOnce, setSortedOnce] = useState<boolean>(false);

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
