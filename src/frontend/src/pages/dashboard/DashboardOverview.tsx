import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardOverview() {
  const metrics = [
    {
      title: 'Total Payouts',
      value: '$0',
      change: '+12%',
      isPositive: true,
      icon: '/assets/generated/wallet-icon.dim_64x64.png',
      description: 'from last month',
    },
    {
      title: 'Net Profit',
      value: '$0',
      change: '+8%',
      isPositive: true,
      icon: '/assets/generated/chart-icon.dim_64x64.png',
      description: 'from last month',
    },
    {
      title: 'Total Expenses',
      value: '$0',
      change: '-3%',
      isPositive: true,
      icon: '/assets/generated/calculator-icon.dim_64x64.png',
      description: 'from last month',
    },
    {
      title: 'Estimated Tax',
      value: '$0',
      change: '+5%',
      isPositive: false,
      icon: '/assets/generated/tax-icon.dim_64x64.png',
      description: 'from last month',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">Your financial health at a glance.</p>
        </div>
        <Button>Export Summary</Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <img src={metric.icon} alt="" className="h-8 w-8 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
                {metric.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm text-muted-foreground ml-1">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No payout history yet. Add your first payout to get started.
          </div>
        </CardContent>
      </Card>

      {/* Advance Tax Reminder */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Advance Tax Reminder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📅</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Quarter 1 Payment</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Due in 15 days. Estimated amount: <span className="font-semibold text-foreground">$2,450</span>
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Tax Rate Setting</span>
                  <span className="ml-2 font-semibold">25.17%</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Ensure you set aside this amount from your recent payouts to avoid penalties.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
