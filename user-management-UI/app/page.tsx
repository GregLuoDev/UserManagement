'use client';

import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { fetchTasks } from '@/src/lib/thunks/taskAsyncThunks';
import { CreateTaskButton } from '@/src/tasks-board/buttons/CreateTaskButton';
import { ColumnType, TColumn } from '@/src/tasks-board/shared/types';
import { TasksBoard } from '@/src/tasks-board/TasksBoard';
import { Alert, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { tasks, isLoadingTasks, fetchingTasksError } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const columns: TColumn[] = [
    { id: ColumnType.toDo, title: 'To Do', cards: tasks.filter((t) => t.status === 0) },
    { id: ColumnType.inProgress, title: 'In Progress', cards: tasks.filter((t) => t.status === 1) },
    { id: ColumnType.done, title: 'Done', cards: tasks.filter((t) => t.status === 2) },
  ];

  return (
    <div className="container mx-auto mt-4">
      <Typography variant="h3" gutterBottom>
        Kanban Task Board
      </Typography>

      <CreateTaskButton />

      <div className="my-4">
        {isLoadingTasks && !fetchingTasksError && <CircularProgress />}

        {!isLoadingTasks && !!fetchingTasksError && (
          <Alert severity="error">Cannot fetch tasks. Please try again.</Alert>
        )}

        {!isLoadingTasks && !fetchingTasksError && (
          <TasksBoard initial={{ columns }} key={JSON.stringify(tasks)} />
        )}
      </div>
    </div>
  );
}
