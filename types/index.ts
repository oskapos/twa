export interface ApiRequestConfig<T> {
  method: 'GET' | 'POST' | 'PATCH';
  url: string;
  body?: T;
  headers?: Record<string, string>;
  searchParams?: Record<string, string | number>;
  nextConfig?: NextFetchRequestConfig | undefined;
  cacheConfig?: RequestCache | undefined;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message: string;
  error?: string;
}

export interface MemeType {
  _id: string;
  title: string;
  description: string;
  image: string;
  supply: string;
  growth: string;
  marketCap: string;
  communityEngagement: string;
}

export interface UserDataType {
  user: {
    referrerId: number | null;
    telegramId: number;
    telegramToken: string;
    name: string | null;
    walletAddress: string | null;
    points: number;
    pointsPerTap: number;
    tasks: Array<any>;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

export interface TaskType {
  _id: string;
  title: string;
  description: string;
  image: string;
}
