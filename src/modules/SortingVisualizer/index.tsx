import { FC } from 'react';
import { useSortingVisualizerContext } from '@contexts/useSortingVisualizerContext';
import generateNewArray from '@helpers/generateNewArray';

const SortingVisualizer: FC = () => {
  const { array, setArray, arraySize, setArraySize, isSorting } =
    useSortingVisualizerContext();

  // Generate a new array of numbers
  const generateArray = () => {
    setArray(generateNewArray({ range: arraySize, max: 100 }));
  };

  return (
    <div className="flex flex-col items-center mt-8 p-10">
      <div className="flex items-end space-x-1 h-64 overflow-auto max-w-full">
        {array.map((number, index) => (
          <span
            key={index}
            className={`array-bar ${
              isSorting ? 'bg-red-500' : 'bg-blue-500'
            } transition-background duration-500 ease-in-out`}
            style={{ height: `${number}px`, width: '20px' }}
          />
        ))}
      </div>
      <div className="mt-20">
        <label htmlFor="input">Number of elements in the array:</label>
        <input
          type="number"
          className="border border-black p-1 ml-2"
          min="1"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
        />
      </div>
      <button
        onClick={generateArray}
        className="
        mt-4
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
      "
      >
        Generate New Array
      </button>
    </div>
  );
};

export default SortingVisualizer;
