export type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Breakpoints<T = DefaultBreakPoints> = Record<T, number>;

export const breakpoints: Breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

export type BreakpointKey = keyof typeof breakpoints;

export function mergeBreakpointsInOrder(breakpoints: Breakpoints, styles: any[]) {
  const keys = Object.keys(breakpoints).reverse();
  return styles.reduce((acc, item) => ({ ...acc, ...item }), {});
}

export function handleBreakpoints<Props>(
  props: Props,
  propValue: any,
  styleFromPropValue: (value: any, breakpoint?: BreakpointKey) => any
) {
  if (propValue === undefined) return undefined;

  if (propValue === null) return null;

  if (propValue.constructor !== Object) {
    return styleFromPropValue(propValue);
  }

  const result = {};

  Object.keys(propValue).forEach((breakpoint) => {
    const value = propValue[breakpoint];
    if (value !== undefined) {
      result[breakpoint] = styleFromPropValue(value, breakpoint as BreakpointKey);
    }
  });

  return result;
}

export default function breakpoints(styleFunction: any) {
  return (props: any) => {
    const result: Record<string, any> = {};
    const breakpointsKeys = Object.keys(props).filter((key) => breakpoints[key as BreakpointKey] !== undefined);

    breakpointsKeys.forEach((breakpoint) => {
      const breakpointValue = props[breakpoint];
      if (breakpointValue !== undefined && breakpointValue !== null) {
        result[`@media (min-width:${breakpoints[breakpoint as BreakpointKey]}px)`] = styleFunction({
          ...props,
          [breakpoint]: breakpointValue,
        });
      }
    });

    return result;
  };
}