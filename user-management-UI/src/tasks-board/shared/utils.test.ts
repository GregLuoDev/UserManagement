import {
  convertColumnIdToNumber,
  convertUTCToLocal,
  getCardData,
  getCardDropTargetData,
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from './utils';
import { cardDropTargetKey, cardKey, columnKey, ColumnType, TColumn } from './types';

describe('Card / Column Utilities', () => {
  const mockCard = {
    id: '1',
    title: 'Test',
    description: 'Desc',
    status: 0,
    createdAt: '2025-09-13',
    updatedAt: '2025-09-13',
  } as const;
  const mockRect = { width: 100, height: 50 } as DOMRect;

  describe('getCardData', () => {
    it('creates a valid TCardData object', () => {
      const data = getCardData({ card: mockCard, rect: mockRect, columnId: 'col-1' });
      expect(data[cardKey]).toBe(true);
      expect(data.card).toEqual(mockCard);
      expect(data.rect).toEqual(mockRect);
      expect(data.columnId).toBe('col-1');
    });
  });

  describe('isCardData', () => {
    it('returns true for card data', () => {
      const data = getCardData({ card: mockCard, rect: mockRect, columnId: 'col-1' });
      expect(isCardData(data)).toBe(true);
    });

    it('returns false for non-card data', () => {
      expect(isCardData({})).toBe(false);
    });
  });

  describe('isDraggingACard', () => {
    it('returns true if source.data is card data', () => {
      const data = getCardData({ card: mockCard, rect: mockRect, columnId: 'col-1' });
      expect(isDraggingACard({ source: { data } })).toBe(true);
    });

    it('returns false if source.data is not card data', () => {
      expect(isDraggingACard({ source: { data: {} } })).toBe(false);
    });
  });

  describe('getCardDropTargetData', () => {
    it('creates a valid TCardDropTargetData object', () => {
      const data = getCardDropTargetData({ card: mockCard, columnId: 'col-1' });
      expect(data[cardDropTargetKey]).toBe(true);
      expect(data.card).toEqual(mockCard);
      expect(data.columnId).toBe('col-1');
    });
  });

  describe('isCardDropTargetData', () => {
    it('returns true for card drop target data', () => {
      const data = getCardDropTargetData({ card: mockCard, columnId: 'col-1' });
      expect(isCardDropTargetData(data)).toBe(true);
    });

    it('returns false for non-card drop target data', () => {
      expect(isCardDropTargetData({})).toBe(false);
    });
  });

  describe('getColumnData', () => {
    const column = { id: ColumnType.done, title: 'Column 1', cards: [] } as TColumn;
    it('creates a valid TColumnData object', () => {
      const data = getColumnData({ column });
      expect(data[columnKey]).toBe(true);
      expect(data.column).toEqual(column);
    });
  });

  describe('isColumnData', () => {
    const column = { id: ColumnType.inProgress, title: 'Column 1', cards: [] } as TColumn;
    it('returns true for column data', () => {
      const data = getColumnData({ column });
      expect(isColumnData(data)).toBe(true);
    });

    it('returns false for non-column data', () => {
      expect(isColumnData({})).toBe(false);
    });
  });

  describe('isDraggingAColumn', () => {
    const column: TColumn = { id: ColumnType.inProgress, title: 'Column 1', cards: [] };
    it('returns true if source.data is column data', () => {
      const data = getColumnData({ column });
      expect(isDraggingAColumn({ source: { data } })).toBe(true);
    });

    it('returns false if source.data is not column data', () => {
      expect(isDraggingAColumn({ source: { data: {} } })).toBe(false);
    });
  });

  describe('convertUTCToLocal', () => {
    it('converts a UTC string to local AU datetime string', () => {
      const localStr = convertUTCToLocal('2025-09-13T12:00:00Z');
      expect(typeof localStr).toBe('string');
      expect(localStr).toMatch('13 Sept 2025, 10:00 pm'); // roughly matches date format
    });
  });

  describe('convertColumnIdToNumber', () => {
    it('maps ColumnType to correct number', () => {
      expect(convertColumnIdToNumber(ColumnType.toDo)).toBe(0);
      expect(convertColumnIdToNumber(ColumnType.inProgress)).toBe(1);
      expect(convertColumnIdToNumber(ColumnType.done)).toBe(2);
      expect(convertColumnIdToNumber('unknown' as ColumnType)).toBe(-1);
    });
  });
});
