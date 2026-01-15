import { clearError } from '@/src/lib/slices/userSlice';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { deleteUser } from '../../lib/thunks/userAsyncThunks';
import DeleteConfirmDialog from './DeleteConfirmDialog';

// Mock Redux hooks
jest.mock('../../lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock thunks
jest.mock('../../lib/thunks/userAsyncThunks', () => ({
  deleteUser: jest.fn(),
}));

jest.mock('@/src/lib/slices/userSlice', () => ({
  clearError: jest.fn(),
}));

describe('DeleteConfirmDialog', () => {
  const mockSetOpen = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      isDeletingUser: false,
      error: null,
    });
  });

  it('renders dialog with title and message', () => {
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} userId="123" />);
    expect(screen.getByText('Please confirm')).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to delete this user/i)).toBeInTheDocument();
  });

  it("calls setOpen(false) and dispatch(clearError) when 'No' button is clicked", () => {
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} userId="123" />);
    fireEvent.click(screen.getByRole('button', { name: /no/i }));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(mockDispatch).toHaveBeenCalledWith(clearError());
  });

  it("dispatches deleteUser and sets deleted state when 'Yes' button is clicked", () => {
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} userId="123" />);
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));
    expect(mockDispatch).toHaveBeenCalledWith(deleteUser('123'));
  });

  it('shows CircularProgress when isDeletingUser is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isDeletingUser: true,
      error: null,
    });
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} userId="123" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error Alert when there is an error', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isDeletingUser: false,
      error: 'Delete failed',
    });
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} userId="123" />);
    expect(screen.getByText(/cannot delete this user/i)).toBeInTheDocument();
  });
});
