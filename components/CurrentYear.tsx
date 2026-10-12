'use client';

import { useEffect, useState } from 'react';

// The page is pre-rendered at build time; refresh the copyright year in the browser.
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
