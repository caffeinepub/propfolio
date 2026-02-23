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
  Heart,
  CheckCircle2,
  TrendingUpIcon
} from 'lucide-react';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
      title: 'Dashboard Overview',
      description: 'Track your financial health at a glance with comprehensive metrics and insights.',
    },
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: 'Payouts Tracking',
      description: 'Monitor all your prop firm payouts with detailed analysis and growth trends.',
    },
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: 'Account Management',
      description: 'Manage multiple prop firm accounts across 55+ supported trading firms.',
    },
    {
      icon: <Receipt className="h-10 w-10 text-primary" />,
      title: 'Expense Tracking',
      description: 'Categorize business and personal expenses for accurate financial reporting.',
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: 'Trading Analytics',
      description: 'Comprehensive trading statistics including win rate, profit factor, and Sharpe ratio.',
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: 'Tax Reports',
      description: 'Generate audit-ready tax reports with country-specific calculations.',
    },
    {
      icon: <Calculator className="h-10 w-10 text-primary" />,
      title: 'Income Tax Calculator',
      description: 'Calculate income tax with quarterly advance payment reminders.',
    },
    {
      icon: <ArrowRightLeft className="h-10 w-10 text-primary" />,
      title: 'Exchange Rates',
      description: 'Live FX and crypto converters for accurate payout currency conversion.',
    },
    {
      icon: <Tag className="h-10 w-10 text-primary" />,
      title: 'Discount Offers',
      description: 'Access exclusive prop firm promotional offers and discount codes.',
    },
    {
      icon: <Wrench className="h-10 w-10 text-primary" />,
      title: 'Trading Tools',
      description: 'Professional calculators for risk, margin, P/L, lot size, and swap calculations.',
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: 'Reviews & Disputes',
      description: 'Share experiences and raise disputes with prop trading firms.',
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: 'Compounding Simulator',
      description: 'Project your capital growth with advanced compounding calculations.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x600.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-24">
          <div className="flex flex-col items-center text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <TrendingUpIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Professional Trading Platform</span>
            </div>
            <img 
              src="/assets/generated/propfolio-logo.dim_400x120.png" 
              alt="Propfolio" 
              className="h-20 w-auto"
            />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Manage all your Prop firm<br />
              Payouts & Trades in one place
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              Professional trading management platform for prop traders. Track performance, 
              manage payouts, calculate taxes, and grow your trading business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate({ to: '/subscribe' })}
              >
                Get Started - $75/year
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 border-2 hover:bg-accent transition-all duration-300"
                onClick={() => navigate({ to: '/dashboard' })}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold">Professional Trader Suite</CardTitle>
              <CardDescription className="text-lg mt-2">
                Everything you need to manage your prop trading business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center py-6 bg-gradient-to-br from-primary/10 to-transparent rounded-xl">
                <div className="text-6xl font-bold text-primary">$75</div>
                <div className="text-lg text-muted-foreground mt-2">per year</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Unlimited prop firm accounts',
                  'Advanced trading analytics',
                  'Tax calculation & audit reports',
                  'Professional trading tools',
                  'Affiliate program (15% commission)',
                  'Priority customer support',
                  'Regular feature updates',
                  'Secure data encryption'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
                size="lg"
                onClick={() => navigate({ to: '/subscribe' })}
              >
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything a professional prop trader needs to succeed
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
              <CardHeader>
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Affiliate Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary/30">
          <CardHeader className="text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl">Affiliate Program</CardTitle>
            <CardDescription className="text-lg">
              Earn 15% commission on every referral
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join our affiliate program and earn passive income by referring other traders. 
              Get your unique referral link and start earning today!
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => navigate({ to: '/dashboard/affiliate' })}
            >
              Join Affiliate Program
            </Button>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
