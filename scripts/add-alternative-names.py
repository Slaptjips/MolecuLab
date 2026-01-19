#!/usr/bin/env python3
"""
Add Afrikaans and Latin alternative names to all elements.
"""

# Comprehensive Afrikaans names for all 118 elements
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

# Latin/original names for elements that have them
latin_names = {
    11: 'Natrium', 19: 'Kalium', 26: 'Ferrum', 29: 'Cuprum', 47: 'Argentum',
    50: 'Stannum', 51: 'Stibium', 74: 'Wolfram', 79: 'Aurum', 80: 'Hydrargyrum',
    82: 'Plumbum'
}

import re

# Read the elements file
with open('src/data/elements.ts', 'r') as f:
    content = f.read()

# Add alternative names to each element
for atomic_num in range(1, 119):
    # Check if element already has alternativeNames
    existing_pattern = rf'atomicNumber: {atomic_num},[^}}]+alternativeNames:'
    has_existing = re.search(existing_pattern, content, re.DOTALL)
    
    if has_existing:
        # Update existing alternativeNames
        # Find the alternativeNames block and update it
        pattern = rf'(atomicNumber: {atomic_num},[^}}]+alternativeNames: {{[^}}]+}}),'
        
        # Build alternative names object
        alt_names = {}
        if atomic_num in afrikaans_names:
            alt_names['af'] = afrikaans_names[atomic_num]
        if atomic_num in latin_names:
            alt_names['latin'] = latin_names[atomic_num]
        
        if alt_names:
            # Format the alternative names
            alt_str = ', '.join([f"{k}: '{v}'" for k, v in alt_names.items()])
            replacement = rf'atomicNumber: {atomic_num},[^}}]+uses: \[\],\n    alternativeNames: {{ {alt_str} }},'
            # More specific pattern for existing
            pattern2 = rf'(atomicNumber: {atomic_num},[^}}]+)alternativeNames: {{[^}}]+}},'
            replacement2 = rf'\1alternativeNames: {{ {alt_str} }},'
            content = re.sub(pattern2, replacement2, content, flags=re.DOTALL)
    else:
        # Add new alternativeNames
        pattern = rf'(atomicNumber: {atomic_num},[^}}]+uses: \[\],)'
        
        # Build alternative names object
        alt_names = {}
        if atomic_num in afrikaans_names:
            alt_names['af'] = afrikaans_names[atomic_num]
        if atomic_num in latin_names:
            alt_names['latin'] = latin_names[atomic_num]
        
        if alt_names:
            # Format the alternative names
            alt_str = ', '.join([f"{k}: '{v}'" for k, v in alt_names.items()])
            replacement = rf'\1\n    alternativeNames: {{ {alt_str} }},'
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('src/data/elements.ts', 'w') as f:
    f.write(content)

print(f"Added alternative names to all 118 elements")
print(f"Afrikaans names: {len(afrikaans_names)}")
print(f"Latin names: {len(latin_names)}")
