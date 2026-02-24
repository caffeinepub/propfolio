import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Tag, 
  MessageSquare, 
  AlertCircle, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  DollarSign,
  Palette,
  Layout,
  Wallet,
  Receipt,
  LogOut,
  User
} from 'lucide-react';

interface AdminSession {
  username: string;
  token: string;
  timestamp: number;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [adminUsername, setAdminUsername] = useState<string>('Admin');

  useEffect(() => {
    // Load admin username from localStorage
    try {
      const sessionData = localStorage.getItem('adminSession');
      if (sessionData) {
        const session: AdminSession = JSON.parse(sessionData);
        setAdminUsername(session.username);
      }
    } catch (error) {
      console.error('Error loading admin session:', error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate({ to: '/admin/login' });
  };

  const adminSections = [
    { 
      title: 'Theme Settings', 
      path: '/admin/theme-settings', 
      description: 'Customize colors and appearance',
      icon: <Palette className="h-6 w-6" />,
      color: 'from-primary/20 to-primary/10'
    },
    { 
      title: 'Page Management', 
      path: '/admin/page-management', 
      description: 'Control page visibility and order',
      icon: <Layout className="h-6 w-6" />,
      color: 'from-secondary/20 to-secondary/10'
    },
    { 
      title: 'Pricing Settings', 
      path: '/admin/pricing-settings', 
      description: 'Update subscription pricing',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'from-accent/20 to-accent/10'
    },
    { 
      title: 'Payment Gateways', 
      path: '/admin/payment-gateways', 
      description: 'Configure payment providers',
      icon: <Wallet className="h-6 w-6" />,
      color: 'from-success/20 to-success/10'
    },
    { 
      title: 'Payments', 
      path: '/admin/payments', 
      description: 'View all transactions',
      icon: <Receipt className="h-6 w-6" />,
      color: 'from-warning/20 to-warning/10'
    },
    { 
      title: 'Prop Firms', 
      path: '/admin/prop-firms', 
      description: 'Manage prop firm list',
      icon: <Building2 className="h-6 w-6" />,
      color: 'from-chart-1/20 to-chart-1/10'
    },
    { 
      title: 'Discount Offers', 
      path: '/admin/offers', 
      description: 'Manage promotional offers',
      icon: <Tag className="h-6 w-6" />,
      color: 'from-chart-2/20 to-chart-2/10'
    },
    { 
      title: 'Reviews', 
      path: '/admin/reviews', 
      description: 'Moderate user reviews',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'from-chart-3/20 to-chart-3/10'
    },
    { 
      title: 'Disputes', 
      path: '/admin/disputes', 
      description: 'Manage user disputes',
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'from-chart-4/20 to-chart-4/10'
    },
    { 
      title: 'Products', 
      path: '/admin/products', 
      description: 'Manage shop products',
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'from-chart-5/20 to-chart-5/10'
    },
    { 
      title: 'Users', 
      path: '/admin/users', 
      description: 'View user accounts',
      icon: <Users className="h-6 w-6" />,
      color: 'from-primary/20 to-secondary/10'
    },
    { 
      title: 'Subscriptions', 
      path: '/admin/subscriptions', 
      description: 'Manage subscriptions',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'from-secondary/20 to-accent/10'
    },
    { 
      title: 'Affiliate Withdrawals', 
      path: '/admin/affiliate-withdrawals', 
      description: 'Approve withdrawals',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'from-accent/20 to-primary/10'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-gradient">
              Admin Panel
            </h1>
            <p className="text-muted-foreground mt-2">Manage Propfolio platform settings and content</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{adminUsername}</span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate({ to: '/dashboard' })} 
              className="shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <Card 
              key={section.path} 
              className="hover:border-primary hover:shadow-glow transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate({ to: section.path })}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-gradient-to-br ${section.color} rounded-lg group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                    {section.icon}
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
