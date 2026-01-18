import AtomPalette from './atom-palette';
import BondingCanvas from './bonding-canvas';
import MoleculeInfo from './molecule-info';

const Bonding = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bonding & Molecules</h2>
        <p className="text-gray-600 mb-6">
          Drag atoms from the palette to build molecules. Atoms will automatically form bonds when placed close together.
        </p>

        <div className="grid grid-cols-[300px_1fr_350px] gap-6">
          {/* Left: Atom Palette */}
          <div>
            <AtomPalette />
          </div>

          {/* Center: Bonding Canvas */}
          <div className="flex-1">
            <BondingCanvas />
          </div>

          {/* Right: Molecule Info */}
          <div>
            <MoleculeInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bonding;
