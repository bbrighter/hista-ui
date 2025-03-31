export const getColor = (value: number): string => {
    // Define color stops: green (low), yellow (medium), red (high)
    const colors = [
        { r: 0, g: 255, b: 0 },   // Green (0)
        { r: 255, g: 255, b: 0 }, // Yellow (5)
        { r: 255, g: 0, b: 0 },    // Red (10)
    ];

    const max = 10
    const mid = max / 2 // Midpoint for yellow transition

    let r: number, g: number, b: number

    if (value == 0) {
        r = 0
        g = 0
        b = 255
    } else if (value <= mid) {
        // Interpolate from green to yellow
        const ratio = value / mid;
        r = Math.round(colors[0].r + ratio * (colors[1].r - colors[0].r));
        g = Math.round(colors[0].g + ratio * (colors[1].g - colors[0].g));
        b = Math.round(colors[0].b + ratio * (colors[1].b - colors[0].b));
    } else {
        // Interpolate from yellow to red
        const ratio = (value - mid) / mid;
        r = Math.round(colors[1].r + ratio * (colors[2].r - colors[1].r));
        g = Math.round(colors[1].g + ratio * (colors[2].g - colors[1].g));
        b = Math.round(colors[1].b + ratio * (colors[2].b - colors[1].b));
    }

    return `rgb(${r}, ${g}, ${b})`;
};