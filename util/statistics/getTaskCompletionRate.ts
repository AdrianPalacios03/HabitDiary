export const getTaskCompletionRate = (taskName: string, days: any[]): number => {
    if (days.length === 0) return 0;
    
    const daysWithTask = days.filter(day => taskName in day);
    if (daysWithTask.length === 0) return 0;
    
    const completedDays = daysWithTask.filter(day => day[taskName] === true);
    return Math.round((completedDays.length / daysWithTask.length) * 100);
};