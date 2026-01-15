import { fireEvent, render, screen } from '@testing-library/react';
import { CreateUserButton } from './CreateUserButton';

// Mock useDialog
jest.mock('../dialogs/useDialog', () => ({
  useDialog: jest.fn(),
}));

// Mock CreateUserDialog
jest.mock('../dialogs/CreateUserDialog', () => ({
  CreateUserDialog: ({ open, handleCloseDialog }: any) => (
    <div data-testid="create-user-dialog">
      {open ? 'Dialog Open' : 'Dialog Closed'}
      <button onClick={handleCloseDialog}>Close</button>
    </div>
  ),
}));

import { useDialog } from '../dialogs/useDialog';

describe('CreateUserButton', () => {
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
    render(<CreateUserButton />);
    expect(screen.getByRole('button', { name: /create new user/i })).toBeInTheDocument();
  });

  it('calls handleOpenDialog when button is clicked', () => {
    render(<CreateUserButton />);
    fireEvent.click(screen.getByRole('button', { name: /create new user/i }));
    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });

  it('passes correct props to CreateUserDialog (closed)', () => {
    render(<CreateUserButton />);
    expect(screen.getByTestId('create-user-dialog')).toHaveTextContent('Dialog Closed');
  });

  it('passes correct props to CreateUserDialog (open)', () => {
    // Override mock to return open = true
    (useDialog as jest.Mock).mockReturnValue({
      open: true,
      handleOpenDialog: mockHandleOpen,
      handleCloseDialog: mockHandleClose,
    });

    render(<CreateUserButton />);
    expect(screen.getByTestId('create-user-dialog')).toHaveTextContent('Dialog Open');
  });
});
