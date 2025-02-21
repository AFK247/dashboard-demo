export interface NormalizedSummaryData {
  title: string;
  value: string;
  change: string;
  icon: string;
}

export interface TOfferList {
  id: number;
  user_name: string;
  phone: string;
  company: string;
  jobTitle: string;
  type: string;
  status: string;
  email: string;
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

export interface OfferData {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  type: string;
  price: number;
}

export interface TPaginationData {
  last_page: number;
  per_page: number;
  total: number;
  data: TOfferList[];
}

export interface TCachedTableData {
  [key: string]: TOfferList[]; // key will be "page_pageSize"
}
