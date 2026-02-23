import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Footer from '@/components/Footer';

export default function Subscribe() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img 
              src="/assets/generated/propfolio-logo.dim_200x60.png" 
              alt="Propfolio" 
              className="h-12 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground">
              Start managing your prop trading business professionally
            </p>
          </div>

          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Professional Trader Suite</CardTitle>
              <CardDescription className="text-lg">
                Everything you need to succeed as a prop trader
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <div className="text-6xl font-bold">$75</div>
                <div className="text-muted-foreground text-lg">per year</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Unlimited prop firm accounts',
                  'Advanced trading analytics',
                  'Tax calculation & reports',
                  'Professional trading tools',
                  'Expense tracking',
                  'Payout management',
                  'Currency converters',
                  'Discount offers access',
                  'Compounding simulator',
                  'Reviews & disputes',
                  'Affiliate program (15%)',
                  'Priority support',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" size="lg">
                Subscribe Now
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Cancel anytime. No hidden fees.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate({ to: '/' })}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
