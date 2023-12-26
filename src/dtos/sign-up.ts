export interface DateDTO {
  year: number;
  month: number;
  day: number;
}

export interface SignUpData {
  login: string;
  password: string;
  name: string;
  birthDate: DateDTO;
}