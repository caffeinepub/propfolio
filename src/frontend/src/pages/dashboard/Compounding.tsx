import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart } from 'lucide-react';

interface CompoundingResult {
  period: number;
  starting: number;
  interest: number;
  ending: number;
}

export default function Compounding() {
  const [inputs, setInputs] = useState({
    startingCapital: '10000',
    returnRate: '5',
    frequency: 'monthly',
    duration: '12',
  });
  const [results, setResults] = useState<CompoundingResult[]>([]);

  const calculate = () => {
    const capital = parseFloat(inputs.startingCapital);
    const rate = parseFloat(inputs.returnRate) / 100;
    const periods = parseInt(inputs.duration);
    
    const data: CompoundingResult[] = [];
    let currentBalance = capital;

    for (let i = 1; i <= periods; i++) {
      const starting = currentBalance;
      const interest = starting * rate;
      const ending = starting + interest;
      data.push({ period: i, starting, interest, ending });
      currentBalance = ending;
    }

    setResults(data);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Compounding Calculator</h1>
        <p className="text-muted-foreground">Project your capital growth over time</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculator Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Starting Capital</Label>
              <Input
                type="number"
                value={inputs.startingCapital}
                onChange={(e) => setInputs(prev => ({ ...prev, startingCapital: e.target.value }))}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label>Return Rate (%)</Label>
              <Input
                type="number"
                value={inputs.returnRate}
                onChange={(e) => setInputs(prev => ({ ...prev, returnRate: e.target.value }))}
                placeholder="5"
              />
            </div>
            <div className="space-y-2">
              <Label>Compounding Frequency</Label>
              <Select value={inputs.frequency} onValueChange={(value) => setInputs(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Time Period ({inputs.frequency === 'yearly' ? 'years' : inputs.frequency === 'monthly' ? 'months' : inputs.frequency === 'weekly' ? 'weeks' : 'days'})</Label>
              <Input
                type="number"
                value={inputs.duration}
                onChange={(e) => setInputs(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="12"
              />
            </div>
            <Button onClick={calculate} className="w-full">
              <LineChart className="h-4 w-4 mr-2" />
              Calculate Growth
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Growth Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Starting Capital</div>
                  <div className="text-2xl font-bold">${results[0].starting.toFixed(2)}</div>
                </div>
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Final Balance</div>
                  <div className="text-2xl font-bold text-success">${results[results.length - 1].ending.toFixed(2)}</div>
                </div>
                <div className="p-4 bg-accent rounded-lg col-span-2">
                  <div className="text-sm text-muted-foreground">Total Growth</div>
                  <div className="text-2xl font-bold">
                    ${(results[results.length - 1].ending - results[0].starting).toFixed(2)}
                    <span className="text-sm ml-2">
                      ({(((results[results.length - 1].ending - results[0].starting) / results[0].starting) * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Period-by-Period Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Starting Balance</TableHead>
                    <TableHead>Interest Earned</TableHead>
                    <TableHead>Ending Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((row) => (
                    <TableRow key={row.period}>
                      <TableCell>{row.period}</TableCell>
                      <TableCell>${row.starting.toFixed(2)}</TableCell>
                      <TableCell className="text-success">${row.interest.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold">${row.ending.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
