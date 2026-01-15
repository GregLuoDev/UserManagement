import { render, screen } from '@testing-library/react';
import { TCard, TCardState } from '../../shared/types';
import { CardShadow, TaskCard } from './TaskCard';

// Mock children components
jest.mock('./TaskCardDetails', () => ({
  TaskCardDetails: ({ card }: any) => <div data-testid="task-details">{card.title}</div>,
}));
jest.mock('../../buttons/EditTaskButton', () => ({
  EditTaskButton: ({ card }: any) => <button data-testid="edit-btn">Edit {card.title}</button>,
}));
jest.mock('../../buttons/DeleteTaskButton', () => ({
  DeleteTaskButton: ({ cardId }: any) => <button data-testid="delete-btn">Delete {cardId}</button>,
}));

describe('CardShadow', () => {
  it('renders with the correct height', () => {
    const dragging = { height: 100 } as DOMRect;
    const { container } = render(<CardShadow dragging={dragging} />);
    const div = container.firstChild as HTMLDivElement;
    expect(div).toHaveStyle('height: 100px');
  });
});

describe('TaskCard', () => {
  const card: TCard = {
    id: 'card-1',
    title: 'Test Task',
    description: 'This is a test task',
    status: 0,
    createdAt: '2025-09-10T00:00:00Z',
    updatedAt: '2025-09-12T12:00:00Z',
  };

  const draggingRect = {
    width: 200,
    height: 80,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 200,
    bottom: 80,
    toJSON: () => ({}),
  } as DOMRect;

  it('renders TaskCardDetails, EditTaskButton, and DeleteTaskButton', () => {
    const state: TCardState = { type: 'idle' };
    render(<TaskCard card={card} state={state} />);
    expect(screen.getByTestId('task-details')).toHaveTextContent(card.title);
    expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
  });

  it('applies idle styles', () => {
    const state: TCardState = { type: 'idle' };
    const { container } = render(<TaskCard card={card} state={state} />);
    expect(container.querySelector('.cursor-grab')).toBeInTheDocument();
  });

  it('applies is-dragging styles', () => {
    const state: TCardState = { type: 'is-dragging' };
    const { container } = render(<TaskCard card={card} state={state} />);
    expect(container.querySelector('.opacity-40')).toBeInTheDocument();
  });

  it('hides card when state is is-dragging-and-left-self', () => {
    const state: TCardState = { type: 'is-dragging-and-left-self' };
    const { container } = render(<TaskCard card={card} state={state} />);
    expect(container.firstChild).toHaveClass('hidden');
  });

  it('renders preview with transform and dimensions', () => {
    const state = { type: 'preview', dragging: draggingRect } as TCardState;
    const { container } = render(<TaskCard card={card} state={state} />);
    const inner = container.querySelector('.rounded.bg-slate-700') as HTMLElement;
    expect(inner).toHaveStyle('width: 200px');
    expect(inner).toHaveStyle('height: 80px');
    expect(inner).toHaveStyle('transform: rotate(4deg)');
  });

  it('renders CardShadow above when is-over with closestEdge=top', () => {
    const state: TCardState = { type: 'is-over', dragging: draggingRect, closestEdge: 'top' };
    render(<TaskCard card={card} state={state} />);
    const shadows = screen.getAllByText(
      (_, element) => element?.classList.contains('bg-slate-900') as boolean,
    );
    expect(shadows).toHaveLength(1);
  });

  it('renders CardShadow below when is-over with closestEdge=bottom', () => {
    const state: TCardState = { type: 'is-over', dragging: draggingRect, closestEdge: 'bottom' };
    render(<TaskCard card={card} state={state} />);

    const shadows = screen.getAllByText(
      (_, element) => element?.classList.contains('bg-slate-900') as boolean,
    );
    expect(shadows).toHaveLength(1);
  });
});
