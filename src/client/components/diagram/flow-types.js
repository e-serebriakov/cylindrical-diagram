/* @flow */

type StatisticsType = {
  id: string,
  value: number,
  opacity: number,
  topSign: string,
  bottomSign: string,
};

type DataType = {
  loading: boolean,
  statistics: StatisticsType[],
  error: Object,
};

export type DiagramPropsType = {
  title: string,
  data: DataType
};
