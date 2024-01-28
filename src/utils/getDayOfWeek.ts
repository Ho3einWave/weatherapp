export default function getDayOfWeek(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: "short" };
    return date.toLocaleDateString("en-US", options).slice(0, 3);
}
