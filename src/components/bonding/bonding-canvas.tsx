import { useRef } from 'react';
import Draggable from 'react-draggable';
import { useBondingStore } from '../../stores/bonding-store';
import { validateBond } from '../../utils/bonding-logic';
import { motion } from 'framer-motion';

const BondingCanvas = () => {
  const { atoms, bonds, viewMode, dispatch } = useBondingStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleAtomDrag = (atomId: string, x: number, y: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const canvasX = x - rect.left;
    const canvasY = y - rect.top;
    dispatch({ type: 'MOVE_ATOM', payload: { id: atomId, x: canvasX, y: canvasY } });
  };

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

  return (
    <div
      ref={canvasRef}
      className="bonding-canvas relative bg-gray-50 rounded-lg shadow-inner border-2 border-gray-300 min-h-[600px] w-full"
      onClick={(e) => {
        // Deselect on canvas click
        if (e.target === canvasRef.current) {
          dispatch({ type: 'SELECT_ATOM', payload: null });
        }
      }}
    >
      {/* Bonds (lines) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {bonds.map((bond) => {
          const coords = getBondCoordinates(bond);
          if (!coords) return null;
          const bondInfo = getBondInfo(bond);
          const color = bondInfo?.bondType === 'ionic' ? '#ef4444' : '#3b82f6';

          return (
            <line
              key={bond.id}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke={color}
              strokeWidth={3}
              markerEnd="url(#arrowhead)"
            />
          );
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

        return (
          <Draggable
            key={atom.id}
            position={{ x: atom.x, y: atom.y }}
            onDrag={(_e, data) => {
              handleAtomDrag(atom.id, data.x, data.y);
            }}
            onStop={(_e, data) => {
              handleAtomDrag(atom.id, data.x, data.y);
            }}
          >
            <motion.div
              className={`
                absolute w-16 h-16 rounded-full border-4 border-white shadow-lg
                flex flex-col items-center justify-center cursor-move
                ${bgColor}
                hover:scale-110 transition-transform z-10
              `}
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.15, zIndex: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'SELECT_ATOM', payload: atom.id });
              }}
            >
              <div className="text-lg font-bold text-white">{atom.element.symbol}</div>
              {viewMode === 'lewis' && (
                <div className="text-xs text-white mt-1">
                  {atom.element.valenceElectrons} e⁻
                </div>
              )}
            </motion.div>
          </Draggable>
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
