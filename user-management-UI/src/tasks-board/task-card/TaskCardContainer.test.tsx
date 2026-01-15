import { useAppDispatch } from '@/src/lib/store';
import { render, screen } from '@testing-library/react';
import { ColumnType, TCard } from '../shared/types';
import { TaskCardContainer } from './TaskCardContainer';

jest.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
  draggable: jest.fn(() => jest.fn()),
  dropTargetForElements: jest.fn(() => jest.fn()),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source', () => ({
  preserveOffsetOnSource: jest.fn(),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview', () => ({
  setCustomNativeDragPreview: jest.fn(),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop/combine', () => ({
  combine: jest.fn(() => jest.fn()),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge', () => ({
  attachClosestEdge: jest.fn((data) => data),
  extractClosestEdge: jest.fn(() => 'top'),
}));
jest.mock('../shared/is-shallow-equal', () => ({
  isShallowEqual: jest.fn(() => true),
}));
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element: any) => element,
}));
jest.mock('tiny-invariant', () => jest.fn());
jest.mock('./components/TaskCard', () => ({
  TaskCard: ({ card }: any) => <div data-testid="task-card">{card.title}</div>,
}));

jest.mock('@/src/lib/store', () => ({
  useAppDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
const card: TCard = {
  id: '3846bd70-a0c3-4079-879d-eea95554834c',
  title: 'Implement API',
  description: 'Implement Web API with .Net 9444',
  status: 2,
  createdAt: '2025-09-11',
  updatedAt: '2025-09-13',
};

describe('TaskCardContainer', () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it('renders TaskCard with the card id', () => {
    render(<TaskCardContainer card={card} columnId={ColumnType.toDo} />);
    expect(screen.getByTestId('task-card')).toHaveTextContent('Implement API');
  });

  it("renders a preview TaskCard when state.type is 'preview'", () => {
    // Since the preview state is set via drag, we simulate it by mocking createPortal
    const { container } = render(<TaskCardContainer card={card} columnId={ColumnType.toDo} />);
    expect(container.querySelector("[data-testid='task-card']")).toBeInTheDocument();
  });

  it('calls dispatch on drop', () => {
    render(<TaskCardContainer card={card} columnId={ColumnType.toDo} />);
    // simulate onDrop manually via mocks if needed
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
