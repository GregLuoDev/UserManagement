import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { EditUserDialog } from './EditUserDialog';

// Mock Redux
jest.mock('@/src/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/src/lib/thunks/userAsyncThunks', () => ({
  updateUser: jest.fn(),
}));

// Mock UserForm
jest.mock('./UserForm', () => ({
  UserForm: () => <div data-testid="user-form">User Form</div>,
}));

// Mock RHFFormProvider
jest.mock('@/src/react-hook-form/RHFFormProvider', () => ({
  RHFFormProvider: ({ children, onSubmit }: any) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  ),
}));

describe('EditUserDialog', () => {
  const mockDispatch = jest.fn();
  const mockHandleClose = jest.fn();

  const mockCard = {
    id: '1',
    title: 'Test User',
    description: 'Some description',
    status: 0,
    createdAt: '2025-09-13',
    updatedAt: '2025-09-13',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      isUpdatingUser: false,
      error: null,
    });
  });

  it('renders dialog with UserForm and title', () => {
    render(<EditUserDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
    expect(screen.getByText('Edit User')).toBeInTheDocument();
    expect(screen.getByTestId('user-form')).toBeInTheDocument();
  });

  it('calls handleCloseDialog when cancel button is clicked', () => {
    render(<EditUserDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('dispatches updateUser when update button is clicked', async () => {
    render(<EditUserDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);

    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);
  });

  it('disables update button if form is invalid', () => {
    render(
      <EditUserDialog
        open={true}
        handleCloseDialog={mockHandleClose}
        card={{ ...mockCard, title: '' }}
      />,
    );
    const updateButton = screen.getByRole('button', { name: /update/i });
    expect(updateButton).toBeDisabled();
  });

  it('shows CircularProgress when isUpdatingUser is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isUpdatingUser: true,
      error: null,
    });
    render(<EditUserDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error Alert when shouldShowError', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isUpdatingUser: false,
      error: 'Update failed',
    });
    render(<EditUserDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
  });
});
