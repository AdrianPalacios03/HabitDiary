import { getTaskCompletionRate } from '../getTaskCompletionRate';

describe('getTaskCompletionRate', () => {
    it('should return 0 when no days are provided', () => {
        const result = getTaskCompletionRate('workout', []);
        expect(result).toBe(0);
    });
    it('should return 100 when task was completed every day', () => {
        const mockDays = [
            { workout: true },
            { workout: true },
            { workout: true }
        ];
        const result = getTaskCompletionRate('workout', mockDays);
        expect(result).toBe(100);
    });
    it('should return 50 when task was completed half the days', () => {
        const mockDays = [
            { workout: true },
            { workout: false },
            { workout: true },
            { workout: false }
        ];
        const result = getTaskCompletionRate('workout', mockDays);
        expect(result).toBe(50);
    });
    it('should handle days where the task is not present', () => {
        const mockDays = [
            { workout: true },
            { reading: true },
            { workout: true }
        ];
        const result = getTaskCompletionRate('workout', mockDays);
        expect(result).toBe(100);
    });
});