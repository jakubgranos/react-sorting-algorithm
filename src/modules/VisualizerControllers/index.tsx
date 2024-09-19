import Button from '@components/Buttons';
import {
  AlgorithmsOptions,
  useSortingVisualizerContext,
} from '@contexts/useSortingVisualizerContext';
import generateNewArray from '@helpers/generateNewArray';
import { handleSort } from '@helpers/sortArrayFunctions';
import { FC } from 'react';

const VisualizerControllers: FC = () => {
  const {
    array,
    arraySize,
    isSorting,
    selectedAlgorithm,
    setArray,
    setArraySize,
    setSelectedAlgorithm,
  } = useSortingVisualizerContext();

  return (
    <div className="flex gap-10 items-center justify-center mt-8 w-full">
      <div className="mb-4">
        <label
          htmlFor="algorithm-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Algorithm
        </label>
        <select
          id="algorithm-select"
          name="algorithm-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedAlgorithm}
          onChange={(e) =>
            setSelectedAlgorithm(e.target.value as AlgorithmsOptions)
          }
        >
          <option value="quickSort">Quick Sort</option>
          <option value="bubbleSort">Bubble Sort</option>
          <option value="mergeSort">Merge Sort</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="array-size"
          className="block text-sm font-medium text-gray-700"
        >
          Array Size
        </label>
        <input
          type="number"
          id="array-size"
          name="array-size"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          min="1"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="pivot-number"
          className="block text-sm font-medium text-gray-700"
        >
          Pivot Number
        </label>
        <input
          type="number"
          id="pivot-number"
          name="pivot-number"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          min="1"
          max="100"
        />
      </div>
      <div className="flex gap-3 flex-col items-center space-x-4">
        <Button
          onClick={() =>
            setArray(generateNewArray({ range: arraySize, max: 100 }))
          }
          isSorting={isSorting}
          variant="primary"
        >
          Generate New Array
        </Button>
        <Button
          onClick={() =>
            handleSort({
              algorithm: selectedAlgorithm,
              array: array,
              setArray: setArray,
            })
          }
          isSorting={isSorting}
          variant="secondary"
        >
          Sort
        </Button>
      </div>
    </div>
  );
};

export default VisualizerControllers;
