# Chemistry Sandbox Interactive Webapp - Complete Development Prompt

## Project Overview
Build an interactive chemistry learning sandbox webapp for university students (Life Sciences Education) to explore and understand fundamental chemistry concepts. This is a standalone educational tool covering topics from the periodic table to organic chemistry, gas laws, and thermochemistry.

## Tech Stack
- **Frontend Framework**: React (create with Vite)
- **Styling**: Tailwind CSS
- **Visualization Libraries**: 
  - D3.js for periodic trends and data visualizations
  - Chart.js for graphs (titration curves, energy diagrams)
- **Deployment**: Cloudflare Pages
- **State Management**: React Context API or Zustand (for managing global state across modules)
- **Additional Libraries**:
  - react-draggable or react-dnd for drag-and-drop functionality
  - framer-motion for smooth animations and transitions

## Design Philosophy
- Colorful, engaging, and visually appealing interface
- Exploratory sandbox approach - no progress tracking, scoring, or user accounts
- Instant visual feedback for all interactions
- Clear, educational labels and explanations
- Desktop-first design (mobile responsive is nice-to-have, not required)

## Core Application Structure

### Main Navigation
Top-level tab navigation between major modules:
1. Periodic Table Explorer
2. Bonding & Molecules
3. Chemical Equations & Reactions
4. Stoichiometry Calculator
5. Acids & Bases
6. Gas Laws Simulator
7. Thermochemistry
8. Organic Chemistry
9. Study Tools (Memorization Aids)

---

## Module 1: Periodic Table Explorer

### Features:
1. **Interactive Periodic Table Display**
   - Color-coded elements by category:
     - Alkali metals (one color)
     - Alkaline earth metals (another color)
     - Transition metals
     - Halogens
     - Noble gases
     - Metalloids
     - Other nonmetals
     - Lanthanides & Actinides
   - Include color legend/key
   
2. **Element Click Interaction**
   When an element is clicked, display detailed panel showing:
   - Element name and symbol
   - Atomic number
   - Atomic mass
   - Electron configuration (full notation, e.g., 1s² 2s² 2p⁶...)
   - Electron configuration diagram (visual orbital filling)
   - Common oxidation states
   - Electronegativity
   - Ionization energy
   - Electron affinity
   - Atomic radius
   - Classification (metal/nonmetal/metalloid)
   - Common uses/applications

3. **Periodic Trends Visualization**
   - Toggle buttons to show heat maps for:
     - Atomic radius (size trends)
     - Ionization energy
     - Electronegativity
     - Electron affinity
   - Use color gradients (e.g., blue for low values → red for high values)
   - Show trend arrows indicating increase/decrease across periods and down groups

4. **Filter/Highlight Options**
   - Highlight all metals/nonmetals/metalloids
   - Highlight specific groups (alkali metals, halogens, etc.)
   - Search box to find specific elements

---

## Module 2: Bonding & Molecules

### Features:

1. **Atom Selection Panel**
   - Draggable atoms from a palette on the side
   - Include common elements: H, C, N, O, F, Na, Mg, Al, Si, P, S, Cl, K, Ca, Br, I
   - Each atom shows its symbol and available valence electrons
   
2. **Workspace Canvas**
   - Large drag-and-drop area where students build molecules
   - Grid or free-form placement

3. **Bond Formation Logic**
   - When atoms are dragged close together, automatically detect and form bonds
   - Validate chemical bonds in real-time:
     - Show oxidation states and free valence electrons
     - Display charge if compound is unstable (e.g., CaCl shows -1 charge → needs another Cl)
     - Visual indicators: ✓ for stable compound, ⚠️ for unstable with explanation
   - Indicate bond type formed: "Ionic bond" or "Covalent bond"
   
4. **View Modes (Toggle)**
   - **Standard View**: Simple atom symbols with connecting lines
   - **Lewis Dot Structure View**: Show valence electrons as dots, shared electron pairs as lines
   - Display formal charges on atoms where applicable

5. **Compound Information Panel**
   - Display chemical formula of created compound
   - Show compound name (if recognized)
   - Indicate if ionic or covalent
   - Show electronegativity difference
   - Molecular shape/geometry (for covalent molecules - VSEPR theory)
   - Polarity (polar vs nonpolar)

6. **Pre-set Molecule Examples**
   - Quick-load buttons for common molecules: H₂O, CO₂, NH₃, CH₄, NaCl, MgO, etc.
   - Students can study these then clear and build their own

7. **Clear/Reset Button**
   - Start fresh with new molecule

---

## Module 3: Chemical Equations & Reactions

### Features:

1. **Equation Builder**
   - Input fields for reactants and products
   - Use dropdown or autocomplete for common compounds
   - Support for + and → symbols

2. **Equation Balancing Tool**
   - Enter unbalanced equation
   - Show step-by-step balancing or let students try
   - Highlight when equation is balanced (atoms equal on both sides)
   - Color-code different elements to track atom counts

3. **Reaction Type Classifier**
   - Identify and label reaction type:
     - Combination (synthesis)
     - Decomposition
     - Single replacement
     - Double replacement
     - Combustion
   - Show visual representation/pattern for each type

4. **Reaction Visualizer**
   - Simple animation showing reactant molecules → product molecules
   - Breaking/forming of bonds
   - Energy change indication (endothermic vs exothermic)

5. **Common Reactions Library**
   - Dropdown with example reactions for each type
   - Students can select and study

---

## Module 4: Stoichiometry Calculator

### Features:

1. **Mole Calculations**
   - Input fields for:
     - Mass (grams)
     - Molar mass (g/mol) - can auto-calculate from formula
     - Number of moles
   - Calculate missing value when two are provided
   - Show formula used: n = m/M

2. **Mole-to-Mole Stoichiometry**
   - Enter balanced chemical equation
   - Select starting substance and amount (in moles)
   - Calculate moles of other substances produced/consumed
   - Show mole ratios from balanced equation

3. **Mass-to-Mass Stoichiometry**
   - Enter balanced equation
   - Input mass of one reactant
   - Calculate mass of products or other reactants needed
   - Show step-by-step calculation pathway

4. **Limiting Reactant Calculator**
   - Input masses of multiple reactants
   - Identify limiting reactant
   - Calculate theoretical yield
   - Show which reactant is in excess and by how much

5. **Avogadro's Number Conversions**
   - Convert between moles ↔ number of particles/atoms/molecules
   - Use 6.022 × 10²³

6. **Visual Step-by-Step Solutions**
   - Show all calculation steps
   - Highlight unit conversions
   - Educational explanations for each step

---

## Module 5: Acids & Bases

### Features:

1. **pH Scale Visualization**
   - Interactive pH scale from 0-14
   - Color gradient (red → yellow → green → blue)
   - Indicate acidic (0-7), neutral (7), basic (7-14) regions
   - Click on pH values to see example substances at that pH

2. **pH Calculator**
   - Calculate pH from [H⁺] concentration
   - Calculate [H⁺] from pH
   - Calculate pOH and [OH⁻]
   - Show formulas: pH = -log[H⁺], pOH = -log[OH⁻], pH + pOH = 14

3. **Strong vs Weak Acids/Bases**
   - Lists of common strong acids (HCl, HNO₃, H₂SO₄, etc.)
   - Lists of common strong bases (NaOH, KOH, etc.)
   - Explanation of degree of ionization
   - Visual comparison of ionization extent

4. **Acid-Base Reactions**
   - Neutralization reaction simulator
   - Input acid + base → show salt + water
   - Arrhenius vs Brønsted-Lowry definitions side-by-side

5. **Titration Curve Simulator**
   - Input: acid/base type, concentrations, volumes
   - Generate titration curve graph
   - Mark equivalence point
   - Show pH changes during titration

6. **Buffer Systems**
   - Explain buffer composition (weak acid + conjugate base)
   - Show how buffers resist pH change
   - Common biological buffer examples (bicarbonate, phosphate)

7. **Conjugate Acid-Base Pairs**
   - Interactive tool to identify conjugate pairs
   - Input acid → show conjugate base (and vice versa)

---

## Module 6: Gas Laws Simulator

### Features:

1. **Ideal Gas Law Calculator (PV = nRT)**
   - Input fields for P, V, n, T
   - Calculate missing variable
   - Unit conversions (atm, kPa, mmHg for pressure; L, mL for volume; K, °C for temperature)
   - Show R constant with appropriate units

2. **Boyle's Law Visualization (P ∝ 1/V)**
   - Interactive graph showing pressure vs volume relationship
   - Adjustable sliders for pressure or volume
   - Real-time graph update
   - Show P₁V₁ = P₂V₂ calculation

3. **Charles's Law Visualization (V ∝ T)**
   - Interactive graph showing volume vs temperature
   - Sliders for temperature
   - Show V₁/T₁ = V₂/T₂
   - Emphasize temperature must be in Kelvin

4. **Combined Gas Law**
   - Calculator for (P₁V₁)/T₁ = (P₂V₂)/T₂
   - Input initial and final conditions
   - Solve for unknown

5. **Visual Gas Particle Simulator**
   - Animated container with moving gas particles
   - Adjust pressure (more collisions, particles move faster)
   - Adjust volume (container size changes)
   - Adjust temperature (particle speed changes)
   - Show kinetic molecular theory in action

6. **Breathing and Boyle's Law Application**
   - Explain how lungs use Boyle's Law
   - Visual diagram of inhalation (volume increases, pressure decreases) and exhalation

---

## Module 7: Thermochemistry

### Features:

1. **Energy Concepts Overview**
   - Definitions: kinetic energy, potential energy, heat, temperature
   - Law of conservation of energy

2. **Specific Heat Calculator**
   - Formula: q = mcΔT
   - Input mass, specific heat capacity, temperature change
   - Calculate heat energy transferred
   - Database of common specific heat values (water, metals, etc.)

3. **Exothermic vs Endothermic Reactions**
   - Visual energy diagrams for both types
   - Show reactants → products with energy change
   - Activation energy indication
   - Examples of each type

4. **Bond Energy**
   - Explain bond energy concept
   - Calculator: total energy in bonds broken - total energy in bonds formed = ΔH
   - Table of common bond energies

5. **Phase Change Diagrams**
   - Heating/cooling curve for water
   - Show temperature plateaus during phase changes
   - Explain latent heat (heat of fusion, heat of vaporization)

6. **Calorimetry**
   - Simple calorimetry problem solver
   - Heat lost = Heat gained principle
   - Coffee cup calorimeter visual

---

## Module 8: Organic Chemistry

### Features:

1. **Hydrocarbon Structure Builder**
   - Draw or build alkanes, alkenes, alkynes
   - Show structural formulas
   - Name molecules based on IUPAC rules (or vice versa)

2. **Functional Groups Reference**
   - Visual chart of common functional groups:
     - Alcohols (-OH)
     - Carboxylic acids (-COOH)
     - Amines (-NH₂)
     - Aldehydes (-CHO)
     - Ketones (C=O)
     - Esters
     - Amides
   - Click on each to see examples and properties

3. **Biological Macromolecules**
   - **Carbohydrates**: Show glucose, fructose structures; identify functional groups
   - **Proteins**: Amino acid structure (amine + carboxyl groups), peptide bond formation
   - **Lipids**: Glycerol + fatty acids → triglyceride
   - **Nucleic Acids**: Basic DNA/RNA structure overview
   - Interactive diagrams for each

4. **Isomer Explorer**
   - Show structural isomers for given molecular formula
   - Explain constitutional isomers, stereoisomers (brief)

5. **Naming Organic Compounds**
   - Practice tool: given structure → name it
   - Or given name → draw structure
   - Focus on simple alkanes, alkenes, alkynes with basic functional groups

---

## Module 9: Study Tools (Memorization Aids)

### Features:

1. **Element Symbols Flashcards**
   - Flashcard deck for element names ↔ symbols
   - Focus on elements important for Life Sciences
   - Click to flip card
   - "Shuffle" and "Next" buttons

2. **Polyatomic Ions Flashcards**
   - Common polyatomic ions: NO₃⁻, SO₄²⁻, PO₄³⁻, NH₄⁺, CO₃²⁻, etc.
   - Name ↔ Formula ↔ Charge

3. **Functional Groups Flashcards**
   - Organic functional groups
   - Structure ↔ Name

4. **Nomenclature Rules Reference**
   - Quick reference guide for naming:
     - Ionic compounds
     - Binary molecular compounds
     - Acids
     - Organic molecules
   - Searchable/filterable

5. **Hover-to-Learn Feature**
   - Throughout the app, hovering over technical terms shows quick definition tooltip
   - Example: hover over "electronegativity" → see brief definition

6. **Formula Sheet**
   - Downloadable/printable reference sheet with key formulas:
     - Stoichiometry: n = m/M
     - Gas laws: PV = nRT, etc.
     - Thermochemistry: q = mcΔT
     - pH: pH = -log[H⁺]
     - Molarity: M = mol/L

---

## Technical Implementation Details

### Project Setup
```bash
npm create vite@latest chemistry-sandbox -- --template react
cd chemistry-sandbox
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install d3 chart.js react-chartjs-2 framer-motion zustand
npm install react-draggable
```

### File Structure
```
chemistry-sandbox/
├── src/
│   ├── components/
│   │   ├── PeriodicTable/
│   │   │   ├── PeriodicTable.jsx
│   │   │   ├── ElementCard.jsx
│   │   │   ├── TrendVisualizer.jsx
│   │   ├── Bonding/
│   │   │   ├── AtomPalette.jsx
│   │   │   ├── BondingCanvas.jsx
│   │   │   ├── MoleculeInfo.jsx
│   │   ├── Calculations/
│   │   │   ├── StoichiometryCalc.jsx
│   │   │   ├── GasLawCalc.jsx
│   │   │   ├── ThermochemCalc.jsx
│   │   ├── Simulations/
│   │   │   ├── GasParticles.jsx
│   │   │   ├── TitrationCurve.jsx
│   │   │   ├── EnergyDiagram.jsx
│   │   ├── StudyTools/
│   │   │   ├── Flashcard.jsx
│   │   │   ├── FormulaSheet.jsx
│   │   ├── shared/
│   │   │   ├── TabNavigation.jsx
│   │   │   ├── Tooltip.jsx
│   │   │   ├── Calculator.jsx
│   ├── data/
│   │   ├── elements.js (periodic table data)
│   │   ├── polyatomicIons.js
│   │   ├── functionalGroups.js
│   │   ├── bondEnergies.js
│   │   ├── specificHeats.js
│   ├── utils/
│   │   ├── chemicalFormulas.js
│   │   ├── bondingLogic.js
│   │   ├── calculations.js
│   ├── styles/
│   │   ├── index.css (Tailwind imports)
│   ├── App.jsx
│   ├── main.jsx
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
```

### Data Structure Examples

**Element Data (elements.js)**
```javascript
export const elements = [
  {
    symbol: 'H',
    name: 'Hydrogen',
    atomicNumber: 1,
    atomicMass: 1.008,
    electronConfig: '1s¹',
    group: 1,
    period: 1,
    category: 'nonmetal',
    electronegativity: 2.20,
    ionizationEnergy: 1312,
    electronAffinity: 73,
    atomicRadius: 53,
    oxidationStates: [+1, -1],
    valenceElectrons: 1,
  },
  // ... more elements
];
```

**Polyatomic Ions Data**
```javascript
export const polyatomicIons = [
  { name: 'Nitrate', formula: 'NO₃', charge: -1 },
  { name: 'Sulfate', formula: 'SO₄', charge: -2 },
  { name: 'Phosphate', formula: 'PO₄', charge: -3 },
  { name: 'Ammonium', formula: 'NH₄', charge: +1 },
  // ... more ions
];
```

### Key Utility Functions Needed

**chemicalFormulas.js**
- `parseFormula(formula)` - break down chemical formula into elements and counts
- `calculateMolarMass(formula)` - compute molar mass from formula
- `balanceEquation(reactants, products)` - balance chemical equations
- `validateBond(atom1, atom2)` - check if bond is stable based on valence electrons

**bondingLogic.js**
- `getValenceElectrons(element)` - return valence electrons for element
- `determineOxidationState(element, compound)` - calculate oxidation state
- `isBondIonic(atom1, atom2)` - determine if bond is ionic based on electronegativity difference (ΔEN > 1.7)
- `calculateFormalCharge(atom)` - compute formal charge on atom in molecule
- `getMolecularShape(molecule)` - VSEPR theory to determine shape

**calculations.js**
- `molesToMass(moles, molarMass)` - stoichiometry calculations
- `massToMoles(mass, molarMass)`
- `idealGasLaw(P, V, n, T)` - solve for missing variable
- `pHfromH(concentration)` - calculate pH
- `specificHeat(mass, specificHeat, deltaT)` - thermochemistry

### Styling Guidelines
- Use Tailwind's color palette for engaging, scientific look
- Bright blues, greens, purples for different categories
- White/light gray backgrounds
- Clear typography (Inter or similar sans-serif font)
- Card-based layouts with shadows for depth
- Smooth transitions and hover effects
- Responsive grid layouts

### Periodic Table Color Scheme Suggestion
```javascript
const categoryColors = {
  'alkali-metal': 'bg-red-400',
  'alkaline-earth': 'bg-orange-400',
  'transition-metal': 'bg-yellow-400',
  'post-transition': 'bg-green-400',
  'metalloid': 'bg-teal-400',
  'nonmetal': 'bg-blue-400',
  'halogen': 'bg-indigo-400',
  'noble-gas': 'bg-purple-400',
  'lanthanide': 'bg-pink-400',
  'actinide': 'bg-rose-400',
};
```

### Animation Guidelines
- Use framer-motion for:
  - Tab transitions (fade in/out)
  - Element click → detail panel slide-in
  - Drag-and-drop feedback
  - Bond formation animations
  - Gas particle movement
- Keep animations smooth but quick (200-300ms duration)

### Accessibility Considerations
- Ensure color contrast meets WCAG standards
- Keyboard navigation support
- Alt text for visual elements
- Clear focus indicators

---

## Deployment to Cloudflare Pages

### Build Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
```

### Cloudflare Pages Setup
1. Connect GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Deploy

---

## Development Phases (Suggested Order)

**Phase 1: Core Structure**
- Set up React + Vite project
- Implement tab navigation
- Create basic layout and styling

**Phase 2: Periodic Table Module**
- Build periodic table grid with element data
- Implement click interactions and detail panel
- Add trend visualizations with D3.js

**Phase 3: Bonding Module**
- Create draggable atom palette
- Implement bond formation logic
- Add Lewis structure view toggle
- Validate bond stability

**Phase 4: Calculation Modules**
- Stoichiometry calculator
- Gas laws simulator with visualizations
- Thermochemistry calculators

**Phase 5: Reaction & Equation Module**
- Equation balancer
- Reaction type classifier
- Simple visualizations

**Phase 6: Acids/Bases Module**
- pH scale and calculator
- Titration curve with Chart.js
- Buffer explanations

**Phase 7: Organic Chemistry Module**
- Functional group reference
- Biological macromolecules visuals
- Simple hydrocarbon builder

**Phase 8: Study Tools**
- Flashcards implementation
- Formula sheet
- Hover tooltips throughout app

**Phase 9: Polish & Testing**
- Refine animations
- Test all calculations
- Ensure consistent styling
- User testing with students

---

## Success Criteria
- All modules functional and interactive
- Calculations are accurate and show work
- Visual feedback is immediate and clear
- Interface is intuitive for chemistry beginners
- App loads quickly and runs smoothly
- No crashes or console errors
- Responsive on desktop browsers
- Deployed successfully to Cloudflare Pages

---

## Additional Notes for Development
- Prioritize educational clarity over technical complexity
- Include helpful explanations and tooltips throughout
- Use scientific notation where appropriate (×10ⁿ)
- Support subscripts (H₂O) and superscripts (2⁺) properly in formulas
- Include units in all calculations
- Make the sandbox forgiving - allow experimentation without penalties
- Ensure all chemical data is scientifically accurate
- Test calculations against known chemistry problems
- Consider adding "Did you know?" facts or tips throughout the interface
- Make error messages educational rather than punitive

---

## Educational Context
This webapp is designed for Life Sciences Education students at the University of Pretoria who are taking:
- LWWA111 (Life Sciences Teaching 1A: Chemistry for Life)
- FICH211 (Physical Sciences for Natural Sciences in the Senior Phase)

Many students have limited prior chemistry knowledge and find the subject intimidating. The goal is to create a safe, engaging environment where they can explore chemistry concepts at their own pace, make mistakes, and build confidence through hands-on experimentation in a digital sandbox.

The webapp should reduce anxiety around chemistry by:
- Providing immediate, non-judgmental feedback
- Allowing unlimited experimentation
- Visualizing abstract concepts
- Breaking down complex calculations into understandable steps
- Making chemistry feel accessible and even fun

---

## End of Prompt
This document contains all specifications needed to build the chemistry sandbox webapp. Begin with Phase 1 and proceed systematically through each module, ensuring each component is fully functional before moving to the next phase.
