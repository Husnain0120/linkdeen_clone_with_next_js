// components/UserRadialChart.tsx
"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

// UserRadialChart props to accept posts and comments count
interface UserRadialChartProps {
  postsCount: number;
  commentsCount: number;
}

const UserRadialChart = ({
  postsCount,
  commentsCount,
}: UserRadialChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Define the chart dimensions
    const width = 300;
    const height = 300;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Total activity (posts + comments)
    const totalActivity = postsCount + commentsCount;

    // Create the SVG container for the radial chart
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Define the angle scale for the radial chart
    const angle = d3
      .scaleLinear()
      .domain([0, totalActivity])
      .range([0, 2 * Math.PI]);

    // Data for posts and comments
    const data = [
      { value: postsCount, label: "Posts", color: "#007BFF" }, // Blue color for posts
      { value: commentsCount, label: "Comments", color: "#0056b3" }, // Darker blue for comments
    ];

    // Define the arc generator
    const arc = d3
      .arc()
      .innerRadius(radius - 30)
      .outerRadius(radius)
      .startAngle((d: any) => angle(d.start))
      .endAngle((d: any) => angle(d.start + d.value));

    // Prepare the data with start angle and value for arc generation
    let currentStart = 0;
    const arcsData = data.map((d) => {
      const arcData = { ...d, start: currentStart };
      currentStart += d.value; // Calculate the end angle of each segment
      return arcData;
    });

    // Create the arcs for posts and comments
    const arcs = svg
      .selectAll("path")
      .data(arcsData)
      .enter()
      .append("path")
      .attr("d", (d: any) => arc(d)) // Apply arc generator with corrected data
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Add labels (Post and Comment)
    arcs
      .append("text")
      .attr("transform", (d: any) => {
        const midpoint = arc.centroid(d); // Correct centroid calculation
        return `translate(${midpoint})`;
      })
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#fff")
      .text((d: any) => d.label);

    // Add a total activity label in the center
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-10")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text(totalActivity.toLocaleString());

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "15")
      .attr("font-size", "12px")
      .attr("fill", "#999")
      .text("Total Activity");
  }, [postsCount, commentsCount]);

  return <svg ref={svgRef}></svg>;
};

export default UserRadialChart;
