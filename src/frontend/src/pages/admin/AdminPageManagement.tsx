import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Layout, GripVertical } from 'lucide-react';

export default function AdminPageManagement() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([
    { id: 'dashboard', name: 'Dashboard', visible: true, order: 1 },
    { id: 'payouts', name: 'Payouts', visible: true, order: 2 },
    { id: 'accounts', name: 'Accounts', visible: true, order: 3 },
    { id: 'expenses', name: 'Expenses', visible: true, order: 4 },
    { id: 'trading-overview', name: 'Trading Overview', visible: true, order: 5 },
    { id: 'tax-audit-report', name: 'Tax Audit Report', visible: true, order: 6 },
    { id: 'income-tax-calculator', name: 'Income Tax Calculator', visible: true, order: 7 },
    { id: 'exchange', name: 'Exchange', visible: true, order: 8 },
    { id: 'discount-offers', name: 'Discount Offers', visible: true, order: 9 },
    { id: 'tools', name: 'Tools', visible: true, order: 10 },
    { id: 'trading-tools', name: 'Trading Tools', visible: true, order: 11 },
    { id: 'reviews-disputes', name: 'Reviews & Disputes', visible: true, order: 12 },
    { id: 'compounding', name: 'Compounding', visible: true, order: 13 },
    { id: 'affiliate', name: 'Affiliate', visible: true, order: 14 },
    { id: 'settings', name: 'Settings', visible: true, order: 15 },
  ]);

  const toggleVisibility = (id: string) => {
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, visible: !page.visible } : page
    ));
  };

  const handleSave = () => {
    toast.success('Page configuration saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Page Management</h1>
            <p className="text-muted-foreground">Control page visibility and navigation order</p>
          </div>
          <Button variant="outline" onClick={() => navigate({ to: '/admin' })}>
            Back to Admin
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Dashboard Pages
            </CardTitle>
            <CardDescription>Toggle page visibility and reorder navigation items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <Label htmlFor={`page-${page.id}`} className="cursor-pointer font-medium">
                      {page.name}
                    </Label>
                  </div>
                  <Switch
                    id={`page-${page.id}`}
                    checked={page.visible}
                    onCheckedChange={() => toggleVisibility(page.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} size="lg" className="w-full">
          Save Page Configuration
        </Button>
      </div>
    </div>
  );
}
