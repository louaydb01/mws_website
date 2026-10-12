import type { CSSProperties } from 'react';

/** Inline CSS custom properties, e.g. style={vars({ '--d': 1 })}. */
export const vars = (values: Record<`--${string}`, string | number>) => values as CSSProperties;
