import { render, screen } from '@testing-library/react';
import { TasksBoard } from './TasksBoard';
import { SettingsContext } from './shared/settings-context';
import { ColumnType, TCard, TColumn } from './shared/types';

// Mock all external dependencies
jest.mock('@atlaskit/pragmatic-drag-and-drop-auto-scroll/element', () => ({
  autoScrollForElements: jest.fn(() => () => {}),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element', () => ({
  unsafeOverflowAutoScrollForElements: jest.fn(() => () => {}),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge', () => ({
  extractClosestEdge: jest.fn(),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge', () => ({
  reorderWithEdge: jest.fn(),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop/combine', () => ({
  combine: jest.fn(() => jest.fn()),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
  monitorForElements: jest.fn(() => jest.fn()),
}));
jest.mock('@atlaskit/pragmatic-drag-and-drop/reorder', () => ({
  reorder: jest.fn(),
}));
jest.mock('bind-event-listener', () => ({
  bindAll: jest.fn(() => jest.fn()),
}));
jest.mock('tiny-invariant', () => jest.fn());

// Mock TaskColumn
jest.mock('./task-column/TaskColumn', () => ({
  TaskColumn: ({ column }: any) => <div data-testid="task-column">{column.id}</div>,
}));

describe('TasksBoard', () => {
  const tasks: TCard[] = [
    {
      id: '3846bd70-a0c3-4079-879d-eea95554834c',
      title: 'Implement API4443333',
      description: 'Implement Web API with .Net 9444',
      status: 2,
      createdAt: '2025-09-11T00:00:00+00:00',
      updatedAt: '2025-09-13T09:17:41.2341983+00:00',
    },
    {
      id: '3db4947a-6b4c-4f22-935f-7a9845713ac0',
      title: 'Implement UI222222222',
      description: 'Implement UI with React 19222',
      status: 0,
      createdAt: '2025-09-11T00:00:00+00:00',
      updatedAt: '2025-09-13T09:51:17.4592266+00:00',
    },
    {
      id: '577c0846-9679-49ca-bffc-75d76c1a40d5',
      title: 'Cleanup3',
      description: 'Clean up code3333',
      status: 2,
      createdAt: '0001-01-01T00:00:00+00:00',
      updatedAt: '2025-09-13T06:05:15.3042108+00:00',
    },
    {
      id: '2f99a924-1af2-462d-8879-2614912b3d79',
      title: 't2',
      description: 'd2',
      status: 1,
      createdAt: '2025-09-12T13:32:52.4722312+00:00',
      updatedAt: '2025-09-12T13:32:52.4722363+00:00',
    },
    {
      id: 'af930498-9482-4a3a-bac0-5455146a71b6',
      title: 't6',
      description: 'd6',
      status: 1,
      createdAt: '2025-09-12T13:33:30.0345062+00:00',
      updatedAt: '2025-09-13T06:18:08.0402714+00:00',
    },
  ];
  const columns: TColumn[] = [
    { id: ColumnType.toDo, title: 'To Do', cards: tasks.filter((t) => t.status === 0) },
    { id: ColumnType.inProgress, title: 'In Progress', cards: tasks.filter((t) => t.status === 1) },
    { id: ColumnType.done, title: 'Done', cards: tasks.filter((t) => t.status === 2) },
  ];
  const initialBoard = {
    columns,
  };

  const settings: any = {
    isOverElementAutoScrollEnabled: true,
    isOverflowScrollingEnabled: true,
    boardScrollSpeed: 10,
    isBoardMoreObvious: true,
  };

  it('renders all columns', () => {
    render(
      <SettingsContext.Provider value={{ settings } as any}>
        <TasksBoard initial={initialBoard} />
      </SettingsContext.Provider>,
    );

    const columns = screen.getAllByTestId('task-column');
    expect(columns).toHaveLength(initialBoard.columns.length);
    expect(columns[0]).toHaveTextContent('toDo');
    expect(columns[1]).toHaveTextContent('inProgress');
    expect(columns[2]).toHaveTextContent('done');
  });

  it('applies conditional classes based on settings', () => {
    const { container } = render(
      <SettingsContext.Provider value={{ settings } as any}>
        <TasksBoard initial={initialBoard} />
      </SettingsContext.Provider>,
    );

    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass('px-32 py-20');

    const innerDiv = container.querySelector('div > div');
    expect(innerDiv).toHaveClass('flex h-full flex-col px-32 py-20');
  });
});
