import { useSortingVisualizerContext } from '@contexts/useSortingVisualizerContext';

const Legend = () => {
  // Retrieve the selected sorting algorithm from the context
  const { selectedAlgorithm } = useSortingVisualizerContext();

  // Define legend items specific to QuickSort
  const quickSortLegendItems = [
    { className: 'bg-low', description: 'Low index' },
    { className: 'bg-high', description: 'High index' },
    { className: 'bg-pivot', description: 'Pivot element' },
  ];

  // Define legend items specific to MergeSort
  const mergeSortLegendItems = [
    { className: 'bg-left', description: 'Left index' },
    { className: 'bg-middle', description: 'Middle index' },
    { className: 'bg-right', description: 'Right index' },
  ];

  // Define global legend items applicable to all sorting algorithms
  const legendGlobalItems = [
    { className: 'bg-segment', description: 'Current segment' },
    { className: 'bg-sorted', description: 'Sorted element' },
    { className: 'bg-sorting-active', description: 'Sorting Active' },
    { className: 'bg-sorting-inactive', description: 'Sorting Inactive' },
  ];

  // Combine global legend items with algorithm-specific items based on the selected algorithm
  const legendItems = legendGlobalItems.concat(
    selectedAlgorithm === 'quickSort'
      ? quickSortLegendItems
      : selectedAlgorithm === 'mergeSort'
      ? mergeSortLegendItems
      : []
  );

  return (
    <div className="legend mt-5 mb-12 bg-slate-50 px-4 rounded p-10 w-full">
      <h3 className="mb-4 text-lg font-semibold">Legend</h3>
      <ul className="list-none p-0 grid grid-cols-2 md:grid-cols-4 gap-4 flex-wrap">
        {legendItems.map((item) => (
          <li key={item.className} className="flex items-center mb-2">
            <span
              className={`legend-color block w-5 h-5 mr-2 border ${item.className}`}
            ></span>
            {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
