import PeriodicTablePalette from './periodic-table-palette';
import BondingCanvas from './bonding-canvas';
import MoleculeInfo from './molecule-info';

const Bonding = () => {
  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Bonding & Molecules</h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Drag atoms from the periodic table to build molecules. Atoms will automatically form bonds when placed close together.
        </p>

        <div className="space-y-4 md:space-y-6">
          {/* Top: Periodic Table and Canvas (stacked on mobile, side-by-side on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6" style={{ minHeight: '400px' }}>
            {/* Left: Periodic Table Palette */}
            <div className="h-96 lg:h-auto lg:min-h-[500px]">
              <PeriodicTablePalette />
            </div>

            {/* Right: Bonding Canvas */}
            <div className="h-96 lg:h-auto lg:min-h-[500px]">
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
