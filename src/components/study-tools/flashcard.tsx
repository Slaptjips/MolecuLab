import { useState } from 'react';
import { ELEMENTS } from '../../data/elements';
import { POLYATOMIC_IONS } from '../../data/polyatomic-ions';
import { FUNCTIONAL_GROUPS } from '../../data/functional-groups';
import { motion } from 'framer-motion';

type FlashcardCategory = 'elements' | 'polyatomic-ions' | 'functional-groups';

type Flashcard = {
  front: string;
  back: string;
  category: FlashcardCategory;
};

const FlashcardComponent = () => {
  const [category, setCategory] = useState<FlashcardCategory>('elements');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const getFlashcards = (): Flashcard[] => {
    switch (category) {
      case 'elements': {
        const elements = ELEMENTS.slice(0, 20); // First 20 elements
        return elements.map((el) => ({
          front: el.symbol,
          back: el.name,
          category: 'elements',
        }));
      }
      case 'polyatomic-ions':
        return POLYATOMIC_IONS.map((ion) => ({
          front: ion.formula,
          back: `${ion.name} (${ion.charge > 0 ? '+' : ''}${ion.charge})`,
          category: 'polyatomic-ions',
        }));
      case 'functional-groups':
        return FUNCTIONAL_GROUPS.map((fg) => ({
          front: fg.structure,
          back: `${fg.name} (${fg.suffix})`,
          category: 'functional-groups',
        }));
      default:
        return [];
    }
  };

  const flashcards = getFlashcards();
  const currentCard = flashcards[currentIndex];

  const shuffle = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    // Shuffle would be implemented with state management in full version
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  if (!currentCard) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">No flashcards available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Flashcards</h3>

      {/* Category Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="flex gap-2">
          {[
            { id: 'elements', label: 'Elements' },
            { id: 'polyatomic-ions', label: 'Polyatomic Ions' },
            { id: 'functional-groups', label: 'Functional Groups' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id as FlashcardCategory);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                category === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-4">
        <div className="relative h-64 perspective-1000">
          <motion.div
            className="absolute inset-0 cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0 bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold backface-hidden p-6"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {currentCard.front}
            </div>
            <div
              className="absolute inset-0 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-center text-xl font-bold backface-hidden p-6"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {currentCard.back}
            </div>
          </motion.div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">Click card to flip</p>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={prevCard}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
        >
          Previous
        </button>
        <button
          onClick={shuffle}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
        >
          Shuffle
        </button>
        <button
          onClick={nextCard}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Next
        </button>
      </div>

      {/* Progress */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Card {currentIndex + 1} of {flashcards.length}
      </div>
    </div>
  );
};

export default FlashcardComponent;
