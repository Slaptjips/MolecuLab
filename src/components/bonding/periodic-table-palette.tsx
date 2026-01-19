import { ELEMENTS } from '../../data/elements';

const CATEGORY_COLORS: Record<string, string> = {
  'alkali-metal': 'bg-red-400',
  'alkaline-earth': 'bg-orange-400',
  'transition-metal': 'bg-yellow-400',
  'post-transition': 'bg-green-400',
  'metalloid': 'bg-teal-400',
  'nonmetal': 'bg-blue-400',
  'halogen': 'bg-indigo-400',
  'noble-gas': 'bg-purple-400',
  'lanthanide': 'bg-pink-400',
  'actinide': '#C64484',
  'unknown-properties': 'bg-gray-400',
};

// Map atomic number to grid position (row, col) in 18-column grid
// Standard periodic table layout with lanthanides and actinides in separate rows
const getElementGridPosition = (atomicNumber: number): { row: number; col: number } | null => {
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
    57: { row: 6, col: 3 },  // La (positioned right after Ba)
    // Continue Period 6 (lanthanides 58-71 are in row 9)
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
    89: { row: 7, col: 3 },  // Ac (positioned right after Ra)
    // Continue Period 7 (actinides 90-103 are in row 10)
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

  // Lanthanides (row 9, below main table) - start from Ce (58), La (57) is already in row 6
  for (let i = 58; i <= 71; i++) {
    positions[i] = { row: 9, col: i - 57 + 3 };
  }

  // Actinides (row 10, below lanthanides) - start from Th (90), Ac (89) is already in row 7
  for (let i = 90; i <= 103; i++) {
    positions[i] = { row: 10, col: i - 89 + 3 };
  }

  return positions[atomicNumber] || null;
};

const PeriodicTablePalette = () => {
  // Mobile touch handler: store element for tap-to-add
  const handleTouchStart = (e: React.TouchEvent, element: typeof ELEMENTS[number]) => {
    // Store element globally for mobile tap-to-add
    (window as any).__pendingElement = {
      atomicNumber: element.atomicNumber,
      symbol: element.symbol,
      name: element.name
    };
    // Show visual feedback
    e.currentTarget.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Remove visual feedback after a short delay
    setTimeout(() => {
      e.currentTarget.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
    }, 300);
  };

  const handleDragStart = (e: React.DragEvent, element: typeof ELEMENTS[number]) => {
    // Store element data in the drag event
    e.dataTransfer.setData('application/json', JSON.stringify({ 
      atomicNumber: element.atomicNumber,
      symbol: element.symbol,
      name: element.name
    }));
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create a custom round drag image matching the canvas atom style
    const dragImage = document.createElement('div');
    dragImage.style.width = '64px';
    dragImage.style.height = '64px';
    dragImage.style.borderRadius = '50%';
    dragImage.style.border = '4px solid white';
    dragImage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    dragImage.style.display = 'flex';
    dragImage.style.flexDirection = 'column';
    dragImage.style.alignItems = 'center';
    dragImage.style.justifyContent = 'center';
    dragImage.style.opacity = '0.9';
    dragImage.style.pointerEvents = 'none';
    
    // Get category color - match the canvas atom colors
    const categoryColors: Record<string, string> = {
      'alkali-metal': '#f87171',      // red-400
      'alkaline-earth': '#fb923c',    // orange-400
      'transition-metal': '#facc15',   // yellow-400
      'post-transition': '#4ade80',   // green-400
      'metalloid': '#2dd4bf',         // teal-400
      'nonmetal': '#60a5fa',          // blue-400
      'halogen': '#818cf8',            // indigo-400
      'noble-gas': '#a78bfa',         // purple-400
      'lanthanide': '#f472b6',        // pink-400
      'actinide': '#C64484',          // custom color
      'unknown-properties': '#9ca3af', // gray-400
    };
    const bgColor = categoryColors[element.category] || '#9ca3af';
    dragImage.style.backgroundColor = bgColor;
    
    // Add symbol text
    const symbol = document.createElement('div');
    symbol.textContent = element.symbol;
    symbol.style.fontSize = '18px';
    symbol.style.fontWeight = 'bold';
    symbol.style.color = 'white';
    dragImage.appendChild(symbol);
    
    // Append to body temporarily
    document.body.appendChild(dragImage);
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    
    // Set as drag image (centered)
    e.dataTransfer.setDragImage(dragImage, 32, 32);
    
    // Clean up after a short delay
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 0);
  };

  // Build grid for display
  const elementsByPosition = new Map<string, typeof ELEMENTS[number]>();
  for (const element of ELEMENTS) {
    const pos = getElementGridPosition(element.atomicNumber);
    if (pos) {
      elementsByPosition.set(`${pos.row}-${pos.col}`, element);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-2 md:p-4 h-full flex flex-col" style={{ overflow: 'visible' }}>
      <div className="flex-shrink-0 mb-2 md:mb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-800">Periodic Table</h3>
        <p className="text-xs text-gray-500">Drag elements to the canvas</p>
      </div>
      <div className="flex-1" style={{ overflow: 'auto', position: 'relative' }}>
        <div className="space-y-0.5" style={{ fontSize: '8px' }}>
        {/* Render rows 1-7 (main periodic table) */}
        {[1, 2, 3, 4, 5, 6, 7].map((row) => (
          <div key={`row-${row}`} className="grid grid-cols-18 gap-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
            {Array.from({ length: 18 }).map((_, colIndex) => {
              const col = colIndex + 1;
              const element = elementsByPosition.get(`${row}-${col}`);
              if (!element) {
                return <div key={`empty-${row}-${col}`} className="aspect-square" />;
              }
              
              const categoryColor = CATEGORY_COLORS[element.category] || 'bg-gray-300';
              const isActinide = element.category === 'actinide';
              
              return (
                <div
                  key={element.atomicNumber}
                  draggable
                  onDragStart={(e) => handleDragStart(e, element)}
                  onTouchStart={(e) => handleTouchStart(e, element)}
                  onTouchEnd={handleTouchEnd}
                  className={`cursor-move aspect-square rounded text-center flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 hover:z-10 hover:shadow-lg touch-manipulation ${
                    typeof categoryColor === 'string' ? categoryColor : ''
                  }`}
                  style={{
                    ...(isActinide ? { backgroundColor: '#C64484', color: 'black' } : {}),
                    position: 'relative',
                  }}
                  title={`${element.name} (${element.symbol})`}
                >
                  <div className="text-[6px] font-bold leading-none">{element.atomicNumber}</div>
                  <div className="text-[10px] font-bold leading-tight">{element.symbol}</div>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Empty row for spacing */}
        <div className="h-1" />
        
        {/* Row 9: Lanthanides */}
        <div className="grid grid-cols-18 gap-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
          {Array.from({ length: 18 }).map((_, colIndex) => {
            const col = colIndex + 1;
            const element = elementsByPosition.get(`9-${col}`);
            if (!element) {
              return <div key={`empty-9-${col}`} className="aspect-square" />;
            }
            
            const categoryColor = CATEGORY_COLORS[element.category] || 'bg-gray-300';
            
            return (
              <div
                key={element.atomicNumber}
                draggable
                onDragStart={(e) => handleDragStart(e, element)}
                className={`cursor-move aspect-square rounded text-center flex flex-col items-center justify-center transition-all hover:scale-110 hover:z-10 hover:shadow-lg ${categoryColor}`}
                title={`${element.name} (${element.symbol})`}
              >
                <div className="text-[6px] font-bold leading-none">{element.atomicNumber}</div>
                <div className="text-[10px] font-bold leading-tight">{element.symbol}</div>
              </div>
            );
          })}
        </div>

        {/* Row 10: Actinides */}
        <div className="grid grid-cols-18 gap-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
          {Array.from({ length: 18 }).map((_, colIndex) => {
            const col = colIndex + 1;
            const element = elementsByPosition.get(`10-${col}`);
            if (!element) {
              return <div key={`empty-10-${col}`} className="aspect-square" />;
            }
            
            return (
              <div
                key={element.atomicNumber}
                draggable
                onDragStart={(e) => handleDragStart(e, element)}
                className="cursor-move aspect-square rounded text-center flex flex-col items-center justify-center transition-all hover:scale-110 hover:z-10 hover:shadow-lg"
                style={{ backgroundColor: '#C64484', color: 'black' }}
                title={`${element.name} (${element.symbol})`}
              >
                <div className="text-[6px] font-bold leading-none">{element.atomicNumber}</div>
                <div className="text-[10px] font-bold leading-tight">{element.symbol}</div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PeriodicTablePalette;
