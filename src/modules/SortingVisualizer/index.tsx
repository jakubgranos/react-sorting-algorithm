import { FC } from 'react';
import { useSortingVisualizerContext } from '@contexts/useSortingVisualizerContext';
import SortingVisualizerControls from '@modules/VisualizerControllers';

/**
 * Shows the array and display it as a bar graph.
 */
const SortingVisualizer: FC = () => {
  const { array, isSorting } = useSortingVisualizerContext();

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
      <SortingVisualizerControls />
    </div>
  );
};

export default SortingVisualizer;
