// app/hooks/useTelegramAuth.ts
'use client';

import globalFetch from '@/lib/api';
import { ApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface TelegramAuthRequest {
  telegramId: number;
  telegramToken: string;
}

export interface TelegramAuthResponse {
  accessToken: string;
  user: {
    referrerId: string | null;
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
  token: string;
}

export function useTelegramAuth() {
  const { push } = useRouter();
  // Mutation for backend authentication
  const authMutation = useMutation<ApiResponse<TelegramAuthResponse>, Error, TelegramAuthRequest>({
    mutationFn: async ({ telegramId, telegramToken }) => {
      return globalFetch<TelegramAuthRequest, TelegramAuthResponse>({
        method: 'POST',
        url: '/auth',
        body: {
          telegramId,
          telegramToken,
        },
      });
    },
    onSuccess: (data) => {
      // Handle successful authentication
      if (data.data?.token) {
        console.log('loggedin');
       if (typeof window !== 'undefined' && window.localStorage) {
         localStorage.setItem('user_token', data.data.accessToken);
       }
        push('/home');
      }
    },
  });

  return {
    mutate: authMutation.mutate,
    isLoading: authMutation.isPending,
    error: authMutation.error,
  };
}
