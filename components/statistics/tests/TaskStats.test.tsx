import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskStats } from '../TaskStats';
import { Tasks } from '@/components/home/Tasks';


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
    it('displays the task name', () => {
        render(<TaskStats taskName="workout" />);
        expect(screen.getByText(/workout/i)).toBeTruthy();
    });
});

describe('Tasks with Statistics', () => {
    it('displays statistics for each habit', () => {
        const mockHabits = [
            { name: 'workout' },
            { name: 'reading' }
        ];
        render(
            <Tasks
                habits={mockHabits}
                isLoading={false}
                color="#000000"
            />
        );
        expect(screen.getByText(/workout:/i)).toBeTruthy();
        expect(screen.getByText(/reading:/i)).toBeTruthy();
    });
});