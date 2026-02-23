import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  mobile: string;
  discordUserId: string;
  facebook?: string;
  linkedin?: string;
  telegram?: string;
  whatsapp?: string;
  profilePicture?: string;
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // This would call the backend method when implemented
      // For now, return null to trigger profile setup
      return null;
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
