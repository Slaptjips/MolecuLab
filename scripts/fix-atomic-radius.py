#!/usr/bin/env python3
"""
Fix missing atomic radius values in elements.ts
"""

import re

# Atomic radius values (covalent radii in pm) for elements missing them
# Based on periodic trends and estimates
atomic_radius_updates = {
    85: 140,  # Astatine - similar to iodine
    86: 120,  # Radon - noble gas, larger than xenon
    87: 260,  # Francium - similar to cesium
    88: 215,  # Radium - similar to barium
    89: 195,  # Actinium - similar to lanthanum
    90: 180,  # Thorium
    91: 180,  # Protactinium
    92: 175,  # Uranium
    93: 175,  # Neptunium
    94: 175,  # Plutonium
    95: 175,  # Americium
    96: 170,  # Curium
    97: 170,  # Berkelium
    98: 170,  # Californium
    99: 170,  # Einsteinium
    100: 170,  # Fermium
    101: 170,  # Mendelevium
    102: 170,  # Nobelium
    103: 170,  # Lawrencium
    104: 150,  # Rutherfordium - transition metal
    105: 145,  # Dubnium
    106: 140,  # Seaborgium
    107: 135,  # Bohrium
    108: 130,  # Hassium
    109: 130,  # Meitnerium
    110: 130,  # Darmstadtium
    111: 130,  # Roentgenium
    112: 150,  # Copernicium - similar to mercury
    113: 170,  # Nihonium - similar to thallium
    114: 170,  # Flerovium - similar to lead
    115: 190,  # Moscovium - similar to bismuth
    116: 180,  # Livermorium - similar to polonium
    117: 140,  # Tennessine - similar to astatine
    118: 120,  # Oganesson - noble gas, similar to radon
}

# Read the file
with open('src/data/elements.ts', 'r') as f:
    content = f.read()

# Update each element with missing atomic radius
for atomic_num, radius in atomic_radius_updates.items():
    # Pattern to match the element entry and update atomicRadius
    # Use a more specific pattern to avoid regex group issues
    pattern = rf'atomicNumber: {atomic_num},[\s\S]*?atomicRadius: null'
    
    def replace_radius(match):
        # Replace null with the radius value
        return match.group(0).replace('atomicRadius: null', f'atomicRadius: {radius}')
    
    content = re.sub(pattern, replace_radius, content)

# Write back
with open('src/data/elements.ts', 'w') as f:
    f.write(content)

print("Updated atomic radius values for elements with missing data.")
