import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ELEMENTS } from '../../data/elements';
import type { Element } from '../../types/element';

type TrendType = 'atomic-radius' | 'ionization-energy' | 'electronegativity' | 'electron-affinity';

type TrendVisualizerProps = {
  trend: TrendType;
};

const TrendVisualizer = ({ trend }: TrendVisualizerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Filter elements with valid data for the trend
    const elementsWithData = ELEMENTS.filter((el) => {
      switch (trend) {
        case 'atomic-radius':
          return el.atomicRadius !== null;
        case 'ionization-energy':
          return el.ionizationEnergy !== null;
        case 'electronegativity':
          return el.electronegativity !== null;
        case 'electron-affinity':
          return el.electronAffinity !== null;
        default:
          return false;
      }
    });

    if (elementsWithData.length === 0) {
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '18px')
        .attr('fill', '#666')
        .text('No data available for this trend');
      return;
    }

    // Get values
    const getValue = (el: Element): number => {
      switch (trend) {
        case 'atomic-radius':
          return el.atomicRadius!;
        case 'ionization-energy':
          return el.ionizationEnergy!;
        case 'electronegativity':
          return el.electronegativity!;
        case 'electron-affinity':
          return el.electronAffinity!;
        default:
          return 0;
      }
    };

    const values = elementsWithData.map(getValue);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Color scale
    const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([minValue, maxValue]);

    // Create heat map cells
    const cellWidth = 50;
    const cellHeight = 50;
    const cols = 18;
    const startX = margin.left;

    // Title
    const title = {
      'atomic-radius': 'Atomic Radius (pm)',
      'ionization-energy': 'Ionization Energy (kJ/mol)',
      'electronegativity': 'Electronegativity (Pauling scale)',
      'electron-affinity': 'Electron Affinity (kJ/mol)',
    }[trend];

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .text(title);

    // Create cells for each element
    elementsWithData.forEach((element) => {
      const row = element.period - 1;
      const col = element.group ? (element.group > 2 ? element.group - 10 : element.group) - 1 : -1;

      if (col < 0 || col >= cols) return;

      const x = startX + col * cellWidth;
      const y = margin.top + row * cellHeight;
      const value = getValue(element);
      const color = colorScale(value);

      // Create cell
      const cell = svg
        .append('g')
        .attr('transform', `translate(${x},${y})`);

      cell
        .append('rect')
        .attr('width', cellWidth - 2)
        .attr('height', cellHeight - 2)
        .attr('fill', color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .attr('rx', 4);

      // Element symbol
      cell
        .append('text')
        .attr('x', cellWidth / 2)
        .attr('y', cellHeight / 2 - 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#000')
        .text(element.symbol);

      // Value
      cell
        .append('text')
        .attr('x', cellWidth / 2)
        .attr('y', cellHeight / 2 + 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', '#000')
        .text(value.toFixed(1));
    });

    // Color legend
    const legendWidth = 300;
    const legendHeight = 20;
    const legendX = width - margin.right - legendWidth;
    const legendY = height - margin.bottom + 20;

    const legendScale = d3.scaleLinear().domain([minValue, maxValue]).range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale).ticks(5);

    const legend = svg.append('g').attr('transform', `translate(${legendX},${legendY})`);

    // Gradient for legend
    const gradientId = `legend-gradient-${trend}`;
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '100%');

    const numStops = 10;
    for (let i = 0; i <= numStops; i++) {
      const value = minValue + ((maxValue - minValue) * i) / numStops;
      gradient.append('stop').attr('offset', `${(i / numStops) * 100}%`).attr('stop-color', colorScale(value));
    }

    legend
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', `url(#${gradientId})`)
      .attr('stroke', '#000');

    legend.append('g').attr('transform', `translate(0,${legendHeight})`).call(legendAxis);

    legend
      .append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(title);
  }, [trend]);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <svg ref={svgRef} className="w-full" style={{ maxHeight: '600px' }} />
    </div>
  );
};

export default TrendVisualizer;
