export type GroupCharacteristics = {
  readonly group: number;
  readonly name: string;
  readonly valenceElectrons: number;
  readonly commonOxidationStates: readonly number[];
  readonly characteristics: readonly string[];
  readonly examples: readonly string[];
};

export type PeriodCharacteristics = {
  readonly period: number;
  readonly name: string;
  readonly electronShells: number;
  readonly characteristics: readonly string[];
  readonly examples: readonly string[];
};

export const GROUP_CHARACTERISTICS: readonly GroupCharacteristics[] = [
  {
    group: 1,
    name: 'Alkali Metals',
    valenceElectrons: 1,
    commonOxidationStates: [1],
    characteristics: [
      'Highly reactive metals',
      'Soft, silvery appearance',
      'Low density',
      'Low melting and boiling points',
      'React vigorously with water',
      'Form +1 cations',
      'Excellent conductors of electricity',
    ],
    examples: ['Lithium (Li)', 'Sodium (Na)', 'Potassium (K)', 'Rubidium (Rb)', 'Cesium (Cs)', 'Francium (Fr)'],
  },
  {
    group: 2,
    name: 'Alkaline Earth Metals',
    valenceElectrons: 2,
    commonOxidationStates: [2],
    characteristics: [
      'Reactive metals',
      'Harder than alkali metals',
      'Higher melting points than alkali metals',
      'Form +2 cations',
      'React with water (less vigorously than Group 1)',
      'Good conductors of electricity',
    ],
    examples: ['Beryllium (Be)', 'Magnesium (Mg)', 'Calcium (Ca)', 'Strontium (Sr)', 'Barium (Ba)', 'Radium (Ra)'],
  },
  {
    group: 3,
    name: 'Scandium Group',
    valenceElectrons: 3,
    commonOxidationStates: [3],
    characteristics: [
      'Transition metals',
      'Form +3 cations',
      'Metallic properties',
      'Variable reactivity',
    ],
    examples: ['Scandium (Sc)', 'Yttrium (Y)', 'Lanthanum (La)', 'Actinium (Ac)'],
  },
  {
    group: 4,
    name: 'Titanium Group',
    valenceElectrons: 4,
    commonOxidationStates: [4, 2],
    characteristics: [
      'Transition metals',
      'High melting points',
      'Form +4 and +2 cations',
      'Strong, lightweight metals',
    ],
    examples: ['Titanium (Ti)', 'Zirconium (Zr)', 'Hafnium (Hf)', 'Rutherfordium (Rf)'],
  },
  {
    group: 5,
    name: 'Vanadium Group',
    valenceElectrons: 5,
    commonOxidationStates: [5, 3, 2],
    characteristics: [
      'Transition metals',
      'Multiple oxidation states',
      'High melting points',
      'Form various cations',
    ],
    examples: ['Vanadium (V)', 'Niobium (Nb)', 'Tantalum (Ta)', 'Dubnium (Db)'],
  },
  {
    group: 6,
    name: 'Chromium Group',
    valenceElectrons: 6,
    commonOxidationStates: [6, 3, 2],
    characteristics: [
      'Transition metals',
      'Hard, high-melting metals',
      'Multiple oxidation states',
      'Form colored compounds',
    ],
    examples: ['Chromium (Cr)', 'Molybdenum (Mo)', 'Tungsten (W)', 'Seaborgium (Sg)'],
  },
  {
    group: 7,
    name: 'Manganese Group',
    valenceElectrons: 7,
    commonOxidationStates: [7, 4, 2],
    characteristics: [
      'Transition metals',
      'Multiple oxidation states',
      'Form colored compounds',
      'Catalytic properties',
    ],
    examples: ['Manganese (Mn)', 'Technetium (Tc)', 'Rhenium (Re)', 'Bohrium (Bh)'],
  },
  {
    group: 8,
    name: 'Iron Group',
    valenceElectrons: 8,
    commonOxidationStates: [3, 2],
    characteristics: [
      'Transition metals',
      'Ferromagnetic properties (Fe, Co, Ni)',
      'Common oxidation states +2 and +3',
      'Important in alloys',
    ],
    examples: ['Iron (Fe)', 'Ruthenium (Ru)', 'Osmium (Os)', 'Hassium (Hs)'],
  },
  {
    group: 9,
    name: 'Cobalt Group',
    valenceElectrons: 9,
    commonOxidationStates: [3, 2],
    characteristics: [
      'Transition metals',
      'Ferromagnetic (Co, Rh)',
      'Multiple oxidation states',
      'Catalytic properties',
    ],
    examples: ['Cobalt (Co)', 'Rhodium (Rh)', 'Iridium (Ir)', 'Meitnerium (Mt)'],
  },
  {
    group: 10,
    name: 'Nickel Group',
    valenceElectrons: 10,
    commonOxidationStates: [2, 0],
    characteristics: [
      'Transition metals',
      'Ferromagnetic (Ni)',
      'Common oxidation state +2',
      'Catalytic properties',
    ],
    examples: ['Nickel (Ni)', 'Palladium (Pd)', 'Platinum (Pt)', 'Darmstadtium (Ds)'],
  },
  {
    group: 11,
    name: 'Copper Group',
    valenceElectrons: 11,
    commonOxidationStates: [1, 2],
    characteristics: [
      'Transition metals',
      'Excellent electrical conductors',
      'Common oxidation states +1 and +2',
      'Form colored compounds',
    ],
    examples: ['Copper (Cu)', 'Silver (Ag)', 'Gold (Au)', 'Roentgenium (Rg)'],
  },
  {
    group: 12,
    name: 'Zinc Group',
    valenceElectrons: 12,
    commonOxidationStates: [2],
    characteristics: [
      'Transition metals',
      'Common oxidation state +2',
      'Lower melting points than other transition metals',
      'Form diamagnetic compounds',
    ],
    examples: ['Zinc (Zn)', 'Cadmium (Cd)', 'Mercury (Hg)', 'Copernicium (Cn)'],
  },
  {
    group: 13,
    name: 'Boron Group',
    valenceElectrons: 3,
    commonOxidationStates: [3],
    characteristics: [
      'Mixed properties (metals, metalloids, nonmetals)',
      'Form +3 cations (metals)',
      'Variable reactivity',
      'Important in semiconductors (B, Al, Ga)',
    ],
    examples: ['Boron (B)', 'Aluminum (Al)', 'Gallium (Ga)', 'Indium (In)', 'Thallium (Tl)', 'Nihonium (Nh)'],
  },
  {
    group: 14,
    name: 'Carbon Group',
    valenceElectrons: 4,
    commonOxidationStates: [4, 2, -4],
    characteristics: [
      'Mixed properties (nonmetals, metalloids, metals)',
      'Form covalent bonds',
      'Tetravalent (form 4 bonds)',
      'Important in organic chemistry (C)',
    ],
    examples: ['Carbon (C)', 'Silicon (Si)', 'Germanium (Ge)', 'Tin (Sn)', 'Lead (Pb)', 'Flerovium (Fl)'],
  },
  {
    group: 15,
    name: 'Nitrogen Group (Pnictogens)',
    valenceElectrons: 5,
    commonOxidationStates: [5, 3, -3],
    characteristics: [
      'Mixed properties (nonmetals, metalloids, metals)',
      'Form covalent bonds',
      'Can form -3 anions (nonmetals)',
      'Important in biological systems (N, P)',
    ],
    examples: ['Nitrogen (N)', 'Phosphorus (P)', 'Arsenic (As)', 'Antimony (Sb)', 'Bismuth (Bi)', 'Moscovium (Mc)'],
  },
  {
    group: 16,
    name: 'Oxygen Group (Chalcogens)',
    valenceElectrons: 6,
    commonOxidationStates: [6, 4, 2, -2],
    characteristics: [
      'Mixed properties (nonmetals, metalloids, metals)',
      'Form -2 anions (nonmetals)',
      'Important in biological systems (O, S)',
      'Form oxides and sulfides',
    ],
    examples: ['Oxygen (O)', 'Sulfur (S)', 'Selenium (Se)', 'Tellurium (Te)', 'Polonium (Po)', 'Livermorium (Lv)'],
  },
  {
    group: 17,
    name: 'Halogens',
    valenceElectrons: 7,
    commonOxidationStates: [-1, 1, 3, 5, 7],
    characteristics: [
      'Highly reactive nonmetals',
      'Form -1 anions (halides)',
      'Exist as diatomic molecules (F₂, Cl₂, Br₂, I₂)',
      'Strong oxidizing agents',
      'Form salts with metals',
    ],
    examples: ['Fluorine (F)', 'Chlorine (Cl)', 'Bromine (Br)', 'Iodine (I)', 'Astatine (At)', 'Tennessine (Ts)'],
  },
  {
    group: 18,
    name: 'Noble Gases',
    valenceElectrons: 8,
    commonOxidationStates: [0],
    characteristics: [
      'Inert, unreactive gases',
      'Full valence shell (stable electron configuration)',
      'Very low reactivity',
      'Monatomic gases',
      'Low boiling points',
    ],
    examples: ['Helium (He)', 'Neon (Ne)', 'Argon (Ar)', 'Krypton (Kr)', 'Xenon (Xe)', 'Radon (Rn)', 'Oganesson (Og)'],
  },
] as const;

export const PERIOD_CHARACTERISTICS: readonly PeriodCharacteristics[] = [
  {
    period: 1,
    name: 'Period 1',
    electronShells: 1,
    characteristics: [
      'Contains only 2 elements',
      'First electron shell (n=1)',
      'Hydrogen and Helium only',
      'Smallest atomic radii',
    ],
    examples: ['Hydrogen (H)', 'Helium (He)'],
  },
  {
    period: 2,
    name: 'Period 2',
    electronShells: 2,
    characteristics: [
      'Contains 8 elements',
      'Second electron shell (n=2)',
      'Includes first row of p-block elements',
      'Lithium to Neon',
    ],
    examples: ['Lithium (Li)', 'Beryllium (Be)', 'Boron (B)', 'Carbon (C)', 'Nitrogen (N)', 'Oxygen (O)', 'Fluorine (F)', 'Neon (Ne)'],
  },
  {
    period: 3,
    name: 'Period 3',
    electronShells: 3,
    characteristics: [
      'Contains 8 elements',
      'Third electron shell (n=3)',
      'Includes second row of p-block elements',
      'Sodium to Argon',
    ],
    examples: ['Sodium (Na)', 'Magnesium (Mg)', 'Aluminum (Al)', 'Silicon (Si)', 'Phosphorus (P)', 'Sulfur (S)', 'Chlorine (Cl)', 'Argon (Ar)'],
  },
  {
    period: 4,
    name: 'Period 4',
    electronShells: 4,
    characteristics: [
      'Contains 18 elements',
      'Fourth electron shell (n=4)',
      'First row of transition metals',
      'Potassium to Krypton',
    ],
    examples: ['Potassium (K)', 'Calcium (Ca)', 'Scandium (Sc)', 'Titanium (Ti)', '...', 'Krypton (Kr)'],
  },
  {
    period: 5,
    name: 'Period 5',
    electronShells: 5,
    characteristics: [
      'Contains 18 elements',
      'Fifth electron shell (n=5)',
      'Second row of transition metals',
      'Rubidium to Xenon',
    ],
    examples: ['Rubidium (Rb)', 'Strontium (Sr)', 'Yttrium (Y)', 'Zirconium (Zr)', '...', 'Xenon (Xe)'],
  },
  {
    period: 6,
    name: 'Period 6',
    electronShells: 6,
    characteristics: [
      'Contains 32 elements',
      'Sixth electron shell (n=6)',
      'Third row of transition metals',
      'Includes lanthanides',
      'Cesium to Radon',
    ],
    examples: ['Cesium (Cs)', 'Barium (Ba)', 'Lanthanum (La)', '...', 'Lutetium (Lu)', '...', 'Radon (Rn)'],
  },
  {
    period: 7,
    name: 'Period 7',
    electronShells: 7,
    characteristics: [
      'Contains 32 elements (incomplete)',
      'Seventh electron shell (n=7)',
      'Fourth row of transition metals',
      'Includes actinides',
      'Francium onwards',
    ],
    examples: ['Francium (Fr)', 'Radium (Ra)', 'Actinium (Ac)', '...', 'Lawrencium (Lr)', '...', 'Oganesson (Og)'],
  },
  {
    period: 8,
    name: 'Lanthanides',
    electronShells: 6,
    characteristics: [
      'Also known as rare earth elements',
      'Elements 57-71 (Lanthanum to Lutetium)',
      'f-block elements (filling 4f orbital)',
      'Similar chemical properties',
      'Common oxidation state +3',
      'Used in electronics, magnets, and lighting',
      'Lanthanide contraction: atomic radius decreases across the series',
    ],
    examples: ['Lanthanum (La)', 'Cerium (Ce)', 'Praseodymium (Pr)', 'Neodymium (Nd)', 'Promethium (Pm)', 'Samarium (Sm)', 'Europium (Eu)', 'Gadolinium (Gd)', 'Terbium (Tb)', 'Dysprosium (Dy)', 'Holmium (Ho)', 'Erbium (Er)', 'Thulium (Tm)', 'Ytterbium (Yb)', 'Lutetium (Lu)'],
  },
  {
    period: 9,
    name: 'Actinides',
    electronShells: 7,
    characteristics: [
      'Elements 89-103 (Actinium to Lawrencium)',
      'f-block elements (filling 5f orbital)',
      'All are radioactive',
      'Common oxidation state +3',
      'Many are synthetic (man-made)',
      'Used in nuclear reactors and weapons',
      'Actinide contraction: similar to lanthanide contraction',
      'Heavier actinides have properties similar to lanthanides',
    ],
    examples: ['Actinium (Ac)', 'Thorium (Th)', 'Protactinium (Pa)', 'Uranium (U)', 'Neptunium (Np)', 'Plutonium (Pu)', 'Americium (Am)', 'Curium (Cm)', 'Berkelium (Bk)', 'Californium (Cf)', 'Einsteinium (Es)', 'Fermium (Fm)', 'Mendelevium (Md)', 'Nobelium (No)', 'Lawrencium (Lr)'],
  },
] as const;
