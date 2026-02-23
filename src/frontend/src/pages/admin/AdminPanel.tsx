import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function AdminPanel() {
  const navigate = useNavigate();

  const adminSections = [
    { title: 'Prop Firms', path: '/admin/prop-firms', description: 'Manage prop firm list' },
    { title: 'Discount Offers', path: '/admin/offers', description: 'Manage promotional offers' },
    { title: 'Reviews', path: '/admin/reviews', description: 'Moderate user reviews' },
    { title: 'Disputes', path: '/admin/disputes', description: 'Manage user disputes' },
    { title: 'Products', path: '/admin/products', description: 'Manage shop products' },
    { title: 'Users', path: '/admin/users', description: 'View user accounts' },
    { title: 'Subscriptions', path: '/admin/subscriptions', description: 'Manage subscriptions' },
    { title: 'Affiliate Withdrawals', path: '/admin/affiliate-withdrawals', description: 'Approve withdrawals' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage Propfolio platform</p>
          </div>
          <Button variant="outline" onClick={() => navigate({ to: '/dashboard' })}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Card key={section.path} className="hover:border-primary transition-colors cursor-pointer"
              onClick={() => navigate({ to: section.path })}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
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
