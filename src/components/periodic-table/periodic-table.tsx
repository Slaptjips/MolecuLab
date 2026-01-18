import { usePeriodicTableStore } from '../../stores/periodic-table-store';
import { ELEMENTS } from '../../data/elements';
import ElementCard from './element-card';
import TrendVisualizer from './trend-visualizer';

const CATEGORY_COLORS: Record<string, string> = {
  'alkali-metal': 'bg-red-400 hover:bg-red-500',
  'alkaline-earth': 'bg-orange-400 hover:bg-orange-500',
  'transition-metal': 'bg-yellow-400 hover:bg-yellow-500',
  'post-transition': 'bg-green-400 hover:bg-green-500',
  'metalloid': 'bg-teal-400 hover:bg-teal-500',
  'nonmetal': 'bg-blue-400 hover:bg-blue-500',
  'halogen': 'bg-indigo-400 hover:bg-indigo-500',
  'noble-gas': 'bg-purple-400 hover:bg-purple-500',
  'lanthanide': 'bg-pink-400 hover:bg-pink-500',
  'actinide': 'bg-rose-400 hover:bg-rose-500',
};

const PeriodicTable = () => {
  const { selectedElement, activeTrend, filter, searchQuery, dispatch } = usePeriodicTableStore();

  // Filter elements based on search and filter
  const filteredElements = ELEMENTS.filter((element) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !element.name.toLowerCase().includes(query) &&
        !element.symbol.toLowerCase().includes(query) &&
        element.atomicNumber.toString() !== query
      ) {
        return false;
      }
    }

    if (!filter) return true;

    // Handle broad categories
    if (filter === 'metal') {
      return ['alkali-metal', 'alkaline-earth', 'transition-metal', 'post-transition'].includes(
        element.category
      );
    }
    if (filter === 'nonmetal') {
      return element.category === 'nonmetal';
    }
    if (filter === 'metalloid') {
      return element.category === 'metalloid';
    }

    // Handle specific categories
    return element.category === filter;
  });

  // Create periodic table grid positions
  const getElementPosition = (element: typeof ELEMENTS[number]) => {
    const period = element.period;
    let group = element.group;

    // Handle lanthanides and actinides (placed below table)
    if (element.category === 'lanthanide') {
      return { row: 9, col: (element.atomicNumber - 57) % 14 + 4 };
    }
    if (element.category === 'actinide') {
      return { row: 10, col: (element.atomicNumber - 89) % 14 + 4 };
    }

    // Handle main group elements
    if (group === null) {
      return null;
    }

    // Adjust for transition metals
    if (element.category === 'transition-metal') {
      // Transition metals span groups 3-12
      const transitionGroup = element.atomicNumber <= 30 
        ? group 
        : group === 3 ? 3 : group === 4 ? 4 : group >= 5 && group <= 12 ? group : null;
      
      if (transitionGroup === null) return null;
      
      return { 
        row: period, 
        col: transitionGroup === 1 || transitionGroup === 2 
          ? transitionGroup 
          : transitionGroup + 10 // Shift transition metals to the right
      };
    }

    // Main group elements
    if (group <= 2) {
      return { row: period, col: group };
    }
    if (group >= 13 && group <= 18) {
      return { row: period, col: group - 10 }; // Shift groups 13-18 to positions 3-8
    }

    return null;
  };

  // Build grid for display (simplified layout for initial 18 elements)
  const elementsByPosition = new Map<string, typeof ELEMENTS[number]>();
  for (const element of ELEMENTS) {
    const pos = getElementPosition(element);
    if (pos) {
      elementsByPosition.set(`${pos.row}-${pos.col}`, element);
    }
  }

  const handleElementClick = (element: typeof ELEMENTS[number]) => {
    if (selectedElement?.atomicNumber === element.atomicNumber) {
      dispatch({ type: 'SELECT_ELEMENT', payload: null });
    } else {
      dispatch({ type: 'SELECT_ELEMENT', payload: element });
    }
  };

  const renderElementButton = (
    element: typeof ELEMENTS[number],
    filteredElements: readonly typeof ELEMENTS[number][],
    selectedElement: typeof ELEMENTS[number] | null,
    activeTrend: 'atomic-radius' | 'ionization-energy' | 'electronegativity' | 'electron-affinity' | null,
    onClick: (element: typeof ELEMENTS[number]) => void
  ) => {
    const isHighlighted = filteredElements.includes(element);
    const isSelected = selectedElement?.atomicNumber === element.atomicNumber;
    const categoryColor = CATEGORY_COLORS[element.category] || 'bg-gray-300';

    return (
      <button
        key={element.atomicNumber}
        onClick={() => onClick(element)}
        disabled={!isHighlighted}
        className={`
          aspect-square p-1 sm:p-2 rounded-md text-xs font-semibold transition-all
          ${!isHighlighted ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
          ${isSelected ? 'ring-4 ring-blue-500 scale-105 z-10' : ''}
          ${categoryColor}
          ${activeTrend ? 'opacity-75' : ''}
        `}
      >
        <div className="text-[10px] sm:text-xs font-bold">{element.atomicNumber}</div>
        <div className="text-sm sm:text-lg font-bold">{element.symbol}</div>
        <div className="text-[8px] sm:text-[10px] truncate">{element.name}</div>
      </button>
    );
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Periodic Table Explorer</h2>
        
        {/* Controls */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Elements
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              placeholder="Search by name, symbol, or atomic number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Trend Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Periodic Trends</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'atomic-radius', label: 'Atomic Radius' },
                { id: 'ionization-energy', label: 'Ionization Energy' },
                { id: 'electronegativity', label: 'Electronegativity' },
                { id: 'electron-affinity', label: 'Electron Affinity' },
              ].map((trend) => (
                <button
                  key={trend.id}
                  onClick={() =>
                    dispatch({
                      type: 'SHOW_TREND',
                      payload: trend.id as 'atomic-radius' | 'ionization-energy' | 'electronegativity' | 'electron-affinity',
                    })
                  }
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTrend === trend.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {trend.label}
                </button>
              ))}
              {activeTrend && (
                <button
                  onClick={() => dispatch({ type: 'SHOW_TREND', payload: null })}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-200 text-red-700 hover:bg-red-300"
                >
                  Clear Trend
                </button>
              )}
            </div>
          </div>

          {/* Filter Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'metal', label: 'Metals' },
                { id: 'nonmetal', label: 'Nonmetals' },
                { id: 'metalloid', label: 'Metalloids' },
                { id: 'alkali-metal', label: 'Alkali Metals' },
                { id: 'halogen', label: 'Halogens' },
                { id: 'noble-gas', label: 'Noble Gases' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    dispatch({
                      type: 'SET_FILTER',
                      payload: cat.id as typeof filter,
                    })
                  }
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              {filter && (
                <button
                  onClick={() => dispatch({ type: 'SET_FILTER', payload: null })}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-200 text-red-700 hover:bg-red-300"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Periodic Table Grid */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Grid layout: Period 1 has 2 elements, Periods 2-3 have 8 elements each */}
            <div className="space-y-1 max-w-5xl mx-auto">
              {/* Period 1: H, He */}
              <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
                {[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2].map((atomicNumber, index) => {
                  if (atomicNumber === 0) return <div key={`empty-1-${index}`} className="aspect-square" />;
                  const element = ELEMENTS.find((el) => el.atomicNumber === atomicNumber);
                  if (!element) return <div key={`empty-${index}`} className="aspect-square" />;
                  return renderElementButton(element, filteredElements, selectedElement, activeTrend, handleElementClick);
                })}
              </div>

              {/* Period 2: Li to Ne */}
              <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
                {[3, 4, 0, 0, 5, 6, 7, 8, 9, 10].map((atomicNumber, index) => {
                  if (atomicNumber === 0) return <div key={`empty-2-${index}`} className="aspect-square" />;
                  const element = ELEMENTS.find((el) => el.atomicNumber === atomicNumber);
                  if (!element) return <div key={`empty-${index}`} className="aspect-square" />;
                  return (
                    <div key={element.atomicNumber} style={{ gridColumn: index < 2 ? index + 1 : index + 9 }}>
                      {renderElementButton(element, filteredElements, selectedElement, activeTrend, handleElementClick)}
                    </div>
                  );
                })}
              </div>

              {/* Period 3: Na to Ar */}
              <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
                {[11, 12, 0, 0, 13, 14, 15, 16, 17, 18].map((atomicNumber, index) => {
                  if (atomicNumber === 0) return <div key={`empty-3-${index}`} className="aspect-square" />;
                  const element = ELEMENTS.find((el) => el.atomicNumber === atomicNumber);
                  if (!element) return <div key={`empty-${index}`} className="aspect-square" />;
                  return (
                    <div key={element.atomicNumber} style={{ gridColumn: index < 2 ? index + 1 : index + 9 }}>
                      {renderElementButton(element, filteredElements, selectedElement, activeTrend, handleElementClick)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Trend Visualizer */}
        {activeTrend && (
          <div className="mt-6">
            <TrendVisualizer trend={activeTrend} />
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Category Legend</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(CATEGORY_COLORS).map(([category, color]) => {
              const categoryName = category
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              return (
                <div key={category} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded ${color}`} />
                  <span className="text-sm text-gray-600">{categoryName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Element Detail Panel */}
      {selectedElement && <ElementCard element={selectedElement} />}
    </div>
  );
};

export default PeriodicTable;
