import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile } from './useGetCallerUserProfile';

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      // This would call the backend method when implemented
      // For now, just update the cache
      return profile;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUserProfile'], data);
    },
  });
}
