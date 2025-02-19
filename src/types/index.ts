export interface NormalizedSummaryData {
  title: string;
  value: string;
  change: string;
  icon: string;
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

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface SummaryData {
  current: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
  previous: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
}

export interface WebsiteVisits {
  [key: string]: {
    desktop: number;
    mobile: number;
  };
}

export interface OffersSent {
  [key: string]: number;
}

export interface ChartData {
  website_visits: WebsiteVisits;
  offers_sent: OffersSent;
}

export interface NormalizedChartData {
  barChartCategory: string[];
  barChartSeries: ChartSeries[];
  lineChartCategory: string[];
  lineChartSeries: ChartSeries[];
}
