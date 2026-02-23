import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';

export default function Exchange() {
  const [fxFrom, setFxFrom] = useState('USD');
  const [fxTo, setFxTo] = useState('EUR');
  const [fxAmount, setFxAmount] = useState('100');
  const [fxResult, setFxResult] = useState('');

  const [cryptoFrom, setCryptoFrom] = useState('BTC');
  const [cryptoTo, setCryptoTo] = useState('USD');
  const [cryptoAmount, setCryptoAmount] = useState('1');
  const [cryptoResult, setCryptoResult] = useState('');

  // Mock exchange rates
  const fxRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 149.50 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 162.50 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 189.20 },
  };

  const cryptoRates: Record<string, Record<string, number>> = {
    BTC: { USD: 52000, EUR: 47840, GBP: 41080 },
    ETH: { USD: 3100, EUR: 2852, GBP: 2449 },
    USDT: { USD: 1, EUR: 0.92, GBP: 0.79 },
    USDC: { USD: 1, EUR: 0.92, GBP: 0.79 },
  };

  useEffect(() => {
    const amount = parseFloat(fxAmount);
    if (amount && fxRates[fxFrom]?.[fxTo]) {
      const result = amount * fxRates[fxFrom][fxTo];
      setFxResult(`${result.toFixed(2)} ${fxTo}`);
    }
  }, [fxFrom, fxTo, fxAmount]);

  useEffect(() => {
    const amount = parseFloat(cryptoAmount);
    if (amount && cryptoRates[cryptoFrom]?.[cryptoTo]) {
      const result = amount * cryptoRates[cryptoFrom][cryptoTo];
      setCryptoResult(`${result.toFixed(2)} ${cryptoTo}`);
    }
  }, [cryptoFrom, cryptoTo, cryptoAmount]);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Exchange</h1>
        <p className="text-muted-foreground">Live FX and crypto converters</p>
      </div>

      <Tabs defaultValue="fx" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="fx">FX Converter</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Converter</TabsTrigger>
        </TabsList>

        <TabsContent value="fx">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>FX Currency Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Currency</Label>
                  <Select value={fxFrom} onValueChange={setFxFrom}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>To Currency</Label>
                  <Select value={fxTo} onValueChange={setFxTo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
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
                />
              </div>
              <div className="flex items-center justify-center">
                <ArrowRightLeft className="h-6 w-6 text-primary" />
              </div>
              {fxResult && (
                <div className="p-6 bg-primary/10 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-2">Converted Amount</div>
                  <div className="text-3xl font-bold text-primary">{fxResult}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Rate: 1 {fxFrom} = {fxRates[fxFrom]?.[fxTo]?.toFixed(4)} {fxTo}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Crypto to Fiat Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Crypto</Label>
                  <Select value={cryptoFrom} onValueChange={setCryptoFrom}>
                    <SelectTrigger>
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
                    <SelectTrigger>
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
                />
              </div>
              <div className="flex items-center justify-center">
                <ArrowRightLeft className="h-6 w-6 text-primary" />
              </div>
              {cryptoResult && (
                <div className="p-6 bg-primary/10 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-2">Converted Amount</div>
                  <div className="text-3xl font-bold text-primary">{cryptoResult}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Rate: 1 {cryptoFrom} = {cryptoRates[cryptoFrom]?.[cryptoTo]?.toLocaleString()} {cryptoTo}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
