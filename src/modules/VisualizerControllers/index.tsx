import Button from '@components/Button';
import ControllerInput from '@components/ControllerInput';
import ControllerSelect from '@components/ControllerSelect';
import {
  AlgorithmsOptions,
  AlgorithmSpeedOptions,
  useSortingVisualizerContext,
} from '@contexts/useSortingVisualizerContext';
import { browserStorage } from '@helpers/browserStorage';
import generateNewArray from '@helpers/generateNewArray';
import { handleSort } from '@helpers/sortArrayFunctions';
import { FC } from 'react';

/**
 * VisualizerControllers component
 * Contains the controllers for the sorting visualizer
 */
const VisualizerControllers: FC = () => {
  const {
    array,
    arraySize,
    isSorting,
    selectedAlgorithm,
    setArray,
    setArraySize,
    setSelectedAlgorithm,
    setIsSorting,
    algorithmSpeed,
    setAlgorithmSpeed,
    sortedOnce,
    setSortedOnce,
  } = useSortingVisualizerContext();

  return (
    <div className="flex flex-col gap-3 w-full md:w-[20%] bg-slate-50 px-4 rounded p-10">
      <ControllerSelect
        id="algorithm-select"
        label="Select Algorithm"
        value={selectedAlgorithm}
        onChange={(e) => {
          setSelectedAlgorithm(e.target.value as AlgorithmsOptions);
          browserStorage.selectedAlgorithm.set(e.target.value);
        }}
        options={[
          { value: 'quickSort', label: 'Quick Sort' },
          { value: 'mergeSort', label: 'Merge Sort' },
        ]}
      />
      <ControllerInput
        id="array-size"
        label="Array Size"
        type="number"
        // Limit the array size to 100 (even with min max user can type any number, so this prevents that)
        value={arraySize > 100 ? 100 : arraySize}
        onChange={(e) => {
          setArraySize(Number(e.target.value));
          browserStorage.arraySize.set(e.target.value);
        }}
        min={1}
        max={100}
      />
      <ControllerSelect
        id="algorithm-speed"
        label="Algorithm speed"
        value={algorithmSpeed}
        onChange={(e) => {
          setAlgorithmSpeed(e.target.value as AlgorithmSpeedOptions);
          browserStorage.algorithmSpeed.set(e.target.value);
        }}
        options={[
          { value: 'normal', label: 'Normal' },
          { value: 'fast', label: 'Fast' },
          { value: 'slow', label: 'Slow' },
        ]}
      />
      <div className="flex gap-3 flex-col">
        <Button
          onClick={() => {
            setArray(generateNewArray({ range: arraySize, max: 100 }));
            setSortedOnce(false);
          }}
          isSorting={isSorting}
          variant="primary"
        >
          Generate New Array
        </Button>
        <Button
          onClick={() => {
            handleSort({
              algorithm: selectedAlgorithm,
              array: array,
              setArray: setArray,
              setIsSorting: setIsSorting,
              algorithmSpeed: algorithmSpeed,
            });
            setSortedOnce(true);
          }}
          isSorting={isSorting || sortedOnce}
          variant="secondary"
        >
          Sort
        </Button>
      </div>
    </div>
  );
};

export default VisualizerControllers;
