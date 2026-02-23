import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Tools() {
  const [riskCalc, setRiskCalc] = useState({ accountBalance: '', riskPercent: '3', entryPrice: '', stopLoss: '', result: '' });
  const [marginCalc, setMarginCalc] = useState({ leverage: '100', positionSize: '', result: '' });
  const [plCalc, setPlCalc] = useState({ entryPrice: '', exitPrice: '', lotSize: '', result: '' });
  const [lotCalc, setLotCalc] = useState({ accountBalance: '', riskPercent: '', stopLoss: '', result: '' });
  const [swapCalc, setSwapCalc] = useState({ positionSize: '', swapRate: '', days: '1', result: '' });

  const calculateRisk = () => {
    const balance = parseFloat(riskCalc.accountBalance);
    const risk = parseFloat(riskCalc.riskPercent);
    const entry = parseFloat(riskCalc.entryPrice);
    const stop = parseFloat(riskCalc.stopLoss);
    if (balance && risk && entry && stop) {
      const riskAmount = (balance * risk) / 100;
      const pipDiff = Math.abs(entry - stop);
      setRiskCalc(prev => ({ ...prev, result: `Risk Amount: $${riskAmount.toFixed(2)} | Pip Difference: ${pipDiff.toFixed(5)}` }));
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
        <h1 className="text-3xl font-bold">Trading Tools</h1>
        <p className="text-muted-foreground">Professional trading calculators</p>
      </div>

      <Tabs defaultValue="risk" className="w-full">
        <TabsList className="grid w-full max-w-3xl grid-cols-5">
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="margin">Margin</TabsTrigger>
          <TabsTrigger value="pl">P/L</TabsTrigger>
          <TabsTrigger value="lot">Lot Size</TabsTrigger>
          <TabsTrigger value="swap">Swap</TabsTrigger>
        </TabsList>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>3% Risk Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Balance</Label>
                  <Input type="number" value={riskCalc.accountBalance} onChange={(e) => setRiskCalc(prev => ({ ...prev, accountBalance: e.target.value }))} placeholder="10000" />
                </div>
                <div className="space-y-2">
                  <Label>Risk %</Label>
                  <Input type="number" value={riskCalc.riskPercent} onChange={(e) => setRiskCalc(prev => ({ ...prev, riskPercent: e.target.value }))} placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label>Entry Price</Label>
                  <Input type="number" value={riskCalc.entryPrice} onChange={(e) => setRiskCalc(prev => ({ ...prev, entryPrice: e.target.value }))} placeholder="1.1000" />
                </div>
                <div className="space-y-2">
                  <Label>Stop Loss</Label>
                  <Input type="number" value={riskCalc.stopLoss} onChange={(e) => setRiskCalc(prev => ({ ...prev, stopLoss: e.target.value }))} placeholder="1.0950" />
                </div>
              </div>
              <Button onClick={calculateRisk} className="w-full">Calculate</Button>
              {riskCalc.result && <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold">{riskCalc.result}</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="margin">
          <Card>
            <CardHeader>
              <CardTitle>Margin Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Leverage</Label>
                  <Input type="number" value={marginCalc.leverage} onChange={(e) => setMarginCalc(prev => ({ ...prev, leverage: e.target.value }))} placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label>Position Size</Label>
                  <Input type="number" value={marginCalc.positionSize} onChange={(e) => setMarginCalc(prev => ({ ...prev, positionSize: e.target.value }))} placeholder="10000" />
                </div>
              </div>
              <Button onClick={calculateMargin} className="w-full">Calculate</Button>
              {marginCalc.result && <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold">{marginCalc.result}</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pl">
          <Card>
            <CardHeader>
              <CardTitle>Profit/Loss Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Entry Price</Label>
                  <Input type="number" value={plCalc.entryPrice} onChange={(e) => setPlCalc(prev => ({ ...prev, entryPrice: e.target.value }))} placeholder="1.1000" />
                </div>
                <div className="space-y-2">
                  <Label>Exit Price</Label>
                  <Input type="number" value={plCalc.exitPrice} onChange={(e) => setPlCalc(prev => ({ ...prev, exitPrice: e.target.value }))} placeholder="1.1050" />
                </div>
                <div className="space-y-2">
                  <Label>Lot Size</Label>
                  <Input type="number" value={plCalc.lotSize} onChange={(e) => setPlCalc(prev => ({ ...prev, lotSize: e.target.value }))} placeholder="0.1" />
                </div>
              </div>
              <Button onClick={calculatePL} className="w-full">Calculate</Button>
              {plCalc.result && <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold">{plCalc.result}</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lot">
          <Card>
            <CardHeader>
              <CardTitle>Lot Size Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Account Balance</Label>
                  <Input type="number" value={lotCalc.accountBalance} onChange={(e) => setLotCalc(prev => ({ ...prev, accountBalance: e.target.value }))} placeholder="10000" />
                </div>
                <div className="space-y-2">
                  <Label>Risk %</Label>
                  <Input type="number" value={lotCalc.riskPercent} onChange={(e) => setLotCalc(prev => ({ ...prev, riskPercent: e.target.value }))} placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label>Stop Loss (pips)</Label>
                  <Input type="number" value={lotCalc.stopLoss} onChange={(e) => setLotCalc(prev => ({ ...prev, stopLoss: e.target.value }))} placeholder="50" />
                </div>
              </div>
              <Button onClick={calculateLotSize} className="w-full">Calculate</Button>
              {lotCalc.result && <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold">{lotCalc.result}</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swap">
          <Card>
            <CardHeader>
              <CardTitle>Swap Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Position Size</Label>
                  <Input type="number" value={swapCalc.positionSize} onChange={(e) => setSwapCalc(prev => ({ ...prev, positionSize: e.target.value }))} placeholder="10000" />
                </div>
                <div className="space-y-2">
                  <Label>Swap Rate</Label>
                  <Input type="number" value={swapCalc.swapRate} onChange={(e) => setSwapCalc(prev => ({ ...prev, swapRate: e.target.value }))} placeholder="0.0001" />
                </div>
                <div className="space-y-2">
                  <Label>Days</Label>
                  <Input type="number" value={swapCalc.days} onChange={(e) => setSwapCalc(prev => ({ ...prev, days: e.target.value }))} placeholder="1" />
                </div>
              </div>
              <Button onClick={calculateSwap} className="w-full">Calculate</Button>
              {swapCalc.result && <div className="p-4 bg-primary/10 rounded-lg text-center font-semibold">{swapCalc.result}</div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
