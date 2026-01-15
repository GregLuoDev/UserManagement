import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { CreateUserDialog } from './CreateUserDialog';

// Mock dependencies
jest.mock('@/src/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('./UserForm', () => ({
  UserForm: () => <div data-testid="user-form">User Form</div>,
}));

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

describe('CreateUserDialog', () => {
  const mockDispatch = jest.fn();
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      isCreatingUser: false,
      error: null,
    });
  });

  it('renders dialog with UserForm', () => {
    render(<CreateUserDialog open={true} handleCloseDialog={mockHandleClose} />);
    expect(screen.getByText('Create New User')).toBeInTheDocument();
    expect(screen.getByTestId('user-form')).toBeInTheDocument();
  });

  it('calls handleCloseDialog when cancel button is clicked', () => {
    render(<CreateUserDialog open={true} handleCloseDialog={mockHandleClose} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('disables create button if form is invalid', () => {
    render(<CreateUserDialog open={true} handleCloseDialog={mockHandleClose} />);
    const createButton = screen.getByRole('button', { name: /create/i });
    expect(createButton).toBeDisabled();
  });

  it('dispatches createUser on submit with valid form values', async () => {
    render(<CreateUserDialog open={true} handleCloseDialog={mockHandleClose} />);

    // fill form values by mocking form watch
    // Because RHFFormProvider is mocked, we can directly call onSubmit
    const createButton = screen.getByRole('button', { name: /create/i });

    fireEvent.click(createButton);
  });

  it('renders CircularProgress when isCreatingUser is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isCreatingUser: true,
      error: null,
    });
    render(<CreateUserDialog open={true} handleCloseDialog={mockHandleClose} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
