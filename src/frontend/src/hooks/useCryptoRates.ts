import { useQuery } from '@tanstack/react-query';

interface CryptoRatesResponse {
  [key: string]: {
    [key: string]: number;
  };
}

export function useCryptoRates() {
  return useQuery<CryptoRatesResponse>({
    queryKey: ['exchangeRates', 'crypto'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,usd-coin&vs_currencies=usd,eur,gbp'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch crypto rates');
      }
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}
