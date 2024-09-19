import { FC } from 'react';
import { useSortingVisualizerContext } from '@contexts/useSortingVisualizerContext';
import Legend from '@components/Legend';
import VisualizerControllers from '@modules/VisualizerControllers';

/**
 * Shows the array and display it as a bar graph.
 */
const SortingVisualizer: FC = () => {
  const { array, isSorting } = useSortingVisualizerContext();

  return (
    <div className="flex flex-col items-center mt-8 p-10 max-w-[1200px] m-auto border border-gray-300 rounded">
      <h1 className="text-3xl font-semibold">React Sorting </h1>
      <Legend />
      <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-12">
        <VisualizerControllers />
        <div className="flex items-end justify-end space-x-1 w-full md:h-auto h-[20vw] md:w-[80%] overflow-auto max-w-full bg-slate-50 px-4 rounded">
          {' '}
          {array.map((number, index) => (
            <span
              key={index}
              className={`array-bar transition-background duration-500 ease-in-out ${
                isSorting ? 'bg-sorting-active' : 'bg-sorting-inactive'
              }`}
              style={{ height: `${number}%`, width: `${100 / array.length}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
