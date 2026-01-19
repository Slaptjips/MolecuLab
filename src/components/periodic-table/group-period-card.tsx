import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePeriodicTableStore } from '../../stores/periodic-table-store';
import { GROUP_CHARACTERISTICS, PERIOD_CHARACTERISTICS } from '../../data/group-period-characteristics';

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

const GroupPeriodCard = () => {
  const { selectedGroup, selectedPeriod, dispatch } = usePeriodicTableStore();
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedGroup || selectedPeriod)) {
        if (selectedGroup) {
          dispatch({ type: 'SELECT_GROUP', payload: null });
        } else {
          dispatch({ type: 'SELECT_PERIOD', payload: null });
        }
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedGroup, selectedPeriod, dispatch]);

  const groupData = selectedGroup
    ? GROUP_CHARACTERISTICS.find((g) => g.group === selectedGroup)
    : null;
  const periodData = selectedPeriod
    ? PERIOD_CHARACTERISTICS.find((p) => p.period === selectedPeriod)
    : null;

  const data = groupData || periodData;
  if (!data) return null;

  const isGroup = !!groupData;

  const handleClose = () => {
    if (isGroup) {
      dispatch({ type: 'SELECT_GROUP', payload: null });
    } else {
      dispatch({ type: 'SELECT_PERIOD', payload: null });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-2xl p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-l-4 border-blue-500"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">
                {isGroup && groupData 
                  ? (() => {
                      const romanNum = toRomanNumeral(groupData.group);
                      return romanNum ? `Group ${groupData.group} (${romanNum})` : `Group ${groupData.group}`;
                    })()
                  : periodData 
                    ? periodData.period >= 8 
                      ? periodData.name 
                      : periodData.name
                    : ''}
              </h3>
              <p className="text-xl text-gray-600 mt-1">
                {isGroup && groupData 
                  ? groupData.name 
                  : periodData 
                    ? periodData.period === 8
                      ? `Elements 57-71 (Lanthanides)`
                      : periodData.period === 9
                      ? `Elements 89-103 (Actinides)`
                      : `Period ${periodData.period}`
                    : ''}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-700 hover:opacity-70 text-3xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ml-4"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="space-y-6 mt-6">
            {isGroup && groupData && (
              <>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Valence Electrons</h4>
                  <p className="text-gray-700">{groupData.valenceElectrons}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Common Oxidation States</h4>
                  <div className="flex flex-wrap gap-2">
                    {groupData.commonOxidationStates.map((state) => (
                      <span
                        key={state}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium"
                      >
                        {state > 0 ? `+${state}` : state}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!isGroup && periodData && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Electron Shells</h4>
                <p className="text-gray-700">{periodData.electronShells}</p>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Characteristics</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {data.characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Examples</h4>
              <div className="flex flex-wrap gap-2">
                {data.examples.map((example, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GroupPeriodCard;
