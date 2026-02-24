import { useQuery } from '@tanstack/react-query';

interface ExchangeRatesResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}

export function useExchangeRates() {
  return useQuery<ExchangeRatesResponse>({
    queryKey: ['exchangeRates', 'fx'],
    queryFn: async () => {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}
