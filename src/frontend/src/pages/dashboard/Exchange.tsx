import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { useCryptoRates } from '@/hooks/useCryptoRates';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Exchange() {
  const [fxFrom, setFxFrom] = useState('USD');
  const [fxTo, setFxTo] = useState('EUR');
  const [fxAmount, setFxAmount] = useState('100');
  const [fxResult, setFxResult] = useState('');

  const [cryptoFrom, setCryptoFrom] = useState('BTC');
  const [cryptoTo, setCryptoTo] = useState('USD');
  const [cryptoAmount, setCryptoAmount] = useState('1');
  const [cryptoResult, setCryptoResult] = useState('');

  const { data: fxRates, isLoading: fxLoading, error: fxError } = useExchangeRates();
  const { data: cryptoRates, isLoading: cryptoLoading, error: cryptoError } = useCryptoRates();

  useEffect(() => {
    const amount = parseFloat(fxAmount);
    if (amount && fxRates?.rates) {
      let rate = 1;
      if (fxFrom === 'USD') {
        rate = fxRates.rates[fxTo] || 1;
      } else if (fxTo === 'USD') {
        rate = 1 / (fxRates.rates[fxFrom] || 1);
      } else {
        const toUSD = 1 / (fxRates.rates[fxFrom] || 1);
        const fromUSD = fxRates.rates[fxTo] || 1;
        rate = toUSD * fromUSD;
      }
      const result = amount * rate;
      setFxResult(`${result.toFixed(2)} ${fxTo}`);
    }
  }, [fxFrom, fxTo, fxAmount, fxRates]);

  useEffect(() => {
    const amount = parseFloat(cryptoAmount);
    if (amount && cryptoRates) {
      const rate = cryptoRates[cryptoFrom.toLowerCase()]?.[cryptoTo.toLowerCase()] || 0;
      const result = amount * rate;
      setCryptoResult(`${result.toFixed(2)} ${cryptoTo}`);
    }
  }, [cryptoFrom, cryptoTo, cryptoAmount, cryptoRates]);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exchange</h1>
        <p className="text-gray-600 dark:text-gray-400">Live FX and crypto converters</p>
      </div>

      <Tabs defaultValue="fx" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="fx" className="data-[state=active]:bg-primary data-[state=active]:text-white">FX Converter</TabsTrigger>
          <TabsTrigger value="crypto" className="data-[state=active]:bg-secondary data-[state=active]:text-white">Crypto Converter</TabsTrigger>
        </TabsList>

        <TabsContent value="fx">
          <Card className="max-w-2xl bg-white dark:bg-gray-900 border-border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">FX Currency Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {fxLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="md" />
                </div>
              ) : fxError ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
                  Failed to load exchange rates. Please try again later.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>From Currency</Label>
                      <Select value={fxFrom} onValueChange={setFxFrom}>
                        <SelectTrigger className="focus:ring-2 focus:ring-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>To Currency</Label>
                      <Select value={fxTo} onValueChange={setFxTo}>
                        <SelectTrigger className="focus:ring-2 focus:ring-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      value={fxAmount}
                      onChange={(e) => setFxAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRightLeft className="h-6 w-6 text-primary" />
                  </div>
                  {fxResult && (
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Amount</div>
                      <div className="text-3xl font-bold text-primary">{fxResult}</div>
                      {fxRates?.date && (
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          Last updated: {new Date(fxRates.date).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto">
          <Card className="max-w-2xl bg-white dark:bg-gray-900 border-border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Crypto to Fiat Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {cryptoLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="md" />
                </div>
              ) : cryptoError ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
                  Failed to load crypto rates. Please try again later.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>From Crypto</Label>
                      <Select value={cryptoFrom} onValueChange={setCryptoFrom}>
                        <SelectTrigger className="focus:ring-2 focus:ring-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                          <SelectItem value="ETH">ETH - Ethereum</SelectItem>
                          <SelectItem value="USDT">USDT - Tether</SelectItem>
                          <SelectItem value="USDC">USDC - USD Coin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>To Fiat</Label>
                      <Select value={cryptoTo} onValueChange={setCryptoTo}>
                        <SelectTrigger className="focus:ring-2 focus:ring-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      value={cryptoAmount}
                      onChange={(e) => setCryptoAmount(e.target.value)}
                      placeholder="Enter amount"
                      step="0.00000001"
                      className="focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRightLeft className="h-6 w-6 text-secondary" />
                  </div>
                  {cryptoResult && (
                    <div className="p-6 bg-secondary/10 rounded-lg text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Amount</div>
                      <div className="text-3xl font-bold text-secondary">{cryptoResult}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Live rates updated every minute
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
