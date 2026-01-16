import { useAppSelector } from '@/src/lib/store';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { UsersList } from './UsersList';

jest.mock('@/src/lib/store', () => ({
  useAppSelector: jest.fn(),
}));

describe('UsersList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function mockSelector(users: any[]) {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        user: {
          users,
        },
      }),
    );
  }

  test('renders DataGrid with column headers', () => {
    mockSelector([]);

    render(<UsersList />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByText('Pin Code')).toBeInTheDocument();
  });

  test('renders users rows from redux state', () => {
    mockSelector([
      {
        id: 1,
        name: 'John',
        age: 30,
        city: 'Sydney',
        state: 'NSW',
        pincode: '2000',
      },
      {
        id: 2,
        name: 'Jane',
        age: 25,
        city: 'Melbourne',
        state: 'VIC',
        pincode: '3000',
      },
    ]);

    render(<UsersList />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Sydney')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Melbourne')).toBeInTheDocument();
  });

  test('handles empty users list gracefully', () => {
    mockSelector([]);

    render(<UsersList />);

    // DataGrid shows "No rows" text
    expect(screen.getByText(/no rows/i)).toBeInTheDocument();
  });

  test('renders correct page size option', () => {
    mockSelector([
      {
        id: 1,
        name: 'John',
        age: 30,
        city: 'Sydney',
        state: 'NSW',
        pincode: '2000',
      },
    ]);

    render(<UsersList />);

    // Default page size is 5
    expect(screen.getByText('1–1 of 1')).toBeInTheDocument();
  });
});
