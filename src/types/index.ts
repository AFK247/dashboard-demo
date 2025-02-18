export interface Stat {
  title: string;
  value: string;
  change: string;
}

export interface Row {
  id: number;
  name: string;
  phone: string;
  company: string;
  job: string;
  type: string;
  status: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface StatParam {
  filter: string;
}

export interface Param {
  filter?: string;
  page?: number;
  per_page?: number;
}
