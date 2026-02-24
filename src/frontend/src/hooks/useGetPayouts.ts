import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Payout } from '../backend';

export function useGetPayouts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Payout[]>({
    queryKey: ['payouts'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPayouts();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
