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
  errors: Object,
};

export type DiagramPropsType = {
  title: string,
  data: DataType
};
