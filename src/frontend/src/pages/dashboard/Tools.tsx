import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Tools() {
  const [riskCalc, setRiskCalc] = useState({ 
    accountBalance: '', 
    riskPercent: '1', 
    stopLossPips: '', 
    currencyPair: 'EURUSD',
    result: '' 
  });
  const [marginCalc, setMarginCalc] = useState({ leverage: '100', positionSize: '', result: '' });
  const [plCalc, setPlCalc] = useState({ entryPrice: '', exitPrice: '', lotSize: '', result: '' });
  const [lotCalc, setLotCalc] = useState({ accountBalance: '', riskPercent: '', stopLoss: '', result: '' });
  const [swapCalc, setSwapCalc] = useState({ positionSize: '', swapRate: '', days: '1', result: '' });

  const calculateRisk = () => {
    const balance = parseFloat(riskCalc.accountBalance);
    const risk = parseFloat(riskCalc.riskPercent);
    const stopLossPips = parseFloat(riskCalc.stopLossPips);
    
    if (balance && risk && stopLossPips) {
      const riskAmount = (balance * risk) / 100;
      
      // Determine pip value based on currency pair
      let pipValue = 10; // Default for standard lot (100,000 units) for most pairs
      if (riskCalc.currencyPair.includes('JPY')) {
        pipValue = 1000; // JPY pairs have different pip value
      }
      
      // Position Size = Risk Amount / (Stop Loss in Pips × Pip Value per Lot)
      const positionSizeLots = riskAmount / (stopLossPips * pipValue);
      
      setRiskCalc(prev => ({ 
        ...prev, 
        result: `Position Size: ${positionSizeLots.toFixed(2)} lots | Risk Amount: $${riskAmount.toFixed(2)}` 
      }));
    }
  };

  const calculateMargin = () => {
    const leverage = parseFloat(marginCalc.leverage);
    const position = parseFloat(marginCalc.positionSize);
    if (leverage && position) {
      const margin = position / leverage;
      setMarginCalc(prev => ({ ...prev, result: `Required Margin: $${margin.toFixed(2)}` }));
    }
  };

  const calculatePL = () => {
    const entry = parseFloat(plCalc.entryPrice);
    const exit = parseFloat(plCalc.exitPrice);
    const lot = parseFloat(plCalc.lotSize);
    if (entry && exit && lot) {
      const pl = (exit - entry) * lot * 100000;
      setPlCalc(prev => ({ ...prev, result: `P/L: ${pl >= 0 ? '+' : ''}$${pl.toFixed(2)}` }));
    }
  };

  const calculateLotSize = () => {
    const balance = parseFloat(lotCalc.accountBalance);
    const risk = parseFloat(lotCalc.riskPercent);
    const stop = parseFloat(lotCalc.stopLoss);
    if (balance && risk && stop) {
      const riskAmount = (balance * risk) / 100;
      const lotSize = riskAmount / (stop * 10);
      setLotCalc(prev => ({ ...prev, result: `Recommended Lot Size: ${lotSize.toFixed(2)}` }));
    }
  };

  const calculateSwap = () => {
    const position = parseFloat(swapCalc.positionSize);
    const rate = parseFloat(swapCalc.swapRate);
    const days = parseFloat(swapCalc.days);
    if (position && rate && days) {
      const swap = position * rate * days;
      setSwapCalc(prev => ({ ...prev, result: `Swap Charge: $${swap.toFixed(2)}` }));
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trading Tools</h1>
        <p className="text-gray-600 dark:text-gray-400">Professional trading calculators</p>
      </div>

      <Tabs defaultValue="risk" className="w-full">
        <TabsList className="grid w-full max-w-3xl grid-cols-5 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="risk" className="data-[state=active]:bg-primary data-[state=active]:text-white">Risk</TabsTrigger>
          <TabsTrigger value="margin" className="data-[state=active]:bg-secondary data-[state=active]:text-white">Margin</TabsTrigger>
          <TabsTrigger value="pl" className="data-[state=active]:bg-accent data-[state=active]:text-white">P/L</TabsTrigger>
          <TabsTrigger value="lot" className="data-[state=active]:bg-primary data-[state=active]:text-white">Lot Size</TabsTrigger>
          <TabsTrigger value="swap" className="data-[state=active]:bg-secondary data-[state=active]:text-white">Swap</TabsTrigger>
        </TabsList>

        <TabsContent value="risk">
          <Card className="bg-white dark:bg-gray-900 border-border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Risk Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Balance ($)</Label>
                  <Input 
                    type="number" 
                    value={riskCalc.accountBalance} 
                    onChange={(e) => setRiskCalc(prev => ({ ...prev, accountBalance: e.target.value }))} 
                    placeholder="10000" 
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Risk %</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={riskCalc.riskPercent} 
                    onChange={(e) => setRiskCalc(prev => ({ ...prev, riskPercent: e.target.value }))} 
                    placeholder="1" 
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Stop Loss (Pips)</Label>
                  <Input 
                    type="number" 
                    value={riskCalc.stopLossPips} 
                    onChange={(e) => setRiskCalc(prev => ({ ...prev, stopLossPips: e.target.value }))} 
                    placeholder="50" 
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Currency Pair</Label>
                  <Select value={riskCalc.currencyPair} onValueChange={(value) => setRiskCalc(prev => ({ ...prev, currencyPair: value }))}>
                    <SelectTrigger className="focus:ring-2 focus:ring-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EURUSD">EUR/USD</SelectItem>
                      <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                      <SelectItem value="USDJPY">USD/JPY</SelectItem>
                      <SelectItem value="AUDUSD">AUD/USD</SelectItem>
                      <SelectItem value="USDCAD">USD/CAD</SelectItem>
                      <SelectItem value="USDCHF">USD/CHF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={calculateRisk} className="w-full bg-primary hover:bg-primary/90">Calculate</Button>
              {riskCalc.result && (
                <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold text-gray-900 dark:text-white">
                  {riskCalc.result}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="margin">
          <Card className="bg-white dark:bg-gray-900 border-border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Margin Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Leverage</Label>
                  <Input 
                    type="number" 
                    value={marginCalc.leverage} 
                    onChange={(e) => setMarginCalc(prev => ({ ...prev, leverage: e.target.value }))} 
                    placeholder="100" 
                    className="focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position Size ($)</Label>
                  <Input 
                    type="number" 
                    value={marginCalc.positionSize} 
                    onChange={(e) => setMarginCalc(prev => ({ ...prev, positionSize: e.target.value }))} 
                    placeholder="10000" 
                    className="focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>
              <Button onClick={calculateMargin} className="w-full bg-secondary hover:bg-secondary/90">Calculate</Button>
              {marginCalc.result && (
                <div className="p-4 bg-secondary/10 rounded-lg text-center font-semibold text-gray-900 dark:text-white">
                  {marginCalc.result}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pl">
          <Card className="bg-white dark:bg-gray-900 border-border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Profit/Loss Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Entry Price</Label>
                  <Input 
                    type="number" 
                    step="0.00001"
                    value={plCalc.entryPrice} 
                    onChange={(e) => setPlCalc(prev => ({ ...prev, entryPrice: e.target.value }))} 
                    placeholder="1.1000" 
                    className="focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exit Price</Label>
                  <Input 
                    type="number" 
                    step="0.00001"
                    value={plCalc.exitPrice} 
                    onChange={(e) => setPlCalc(prev => ({ ...prev, exitPrice: e.target.value }))} 
                    placeholder="1.1050" 
                    className="focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lot Size</Label>
                  <Input 
                    type="number" 
                    step="0.01"
                    value={plCalc.lotSize} 
                    onChange={(e) => setPlCalc(prev => ({ ...prev, lotSize: e.target.value }))} 
                    placeholder="0.1" 
                    className="focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <Button onClick={calculatePL} className="w-full bg-accent hover:bg-accent/90">Calculate</Button>
              {plCalc.result && (
                <div className="p-4 bg-accent/10 rounded-lg text-center font-semibold text-gray-900 dark:text-white">
                  {plCalc.result}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lot">
          <Card className="bg-white dark:bg-gray-900 border-border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Lot Size Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Account Balance ($)</Label>
                  <Input 
                    type="number" 
                    value={lotCalc.accountBalance} 
                    onChange={(e) => setLotCalc(prev => ({ ...prev, accountBalance: e.target.value }))} 
                    placeholder="10000" 
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Risk %</Label>
                  <Input 
                    type="number" 
                    step="0.1"
                    value={lotCalc.riskPercent} 
                    onChange={(e) => setLotCalc(prev => ({ ...prev, riskPercent: e.target.value }))} 
                    placeholder="2" 
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Stop Loss (pips)</Label>
                  <Input 
                    type="number" 
                    value={lotCalc.stopLoss} 
                    onChange={(e) => setLotCalc(prev => ({ ...prev, stopLoss: e.target.value }))} 
                    placeholder="50" 
                    className="focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <Button onClick={calculateLotSize} className="w-full bg-primary hover:bg-primary/90">Calculate</Button>
              {lotCalc.result && (
                <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold text-gray-900 dark:text-white">
                  {lotCalc.result}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swap">
          <Card className="bg-white dark:bg-gray-900 border-border">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Swap Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Position Size ($)</Label>
                  <Input 
                    type="number" 
                    value={swapCalc.positionSize} 
                    onChange={(e) => setSwapCalc(prev => ({ ...prev, positionSize: e.target.value }))} 
                    placeholder="10000" 
                    className="focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Swap Rate</Label>
                  <Input 
                    type="number" 
                    step="0.0001"
                    value={swapCalc.swapRate} 
                    onChange={(e) => setSwapCalc(prev => ({ ...prev, swapRate: e.target.value }))} 
                    placeholder="0.0005" 
                    className="focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Days</Label>
                  <Input 
                    type="number" 
                    value={swapCalc.days} 
                    onChange={(e) => setSwapCalc(prev => ({ ...prev, days: e.target.value }))} 
                    placeholder="1" 
                    className="focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>
              <Button onClick={calculateSwap} className="w-full bg-secondary hover:bg-secondary/90">Calculate</Button>
              {swapCalc.result && (
                <div className="p-4 bg-secondary/10 rounded-lg text-center font-semibold text-gray-900 dark:text-white">
                  {swapCalc.result}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
