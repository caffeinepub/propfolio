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
      gradient: 'from-teal-500 to-teal-600',
      delay: '0s',
    },
    {
      title: 'Net Profit',
      value: '$0',
      change: '+8%',
      isPositive: true,
      icon: '/assets/generated/chart-icon.dim_64x64.png',
      description: 'from last month',
      gradient: 'from-green-500 to-green-600',
      delay: '0.1s',
    },
    {
      title: 'Total Expenses',
      value: '$0',
      change: '-3%',
      isPositive: true,
      icon: '/assets/generated/calculator-icon.dim_64x64.png',
      description: 'from last month',
      gradient: 'from-teal-400 to-green-400',
      delay: '0.2s',
    },
    {
      title: 'Estimated Tax',
      value: '$0',
      change: '+5%',
      isPositive: false,
      icon: '/assets/generated/tax-icon.dim_64x64.png',
      description: 'from last month',
      gradient: 'from-orange-500 to-red-500',
      delay: '0.3s',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold text-gray-100">Overview</h1>
          <p className="text-gray-400 mt-2">Your financial health at a glance.</p>
        </div>
        <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            Export Summary
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="animate-slide-up" style={{ animationDelay: metric.delay }}>
            <Card className="group hover:shadow-lg hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-teal-500/20 hover:border-teal-500/40 bg-[#0f2137] overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-400 group-hover:text-teal-400 transition-colors duration-300">
                  {metric.title}
                </CardTitle>
                <img
                  src={metric.icon}
                  alt=""
                  className="h-10 w-10 opacity-80 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
                />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-gray-100">{metric.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                  <div className="animate-bounce-subtle">
                    {metric.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400 ml-1">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Payout History */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Card className="hover:shadow-elevated transition-all duration-300 border-2 border-teal-500/20 hover:border-teal-500/30 bg-[#0f2137]">
          <CardHeader>
            <CardTitle className="text-gray-100">Payout History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-400">
              No payout history yet. Add your first payout to get started.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advance Tax Reminder */}
      <div className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
        <Card className="bg-gradient-to-br from-teal-500/20 via-green-500/20 to-teal-600/20 border-2 border-teal-500/40 hover:shadow-lg transition-all duration-300 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-animated opacity-30" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-gray-100">Advance Tax Reminder</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-start gap-4 p-6 bg-[#0a192f]/60 backdrop-blur-sm rounded-2xl border border-teal-500/30 hover:border-teal-500/50 transition-all duration-300">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-500/40 to-green-500/40 flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce-subtle">
                <span className="text-4xl">📅</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 text-gray-100">Quarter 1 Payment</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Due in 15 days. Estimated amount: <span className="font-bold text-teal-400 text-lg">$2,450</span>
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-4 py-2 bg-[#0f2137]/50 rounded-lg border border-teal-500/20">
                    <span className="text-gray-400">Current Tax Rate Setting</span>
                    <span className="ml-2 font-bold text-teal-400">25.17%</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4 px-2">
              Ensure you set aside this amount from your recent payouts to avoid penalties.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
