import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import SortingVisualizer from '@modules/SortingVisualizer';
import { SortingVisualizerProvider } from '@contexts/useSortingVisualizerContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <SortingVisualizerProvider>
      <SortingVisualizer />
    </SortingVisualizerProvider>
  </StrictMode>
);
