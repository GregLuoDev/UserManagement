import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { AppMenuBar } from './AppMenuBar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock next/link to render a normal <a>
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('AppMenuBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders app title', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<AppMenuBar />);

    expect(screen.getByText('User Directory')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<AppMenuBar />);

    expect(screen.getByRole('link', { name: 'Add' })).toHaveAttribute(
      'href',
      '/Add'
    );
    expect(screen.getByRole('link', { name: 'List' })).toHaveAttribute(
      'href',
      '/List'
    );
  });

  test('highlights active link based on pathname', () => {
    (usePathname as jest.Mock).mockReturnValue('/Add');

    render(<AppMenuBar />);

    const addLink = screen.getByRole('link', { name: 'Add' });
    const listLink = screen.getByRole('link', { name: 'List' });

    expect(addLink).toHaveClass('font-bold', 'text-yellow-600');
    expect(listLink).toHaveClass('text-white-600');
  });

  test('non-active link has hover class', () => {
    (usePathname as jest.Mock).mockReturnValue('/List');

    render(<AppMenuBar />);

    const addLink = screen.getByRole('link', { name: 'Add' });

    expect(addLink).toHaveClass('hover:text-yellow-600');
  });
});
