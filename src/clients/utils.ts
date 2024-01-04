export function queryString(options: object): string {
  const queryParams = new URLSearchParams();

  for (let k in options) {
    queryParams.set(k, String(options[k as keyof object]));
  }

  const size = Array.from(queryParams.keys()).length;

  return size === 0 ? '' : `?${queryParams.toString()}`;
}