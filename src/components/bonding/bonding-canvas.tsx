import { useRef, useState, useCallback } from 'react';
import { useBondingStore } from '../../stores/bonding-store';
import { validateBond } from '../../utils/bonding-logic';
import { motion } from 'framer-motion';
import { getElementByAtomicNumber } from '../../data/elements';
import { calculateLewisDots } from '../../utils/bond-order';

const BondingCanvas = () => {
  const { atoms, bonds, viewMode, dispatch } = useBondingStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

  // Custom drag handler using mouse/touch events
  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent, atomId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const atom = atoms.find((a) => a.id === atomId);
    if (!atom || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const offsetX = clientX - rect.left - atom.x - 32; // 32px = half of atom size (64px)
    const offsetY = clientY - rect.top - atom.y - 32;

    setDraggingId(atomId);
    setDragOffset({ x: offsetX, y: offsetY });
    dispatch({ type: 'SELECT_ATOM', payload: atomId });

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!canvasRef.current) return;
      const moveRect = canvasRef.current.getBoundingClientRect();
      const moveX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const newX = moveX - moveRect.left - offsetX - 32;
      const newY = moveY - moveRect.top - offsetY - 32;

      const clampedX = Math.max(0, Math.min(newX, moveRect.width - 64));
      const clampedY = Math.max(0, Math.min(newY, moveRect.height - 64));

      dispatch({ type: 'MOVE_ATOM', payload: { id: atomId, x: clampedX, y: clampedY } });
    };

    const handleEnd = () => {
      setDraggingId(null);
      setDragOffset(null);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  }, [atoms, dispatch]);

  const getBondCoordinates = (bond: typeof bonds[number]) => {
    const atom1 = atoms.find((a) => a.id === bond.atom1Id);
    const atom2 = atoms.find((a) => a.id === bond.atom2Id);
    if (!atom1 || !atom2) return null;
    return { x1: atom1.x, y1: atom1.y, x2: atom2.x, y2: atom2.y };
  };

  const getBondInfo = (bond: typeof bonds[number]) => {
    const atom1 = atoms.find((a) => a.id === bond.atom1Id);
    const atom2 = atoms.find((a) => a.id === bond.atom2Id);
    if (!atom1 || !atom2) return null;
    return validateBond(atom1.element, atom2.element);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const element = getElementByAtomicNumber(data.atomicNumber);
      
      if (element) {
        const rect = canvasRef.current.getBoundingClientRect();
        // Center the atom on the drop point (atoms are 64px = w-16 h-16, so center offset is 32px)
        const x = e.clientX - rect.left - 32;
        const y = e.clientY - rect.top - 32;
        
        dispatch({
          type: 'ADD_ATOM',
          payload: { element, x, y },
        });
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  // Mobile touch handler: add atom at tap position
  const handleCanvasTouch = (e: React.TouchEvent) => {
    if (!canvasRef.current) return;
    const touch = e.touches[0] || e.changedTouches[0];
    if (!touch) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left - 32;
    const y = touch.clientY - rect.top - 32;

    // Check if we have a pending element from the palette
    const pendingElement = (window as any).__pendingElement;
    if (pendingElement) {
      const element = getElementByAtomicNumber(pendingElement.atomicNumber);
      if (element) {
        dispatch({
          type: 'ADD_ATOM',
          payload: { element, x, y },
        });
      }
      (window as any).__pendingElement = null;
      e.preventDefault();
    }
  };

  return (
    <div
      ref={canvasRef}
      className="bonding-canvas relative bg-gray-50 rounded-lg shadow-inner border-2 border-gray-300 h-full w-full"
      style={{ zIndex: 1, position: 'relative' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onTouchEnd={handleCanvasTouch}
      onClick={(e) => {
        // Deselect on canvas click
        if (e.target === canvasRef.current) {
          dispatch({ type: 'SELECT_ATOM', payload: null });
        }
      }}
    >
      {/* Bonds (lines) - render single, double, or triple bonds */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {bonds.map((bond) => {
          const coords = getBondCoordinates(bond);
          if (!coords) return null;
          const bondInfo = getBondInfo(bond);
          const color = bondInfo?.bondType === 'ionic' ? '#ef4444' : '#3b82f6';
          const order = bond.order || 1;

          // Calculate perpendicular offset for multiple bonds
          const dx = coords.x2 - coords.x1;
          const dy = coords.y2 - coords.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const perpX = -dy / length;
          const perpY = dx / length;
          const spacing = 4; // Spacing between parallel lines

          const lines = [];
          for (let i = 0; i < order; i++) {
            const offsetX = order > 1 ? (i - (order - 1) / 2) * spacing * perpX : 0;
            const offsetY = order > 1 ? (i - (order - 1) / 2) * spacing * perpY : 0;

            lines.push(
              <line
                key={`${bond.id}-${i}`}
                x1={coords.x1 + 32 + offsetX}
                y1={coords.y1 + 32 + offsetY}
                x2={coords.x2 + 32 + offsetX}
                y2={coords.y2 + 32 + offsetY}
                stroke={color}
                strokeWidth={3}
                markerEnd={order === 1 ? "url(#arrowhead)" : undefined}
              />
            );
          }

          return <g key={bond.id}>{lines}</g>;
        })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>

      {/* Atoms */}
      {atoms.map((atom) => {
        const categoryColors: Record<string, string> = {
          'alkali-metal': 'bg-red-400',
          'alkaline-earth': 'bg-orange-400',
          'transition-metal': 'bg-yellow-400',
          'post-transition': 'bg-green-400',
          'metalloid': 'bg-teal-400',
          'nonmetal': 'bg-blue-400',
          'halogen': 'bg-indigo-400',
          'noble-gas': 'bg-purple-400',
        };
        const bgColor = categoryColors[atom.element.category] || 'bg-gray-400';
        const isDragging = draggingId === atom.id;
        const lewisData = calculateLewisDots(atom.element, bonds, atom.id);

        return (
          <motion.div
            key={atom.id}
            className={`
              absolute w-16 h-16 rounded-full border-4 border-white shadow-lg
              flex flex-col items-center justify-center cursor-move
              ${bgColor}
              transition-transform select-none
            `}
            style={{
              left: `${atom.x}px`,
              top: `${atom.y}px`,
              zIndex: isDragging ? 20 : 10,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.15 }}
            onMouseDown={(e) => handleMouseDown(e, atom.id)}
            onTouchStart={(e) => handleMouseDown(e, atom.id)}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDragging) {
                dispatch({ type: 'SELECT_ATOM', payload: atom.id });
              }
            }}
          >
            <div className="text-lg font-bold text-white">{atom.element.symbol}</div>
            {viewMode === 'lewis' && (
              <div className="text-xs text-white mt-1">
                {atom.element.valenceElectrons} e⁻
              </div>
            )}
            {/* Lewis dots around atom - show ALL valence electrons */}
            {viewMode === 'lewis' && (
              <svg
                className="absolute inset-0 w-16 h-16 pointer-events-none"
                viewBox="0 0 64 64"
              >
                {/* Render all valence electrons around the atom */}
                {/* We show all valence electrons: bonding electrons + lone pairs + unpaired */}
                {Array.from({ length: lewisData.totalElectronsToShow || lewisData.valenceElectrons }).map((_, i) => {
                  // Distribute electrons evenly around the atom (8 positions for octet)
                  const positions = 8; // 8 positions around atom
                  const angle = (i * 360) / positions;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 28; // Distance from center
                  const cx = 32 + radius * Math.cos(rad);
                  const cy = 32 + radius * Math.sin(rad);
                  
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={2.5}
                      fill="white"
                      opacity={0.95}
                      stroke="rgba(0,0,0,0.2)"
                      strokeWidth={0.5}
                    />
                  );
                })}
              </svg>
            )}
          </motion.div>
        );
      })}

      {/* Empty state */}
      {atoms.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="text-lg font-medium">Drag atoms from the palette</p>
            <p className="text-sm mt-2">Build molecules by placing atoms close together</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BondingCanvas;
