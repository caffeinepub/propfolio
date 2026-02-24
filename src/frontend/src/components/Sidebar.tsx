import { useNavigate, useLocation } from '@tanstack/react-router';
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Receipt,
  TrendingUp,
  FileText,
  Calculator,
  DollarSign,
  Tag,
  Gift,
  Wrench,
  Repeat,
  ShoppingCart,
  MessageSquare,
  PiggyBank,
  Settings,
  Users,
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', color: 'from-primary to-primary/70' },
    { icon: Wallet, label: 'Accounts', path: '/dashboard/accounts', color: 'from-secondary to-secondary/70' },
    { icon: CreditCard, label: 'Payouts', path: '/dashboard/payouts', color: 'from-accent to-accent/70' },
    { icon: Receipt, label: 'Expenses', path: '/dashboard/expenses', color: 'from-chart-1 to-chart-1/70' },
    { icon: TrendingUp, label: 'Trading Overview', path: '/dashboard/trading-overview', color: 'from-chart-2 to-chart-2/70' },
    { icon: FileText, label: 'Tax Audit Report', path: '/dashboard/tax-audit-report', color: 'from-chart-3 to-chart-3/70' },
    { icon: Calculator, label: 'Income Tax Calculator', path: '/dashboard/income-tax-calculator', color: 'from-chart-4 to-chart-4/70' },
    { icon: DollarSign, label: 'Exchange', path: '/dashboard/exchange', color: 'from-primary to-secondary' },
    { icon: Tag, label: 'Discount Offers', path: '/dashboard/discount-offers', color: 'from-secondary to-accent' },
    { icon: Gift, label: 'Giveaways', path: '/dashboard/giveaways', color: 'from-accent to-chart-1' },
    { icon: Wrench, label: 'Tools', path: '/dashboard/tools', color: 'from-chart-1 to-chart-2' },
    { icon: Repeat, label: 'P2P Exchange', path: '/dashboard/p2p-exchange', color: 'from-chart-2 to-chart-3' },
    { icon: ShoppingCart, label: 'Trading Tools', path: '/dashboard/trading-tools', color: 'from-chart-3 to-chart-4' },
    { icon: MessageSquare, label: 'Reviews & Disputes', path: '/dashboard/reviews-disputes', color: 'from-chart-4 to-chart-5' },
    { icon: PiggyBank, label: 'Compounding', path: '/dashboard/compounding', color: 'from-chart-5 to-primary' },
    { icon: Users, label: 'Affiliate', path: '/dashboard/affiliate', color: 'from-primary to-accent' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', color: 'from-secondary to-chart-1' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 border-r border-border/50 overflow-y-auto sticky top-0 shadow-xl animate-slide-in-left">
      <div className="p-6">
        <div
          className="flex items-center gap-3 mb-8 cursor-pointer group animate-scale-in"
          onClick={() => navigate({ to: '/' })}
        >
          <img
            src="/assets/generated/propfolio-logo-compact.dim_64x64.png"
            alt="Propfolio"
            className="h-10 w-10 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="text-2xl font-bold text-gradient-vibrant group-hover:scale-105 transition-transform duration-300">
            Propfolio
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden animate-slide-in-left ${
                  active
                    ? 'bg-gradient-to-r from-sidebar-accent to-sidebar-accent/80 text-sidebar-accent-foreground shadow-glow scale-105'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent-foreground hover:scale-105 hover:translate-x-1'
                }`}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${item.color} ${
                    active ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'
                  } group-hover:rotate-12 transition-all duration-300`}
                >
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <span className={`text-sm font-medium ${active ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                {active && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-glow animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
