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
    onSuccess: async (data) => {
      // Handle successful authentication
      if (data.data?.accessToken) {
        // Set auth token
        const tokenResponse = await fetch('/api/auth/set-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: data.data.accessToken }),
        });

        if (tokenResponse.status === 200) {
          push('/home');
        } else {
          throw new Error('Failed to set authentication token');
        }
      }
    },
  });

  return {
    mutate: authMutation.mutate,
    isLoading: authMutation.isPending,
    error: authMutation.error,
  };
}
