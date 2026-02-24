import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Account } from '../backend';

export function useGetAccounts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Account[]>({
    queryKey: ['accounts'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAccounts();
    },
    enabled: !!actor && !actorFetching,
  });
}
