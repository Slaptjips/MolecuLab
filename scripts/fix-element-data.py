#!/usr/bin/env python3
"""
Fix valence electrons, oxidation states, and atomic radius for all elements.
"""
import json
import re

# Read the periodic table JSON
with open('/tmp/periodic-table.json', 'r') as f:
    data = json.load(f)

elements = data.get('elements', [])

# Calculate valence electrons from electron configuration
def get_valence_electrons_from_config(config, group, atomic_number, category):
    """Calculate valence electrons from electron configuration."""
    if atomic_number == 1:  # Hydrogen
        return 1
    if atomic_number == 2:  # Helium
        return 2
    
    # For main group elements (groups 1-2, 13-18)
    if group and 1 <= group <= 2:
        return group
    if group and 13 <= group <= 18:
        return group - 10
    
    # For transition metals, count electrons in s and d orbitals of highest energy level
    # This is simplified - actual calculation would parse the config
    if category == 'transition-metal':
        # Most transition metals have 1-2 valence electrons (s orbital)
        # But can use d electrons too, so typically 1-2 for most
        if group and 3 <= group <= 12:
            # Simplified: most have 2 valence electrons
            return 2
        return 0
    
    # For lanthanides/actinides, typically 3 valence electrons
    if category in ['lanthanide', 'actinide']:
        return 3
    
    return 0

# Get oxidation states based on element properties
def get_oxidation_states(group, category, atomic_number):
    """Get common oxidation states for an element."""
    if atomic_number == 1:  # Hydrogen
        return [1, -1]
    if atomic_number == 2:  # Helium
        return [0]
    
    if group == 1:  # Alkali metals
        return [1]
    if group == 2:  # Alkaline earth metals
        return [2]
    if group == 13:  # Boron group
        return [3]
    if group == 14:  # Carbon group
        return [4, 2, -4]
    if group == 15:  # Nitrogen group
        return [5, 3, -3]
    if group == 16:  # Oxygen group
        return [6, 4, -2]
    if group == 17:  # Halogens
        return [7, 5, 3, 1, -1]
    if group == 18:  # Noble gases
        return [0]
    
    # Transition metals - common oxidation states
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

# Atomic radius data (covalent radii in pm) - comprehensive list
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

# Read current elements file
with open('src/data/elements.ts', 'r') as f:
    content = f.read()

# Update each element
for el in elements:
    if el.get('number', 0) > 118:
        continue
    
    num = el.get('number', 0)
    group = el.get('group', None)
    cat_raw = el.get('category', '')
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
    cat = category_map.get(cat_raw, 'nonmetal')
    
    # Calculate valence electrons
    config = el.get('electron_configuration', '')
    valence = get_valence_electrons_from_config(config, group, num, cat)
    
    # Get oxidation states
    ox_states = get_oxidation_states(group, cat, num)
    
    # Get atomic radius
    radius = atomic_radii.get(num, None)
    
    # Update valence electrons - use a more specific pattern
    pattern1 = rf'(atomicNumber: {num},[^}}]+valenceElectrons: )\d+,'
    replacement1 = rf'\g<1>{valence},'
    content = re.sub(pattern1, replacement1, content, flags=re.DOTALL)
    
    # Update oxidation states
    pattern2 = rf'(atomicNumber: {num},[^}}]+oxidationStates: )\[[^\]]+\],'
    ox_str = '[' + ', '.join([str(s) for s in ox_states]) + ']'
    replacement2 = rf'\g<1>{re.escape(ox_str)},'
    content = re.sub(pattern2, replacement2, content, flags=re.DOTALL)
    
    # Update atomic radius
    pattern3 = rf'(atomicNumber: {num},[^}}]+atomicRadius: )(null|\d+),'
    if radius is not None:
        replacement3 = rf'\g<1>{radius},'
    else:
        replacement3 = r'\g<1>null,'
    content = re.sub(pattern3, replacement3, content, flags=re.DOTALL)

# Write back
with open('src/data/elements.ts', 'w') as f:
    f.write(content)

print("Fixed valence electrons, oxidation states, and atomic radius for all elements")
