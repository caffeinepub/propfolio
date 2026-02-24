import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { saveCustomPropFirm } from '@/utils/customPropFirmsStorage';

export function useAddCustomPropFirm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propFirm: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addCustomPropFirm(propFirm);
      return propFirm;
    },
    onSuccess: (propFirm) => {
      // Save to localStorage for faster access
      saveCustomPropFirm(propFirm);
      // Invalidate user profile to refresh custom firms
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
