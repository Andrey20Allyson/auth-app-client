function env(name: string): string {
  const value = import.meta.env[name];

  if (value === undefined || value === null) {
    throw new Error(`Can't find env variable with name ${name!}`);
  }

  return String(value);
}

env.asBoolean = function(name: string): boolean {
  const strValue = this(name);

  switch (strValue) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      throw new Error(`Can't parse '${strValue}' to a boolean value!`);
  }
}

env.asNumber = function(name: string): number {
  const value = Number(this(name));

  if (isNaN(value)) {
    throw new Error(`Can't parse '${value}' to a numeric value!'`);
  }

  return value;
}

export const AUTH_API_HOSTNAME = env('VITE_AUTH_HOST_NAME');