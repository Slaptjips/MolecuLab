# Module Testing Checklist

## Testing Order

Let's test each module systematically and fix issues as we find them.

### Module 1: Periodic Table Explorer
**Test:**
- [ ] Page loads without errors
- [ ] Periodic table displays correctly
- [ ] Click on element → detail panel appears
- [ ] Trend visualizations work (atomic radius, ionization energy, etc.)
- [ ] Search box works
- [ ] Filter buttons work (metals, nonmetals, etc.)
- [ ] No console errors

**Common Issues:**
- D3.js not loading
- Element data missing
- Click handlers not working

---

### Module 2: Bonding & Molecules
**Test:**
- [ ] Page loads without errors
- [ ] Atom palette displays
- [ ] Can drag atoms to canvas
- [ ] Atoms appear on canvas
- [ ] Bonds form when atoms are close
- [ ] Molecule info panel shows formula
- [ ] Lewis dot structure toggle works
- [ ] Example molecules load
- [ ] No console errors

**Common Issues:**
- react-draggable not working
- Bond formation logic errors
- Canvas coordinate issues

---

### Module 3: Chemical Equations & Reactions
**Test:**
- [ ] Page loads without errors
- [ ] Can add reactants
- [ ] Can add products
- [ ] Balance equation button works
- [ ] Atom counts display correctly
- [ ] Reaction type classification works
- [ ] Example reactions load
- [ ] No console errors

**Common Issues:**
- Formula parsing errors
- Equation balancing logic
- State management issues

---

### Module 4: Stoichiometry Calculator
**Test:**
- [ ] Page loads without errors
- [ ] Mole calculator works (n = m/M)
- [ ] Can input formula → auto-calculates molar mass
- [ ] Calculations show step-by-step
- [ ] Mole-to-mole stoichiometry works
- [ ] No console errors

**Common Issues:**
- Calculation errors
- Formula parsing
- Step display formatting

---

### Module 5: Acids & Bases
**Test:**
- [ ] Page loads without errors
- [ ] pH scale displays correctly
- [ ] pH calculator works
- [ ] Can calculate pH from [H⁺]
- [ ] Can calculate [H⁺] from pH
- [ ] Titration curve displays (Chart.js)
- [ ] Can input titration parameters
- [ ] No console errors

**Common Issues:**
- Chart.js not rendering
- pH calculation errors
- Titration curve data generation

---

### Module 6: Gas Laws Simulator
**Test:**
- [ ] Page loads without errors
- [ ] Ideal Gas Law calculator works
- [ ] Boyle's Law graph displays
- [ ] Charles's Law graph displays
- [ ] Calculations show step-by-step
- [ ] No console errors

**Common Issues:**
- Chart.js graphs not rendering
- Calculation errors
- Unit conversion issues

---

### Module 7: Thermochemistry
**Test:**
- [ ] Page loads without errors
- [ ] Specific heat calculator works
- [ ] Substance selector works
- [ ] Energy diagrams display (Chart.js)
- [ ] Calculations show step-by-step
- [ ] No console errors

**Common Issues:**
- Chart.js not rendering
- Calculation errors
- Substance data missing

---

### Module 8: Organic Chemistry
**Test:**
- [ ] Page loads without errors
- [ ] Functional groups display
- [ ] Can click on functional groups
- [ ] Details panel shows correctly
- [ ] No console errors

**Common Issues:**
- Data not loading
- Click handlers not working

---

### Module 9: Study Tools
**Test:**
- [ ] Page loads without errors
- [ ] Flashcards display
- [ ] Can flip cards (animation works)
- [ ] Can navigate between cards
- [ ] Category selector works
- [ ] Formula sheet displays
- [ ] No console errors

**Common Issues:**
- Flashcard animation CSS (already fixed)
- State management
- Card data loading

---

## How to Report Issues

When you find an issue, please tell me:
1. **Which module** (e.g., "Module 1: Periodic Table")
2. **What you see** (e.g., "Blank screen", "Error message", "Feature not working")
3. **Console errors** (F12 → Console → copy red errors)
4. **Steps to reproduce** (what you clicked/did)

Then I'll fix it and we'll move to the next module!
