import { render, screen } from '@testing-library/react';
import { UserForm } from './UserForm';

// Mock RHFTextField and RHFSelect to simplify testing
jest.mock('@/src/react-hook-form/RHFTextField', () => ({
  RHFTextField: ({ name, label }: any) => <input data-testid={name} placeholder={label} />,
}));

jest.mock('@/src/react-hook-form/RHFSelect', () => ({
  RHFSelect: ({ name, label, children }: any) => (
    <select data-testid={name} aria-label={label}>
      {children}
    </select>
  ),
}));

describe('UserForm', () => {
  it('renders title input field', () => {
    render(<UserForm />);
    const titleInput = screen.getByTestId('title');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute('placeholder', 'Title');
  });

  it('renders description input field', () => {
    render(<UserForm />);
    const descriptionInput = screen.getByTestId('description');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveAttribute('placeholder', 'Description');
  });

  it('renders status select with all options', () => {
    render(<UserForm />);
    const statusSelect = screen.getByTestId('status');
    expect(statusSelect).toBeInTheDocument();

    // We need to render MenuItem children inside select mock
    expect(statusSelect).toHaveTextContent('To Do');
    expect(statusSelect).toHaveTextContent('In Progress');
    expect(statusSelect).toHaveTextContent('Done');
  });
});
