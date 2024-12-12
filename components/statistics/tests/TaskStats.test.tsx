import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskStats } from '../TaskStats';

describe('TaskStats', () => {
    it('renders loading state initially', () => {
        render(<TaskStats taskName="workout" />);
        expect(screen.getByTestId('stats-loading')).toBeTruthy();
    });
    it('displays the completion rate', async () => {
        const mockDays = [
            { workout: true },
            { workout: false },
            { workout: true }
        ];
        render(<TaskStats taskName="workout" days={mockDays} />);
        const percentage = await screen.findByText('67%');
        expect(percentage).toBeTruthy();
    });
    it('does not displays the task name if days are not provided', () => {
        render(<TaskStats taskName="workout" />);
        expect(screen.queryByText('workout:')).toBeNull();
    });
});