import { fireEvent, render, screen } from '@testing-library/react';
import { DeleteUserButton } from './DeleteUserButton';

// Mock useDialog
jest.mock('../dialogs/useDialog', () => ({
  useDialog: jest.fn(),
}));

// Mock DeleteConfirmDialog
jest.mock('../dialogs/DeleteConfirmDialog', () => ({
  __esModule: true,
  default: ({ open, setOpen, userId }: any) => (
    <div data-testid="delete-dialog">
      {open ? `Dialog Open for ${userId}` : 'Dialog Closed'}
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  ),
}));

import { useDialog } from '../dialogs/useDialog';

describe('DeleteUserButton', () => {
  const mockHandleOpen = jest.fn();
  const mockHandleClose = jest.fn();
  const mockSetOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDialog as jest.Mock).mockReturnValue({
      open: false,
      setOpen: mockSetOpen,
      handleOpenDialog: mockHandleOpen,
      handleCloseDialog: mockHandleClose,
    });
  });

  it('renders the delete button inside a tooltip', () => {
    render(<DeleteUserButton cardId="123" />);
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

  it('calls handleOpenDialog when delete button is clicked', () => {
    render(<DeleteUserButton cardId="123" />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });

  it('renders DeleteConfirmDialog as closed by default', () => {
    render(<DeleteUserButton cardId="123" />);
    expect(screen.getByTestId('delete-dialog')).toHaveTextContent('Dialog Closed');
  });

  it('renders DeleteConfirmDialog as open when useDialog.open is true', () => {
    (useDialog as jest.Mock).mockReturnValue({
      open: true,
      setOpen: mockSetOpen,
      handleOpenDialog: mockHandleOpen,
      handleCloseDialog: mockHandleClose,
    });

    render(<DeleteUserButton cardId="123" />);
    expect(screen.getByTestId('delete-dialog')).toHaveTextContent('Dialog Open for 123');
  });

  it('passes cardId as userId prop to DeleteConfirmDialog', () => {
    (useDialog as jest.Mock).mockReturnValue({
      open: true,
      setOpen: mockSetOpen,
      handleOpenDialog: mockHandleOpen,
      handleCloseDialog: mockHandleClose,
    });

    render(<DeleteUserButton cardId="999" />);
    expect(screen.getByTestId('delete-dialog')).toHaveTextContent('Dialog Open for 999');
  });
});
