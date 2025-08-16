export function classNames(...s: (string | boolean | undefined)[]): string { 
  return s.filter(Boolean).join(" "); 
}
