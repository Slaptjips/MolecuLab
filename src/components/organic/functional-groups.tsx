import { FUNCTIONAL_GROUPS } from '../../data/functional-groups';
import { useState } from 'react';

const FunctionalGroups = () => {
  const [selectedGroup, setSelectedGroup] = useState<typeof FUNCTIONAL_GROUPS[number] | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Functional Groups</h3>
      <p className="text-sm text-gray-600 mb-4">Click on a functional group to see details</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {FUNCTIONAL_GROUPS.map((group) => (
          <button
            key={group.name}
            onClick={() => setSelectedGroup(group)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedGroup?.name === group.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-gray-50'
            }`}
          >
            <div className="font-semibold text-gray-800 mb-1">{group.name}</div>
            <div className="text-sm font-mono text-blue-600">{group.structure}</div>
            <div className="text-xs text-gray-500 mt-1">Suffix: -{group.suffix}</div>
          </button>
        ))}
      </div>

      {selectedGroup && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h4 className="text-xl font-bold text-blue-800 mb-2">{selectedGroup.name}</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold text-blue-700">Structure:</span>{' '}
              <span className="font-mono text-blue-800">{selectedGroup.structure}</span>
            </div>
            <div>
              <span className="font-semibold text-blue-700">Suffix:</span>{' '}
              <span className="text-blue-800">{selectedGroup.suffix}</span>
            </div>
            <div>
              <span className="font-semibold text-blue-700">Description:</span>{' '}
              <span className="text-blue-800">{selectedGroup.description}</span>
            </div>
            <div>
              <span className="font-semibold text-blue-700">Examples:</span>
              <ul className="list-disc list-inside text-blue-800 ml-4">
                {selectedGroup.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunctionalGroups;
