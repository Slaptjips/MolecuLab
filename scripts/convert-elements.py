#!/usr/bin/env python3
import json
import re

# Read the JSON file
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

# Convert electron config to superscript format (only superscript the electron counts, not shell numbers)
def format_electron_config(config):
    # Only superscript numbers after letters (electron counts), not shell numbers
    import re
    # Match pattern like "1s2" or "2p6" and convert to "1s²" or "2p⁶"
    def replace_count(match):
        num = match.group(1)
        superscript_map = str.maketrans('0123456789', '⁰¹²³⁴⁵⁶⁷⁸⁹')
        return num.translate(superscript_map)
    # Replace numbers that come after letters (s, p, d, f)
    config = re.sub(r'([spdf])(\d+)', lambda m: m.group(1) + m.group(2).translate(str.maketrans('0123456789', '⁰¹²³⁴⁵⁶⁷⁸⁹')), config)
    return config

# Simple valence electron calculation
def get_valence_electrons(group, period, category, atomic_number):
    if category in ['lanthanide', 'actinide']:
        return 0
    if atomic_number == 2:  # Helium
        return 2
    if group and 1 <= group <= 2:
        return group
    if group and 13 <= group <= 18:
        return group - 10
    return 0

print("import type { Element } from '../types/element';")
print("")
print("export const ELEMENTS: readonly Element[] = [")

for el in elements:
    # Only process elements 1-118
    if el.get('number', 0) > 118:
        continue
    num = el.get('number', 0)
    symbol = el.get('symbol', '')
    name = el.get('name', '')
    mass = el.get('atomic_mass', 0)
    group = el.get('group', None)
    period = el.get('period', 0)
    cat_raw = el.get('category', '')
    cat = category_map.get(cat_raw, 'nonmetal')
    en = el.get('electronegativity_pauling')
    ie = el.get('ionization_energies', [None])[0] if el.get('ionization_energies') else None
    ea = el.get('electron_affinity')
    config_raw = el.get('electron_configuration', '')
    config = format_electron_config(config_raw)
    
    # Simple valence calculation
    valence = get_valence_electrons(group, period, cat, num)
    
    # Default oxidation states (simplified)
    ox_states = [0]
    if group == 1:
        ox_states = [1]
    elif group == 2:
        ox_states = [2]
    elif group == 18:
        ox_states = [0]
    
    # Atomic radius (simplified - use estimates)
    radius = None
    
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
    print(f"    atomicRadius: {radius if radius else 'null'},")
    print(f"    oxidationStates: {ox_states},")
    print(f"    valenceElectrons: {valence},")
    print(f"    uses: [],")
    print(f"  }},")

print("] as const;")
