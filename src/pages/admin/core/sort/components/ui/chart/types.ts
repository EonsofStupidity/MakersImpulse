import { ReactNode } from "react"

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  )
}

export type ChartContextProps = {
  config: ChartConfig
}

export type ChartStyleProps = {
  id: string
  config: ChartConfig
}

export type ChartTooltipContentProps = {
  active?: boolean
  payload?: any[]
  className?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: any
  labelFormatter?: (label: any, payload: any[]) => ReactNode
  labelClassName?: string
  formatter?: (value: any, name: string, props: any, index: number, payload: any) => ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}