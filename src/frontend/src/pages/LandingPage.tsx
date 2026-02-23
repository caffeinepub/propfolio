import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Wrench, 
  MessageSquare, 
  LineChart,
  Users,
  Heart
} from 'lucide-react';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LayoutDashboard className="h-8 w-8" />,
      title: 'Dashboard Overview',
      description: 'Track your financial health at a glance with comprehensive metrics and insights.',
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: 'Payouts Tracking',
      description: 'Monitor all your prop firm payouts with detailed analysis and growth trends.',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Account Management',
      description: 'Manage multiple prop firm accounts across 55+ supported trading firms.',
    },
    {
      icon: <Receipt className="h-8 w-8" />,
      title: 'Expense Tracking',
      description: 'Categorize business and personal expenses for accurate financial reporting.',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Trading Analytics',
      description: 'Comprehensive trading statistics including win rate, profit factor, and Sharpe ratio.',
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Tax Reports',
      description: 'Generate audit-ready tax reports with country-specific calculations.',
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: 'Income Tax Calculator',
      description: 'Calculate income tax with quarterly advance payment reminders.',
    },
    {
      icon: <ArrowRightLeft className="h-8 w-8" />,
      title: 'Exchange Rates',
      description: 'Live FX and crypto converters for accurate payout currency conversion.',
    },
    {
      icon: <Tag className="h-8 w-8" />,
      title: 'Discount Offers',
      description: 'Access exclusive prop firm promotional offers and discount codes.',
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Trading Tools',
      description: 'Professional calculators for risk, margin, P/L, lot size, and swap calculations.',
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Reviews & Disputes',
      description: 'Share experiences and raise disputes with prop trading firms.',
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: 'Compounding Simulator',
      description: 'Project your capital growth with advanced compounding calculations.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x600.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center space-y-8">
            <img 
              src="/assets/generated/propfolio-logo.dim_200x60.png" 
              alt="Propfolio" 
              className="h-16"
            />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Manage all your Prop firm Payouts<br />
              and Trades analysis in one place
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Professional trading management platform for prop traders. Track performance, 
              manage payouts, calculate taxes, and grow your trading business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate({ to: '/subscribe' })}
              >
                Get Started - $75/year
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => navigate({ to: '/dashboard' })}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Professional Trader Suite</CardTitle>
              <CardDescription className="text-lg">
                Everything you need to manage your prop trading business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold">$75</div>
                <div className="text-muted-foreground">per year</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Unlimited prop firm accounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Advanced trading analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Tax calculation & audit reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Professional trading tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Affiliate program (15% commission)</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => navigate({ to: '/subscribe' })}
              >
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to succeed as a prop trader
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="mb-4 text-primary">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Affiliate Program Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl">Join Our Affiliate Program</CardTitle>
            <CardDescription className="text-lg">
              Earn 15% commission on every referral
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-2xl mx-auto">
            <p className="text-center text-muted-foreground">
              Share Propfolio with other traders and earn commissions. Redeem your earnings 
              as vouchers for prop firm accounts or request crypto withdrawals once you reach $100.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                onClick={() => navigate({ to: '/dashboard/affiliate' })}
              >
                Start Earning Today
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Video Showcase Placeholder */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">See Propfolio in Action</h2>
          <p className="text-xl text-muted-foreground">
            Watch how Propfolio helps traders manage their business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {['Dashboard Tour', 'Tax Calculator', 'Trading Analytics', 'Affiliate Program'].map((title, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-4xl">▶️</div>
                  <div className="font-semibold">{title}</div>
                  <div className="text-sm text-muted-foreground">Coming Soon</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
