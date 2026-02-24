import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AccountInput } from '../backend';

export function useAddAccount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AccountInput) => {
      if (!actor) throw new Error('Actor not available');
      
      // Validate input before sending to backend
      if (!input.name || !input.accountType || !input.balance || !input.currency) {
        throw new Error('All fields are required');
      }

      if (input.balance <= 0) {
        throw new Error('Balance must be greater than 0');
      }

      try {
        const result = await actor.addAccount(input);
        return result;
      } catch (error: any) {
        console.error('Backend error adding account:', error);
        // Extract meaningful error message from backend trap
        const errorMessage = error?.message || 'Failed to add account';
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      // Invalidate accounts query to trigger immediate refetch
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
    },
  });
}
