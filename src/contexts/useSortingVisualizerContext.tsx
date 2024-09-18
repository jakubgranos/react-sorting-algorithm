import generateNewArray from '@helpers/generateNewArray';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

// All sorting algorithms available in the Sorting Visualizer
export type AlgorithmsOptions = 'quickSort' | 'mergeSort';

type SortingVisualizerContextProps = {
  arraySize: number;
  setArraySize: (size: number) => void;
  array: number[];
  setArray: (array: number[]) => void;
  selectedAlgorithm: AlgorithmsOptions;
  setSelectedAlgorithm: (algorithm: AlgorithmsOptions) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
};

// Creating context with types for the Sorting Visualizer
const SortingVisualizerContext = createContext<SortingVisualizerContextProps>(
  {} as SortingVisualizerContextProps
);

/**
 * SortingVisualizerProvider component
 * To avoid prop drilling, this component provides the context to the children components
 */
export const SortingVisualizerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  /**
   * All Possible states for the Sorting Visualizer
   */
  const [arraySize, setArraySize] = useState<number>(20);
  const [array, setArray] = useState<number[]>(() =>
    generateNewArray({ range: arraySize, max: 100 })
  );
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmsOptions>('quickSort');
  const [isSorting, setIsSorting] = useState<boolean>(false);

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
      }}
    >
      {children}
    </SortingVisualizerContext.Provider>
  );
};

/**
 * Creating here useContext can reduce the usage of context and import of sortingVisualizerContext
 * every time where context is needed to use.
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
