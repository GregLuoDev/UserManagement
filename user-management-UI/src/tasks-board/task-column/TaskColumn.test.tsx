import { render, screen } from '@testing-library/react';
import { SettingsContext } from '../shared/settings-context';
import { ColumnType, TColumn } from '../shared/types';
import { TaskColumn } from './TaskColumn';

// Mock external dependencies
jest.mock('@atlaskit/pragmatic-drag-and-drop-auto-scroll/element', () => ({
  autoScrollForElements: jest.fn(() => jest.fn()),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element', () => ({
  unsafeOverflowAutoScrollForElements: jest.fn(() => jest.fn()),
}));
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
jest.mock('tiny-invariant', () => jest.fn());
jest.mock('../shared/is-shallow-equal', () => ({
  isShallowEqual: jest.fn(() => true),
}));
jest.mock('../task-card/TaskCardContainer', () => ({
  TaskCardContainer: ({ card }: any) => <div data-testid="task-card">{card.title}</div>,
}));
jest.mock('../task-card/components/TaskCard', () => ({
  CardShadow: () => <div data-testid="card-shadow" />,
}));

describe('TaskColumn', () => {
  const column: TColumn = {
    id: ColumnType.toDo,
    title: 'To Do Column',
    cards: [
      {
        id: '3846bd70-a0c3-4079-879d-eea95554834c',
        title: 'Implement API',
        description: 'Implement Web API with .Net 9444',
        status: 2,
        createdAt: '2025-09-11T00:00:00+00:00',
        updatedAt: '2025-09-13T09:17:41.2341983+00:00',
      },
      {
        id: '3db4947a-6b4c-4f22-935f-7a9845713ac0',
        title: 'Implement UI',
        description: 'Implement UI with React 19222',
        status: 0,
        createdAt: '2025-09-11T00:00:00+00:00',
        updatedAt: '2025-09-13T09:51:17.4592266+00:00',
      },
    ],
  };

  const settings = {
    isOverElementAutoScrollEnabled: true,
    isOverflowScrollingEnabled: true,
    columnScrollSpeed: 10,
  };

  it('renders column title', () => {
    render(
      <SettingsContext.Provider value={{ settings } as any}>
        <TaskColumn column={column} />
      </SettingsContext.Provider>,
    );

    expect(screen.getByText('To Do Column')).toBeInTheDocument();
  });

  it('renders all cards in the column', () => {
    render(
      <SettingsContext.Provider value={{ settings } as any}>
        <TaskColumn column={column} />
      </SettingsContext.Provider>,
    );

    const cards = screen.getAllByTestId('task-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Implement API');
    expect(cards[1]).toHaveTextContent('Implement UI');
  });

  it('applies correct background and state styles', () => {
    const { container } = render(
      <SettingsContext.Provider value={{ settings } as any}>
        <TaskColumn column={column} />
      </SettingsContext.Provider>,
    );

    const innerDiv = container.querySelector('div > div');
    expect(innerDiv).toHaveClass('flex flex-1 flex-shrink-0 flex-col select-none');
  });
});
