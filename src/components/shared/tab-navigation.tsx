import { motion } from 'framer-motion';

type TabNavigationProps<T extends string> = {
  modules: { id: T; label: string }[];
  activeModule: T;
  onModuleChange: (module: T) => void;
};

const TabNavigation = <T extends string>({ modules, activeModule, onModuleChange }: TabNavigationProps<T>) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {modules.map((module) => {
            const isActive = activeModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`
                  relative px-3 md:px-6 py-3 text-xs md:text-sm font-medium whitespace-nowrap
                  transition-colors duration-200 flex-shrink-0
                  ${isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {module.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;
