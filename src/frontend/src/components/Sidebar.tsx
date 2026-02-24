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
  BarChart3,
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Payouts', path: '/dashboard/payouts' },
    { icon: Wallet, label: 'Accounts', path: '/dashboard/accounts' },
    { icon: Receipt, label: 'Expenses', path: '/dashboard/expenses' },
    { icon: TrendingUp, label: 'Trading Overview', path: '/dashboard/trading-overview' },
    { icon: FileText, label: 'Tax Audit Report', path: '/dashboard/tax-audit-report' },
    { icon: Calculator, label: 'Income Tax Calculator', path: '/dashboard/income-tax-calculator' },
    { icon: DollarSign, label: 'Exchange', path: '/dashboard/exchange' },
    { icon: Tag, label: 'Discount Offers', path: '/dashboard/discount-offers' },
    { icon: Gift, label: 'Giveaways', path: '/dashboard/giveaways' },
    { icon: Wrench, label: 'Tools', path: '/dashboard/tools' },
    { icon: Repeat, label: 'P2P Exchange', path: '/dashboard/p2p-exchange' },
    { icon: ShoppingCart, label: 'Trading Tools', path: '/dashboard/trading-tools' },
    { icon: MessageSquare, label: 'Reviews & Disputes', path: '/dashboard/reviews-disputes' },
    { icon: PiggyBank, label: 'Compounding', path: '/dashboard/compounding' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-[#0a192f] border-r border-teal-500/20 flex-shrink-0 overflow-y-auto h-screen sticky top-0">
      <div className="p-6">
        <div
          className="flex items-center gap-3 mb-8 cursor-pointer group"
          onClick={() => navigate({ to: '/' })}
        >
          <div className="p-2 bg-teal-500 rounded-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-teal-400 group-hover:text-teal-300 transition-colors">
            Propfolio
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                    : 'text-gray-400 hover:bg-teal-500/5 hover:text-teal-400'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
