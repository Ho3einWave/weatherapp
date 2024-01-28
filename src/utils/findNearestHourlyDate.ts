export default function findNearestHourlyDate(dateList: Date[]): {
    date: Date | null;
    index: number | null;
} {
    const now = new Date();

    const result = dateList.reduce(
        (nearest, current, index) => {
            const nearestDifference = nearest.date
                ? Math.abs(nearest.date.getTime() - now.getTime())
                : Infinity;
            const currentDifference = Math.abs(
                current.getTime() - now.getTime()
            );

            return currentDifference < nearestDifference
                ? { date: current, index }
                : nearest;
        },
        { date: null as Date | null, index: null as number | null }
    );

    return result;
}
