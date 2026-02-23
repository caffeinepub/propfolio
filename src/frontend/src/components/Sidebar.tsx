import { useNavigate, useRouterState } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Wallet, 
  Building2, 
  Receipt, 
  TrendingUp, 
  FileText, 
  Calculator, 
  ArrowRightLeft, 
  Tag, 
  Gift, 
  Wrench, 
  Repeat, 
  ShoppingCart, 
  MessageSquare, 
  LineChart, 
  Settings,
  Users
} from 'lucide-react';
import { Badge } from './ui/badge';
import LoginButton from './LoginButton';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const menuItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Wallet className="h-5 w-5" />, label: 'Payouts', path: '/dashboard/payouts' },
    { icon: <Building2 className="h-5 w-5" />, label: 'Accounts', path: '/dashboard/accounts' },
    { icon: <Receipt className="h-5 w-5" />, label: 'Expenses', path: '/dashboard/expenses' },
    { icon: <TrendingUp className="h-5 w-5" />, label: 'Trading Overview', path: '/dashboard/trading-overview' },
    { icon: <FileText className="h-5 w-5" />, label: 'Tax Audit Report', path: '/dashboard/tax-audit-report' },
    { icon: <Calculator className="h-5 w-5" />, label: 'Income Tax Calculator', path: '/dashboard/income-tax-calculator' },
    { icon: <ArrowRightLeft className="h-5 w-5" />, label: 'Exchange', path: '/dashboard/exchange' },
    { icon: <Tag className="h-5 w-5" />, label: 'Discount Offers', path: '/dashboard/discount-offers' },
    { icon: <Gift className="h-5 w-5" />, label: 'Giveaways', path: '/dashboard/giveaways', comingSoon: true },
    { icon: <Wrench className="h-5 w-5" />, label: 'Tools', path: '/dashboard/tools' },
    { icon: <Repeat className="h-5 w-5" />, label: 'P2P Exchange', path: '/dashboard/p2p-exchange', comingSoon: true },
    { icon: <ShoppingCart className="h-5 w-5" />, label: 'Trading Tools', path: '/dashboard/trading-tools' },
    { icon: <MessageSquare className="h-5 w-5" />, label: 'Reviews & Disputes', path: '/dashboard/reviews-disputes' },
    { icon: <LineChart className="h-5 w-5" />, label: 'Compounding', path: '/dashboard/compounding' },
    { icon: <Users className="h-5 w-5" />, label: 'Affiliate', path: '/dashboard/affiliate' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col shadow-elevated">
      <div className="p-6 border-b border-border">
        <img 
          src="/assets/generated/propfolio-logo-compact.dim_64x64.png" 
          alt="Propfolio" 
          className="h-12 w-12 mb-3"
        />
        <h2 className="text-lg font-bold text-sidebar-foreground">Propfolio</h2>
        <p className="text-xs text-muted-foreground mt-1">Professional Trading Suite</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate({ to: item.path })}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150",
              currentPath === item.path
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {item.comingSoon && (
              <Badge variant="secondary" className="text-xs py-0 px-1.5">Soon</Badge>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <LoginButton />
      </div>
    </aside>
  );
}
