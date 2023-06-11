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
