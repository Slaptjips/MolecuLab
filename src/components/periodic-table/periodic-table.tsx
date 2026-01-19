import { useEffect, useRef, useState } from 'react';
import { usePeriodicTableStore } from '../../stores/periodic-table-store';
import { ELEMENTS } from '../../data/elements';
import ElementCard from './element-card';
import GroupPeriodCard from './group-period-card';

// Convert group number to Roman numeral (groups 3-12 don't have Roman numerals)
const toRomanNumeral = (num: number): string | null => {
  if (num >= 3 && num <= 12) {
    return null; // Transition metals (groups 3-12) don't use Roman numerals
  }
  const romanMap: Record<number, string> = {
    1: 'I', 2: 'II',
    13: 'III', 14: 'IV', 15: 'V', 16: 'VI', 17: 'VII', 18: 'VIII',
  };
  return romanMap[num] || null;
};

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
  'actinide': 'bg-amber-400 hover:bg-amber-500',
  'unknown-properties': 'bg-gray-400 hover:bg-gray-500',
};

const PeriodicTable = () => {
  const { selectedElement, activeTrend, filter, selectedGroup, selectedPeriod, dispatch } = usePeriodicTableStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Calculate optimal scale to fill available space
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !tableRef.current) return;

      const container = containerRef.current;
      const table = tableRef.current;

      // Temporarily set scale to 1 to measure natural dimensions
      const originalTransform = table.style.transform;
      table.style.transform = 'scale(1)';
      table.style.width = 'auto';
      table.style.height = 'auto';
      
      // Force reflow to get accurate measurements
      void container.offsetHeight;
      void table.offsetHeight;

      const tableRect = table.getBoundingClientRect();

      // Use viewport width to prevent horizontal scrolling on the page
      // Smaller margin on mobile, larger on desktop
      const isMobile = window.innerWidth < 768;
      const margin = isMobile ? 32 : 100;
      const availableWidth = window.innerWidth - margin;
      
      const naturalWidth = tableRect.width || table.scrollWidth;

      if (naturalWidth === 0) {
        // Restore if measurement failed
        table.style.transform = originalTransform;
        return;
      }

      // Calculate scale factors
      // Only scale based on width to prevent horizontal scrolling
      // Allow vertical scrolling for height
      const scaleX = (availableWidth * 0.98) / naturalWidth; // 98% to leave small margin
      
      // Use width-based scale only, with reasonable bounds
      const newScale = Math.min(scaleX, 1.1); // Max 1.1x to prevent tiles from getting too large
      const finalScale = Math.max(newScale, 0.7); // Min 0.7x to ensure tiles are large enough for text

      setScale(finalScale);
      
      // Restore width/height
      table.style.width = '';
      table.style.height = '';
    };

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const scheduleUpdate = () => {
      rafId = requestAnimationFrame(() => {
        updateScale();
      });
    };

    // Initial calculation
    const timeoutId = setTimeout(scheduleUpdate, 150);
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  // Filter elements based on filter
  const filteredElements = ELEMENTS.filter((element) => {
    if (!filter) return true;

    // Handle broad categories
    if (filter === 'metal') {
      return ['alkali-metal', 'alkaline-earth', 'transition-metal', 'post-transition'].includes(
        element.category
      );
    }
    if (filter === 'nonmetal') {
      // Nonmetals include: nonmetal, halogen, and noble-gas
      return ['nonmetal', 'halogen', 'noble-gas'].includes(element.category);
    }

    // Handle specific categories (including metalloid, etc.)
    return element.category === filter;
  });

  // Map atomic number to grid position (row, col) in 18-column grid
  const getElementGridPosition = (atomicNumber: number): { row: number; col: number } | null => {
    // Standard periodic table layout
    const positions: Record<number, { row: number; col: number }> = {
      // Period 1
      1: { row: 1, col: 1 },   // H
      2: { row: 1, col: 18 },  // He
      // Period 2
      3: { row: 2, col: 1 },   // Li
      4: { row: 2, col: 2 },   // Be
      5: { row: 2, col: 13 },  // B
      6: { row: 2, col: 14 },  // C
      7: { row: 2, col: 15 },  // N
      8: { row: 2, col: 16 },  // O
      9: { row: 2, col: 17 },  // F
      10: { row: 2, col: 18 }, // Ne
      // Period 3
      11: { row: 3, col: 1 },  // Na
      12: { row: 3, col: 2 },  // Mg
      13: { row: 3, col: 13 }, // Al
      14: { row: 3, col: 14 }, // Si
      15: { row: 3, col: 15 }, // P
      16: { row: 3, col: 16 }, // S
      17: { row: 3, col: 17 }, // Cl
      18: { row: 3, col: 18 }, // Ar
      // Period 4
      19: { row: 4, col: 1 },  // K
      20: { row: 4, col: 2 },  // Ca
      21: { row: 4, col: 3 },  // Sc
      22: { row: 4, col: 4 },  // Ti
      23: { row: 4, col: 5 },  // V
      24: { row: 4, col: 6 },  // Cr
      25: { row: 4, col: 7 },  // Mn
      26: { row: 4, col: 8 },  // Fe
      27: { row: 4, col: 9 },  // Co
      28: { row: 4, col: 10 }, // Ni
      29: { row: 4, col: 11 }, // Cu
      30: { row: 4, col: 12 }, // Zn
      31: { row: 4, col: 13 }, // Ga
      32: { row: 4, col: 14 }, // Ge
      33: { row: 4, col: 15 }, // As
      34: { row: 4, col: 16 }, // Se
      35: { row: 4, col: 17 }, // Br
      36: { row: 4, col: 18 }, // Kr
      // Period 5
      37: { row: 5, col: 1 },  // Rb
      38: { row: 5, col: 2 },  // Sr
      39: { row: 5, col: 3 },  // Y
      40: { row: 5, col: 4 },  // Zr
      41: { row: 5, col: 5 },  // Nb
      42: { row: 5, col: 6 },  // Mo
      43: { row: 5, col: 7 },  // Tc
      44: { row: 5, col: 8 },  // Ru
      45: { row: 5, col: 9 },  // Rh
      46: { row: 5, col: 10 }, // Pd
      47: { row: 5, col: 11 }, // Ag
      48: { row: 5, col: 12 }, // Cd
      49: { row: 5, col: 13 }, // In
      50: { row: 5, col: 14 }, // Sn
      51: { row: 5, col: 15 }, // Sb
      52: { row: 5, col: 16 }, // Te
      53: { row: 5, col: 17 }, // I
      54: { row: 5, col: 18 }, // Xe
      // Period 6
      55: { row: 6, col: 1 },  // Cs
      56: { row: 6, col: 2 },  // Ba
      57: { row: 6, col: 3 },  // La
      // Lanthanides (row 9, below main table)
      58: { row: 9, col: 4 },  // Ce
      59: { row: 9, col: 5 },  // Pr
      60: { row: 9, col: 6 },  // Nd
      61: { row: 9, col: 7 },  // Pm
      62: { row: 9, col: 8 },  // Sm
      63: { row: 9, col: 9 },  // Eu
      64: { row: 9, col: 10 }, // Gd
      65: { row: 9, col: 11 }, // Tb
      66: { row: 9, col: 12 }, // Dy
      67: { row: 9, col: 13 }, // Ho
      68: { row: 9, col: 14 }, // Er
      69: { row: 9, col: 15 }, // Tm
      70: { row: 9, col: 16 }, // Yb
      71: { row: 9, col: 17 }, // Lu
      // Continue Period 6
      72: { row: 6, col: 4 },  // Hf
      73: { row: 6, col: 5 },  // Ta
      74: { row: 6, col: 6 },  // W
      75: { row: 6, col: 7 },  // Re
      76: { row: 6, col: 8 },  // Os
      77: { row: 6, col: 9 },  // Ir
      78: { row: 6, col: 10 }, // Pt
      79: { row: 6, col: 11 }, // Au
      80: { row: 6, col: 12 }, // Hg
      81: { row: 6, col: 13 }, // Tl
      82: { row: 6, col: 14 }, // Pb
      83: { row: 6, col: 15 }, // Bi
      84: { row: 6, col: 16 }, // Po
      85: { row: 6, col: 17 }, // At
      86: { row: 6, col: 18 }, // Rn
      // Period 7
      87: { row: 7, col: 1 },  // Fr
      88: { row: 7, col: 2 },  // Ra
      89: { row: 7, col: 3 },  // Ac
      // Actinides (row 10, below lanthanides)
      90: { row: 10, col: 4 },  // Th
      91: { row: 10, col: 5 },  // Pa
      92: { row: 10, col: 6 },  // U
      93: { row: 10, col: 7 },  // Np
      94: { row: 10, col: 8 },  // Pu
      95: { row: 10, col: 9 },  // Am
      96: { row: 10, col: 10 }, // Cm
      97: { row: 10, col: 11 }, // Bk
      98: { row: 10, col: 12 }, // Cf
      99: { row: 10, col: 13 }, // Es
      100: { row: 10, col: 14 }, // Fm
      101: { row: 10, col: 15 }, // Md
      102: { row: 10, col: 16 }, // No
      103: { row: 10, col: 17 }, // Lr
      // Continue Period 7
      104: { row: 7, col: 4 },  // Rf
      105: { row: 7, col: 5 },  // Db
      106: { row: 7, col: 6 },  // Sg
      107: { row: 7, col: 7 },  // Bh
      108: { row: 7, col: 8 },  // Hs
      109: { row: 7, col: 9 },  // Mt
      110: { row: 7, col: 10 }, // Ds
      111: { row: 7, col: 11 }, // Rg
      112: { row: 7, col: 12 }, // Cn
      113: { row: 7, col: 13 }, // Nh
      114: { row: 7, col: 14 }, // Fl
      115: { row: 7, col: 15 }, // Mc
      116: { row: 7, col: 16 }, // Lv
      117: { row: 7, col: 17 }, // Ts
      118: { row: 7, col: 18 }, // Og
    };

    return positions[atomicNumber] || null;
  };

  // Build grid for display - map all elements to their positions
  const elementsByPosition = new Map<string, typeof ELEMENTS[number]>();
  for (const element of ELEMENTS) {
    const pos = getElementGridPosition(element.atomicNumber);
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

  // Get trend value for an element
  const getTrendValue = (element: typeof ELEMENTS[number]): number | null => {
    if (!activeTrend) return null;
    switch (activeTrend) {
      case 'atomic-radius':
        return element.atomicRadius;
      case 'ionization-energy':
        return element.ionizationEnergy;
      case 'electronegativity':
        return element.electronegativity;
      case 'electron-affinity':
        return element.electronAffinity;
      default:
        return null;
    }
  };

  // Get trend color for an element (blue gradient - more dramatic)
  const getTrendColor = (element: typeof ELEMENTS[number]): string | null => {
    if (!activeTrend) return null;
    const value = getTrendValue(element);
    if (value === null) return null;

    // Get all values for normalization
    const allValues = ELEMENTS.map((el) => getTrendValue(el)).filter((v): v is number => v !== null);
    if (allValues.length === 0) return null;

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const range = max - min;
    if (range === 0) return null;

    // Normalize to 0-1
    let normalized = (value - min) / range;
    
    // Apply power curve to enhance differences (square the normalized value for more dramatic contrast)
    normalized = Math.pow(normalized, 0.7); // 0.7 power makes differences more pronounced
    
    // Use wider opacity range and darker colors for more dramatic effect
    // Opacity ranges from 0.15 (very light) to 1.0 (very dark)
    const opacity = 0.15 + normalized * 0.85;
    
    // Use darker blue shades for higher values
    // Base blue: rgb(59, 130, 246), darker blue: rgb(30, 64, 175)
    const blueR = Math.round(59 - normalized * 29); // 59 to 30
    const blueG = Math.round(130 - normalized * 66); // 130 to 64
    const blueB = Math.round(246 - normalized * 71); // 246 to 175
    
    return `rgba(${blueR}, ${blueG}, ${blueB}, ${opacity})`;
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
    const trendColor = getTrendColor(element);
    const isActinide = element.category === 'actinide';

    // Custom color for actinides
    const actinideColor = '#C64484';
    const actinideHoverColor = '#B03A73';

    return (
      <button
        key={element.atomicNumber}
        onClick={() => onClick(element)}
        disabled={!isHighlighted}
        className={`
          relative w-full h-full p-1 rounded-md text-xs font-semibold transition-all
          flex items-center justify-center
          ${!isHighlighted ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
          ${isSelected ? 'ring-4 ring-blue-500 scale-105 z-10' : ''}
          ${!activeTrend && !isActinide ? categoryColor : ''}
        `}
        style={
          activeTrend && trendColor
            ? { backgroundColor: trendColor, color: 'white' }
            : isActinide && !activeTrend
            ? { 
                backgroundColor: actinideColor, 
                color: 'black',
              }
            : undefined
        }
        onMouseEnter={(e) => {
          if (isActinide && !activeTrend && isHighlighted) {
            e.currentTarget.style.backgroundColor = actinideHoverColor;
          }
        }}
        onMouseLeave={(e) => {
          if (isActinide && !activeTrend) {
            e.currentTarget.style.backgroundColor = actinideColor;
          }
        }}
      >
        {/* Main content */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Atomic number - top right */}
          <div className="text-[10px] font-bold leading-none mb-0.5 self-end mr-1">{element.atomicNumber}</div>
          {/* Symbol - center */}
          <div className="text-lg font-bold leading-tight">{element.symbol}</div>
          {/* Atomic mass - bottom center */}
          <div className="text-[9px] font-medium leading-none mt-0.5">{element.atomicMass.toFixed(2)}</div>
        </div>
      </button>
    );
  };

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Periodic Table of Elements</h2>
        
        {/* Controls */}
        <div className="mb-6 space-y-4">
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

          {/* Category Filter Buttons - Combined with Legend */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {/* All category buttons with their colors */}
              {Object.entries(CATEGORY_COLORS).map(([category, colorClass]) => {
                const categoryName = category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
                const isActive = filter === category;
                const isActinide = category === 'actinide';
                
                return (
                  <button
                    key={category}
                    onClick={() =>
                      dispatch({
                        type: 'SET_FILTER',
                        payload: category as typeof filter,
                      })
                    }
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${isActive && !isActinide
                        ? `${colorClass} text-white shadow-md ring-2 ring-offset-2` 
                        : !isActinide
                        ? `${colorClass} text-gray-800 hover:shadow-md`
                        : isActive
                        ? 'text-white shadow-md ring-2 ring-offset-2'
                        : 'text-white hover:shadow-md'
                      }
                    `}
                    style={
                      isActinide
                        ? {
                            backgroundColor: isActive ? '#C64484' : '#C64484',
                            color: 'black',
                            ...(isActive ? { 
                              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 0 4px #C64484'
                            } : {})
                          }
                        : isActive
                        ? { 
                            boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 0 4px currentColor'
                          }
                        : undefined
                    }
                  >
                    {categoryName}
                  </button>
                );
              })}
              {/* Broad category buttons - only Metals since Nonmetal is already in CATEGORY_COLORS */}
              <button
                onClick={() =>
                  dispatch({
                    type: 'SET_FILTER',
                    payload: 'metal' as typeof filter,
                  })
                }
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${filter === 'metal'
                    ? 'bg-gray-600 text-white shadow-md'
                    : 'bg-gray-300 text-gray-800 hover:bg-gray-400 hover:shadow-md'
                  }
                `}
                style={filter === 'metal' ? { 
                  boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 0 4px currentColor'
                } : undefined}
              >
                Metals
              </button>
              {filter && (
                <button
                  onClick={() => dispatch({ type: 'SET_FILTER', payload: null })}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-200 text-red-700 hover:bg-red-300"
                >
                  <span>×</span>
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Periodic Table Grid */}
        <div 
          ref={containerRef} 
          className="w-full flex items-start justify-center py-4" 
          style={{ 
            overflowX: 'hidden'
          }}
        >
          <div 
            ref={tableRef}
            className="space-y-1 periodic-table-container"
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: 'fit-content',
              height: 'fit-content'
            }}
          >
              {/* Group number labels (top) - aligned with period label column */}
              <div className="flex items-center gap-1 mb-1">
                <div className="w-8"></div>
                <div className="grid grid-cols-18 gap-1 flex-1" style={{ gridTemplateColumns: 'repeat(18, minmax(50px, 1fr))' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((groupNum) => {
                    const romanNum = toRomanNumeral(groupNum);
                    return (
                      <button
                        key={`group-label-${groupNum}`}
                        onClick={() => dispatch({ type: 'SELECT_GROUP', payload: groupNum })}
                        className={`text-center text-xs font-semibold h-6 flex flex-col items-center justify-center rounded transition-colors ${
                          selectedGroup === groupNum
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                        }`}
                        title={romanNum ? `Group ${groupNum} (${romanNum})` : `Group ${groupNum}`}
                      >
                        <span className="leading-none">{groupNum}</span>
                        {romanNum && <span className="text-[9px] leading-none opacity-75">{romanNum}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Render rows 1-7 (main periodic table) with period labels */}
              {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                <div key={`row-${row}`} className="flex items-center gap-1">
                  {/* Period label (left) */}
                  <button
                    onClick={() => dispatch({ type: 'SELECT_PERIOD', payload: row })}
                    className={`text-xs font-semibold w-8 h-8 flex items-center justify-center rounded transition-colors ${
                      selectedPeriod === row
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    {row}
                  </button>
                  {/* Elements row */}
                  <div
                    className="grid grid-cols-18 gap-1 flex-1"
                    style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
                  >
                    {Array.from({ length: 18 }).map((_, colIndex) => {
                      const col = colIndex + 1;
                      const element = elementsByPosition.get(`${row}-${col}`);
                      if (!element) {
                        return <div key={`empty-${row}-${col}`} className="aspect-square" />;
                      }
                      return (
                        <div key={element.atomicNumber} className="aspect-square">
                          {renderElementButton(element, filteredElements, selectedElement, activeTrend, handleElementClick)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {/* Empty row for spacing before lanthanides/actinides */}
              <div className="h-2" />
              
              {/* Row 9: Lanthanides */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => dispatch({ type: 'SELECT_PERIOD', payload: 8 })}
                  className={`text-xs font-semibold w-8 h-8 flex items-center justify-center rounded transition-colors ${
                    selectedPeriod === 8
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                  title="Lanthanides"
                >
                  Ln
                </button>
                <div
                  className="grid grid-cols-18 gap-1 flex-1"
                  style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
                >
                  {Array.from({ length: 18 }).map((_, colIndex) => {
                    const col = colIndex + 1;
                    const element = elementsByPosition.get(`9-${col}`);
                    if (!element) {
                      return <div key={`empty-9-${col}`} className="aspect-square" />;
                    }
                    return (
                      <div key={element.atomicNumber} className="aspect-square">
                        {renderElementButton(element, filteredElements, selectedElement, activeTrend, handleElementClick)}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 10: Actinides */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => dispatch({ type: 'SELECT_PERIOD', payload: 9 })}
                  className={`text-xs font-semibold w-8 h-8 flex items-center justify-center rounded transition-colors ${
                    selectedPeriod === 9
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                  title="Actinides"
                >
                  An
                </button>
                <div
                  className="grid grid-cols-18 gap-1 flex-1"
                  style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
                >
                  {Array.from({ length: 18 }).map((_, colIndex) => {
                    const col = colIndex + 1;
                    const element = elementsByPosition.get(`10-${col}`);
                    if (!element) {
                      return <div key={`empty-10-${col}`} className="aspect-square" />;
                    }
                    return (
                      <div key={element.atomicNumber} className="aspect-square">
                        {renderElementButton(element, filteredElements, selectedElement, activeTrend, handleElementClick)}
                      </div>
                    );
                  })}
                </div>
              </div>
          </div>
        </div>

        {/* Trend Info */}
        {activeTrend && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Active Trend:</span>{' '}
              {activeTrend === 'atomic-radius' && 'Atomic Radius (darker blue = larger radius)'}
              {activeTrend === 'ionization-energy' && 'Ionization Energy (darker blue = higher energy)'}
              {activeTrend === 'electronegativity' && 'Electronegativity (darker blue = higher electronegativity)'}
              {activeTrend === 'electron-affinity' && 'Electron Affinity (darker blue = higher affinity)'}
            </p>
          </div>
        )}
      </div>

      {/* Element Detail Modal - Rendered as overlay */}
      {selectedElement && <ElementCard element={selectedElement} />}
      
      {/* Group/Period Characteristics Modal */}
      <GroupPeriodCard />
    </div>
  );
};

export default PeriodicTable;
