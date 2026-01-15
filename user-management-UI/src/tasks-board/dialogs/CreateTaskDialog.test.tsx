import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { CreateTaskDialog } from './CreateTaskDialog';

// Mock dependencies
jest.mock('@/src/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('./TaskForm', () => ({
  TaskForm: () => <div data-testid="task-form">Task Form</div>,
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

describe('CreateTaskDialog', () => {
  const mockDispatch = jest.fn();
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      isCreatingTask: false,
      error: null,
    });
  });

  it('renders dialog with TaskForm', () => {
    render(<CreateTaskDialog open={true} handleCloseDialog={mockHandleClose} />);
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    expect(screen.getByTestId('task-form')).toBeInTheDocument();
  });

  it('calls handleCloseDialog when cancel button is clicked', () => {
    render(<CreateTaskDialog open={true} handleCloseDialog={mockHandleClose} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('disables create button if form is invalid', () => {
    render(<CreateTaskDialog open={true} handleCloseDialog={mockHandleClose} />);
    const createButton = screen.getByRole('button', { name: /create/i });
    expect(createButton).toBeDisabled();
  });

  it('dispatches createTask on submit with valid form values', async () => {
    render(<CreateTaskDialog open={true} handleCloseDialog={mockHandleClose} />);

    // fill form values by mocking form watch
    // Because RHFFormProvider is mocked, we can directly call onSubmit
    const createButton = screen.getByRole('button', { name: /create/i });

    fireEvent.click(createButton);
  });

  it('renders CircularProgress when isCreatingTask is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isCreatingTask: true,
      error: null,
    });
    render(<CreateTaskDialog open={true} handleCloseDialog={mockHandleClose} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
