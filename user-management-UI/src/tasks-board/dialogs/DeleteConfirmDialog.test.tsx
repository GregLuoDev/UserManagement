import { clearError } from '@/src/lib/slices/taskSlice';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { deleteTask } from '../../lib/thunks/taskAsyncThunks';
import DeleteConfirmDialog from './DeleteConfirmDialog';

// Mock Redux hooks
jest.mock('../../lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock thunks
jest.mock('../../lib/thunks/taskAsyncThunks', () => ({
  deleteTask: jest.fn(),
}));

jest.mock('@/src/lib/slices/taskSlice', () => ({
  clearError: jest.fn(),
}));

describe('DeleteConfirmDialog', () => {
  const mockSetOpen = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      isDeletingTask: false,
      error: null,
    });
  });

  it('renders dialog with title and message', () => {
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} taskId="123" />);
    expect(screen.getByText('Please confirm')).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to delete this task/i)).toBeInTheDocument();
  });

  it("calls setOpen(false) and dispatch(clearError) when 'No' button is clicked", () => {
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} taskId="123" />);
    fireEvent.click(screen.getByRole('button', { name: /no/i }));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(mockDispatch).toHaveBeenCalledWith(clearError());
  });

  it("dispatches deleteTask and sets deleted state when 'Yes' button is clicked", () => {
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} taskId="123" />);
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));
    expect(mockDispatch).toHaveBeenCalledWith(deleteTask('123'));
  });

  it('shows CircularProgress when isDeletingTask is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isDeletingTask: true,
      error: null,
    });
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} taskId="123" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error Alert when there is an error', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isDeletingTask: false,
      error: 'Delete failed',
    });
    render(<DeleteConfirmDialog open={true} setOpen={mockSetOpen} taskId="123" />);
    expect(screen.getByText(/cannot delete this task/i)).toBeInTheDocument();
  });
});
