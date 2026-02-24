import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PayoutInput } from '../backend';

export function useAddPayout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PayoutInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addPayout(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts'] });
    },
  });
}
