// Data
const data = [
    { reason: "Abandoned Bicycle", count: 1318 },
    { reason: "Administrative & General Requests", count: 2025 },
    { reason: "Air Pollution Control", count: 35 },
    { reason: "Alert Boston", count: 3 },
    { reason: "Animal Issues", count: 4155 },
    { reason: "Billing", count: 6 },
    { reason: "Boston Bikes", count: 64 },
    { reason: "Bridge Maintenance", count: 8 },
    { reason: "Building", count: 5209 },
    { reason: "Catchbasin", count: 621 },
    { reason: "Cemetery", count: 29 },
    { reason: "Code Enforcement", count: 31812 },
    { reason: "Employee & General Comments", count: 2166 },
    { reason: "Enforcement & Abandoned Vehicles", count: 61541 },
    { reason: "Environmental Services", count: 4416 },
    { reason: "Fire Hydrant", count: 205 },
    { reason: "General Request", count: 196 },
    { reason: "Generic Noise Disturbance", count: 109 },
    { reason: "Graffiti", count: 1839 },
    { reason: "Health", count: 1349 },
    { reason: "Highway Maintenance", count: 25096 },
    { reason: "Housing", count: 7590 },
    { reason: "MBTA", count: 1 },
    { reason: "Massport", count: 8 },
    { reason: "Needle Program", count: 7413 },
    { reason: "Neighborhood Services Issues", count: 28 },
    { reason: "Noise Disturbance", count: 832 },
    { reason: "Notification", count: 607 },
    { reason: "Office of The Parking Clerk", count: 18 },
    { reason: "Operations", count: 283 },
    { reason: "Park Maintenance & Safety", count: 7932 },
    { reason: "Parking Complaints", count: 19 },
    { reason: "Pothole", count: 85 },
    { reason: "Programs", count: 6 },
    { reason: "Recycling", count: 9955 },
    { reason: "Sanitation", count: 59389 },
    { reason: "Sidewalk Cover / Manhole", count: 291 },
    { reason: "Signs & Signals", count: 11209 },
    { reason: "Street Cleaning", count: 45659 },
    { reason: "Street Lights", count: 8499 },
    { reason: "Traffic Management & Engineering", count: 751 },
    { reason: "Trees", count: 10390 },
    { reason: "Valet", count: 7 },
    { reason: "Weights and Measures", count: 52 },
];

// Top 10 Reasons
const top10Data = data.sort((a, b) => b.count - a.count).slice(0, 10);

// Create a chart
function createChart(data, selector, width = 1200, height = 600, title = "", subtitle = "") {
    const margin = { top: 80, right: 50, bottom: 120, left: 250 }; // Increased bottom margin for citation
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3
        .select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height + 100) // Increase the height value to make the chart higher
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add title
    svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .attr("class", "chart-title")
        .text(title);

    // Add subtitle
    svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", -margin.top / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("class", "chart-subtitle")
        .text(subtitle);

    const x = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .nice()
        .range([0, chartWidth]);

    const y = d3
        .scaleBand()
        .domain(data.map((d) => d.reason))
        .range([0, chartHeight])
        .padding(0.2);

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Tooltip setup
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "#fff")
        .style("border", "1px solid #ccc")
        .style("border-radius", "4px")
        .style("padding", "8px")
        .style("font-size", "12px")
        .style("color", "#333")
        .style("box-shadow", "0px 2px 4px rgba(0, 0, 0, 0.2)")
        .style("pointer-events", "none")
        .style("display", "none");

    // Draw bars with tooltip interactions
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", (d) => y(d.reason))
        .attr("width", (d) => x(d.count))
        .attr("height", y.bandwidth())
        .on("mouseover", function (event, d) {
            tooltip
                .style("display", "block")
                .html(`<strong>${d.reason}</strong>: ${d.count}`)
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px");
            d3.select(this).style("opacity", 0.8); // Highlight the bar
        })
        .on("mousemove", function (event) {
            tooltip
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px");
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
            d3.select(this).style("opacity", 1); // Reset bar opacity
        });

    // Add citation
    svg.append("text")
    .attr("x", chartWidth)
    .attr("y", chartHeight + margin.bottom - 20) // Adjust the value to move the text upward
    .attr("text-anchor", "end")
    .attr("class", "chart-citation")
    .text("Data Source: Boston 311 Service Data");

    svg.append("text")
        .attr("x", chartWidth)
        .attr("y", chartHeight + margin.bottom)
        .attr("text-anchor", "end")
        .attr("class", "chart-citation")
        .text("Created by David Shi, DPI 691MB: Programming and Data for Policymakers");
}

// Toggle button
const toggleButton = document.getElementById("toggle-button");
const allReasonsContainer = document.getElementById("all-reasons-container");

toggleButton.addEventListener("click", () => {
    if (allReasonsContainer.classList.contains("hidden")) {
        allReasonsContainer.classList.remove("hidden");
        toggleButton.textContent = "Hide Other Reasons";
    } else {
        allReasonsContainer.classList.add("hidden");
        toggleButton.textContent = "Show Other Reasons";
    }
});





// Render the charts with titles
createChart(top10Data, "#top-10-chart", 1200, 600, "Key Issues Highlighted by 311 Calls: Enforcement, Vehicles, Sanitation, and Infrastructure", "Top 10 Reasons for 311 Calls by Category");
createChart(data, "#all-reasons-chart", 1200, 800, "Key Issues Highlighted by 311 Calls: Enforcement, Vehicles, Sanitation, and Infrastructure", "All Reasons for 311 Calls by Category");



