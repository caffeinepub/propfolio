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
    },
    {
      icon: TrendingUp,
      title: 'Trading Analytics',
      description: 'Comprehensive analytics for your trading performance',
    },
    {
      icon: Calculator,
      title: 'Tax Calculator',
      description: 'Calculate your tax obligations with ease',
    },
    {
      icon: FileText,
      title: 'Expense Management',
      description: 'Track business and personal expenses effortlessly',
    },
    {
      icon: DollarSign,
      title: 'Currency Converter',
      description: 'Real-time FX and crypto conversion tools',
    },
    {
      icon: BarChart3,
      title: 'Compounding Calculator',
      description: 'Plan your capital growth with precision',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless experience',
    },
    {
      icon: Users,
      title: 'Multi-Account',
      description: 'Manage multiple prop firm accounts easily',
    },
    {
      icon: Award,
      title: 'Discount Offers',
      description: 'Exclusive deals from top prop firms',
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and monitor your trading goals',
    },
    {
      icon: Sparkles,
      title: 'Smart Insights',
      description: 'AI-powered insights for better decisions',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f]">
      {/* Header */}
      <header className="border-b border-teal-500/20 bg-[#0a192f]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate({ to: '/' })}>
            <div className="p-2 bg-teal-500 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-teal-400">Propfolio</span>
          </div>
          <Button onClick={() => navigate({ to: '/dashboard' })} className="bg-teal-500 hover:bg-teal-600 text-white">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0a192f] py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-100 leading-tight">
                Manage all your Prop firm Payouts
              </h1>
              <p className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                and Trades analysis in one place
              </p>
              <p className="text-xl text-gray-300">
                Professional trading management platform for prop traders. Track performance, manage payouts, calculate taxes, and grow your trading business.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate({ to: '/dashboard' })}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  Get Started - $75/year
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate({ to: '/dashboard' })}
                  className="border-teal-500 text-teal-400 hover:bg-teal-500/10"
                >
                  View Dashboard
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-dashboard-mockup.dim_1920x1080.png"
                alt="Propfolio Dashboard Analytics"
                className="w-full rounded-lg shadow-elevated border border-teal-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prop Firm Ticker */}
      <PropFirmTicker />

      {/* Features Section */}
      <section className="py-20 bg-[#0f2137]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300">
              Powerful tools designed specifically for prop traders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[#0a192f] border-teal-500/20 hover:border-teal-500/40 hover:shadow-elevated transition-all duration-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-teal-400" />
                  </div>
                  <CardTitle className="text-xl text-gray-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#0a192f]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-100 mb-12">
              Why Choose Propfolio?
            </h2>
            <div className="space-y-6">
              {[
                'Centralized dashboard for all your prop firm accounts',
                'Automated payout tracking and reconciliation',
                'Tax-ready reports for easy filing',
                'Real-time currency conversion for global traders',
                'Secure data encryption and privacy protection',
                'Mobile-friendly interface for trading on the go',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-green-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Trading Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of prop traders who trust Propfolio to manage their trading portfolio
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate({ to: '/dashboard' })}
            className="bg-white text-teal-600 hover:bg-gray-100"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
