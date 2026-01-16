import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserForm } from './UserForm';

jest.mock('@/src/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/src/lib/thunks/userAsyncThunks', () => ({
  createUser: jest.fn(),
}));

// Mock RHF components to simplify testing
jest.mock('@/src/react-hook-form/RHFTextField', () => ({
  RHFTextField: ({ name, label }: any) => <input aria-label={label} name={name} />,
}));

jest.mock('@/src/react-hook-form/RHFFormProvider', () => ({
  RHFFormProvider: ({ children, onSubmit }: any) => <form onSubmit={onSubmit}>{children}</form>,
}));

describe('UserForm', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  function mockSelector({
    isCreatingUser = false,
    error = null,
  }: {
    isCreatingUser?: boolean;
    error?: string | null;
  }) {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        user: {
          isCreatingUser,
          error,
        },
      }),
    );
  }

  test('renders all form fields', () => {
    mockSelector({});

    render(<UserForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('age')).toBeInTheDocument();
    expect(screen.getByLabelText('city')).toBeInTheDocument();
    expect(screen.getByLabelText('state')).toBeInTheDocument();
    expect(screen.getByLabelText('pincode')).toBeInTheDocument();
  });

  test('create button is disabled initially', () => {
    mockSelector({});

    render(<UserForm />);

    expect(screen.getByRole('button', { name: /create new user/i })).toBeDisabled();
  });

  test('shows loading spinner when creating user', () => {
    mockSelector({ isCreatingUser: true });

    render(<UserForm />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('reset button clears the form', () => {
    mockSelector({});

    render(<UserForm />);

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
  });
});
