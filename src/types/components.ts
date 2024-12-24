export interface CustomComponents {
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  [key: string]: React.ComponentType<any> | undefined;
}