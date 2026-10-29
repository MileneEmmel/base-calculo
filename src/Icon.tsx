const paths = {
  home: "m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9",
  book: "M12 5v16M12 5C8 2 4 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-2-1-6-2-10 1Z",
  laboratory: "M9 3h6M10 3v6L4 19a1.3 1.3 0 0 0 1 2h14a1.3 1.3 0 0 0 1-2L14 9V3M7 14h10",
  concepts: "M9 5H5v5m4 9H5v-5m10-9h4v5m-4 9h4v-5M9 3h6v4H9ZM9 17h6v4H9ZM2 10h6v4H2Zm14 0h6v4h-6Z",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-11v6m0-10h.01",
  graph: "M4 3v17h17M6 16l5-6 4 3 5-8",
  trigonometry: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM2 12h20M12 2v20m0-10 6-6",
  geometry: "m3 20 6-16 12 16H3Zm6-16 3 16M5 16h3v4",
  saved: "M6 3h12v18l-6-4-6 4V3Z",
  functions: "M4 3v17h17M6 7c3 0 3 10 7 10s4-11 7-11",
  properties: "M4 6h9m4 0h3M4 12h3m4 0h9M4 18h11m4 0h1M13 3v6M7 9v6m8 0v6",
  limits: "M3 12h6m-3-3 3 3-3 3m15-3h-6m3-3-3 3 3 3M12 3v4m0 3v4m0 3v4",
  derivatives: "M4 3v17h17M5 17C9 17 12 7 20 6M7 20 18 3",
  integrals: "M4 3v17h17M6 15c4 0 6-9 14-9M8 20v-6m4 6V10m4 10V7m4 13V6",
  inspect: "M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1 1-3Zm3 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="ui-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
