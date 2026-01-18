import { useState } from 'react';
import TabNavigation from './components/shared/tab-navigation';
import PeriodicTable from './components/periodic-table/periodic-table';
import Bonding from './components/bonding/bonding';
import Equations from './components/equations/equations';
import Stoichiometry from './components/stoichiometry/stoichiometry';
import AcidsBases from './components/acids-bases/acids-bases';
import GasLaws from './components/gas-laws/gas-laws';
import Thermochemistry from './components/thermochemistry/thermochemistry';
import Organic from './components/organic/organic';
import StudyTools from './components/study-tools/study-tools';

type Module = 
  | 'periodic-table'
  | 'bonding'
  | 'equations'
  | 'stoichiometry'
  | 'acids-bases'
  | 'gas-laws'
  | 'thermochemistry'
  | 'organic'
  | 'study-tools';

const MODULES: { id: Module; label: string }[] = [
  { id: 'periodic-table', label: 'Periodic Table' },
  { id: 'bonding', label: 'Bonding & Molecules' },
  { id: 'equations', label: 'Chemical Equations' },
  { id: 'stoichiometry', label: 'Stoichiometry' },
  { id: 'acids-bases', label: 'Acids & Bases' },
  { id: 'gas-laws', label: 'Gas Laws' },
  { id: 'thermochemistry', label: 'Thermochemistry' },
  { id: 'organic', label: 'Organic Chemistry' },
  { id: 'study-tools', label: 'Study Tools' },
];

function App() {
  const [activeModule, setActiveModule] = useState<Module>('periodic-table');

  const renderModule = () => {
    switch (activeModule) {
      case 'periodic-table':
        return <PeriodicTable />;
      case 'bonding':
        return <Bonding />;
      case 'equations':
        return <Equations />;
      case 'stoichiometry':
        return <Stoichiometry />;
      case 'acids-bases':
        return <AcidsBases />;
      case 'gas-laws':
        return <GasLaws />;
      case 'thermochemistry':
        return <Thermochemistry />;
      case 'organic':
        return <Organic />;
      case 'study-tools':
        return <StudyTools />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-blue-600">MolecuLab</h1>
          <p className="text-sm text-gray-600 mt-1">Chemistry Learning Sandbox</p>
        </div>
      </header>
      <TabNavigation
        modules={MODULES}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
      />
      <main className="max-w-7xl mx-auto">
        {renderModule()}
      </main>
    </div>
  );
}

export default App;
