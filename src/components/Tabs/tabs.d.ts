export interface TabType<T> {
  name: string
  value: T
  [key in string]: any
}
