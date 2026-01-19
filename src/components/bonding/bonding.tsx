import PeriodicTablePalette from './periodic-table-palette';
import BondingCanvas from './bonding-canvas';
import MoleculeInfo from './molecule-info';

const Bonding = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bonding & Molecules</h2>
        <p className="text-gray-600 mb-6">
          Drag atoms from the periodic table to build molecules. Atoms will automatically form bonds when placed close together.
        </p>

        <div className="space-y-6">
          {/* Top: Periodic Table and Canvas (50/50 split) */}
          <div className="grid grid-cols-2 gap-6" style={{ height: 'calc(100vh - 350px)' }}>
            {/* Left: Periodic Table Palette */}
            <div className="h-full">
              <PeriodicTablePalette />
            </div>

            {/* Right: Bonding Canvas */}
            <div className="h-full">
              <BondingCanvas />
            </div>
          </div>

          {/* Bottom: Molecule Info */}
          <div>
            <MoleculeInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bonding;
