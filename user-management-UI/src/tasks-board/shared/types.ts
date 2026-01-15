import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

export type TCard = {
  id: string;
  title: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export enum ColumnType {
  toDo = 'toDo',
  inProgress = 'inProgress',
  done = 'done',
}
export type TColumn = {
  id: ColumnType;
  title: string;
  cards: TCard[];
};

export type TBoard = {
  columns: TColumn[];
};

export const cardKey = Symbol('card');
export type TCardData = {
  [cardKey]: true;
  card: TCard;
  columnId: string;
  rect: DOMRect;
};

export const cardDropTargetKey = Symbol('card-drop-target');
export type TCardDropTargetData = {
  [cardDropTargetKey]: true;
  card: TCard;
  columnId: string;
};

export const columnKey = Symbol('column');
export type TColumnData = {
  [columnKey]: true;
  column: TColumn;
};

export type TCardState =
  | {
      type: 'idle';
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-and-left-self';
    }
  | {
      type: 'is-over';
      dragging: DOMRect;
      closestEdge: Edge;
    }
  | {
      type: 'preview';
      container: HTMLElement;
      dragging: DOMRect;
    };
