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
  Receipt
} from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();

  const adminSections = [
    { 
      title: 'Theme Settings', 
      path: '/admin/theme-settings', 
      description: 'Customize colors and appearance',
      icon: <Palette className="h-6 w-6" />
    },
    { 
      title: 'Page Management', 
      path: '/admin/page-management', 
      description: 'Control page visibility and order',
      icon: <Layout className="h-6 w-6" />
    },
    { 
      title: 'Pricing Settings', 
      path: '/admin/pricing-settings', 
      description: 'Update subscription pricing',
      icon: <DollarSign className="h-6 w-6" />
    },
    { 
      title: 'Payment Gateways', 
      path: '/admin/payment-gateways', 
      description: 'Configure payment providers',
      icon: <Wallet className="h-6 w-6" />
    },
    { 
      title: 'Payments', 
      path: '/admin/payments', 
      description: 'View all transactions',
      icon: <Receipt className="h-6 w-6" />
    },
    { 
      title: 'Prop Firms', 
      path: '/admin/prop-firms', 
      description: 'Manage prop firm list',
      icon: <Building2 className="h-6 w-6" />
    },
    { 
      title: 'Discount Offers', 
      path: '/admin/offers', 
      description: 'Manage promotional offers',
      icon: <Tag className="h-6 w-6" />
    },
    { 
      title: 'Reviews', 
      path: '/admin/reviews', 
      description: 'Moderate user reviews',
      icon: <MessageSquare className="h-6 w-6" />
    },
    { 
      title: 'Disputes', 
      path: '/admin/disputes', 
      description: 'Manage user disputes',
      icon: <AlertCircle className="h-6 w-6" />
    },
    { 
      title: 'Products', 
      path: '/admin/products', 
      description: 'Manage shop products',
      icon: <ShoppingCart className="h-6 w-6" />
    },
    { 
      title: 'Users', 
      path: '/admin/users', 
      description: 'View user accounts',
      icon: <Users className="h-6 w-6" />
    },
    { 
      title: 'Subscriptions', 
      path: '/admin/subscriptions', 
      description: 'Manage subscriptions',
      icon: <CreditCard className="h-6 w-6" />
    },
    { 
      title: 'Affiliate Withdrawals', 
      path: '/admin/affiliate-withdrawals', 
      description: 'Approve withdrawals',
      icon: <DollarSign className="h-6 w-6" />
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-muted-foreground mt-2">Manage Propfolio platform settings and content</p>
          </div>
          <Button variant="outline" onClick={() => navigate({ to: '/dashboard' })} className="shadow-md">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Card 
              key={section.path} 
              className="hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              onClick={() => navigate({ to: section.path })}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
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
