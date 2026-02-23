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
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';
import Footer from '@/components/Footer';
import PropFirmTicker from '@/components/PropFirmTicker';

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

  const benefits = [
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: 'Lightning Fast',
      description: 'Real-time data synchronization and instant calculations for all your trading metrics.',
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: 'Secure & Private',
      description: 'Bank-level encryption and decentralized storage on Internet Computer blockchain.',
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-accent" />,
      title: 'Advanced Analytics',
      description: 'Professional-grade analytics and reporting tools used by top traders worldwide.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="relative container mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
              <Zap className="h-4 w-4 text-primary animate-pulse-slow" />
              <span className="text-sm font-semibold text-primary">Professional Trading Platform</span>
            </div>
            <img 
              src="/assets/generated/propfolio-logo.dim_400x120.png" 
              alt="Propfolio" 
              className="h-16 w-auto animate-scale-in"
            />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight animate-slide-up">
              Manage all your Prop Firm<br />
              Payouts & Trades in One Place
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed animate-fade-in">
              Professional trading management platform for prop traders. Track performance, 
              manage payouts, calculate taxes, and grow your trading business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 shadow-premium hover:shadow-glow-lg hover:scale-105 transition-all duration-300 font-semibold"
                onClick={() => navigate({ to: '/subscribe' })}
              >
                Get Started - $75/year
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 border-2 hover:bg-accent hover:scale-105 transition-all duration-300 font-semibold"
                onClick={() => navigate({ to: '/dashboard' })}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Prop Firm Ticker */}
      <PropFirmTicker />

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Propfolio?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by traders, for traders. Experience the difference with our professional-grade platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elevated hover:scale-105 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4 animate-bounce-subtle">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-br from-muted/30 via-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary shadow-premium hover:shadow-glow-lg transition-all duration-500 animate-scale-in">
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-3xl md:text-4xl font-bold">Professional Trader Suite</CardTitle>
              <CardDescription className="text-base md:text-lg mt-3">
                Everything you need to manage your prop trading business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pb-10">
              <div className="text-center py-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">$75</div>
                <div className="text-lg text-muted-foreground">per year</div>
              </div>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Complete dashboard with financial metrics and insights</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Track payouts from 55+ prop trading firms</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Comprehensive expense tracking and categorization</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Advanced trading analytics and performance metrics</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Tax audit reports and income tax calculator</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Live FX and crypto exchange rate converters</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Professional trading calculators and tools</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Exclusive discount offers and giveaways</span>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground">Affiliate program with earnings tracking</span>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  className="w-full text-lg py-6 shadow-premium hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
                  onClick={() => navigate({ to: '/subscribe' })}
                >
                  Subscribe Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Trading Management Suite
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your prop trading business in one powerful platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elevated hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-scale-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Ready to Transform Your Trading Business?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of prop traders who trust Propfolio to manage their trading operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="text-base px-8 py-6 shadow-premium hover:shadow-glow-lg hover:scale-105 transition-all duration-300 font-semibold"
              onClick={() => navigate({ to: '/subscribe' })}
            >
              Start Your Journey - $75/year
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-6 border-2 hover:bg-accent hover:scale-105 transition-all duration-300 font-semibold"
              onClick={() => navigate({ to: '/dashboard' })}
            >
              Explore Dashboard
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
