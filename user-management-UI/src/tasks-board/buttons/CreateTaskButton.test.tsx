import { fireEvent, render, screen } from '@testing-library/react';
import { CreateTaskButton } from './CreateTaskButton';

// Mock useDialog
jest.mock('../dialogs/useDialog', () => ({
  useDialog: jest.fn(),
}));

// Mock CreateTaskDialog
jest.mock('../dialogs/CreateTaskDialog', () => ({
  CreateTaskDialog: ({ open, handleCloseDialog }: any) => (
    <div data-testid="create-task-dialog">
      {open ? 'Dialog Open' : 'Dialog Closed'}
      <button onClick={handleCloseDialog}>Close</button>
    </div>
  ),
}));

import { useDialog } from '../dialogs/useDialog';

describe('CreateTaskButton', () => {
  const mockHandleOpen = jest.fn();
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementation
    (useDialog as jest.Mock).mockReturnValue({
      open: false,
      handleOpenDialog: mockHandleOpen,
      handleCloseDialog: mockHandleClose,
    });
  });

  it('renders the button', () => {
    render(<CreateTaskButton />);
    expect(screen.getByRole('button', { name: /create new task/i })).toBeInTheDocument();
  });

  it('calls handleOpenDialog when button is clicked', () => {
    render(<CreateTaskButton />);
    fireEvent.click(screen.getByRole('button', { name: /create new task/i }));
    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });

  it('passes correct props to CreateTaskDialog (closed)', () => {
    render(<CreateTaskButton />);
    expect(screen.getByTestId('create-task-dialog')).toHaveTextContent('Dialog Closed');
  });

  it('passes correct props to CreateTaskDialog (open)', () => {
    // Override mock to return open = true
    (useDialog as jest.Mock).mockReturnValue({
      open: true,
      handleOpenDialog: mockHandleOpen,
      handleCloseDialog: mockHandleClose,
    });

    render(<CreateTaskButton />);
    expect(screen.getByTestId('create-task-dialog')).toHaveTextContent('Dialog Open');
  });
});
