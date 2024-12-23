import { ApiRequestConfig, ApiResponse, MemeType, TaskType, UserDataType } from '@/types';

const globalFetch = async <TReq, TRes>(config: ApiRequestConfig<TReq>): Promise<ApiResponse<TRes>> => {
  const { method, url, body, headers, searchParams, nextConfig, cacheConfig } = config;

  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }

  const requestUrl = new URL(url, process.env.NEXT_PUBLIC_API_BASE_URL);

  if (searchParams) {
    Object.keys(searchParams).forEach((key) => requestUrl.searchParams.append(key, String(searchParams[key])));
  }

  const response = await fetch(requestUrl.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body && method !== 'GET' ? JSON.stringify(body) : undefined,
    cache: cacheConfig,
    next: nextConfig,
    credentials: 'include', // Include cookies in requests
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong!');
  }

  const responseData = await response.json();
  return {
    success: responseData.success,
    statusCode: responseData.statusCode,
    message: responseData.message,
    data: responseData.data,
    error: responseData.error,
  };
};

export default globalFetch;

export const fetchUserData = (onSuccess?: (data: number) => void) => {
  return async () => {
    const response = await globalFetch<null, UserDataType>({
      method: 'GET',
      url: '/user',
      cacheConfig: 'no-store',
    });
    if (response.success && onSuccess) {
      onSuccess(response?.data?.user?.points);
    }
    return response.data;
  };
};

export const syncTaps = () => {
  return async (taps: number) => {
    const response = await globalFetch({
      method: 'POST',
      url: '/user/tap',
      body: { taps },
    });
    return response.data;
  };
};

export const fetchTasks = (onSuccess?: (data: any) => void) => {
  return async () => {
    const response = await globalFetch<null, { tasks: Array<TaskType> }>({
      method: 'GET',
      url: '/tasks',
      cacheConfig: 'no-store',
    });
    if (response.success && onSuccess) {
      onSuccess(response?.data);
    }
    return response.data.tasks;
  };
};

export const fetchMemes = (onSuccess?: (data: any) => void) => {
  return async () => {
    const response = await globalFetch<null, { tokens: Array<MemeType> }>({
      method: 'GET',
      url: '/tokens',
      cacheConfig: 'no-store',
    });
    if (response.success && onSuccess) {
      onSuccess(response?.data);
    }
    return response.data.tokens;
  };
};
