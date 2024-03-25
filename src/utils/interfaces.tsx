export interface GameDataState {
  clicks: {
    left: {
      counter: number;
      list: number[];
    };
    right: {
      counter: number;
      list: number[];
    };
    startIndex: number | undefined;
    endIndex: number | undefined;
  };
  initData: number[];
}

export enum FinishedGameStatusType {
  'LOSE' = 'lose',
  'WIN' = 'win',
}

export enum ClickType {
  'LEFT' = 'left',
  'RIGHTADD' = 'rightAdd',
  'RIGHTDEL' = 'rightDel',
}

export enum MainFormFieldType {
  'NAME' = 'name',
  'BOMBNUMBER' = 'bombNumber',
  'DIFFICULTY' = 'difficulty',
}

export enum CellType {
  'opened-bombed-all' = 'opened-bombed-all',
  'opened-bombed-chosen' = 'opened-bombed-chosen',
  'opened-bombed-questioned' = 'opened-bombed-questioned',
  'opened-free' = 'opened-free',
  'questioned' = 'questioned',
  'false' = 'false',
}

export enum CellBombStatusType {
  'OPENED' = 'opened',
  'EMPTY' = 'empty',
  'BOMBED' = 'bombed',
  'QUESTIONED' = 'questioned',
  'DEFAULT' = 'default',
}

export enum DifficultyType {
  'HARD' = 'hard',
  'MEDIUM' = 'medium',
  'EASY' = 'easy',
}
