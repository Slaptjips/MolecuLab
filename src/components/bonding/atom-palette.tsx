import Draggable from 'react-draggable';
import { getElementBySymbol } from '../../data/elements';
import { useBondingStore } from '../../stores/bonding-store';

const COMMON_ELEMENTS = ['H', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca', 'Br', 'I'];

const AtomPalette = () => {
  const { dispatch } = useBondingStore();

  const handleDragEnd = (element: string, x: number, y: number) => {
    const elementData = getElementBySymbol(element);
    if (elementData) {
      // Convert screen coordinates to canvas coordinates
      // For now, use direct coordinates (will be adjusted based on canvas position)
      dispatch({
        type: 'ADD_ATOM',
        payload: { element: elementData, x, y },
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Atom Palette</h3>
      <div className="grid grid-cols-4 gap-3">
        {COMMON_ELEMENTS.map((symbol) => {
          const element = getElementBySymbol(symbol);
          if (!element) return null;

          return (
            <Draggable
              key={symbol}
              onStop={(_e, data) => {
                // Get position relative to canvas (adjusted for canvas offset)
                const canvas = document.querySelector('.bonding-canvas');
                if (canvas) {
                  const rect = canvas.getBoundingClientRect();
                  handleDragEnd(symbol, data.x + rect.left, data.y + rect.top);
                }
              }}
            >
              <div className="cursor-move bg-blue-100 hover:bg-blue-200 rounded-lg p-3 text-center border-2 border-blue-300 hover:border-blue-500 transition-colors">
                <div className="text-xl font-bold text-blue-800">{element.symbol}</div>
                <div className="text-xs text-gray-600 mt-1">{element.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {element.valenceElectrons} valence e⁻
                </div>
              </div>
            </Draggable>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Drag atoms to the canvas to build molecules
      </p>
    </div>
  );
};

export default AtomPalette;
