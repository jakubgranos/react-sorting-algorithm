import { useState, FC } from 'react';
import generateNewArray from '@hooks/GenerateNewArray';
import { quickSort } from '@hooks/QuickSort';
import Button from '@components/Button';

/**
 * SortingVisualizer component
 * Renders the array of numbers and provides the functionality to generate a new array and sort the array
 */
const SortingVisualizer: FC = () => {
  const [arrayRange, setArrayRange] = useState<number>(20);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<number[]>(() =>
    generateNewArray({ range: arrayRange, max: 100 })
  );

  // Generate a new array of numbers
  const generateArray = () => {
    setNumbers(generateNewArray({ range: arrayRange, max: 100 }));
  };

  // Sort the array of numbers
  const sortArrayFunction = async () => {
    setIsSorting(true);
    const sortedArray = await quickSort({ array: numbers });
    setNumbers(sortedArray);

    // Delay the sorting state to match animation duration
    setTimeout(() => {
      setIsSorting(false);
    }, 500);
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
      <Button onClick={generateArray} isSorting={isSorting} variant="primary">
        Generate New Array
      </Button>
      <Button
        onClick={sortArrayFunction}
        isSorting={isSorting}
        variant="secondary"
      >
        Sort Array
      </Button>
    </div>
  );
};

export default SortingVisualizer;
