import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';
import PropFirmTicker from '@/components/PropFirmTicker';
import {
  Wallet,
  TrendingUp,
  Calculator,
  FileText,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  Users,
  Award,
  Target,
  Sparkles,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wallet,
      title: 'Payout Tracking',
      description: 'Track all your prop firm payouts in one centralized dashboard',
      color: 'from-primary to-primary/70',
      delay: '0s',
    },
    {
      icon: TrendingUp,
      title: 'Trading Analytics',
      description: 'Comprehensive analytics for your trading performance',
      color: 'from-secondary to-secondary/70',
      delay: '0.1s',
    },
    {
      icon: Calculator,
      title: 'Tax Calculator',
      description: 'Calculate your tax obligations with ease',
      color: 'from-accent to-accent/70',
      delay: '0.2s',
    },
    {
      icon: FileText,
      title: 'Expense Management',
      description: 'Track business and personal expenses effortlessly',
      color: 'from-chart-1 to-chart-1/70',
      delay: '0.3s',
    },
    {
      icon: DollarSign,
      title: 'Currency Converter',
      description: 'Real-time FX and crypto conversion tools',
      color: 'from-chart-2 to-chart-2/70',
      delay: '0.4s',
    },
    {
      icon: BarChart3,
      title: 'Compounding Calculator',
      description: 'Plan your capital growth with precision',
      color: 'from-chart-3 to-chart-3/70',
      delay: '0.5s',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely',
      color: 'from-primary to-secondary',
      delay: '0.6s',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless experience',
      color: 'from-accent to-chart-1',
      delay: '0.7s',
    },
    {
      icon: Users,
      title: 'Multi-Account',
      description: 'Manage multiple prop firm accounts easily',
      color: 'from-chart-2 to-chart-3',
      delay: '0.8s',
    },
    {
      icon: Award,
      title: 'Discount Offers',
      description: 'Exclusive deals from top prop firms',
      color: 'from-chart-4 to-primary',
      delay: '0.9s',
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and monitor your trading goals',
      color: 'from-secondary to-accent',
      delay: '1.0s',
    },
    {
      icon: Sparkles,
      title: 'Affiliate Program',
      description: 'Earn rewards by referring other traders',
      color: 'from-chart-5 to-chart-1',
      delay: '1.1s',
    },
  ];

  const benefits = [
    {
      title: 'Save Time',
      description: 'Automate your financial tracking and spend more time trading',
      icon: '⚡',
    },
    {
      title: 'Stay Organized',
      description: 'Keep all your trading finances in one place',
      icon: '📊',
    },
    {
      title: 'Make Better Decisions',
      description: 'Data-driven insights to improve your trading strategy',
      icon: '🎯',
    },
    {
      title: 'Tax Compliance',
      description: 'Never miss a tax deadline with automated reminders',
      icon: '📅',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-animated" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-vibrant animate-slide-up">
              Propfolio
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              The ultimate financial management platform for prop traders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                onClick={() => navigate({ to: '/dashboard' })}
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow transition-all duration-300 hover:scale-110 active:scale-95"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/subscribe' })}
                className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10 hover:shadow-glow-accent transition-all duration-300 hover:scale-110 active:scale-95"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Prop Firm Ticker */}
      <PropFirmTicker />

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your prop trading finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <Card className="group hover:shadow-glow hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-vibrant">
              Why Choose Propfolio?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of prop traders who trust Propfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center animate-bounce-in group hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4 animate-bounce-subtle">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gradient">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animated" />
        <div className="container mx-auto text-center relative z-10 animate-scale-in">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start managing your prop trading finances like a pro today
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/dashboard' })}
              className="text-lg px-10 py-7 bg-white text-primary hover:bg-white/90 hover:shadow-glow-lg transition-all duration-300 hover:scale-110 active:scale-95 font-bold"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
