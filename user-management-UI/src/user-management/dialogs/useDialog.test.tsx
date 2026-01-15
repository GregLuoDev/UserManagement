import { act, renderHook } from '@testing-library/react';
import { useDialog } from './useDialog';

describe('useDialog hook', () => {
  it('should initialize with open=false', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.open).toBe(false);
  });

  it('handleOpenDialog sets open to true', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.handleOpenDialog();
    });

    expect(result.current.open).toBe(true);
  });

  it('handleCloseDialog sets open to false', () => {
    const { result } = renderHook(() => useDialog());

    // first open the dialog
    act(() => {
      result.current.handleOpenDialog();
    });
    expect(result.current.open).toBe(true);

    // then close it
    act(() => {
      result.current.handleCloseDialog();
    });
    expect(result.current.open).toBe(false);
  });

  it('setOpen directly updates the state', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.setOpen(true);
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });
    expect(result.current.open).toBe(false);
  });
});
