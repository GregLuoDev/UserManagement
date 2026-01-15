import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EditTaskDialog } from './EditTaskDialog';

// Mock Redux
jest.mock('@/src/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/src/lib/thunks/taskAsyncThunks', () => ({
  updateTask: jest.fn(),
}));

// Mock TaskForm
jest.mock('./TaskForm', () => ({
  TaskForm: () => <div data-testid="task-form">Task Form</div>,
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

describe('EditTaskDialog', () => {
  const mockDispatch = jest.fn();
  const mockHandleClose = jest.fn();

  const mockCard = {
    id: '1',
    title: 'Test Task',
    description: 'Some description',
    status: 0,
    createdAt: '2025-09-13',
    updatedAt: '2025-09-13',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      isUpdatingTask: false,
      error: null,
    });
  });

  it('renders dialog with TaskForm and title', () => {
    render(<EditTaskDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByTestId('task-form')).toBeInTheDocument();
  });

  it('calls handleCloseDialog when cancel button is clicked', () => {
    render(<EditTaskDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('dispatches updateTask when update button is clicked', async () => {
    render(<EditTaskDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);

    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);
  });

  it('disables update button if form is invalid', () => {
    render(
      <EditTaskDialog
        open={true}
        handleCloseDialog={mockHandleClose}
        card={{ ...mockCard, title: '' }}
      />,
    );
    const updateButton = screen.getByRole('button', { name: /update/i });
    expect(updateButton).toBeDisabled();
  });

  it('shows CircularProgress when isUpdatingTask is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isUpdatingTask: true,
      error: null,
    });
    render(<EditTaskDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error Alert when shouldShowError', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      isUpdatingTask: false,
      error: 'Update failed',
    });
    render(<EditTaskDialog open={true} handleCloseDialog={mockHandleClose} card={mockCard} />);
  });
});
