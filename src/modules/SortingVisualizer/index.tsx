import { useState, FC } from 'react';
import generateNewArray from '@hooks/GenerateNewArray';
import { quickSort } from '@hooks/QuickSort';

/**
 * SortingVisualizer component
 * Renders the array of numbers and provides the functionality to generate a new array and sort the array
 */
const SortingVisualizer: FC = () => {
  const [arrayRange, setArrayRange] = useState<number>(20);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const newArrayOptions = {
    range: arrayRange,
    max: 100,
    min: 5,
  };

  const [numbers, setNumbers] = useState<number[]>(
    generateNewArray(newArrayOptions)
  );

  // Generate a new array of numbers
  const generateArray = () => {
    setNumbers(generateNewArray(newArrayOptions));
  };

  // Sort the array of numbers
  const sortArrayFunction = async () => {
    setIsSorting(true);

    await quickSort({ array: numbers }).then((res) => {
      setNumbers(res);

      setTimeout(() => {
        setIsSorting(false);
      }, 500);
    });
  };

  return (
    <div className="flex flex-col items-center mt-8 p-10">
      <div className="flex items-end space-x-1 h-64 overflow-auto max-w-full">
        {numbers.map((number, index) => (
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
          value={arrayRange}
          onChange={(e) => setArrayRange(Number(e.target.value))}
        />
      </div>
      <button
        className={`mt-4 p-2  text-white rounded ${
          isSorting ? 'bg-gray-200' : 'bg-green-500'
        }`}
        onClick={generateArray}
        disabled={isSorting}
      >
        Generate new array
      </button>
      <button
        className={`mt-4 p-2  text-black rounded border border-black ${
          isSorting && 'bg-gray-200'
        }`}
        onClick={() => sortArrayFunction()}
        disabled={isSorting}
      >
        Sort
      </button>
    </div>
  );
};

export default SortingVisualizer;
