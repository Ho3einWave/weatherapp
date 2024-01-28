export default function degToDirection(degrees: number): string {
    const directions = [
        "North",
        "North",
        "Northeast",
        "East",
        "East",
        "East",
        "Southeast",
        "South",
        "South",
        "South",
        "Southwest",
        "West",
        "West",
        "West",
        "Northwest",
        "North",
    ];

    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}
