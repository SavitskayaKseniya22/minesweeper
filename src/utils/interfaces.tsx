export interface PressedIndexesType {
  left: {
    counter: number;
    clicks: number[];
    totalClicks: number[];
  };
  right: {
    counter: number;
    clicks: number[];
    totalClicks: number[];
  };
  startIndex: number | undefined;
  endIndex: number | undefined;
}
