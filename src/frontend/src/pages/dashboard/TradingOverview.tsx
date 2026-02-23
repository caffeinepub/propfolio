import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function TradingOverview() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading Overview</h1>
          <p className="text-muted-foreground">Comprehensive trading analytics</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Trade
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Total Trades', 'Win Rate', 'Profit Factor', 'Sharpe Ratio'].map((metric) => (
          <Card key={metric}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equity Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No trading data yet. Add trades to see your equity curve.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
