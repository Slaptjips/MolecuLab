#!/usr/bin/env python3
"""
Fix valence electrons, oxidation states, and atomic radius for all elements.
This version regenerates the file with correct data.
"""
import json
import re

# Read the periodic table JSON
with open('/tmp/periodic-table.json', 'r') as f:
    data = json.load(f)

elements = data.get('elements', [])

# Category mapping
category_map = {
    'diatomic nonmetal': 'nonmetal',
    'polyatomic nonmetal': 'nonmetal',
    'noble gas': 'noble-gas',
    'alkali metal': 'alkali-metal',
    'alkaline earth metal': 'alkaline-earth',
    'transition metal': 'transition-metal',
    'post-transition metal': 'post-transition',
    'metalloid': 'metalloid',
    'halogen': 'halogen',
    'lanthanide': 'lanthanide',
    'actinide': 'actinide',
}

# Convert electron config to superscript format
def format_electron_config(config):
    superscript_map = str.maketrans('0123456789', '⁰¹²³⁴⁵⁶⁷⁸⁹')
    config = re.sub(r'([spdf])(\d+)', lambda m: m.group(1) + m.group(2).translate(superscript_map), config)
    return config

# Calculate valence electrons properly
def get_valence_electrons(group, period, category, atomic_number, electron_config):
    if atomic_number == 1:  # Hydrogen
        return 1
    if atomic_number == 2:  # Helium
        return 2
    
    # Main group elements
    if group and 1 <= group <= 2:
        return group
    if group and 13 <= group <= 18:
        return group - 10
    
    # Transition metals - count s and d electrons in highest shell
    if category == 'transition-metal':
        # Most transition metals have 2 valence electrons (s orbital)
        # Some can use d electrons, but for simplicity, use 2
        return 2
    
    # Lanthanides/Actinides
    if category in ['lanthanide', 'actinide']:
        return 3
    
    return 0

# Get oxidation states
def get_oxidation_states(group, category, atomic_number):
    if atomic_number == 1:  # Hydrogen
        return [1, -1]
    if atomic_number == 2:  # Helium
        return [0]
    
    if group == 1:
        return [1]
    if group == 2:
        return [2]
    if group == 13:
        return [3]
    if group == 14:
        return [4, 2, -4]
    if group == 15:
        return [5, 3, -3]
    if group == 16:
        return [6, 4, -2]
    if group == 17:
        return [7, 5, 3, 1, -1]
    if group == 18:
        return [0]
    
    # Transition metals
    if category == 'transition-metal':
        if group == 3:
            return [3]
        if group == 4:
            return [4, 3, 2]
        if group == 5:
            return [5, 4, 3, 2]
        if group == 6:
            return [6, 5, 4, 3, 2]
        if group == 7:
            return [7, 6, 5, 4, 3, 2]
        if group == 8:
            return [3, 2]
        if group == 9:
            return [3, 2]
        if group == 10:
            return [2]
        if group == 11:
            return [2, 1]
        if group == 12:
            return [2]
        return [2, 3]
    
    # Lanthanides/Actinides
    if category in ['lanthanide', 'actinide']:
        return [3, 2]
    
    return [0]

# Atomic radius data (covalent radii in pm)
atomic_radii = {
    1: 25, 2: 28, 3: 145, 4: 105, 5: 85, 6: 70, 7: 65, 8: 60, 9: 50, 10: 38,
    11: 180, 12: 150, 13: 125, 14: 110, 15: 100, 16: 100, 17: 100, 18: 71,
    19: 220, 20: 180, 21: 160, 22: 140, 23: 135, 24: 140, 25: 140, 26: 140,
    27: 135, 28: 135, 29: 135, 30: 135, 31: 130, 32: 125, 33: 115, 34: 115,
    35: 115, 36: 88, 37: 235, 38: 200, 39: 180, 40: 155, 41: 145, 42: 145,
    43: 135, 44: 130, 45: 135, 46: 140, 47: 160, 48: 155, 49: 155, 50: 145,
    51: 145, 52: 140, 53: 140, 54: 108, 55: 260, 56: 215, 57: 195, 58: 185,
    59: 185, 60: 185, 61: 185, 62: 185, 63: 185, 64: 180, 65: 175, 66: 175,
    67: 175, 68: 175, 69: 175, 70: 175, 71: 175, 72: 155, 73: 145, 74: 135,
    75: 135, 76: 130, 77: 135, 78: 135, 79: 135, 80: 150, 81: 190, 82: 180,
    83: 160, 84: 190, 85: None, 86: None, 87: None, 88: 215, 89: 195, 90: 180,
    91: 180, 92: 175, 93: 175, 94: 175, 95: 175, 96: None, 97: None, 98: None,
    99: None, 100: None, 101: None, 102: None, 103: None, 104: None, 105: None,
    106: None, 107: None, 108: None, 109: None, 110: None, 111: None, 112: None,
    113: None, 114: None, 115: None, 116: None, 117: None, 118: None
}

# Afrikaans names for all 118 elements
afrikaans_names = {
    1: 'Waterstof', 2: 'Helium', 3: 'Litium', 4: 'Berillium', 5: 'Boor',
    6: 'Koolstof', 7: 'Stikstof', 8: 'Suurstof', 9: 'Fluoor', 10: 'Neon',
    11: 'Natrium', 12: 'Magnesium', 13: 'Aluminium', 14: 'Silikon', 15: 'Fosfor',
    16: 'Swawel', 17: 'Chloor', 18: 'Argon', 19: 'Kalium', 20: 'Kalsium',
    21: 'Skandium', 22: 'Titaan', 23: 'Vanadium', 24: 'Chroom', 25: 'Mangaan',
    26: 'Yster', 27: 'Kobalt', 28: 'Nikkel', 29: 'Koper', 30: 'Sink',
    31: 'Gallium', 32: 'Germanium', 33: 'Arseen', 34: 'Seleen', 35: 'Broom',
    36: 'Kripton', 37: 'Rubidium', 38: 'Strontium', 39: 'Yttrium', 40: 'Sirkonium',
    41: 'Niobium', 42: 'Molibdeen', 43: 'Teknesium', 44: 'Rutenium', 45: 'Rodium',
    46: 'Palladium', 47: 'Silwer', 48: 'Kadmium', 49: 'Indium', 50: 'Tin',
    51: 'Antimoon', 52: 'Telluur', 53: 'Jodium', 54: 'Xenon', 55: 'Sesium',
    56: 'Barium', 57: 'Lantaan', 58: 'Serium', 59: 'Praseodimium', 60: 'Neodimium',
    61: 'Prometium', 62: 'Samarium', 63: 'Europium', 64: 'Gadolinium', 65: 'Terbium',
    66: 'Disprosium', 67: 'Holmium', 68: 'Erbium', 69: 'Tulium', 70: 'Ytterbium',
    71: 'Lutetium', 72: 'Hafnium', 73: 'Tantaal', 74: 'Wolfram', 75: 'Renium',
    76: 'Osmium', 77: 'Iridium', 78: 'Platina', 79: 'Goud', 80: 'Kwik',
    81: 'Tallium', 82: 'Lood', 83: 'Bismut', 84: 'Polonium', 85: 'Astaat',
    86: 'Radon', 87: 'Francium', 88: 'Radium', 89: 'Aktinium', 90: 'Torium',
    91: 'Protaktinium', 92: 'Uraan', 93: 'Neptunium', 94: 'Plutonium', 95: 'Amerikium',
    96: 'Curium', 97: 'Berkelium', 98: 'Kalifornium', 99: 'Einsteinium', 100: 'Fermium',
    101: 'Mendelevium', 102: 'Nobelium', 103: 'Lawrencium', 104: 'Rutherfordium', 105: 'Dubnium',
    106: 'Seaborgium', 107: 'Bohrium', 108: 'Hassium', 109: 'Meitnerium', 110: 'Darmstadtium',
    111: 'Roentgenium', 112: 'Copernicium', 113: 'Nihonium', 114: 'Flerovium', 115: 'Moscovium',
    116: 'Livermorium', 117: 'Tennessine', 118: 'Oganesson'
}

# Latin/original names
latin_names = {
    11: 'Natrium', 19: 'Kalium', 26: 'Ferrum', 29: 'Cuprum', 47: 'Argentum',
    50: 'Stannum', 51: 'Stibium', 74: 'Wolfram', 79: 'Aurum', 80: 'Hydrargyrum',
    82: 'Plumbum'
}

# Generate new file
print("import type { Element } from '../types/element';")
print("")
print("export const ELEMENTS: readonly Element[] = [")

for el in elements:
    if el.get('number', 0) > 118:
        continue
    
    num = el.get('number', 0)
    symbol = el.get('symbol', '')
    name = el.get('name', '')
    mass = el.get('atomic_mass', 0)
    group = el.get('group', None)
    period = el.get('period', 0)
    cat_raw = el.get('category', '')
    
    # Elements 109-118: Unknown properties (check this first)
    if num >= 109 and num <= 118:
        cat = 'unknown-properties'
    # Override category for halogens (group 17) and noble gases (group 18)
    elif group == 17:
        cat = 'halogen'
    elif group == 18:
        cat = 'noble-gas'
    else:
        cat = category_map.get(cat_raw, 'nonmetal')
    en = el.get('electronegativity_pauling')
    ie = el.get('ionization_energies', [None])[0] if el.get('ionization_energies') else None
    ea = el.get('electron_affinity')
    config_raw = el.get('electron_configuration', '')
    config = format_electron_config(config_raw)
    
    # Calculate correct values
    valence = get_valence_electrons(group, period, cat, num, config_raw)
    ox_states = get_oxidation_states(group, cat, num)
    radius = atomic_radii.get(num, None)
    
    # Build alternative names
    alt_names = {}
    if num in afrikaans_names:
        alt_names['af'] = afrikaans_names[num]
    if num in latin_names:
        alt_names['latin'] = latin_names[num]
    
    print(f"  {{")
    print(f"    symbol: '{symbol}',")
    print(f"    name: '{name}',")
    print(f"    atomicNumber: {num},")
    print(f"    atomicMass: {mass},")
    print(f"    electronConfig: '{config}',")
    print(f"    group: {group if group else 'null'},")
    print(f"    period: {period},")
    print(f"    category: '{cat}',")
    print(f"    electronegativity: {en if en else 'null'},")
    print(f"    ionizationEnergy: {ie if ie else 'null'},")
    print(f"    electronAffinity: {ea if ea else 'null'},")
    print(f"    atomicRadius: {radius if radius is not None else 'null'},")
    ox_str = '[' + ', '.join([str(s) for s in ox_states]) + ']'
    print(f"    oxidationStates: {ox_str},")
    print(f"    valenceElectrons: {valence},")
    print(f"    uses: [],")
    if alt_names:
        alt_str = ', '.join([f"{k}: '{v}'" for k, v in alt_names.items()])
        print(f"    alternativeNames: {{ {alt_str} }},")
    print(f"  }},")

print("] as const;")
print("")
print("// Helper function to get element by symbol")
print("export const getElementBySymbol = (symbol: string): Element | undefined => {")
print("  return ELEMENTS.find((el) => el.symbol === symbol);")
print("};")
print("")
print("// Helper function to get element by atomic number")
print("export const getElementByAtomicNumber = (atomicNumber: number): Element | undefined => {")
print("  return ELEMENTS.find((el) => el.atomicNumber === atomicNumber);")
print("};")
print("")
print("// Helper function to get all elements in a category")
print("export const getElementsByCategory = (category: Element['category']): readonly Element[] => {")
print("  return ELEMENTS.filter((el) => el.category === category);")
print("};")
