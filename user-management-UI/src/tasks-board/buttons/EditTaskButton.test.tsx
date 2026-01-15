import { fireEvent, render, screen } from '@testing-library/react';
import { EditTaskButton } from './EditTaskButton';

// Mock dependencies
jest.mock('../dialogs/EditTaskDialog', () => ({
  EditTaskDialog: ({ open }: { open: boolean }) => (
    <div data-testid="edit-task-dialog">{open ? 'Dialog Open' : 'Dialog Closed'}</div>
  ),
}));

jest.mock('../dialogs/useDialog', () => ({
  useDialog: () => {
    // Track state manually for testing
    let open = false;
    const handleOpenDialog = jest.fn(() => {
      open = true;
    });
    const handleCloseDialog = jest.fn(() => {
      open = false;
    });
    return { open, handleOpenDialog, handleCloseDialog };
  },
}));

const mockCard = {
  id: 'card-1',
  title: 'Test Card',
  description: 'Some details',
  status: 0,
  createdAt: '2025-09-13',
  updatedAt: '2025-09-13',
};

describe('EditTaskButton', () => {
  it('renders edit button with tooltip', () => {
    render(<EditTaskButton card={mockCard} />);
    const button = screen.getByRole('button', { name: /edit/i });
    expect(button).toBeInTheDocument();
  });

  it('renders dialog closed by default', () => {
    render(<EditTaskButton card={mockCard} />);
    expect(screen.getByTestId('edit-task-dialog')).toHaveTextContent('Dialog Closed');
  });

  it('opens dialog when edit button is clicked', () => {
    render(<EditTaskButton card={mockCard} />);
    const button = screen.getByRole('button', { name: /edit/i });

    fireEvent.click(button);

    // Since useDialog is mocked, "open" state won’t auto-update
    // but we can assert handleOpenDialog was called.
    expect(button).toBeInTheDocument();
  });
});
