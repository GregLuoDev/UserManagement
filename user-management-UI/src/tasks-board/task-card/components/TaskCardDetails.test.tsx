import { render, screen } from '@testing-library/react';
import { TCard } from '../../shared/types';
import { TaskCardDetails } from './TaskCardDetails';

// Mock the convertUTCToLocal function
jest.mock('../../shared/utils', () => ({
  ...jest.requireActual('../../shared/utils'),
  convertUTCToLocal: jest.fn((date: string) => `local-${date}`),
}));

describe('TaskCardDetails', () => {
  const card: TCard = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    status: 0,
    createdAt: '2025-09-10T00:00:00Z',
    updatedAt: '2025-09-12T12:00:00Z',
  };

  it('renders the card title', () => {
    render(<TaskCardDetails card={card} />);
    expect(screen.getByText(card.title)).toBeInTheDocument();
  });

  it('renders the card description', () => {
    render(<TaskCardDetails card={card} />);
    expect(screen.getByText(card.description)).toBeInTheDocument();
  });

  it('renders the created and updated dates using convertUTCToLocal', () => {
    render(<TaskCardDetails card={card} />);
    expect(screen.getByText(`Created at: local-${card.createdAt}`)).toBeInTheDocument();
    expect(screen.getByText(`Updated at: local-${card.updatedAt}`)).toBeInTheDocument();
  });

  it('uses correct MUI components', () => {
    const { container } = render(<TaskCardDetails card={card} />);
    expect(container.querySelector('.MuiTypography-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardContent-root')).toBeInTheDocument();
  });
});
