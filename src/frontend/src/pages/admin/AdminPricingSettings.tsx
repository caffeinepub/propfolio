import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { DollarSign, Plus, X } from 'lucide-react';

export default function AdminPricingSettings() {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState({
    amount: '75',
    interval: 'year',
    currency: 'USD',
    features: [
      'Unlimited prop firm accounts',
      'Advanced trading analytics',
      'Tax calculation & audit reports',
      'Professional trading tools',
      'Affiliate program (15% commission)',
    ],
  });
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim()) {
      setPricing(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setPricing(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    toast.success('Pricing settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pricing Settings</h1>
            <p className="text-muted-foreground">Update subscription pricing and features</p>
          </div>
          <Button variant="outline" onClick={() => navigate({ to: '/admin' })}>
            Back to Admin
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Subscription Pricing
              </CardTitle>
              <CardDescription>Configure the subscription plan details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={pricing.amount}
                    onChange={(e) => setPricing(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={pricing.currency} onValueChange={(value) => setPricing(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interval">Billing Interval</Label>
                  <Select value={pricing.interval} onValueChange={(value) => setPricing(prev => ({ ...prev, interval: value }))}>
                    <SelectTrigger id="interval">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Features</CardTitle>
              <CardDescription>Add or remove features included in the subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {pricing.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                    <span className="flex-1">{feature}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add new feature..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button onClick={addFeature}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 border-2 border-dashed rounded-lg text-center space-y-4">
                <div className="text-5xl font-bold">${pricing.amount}</div>
                <div className="text-muted-foreground">per {pricing.interval}</div>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  {pricing.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} size="lg" className="w-full">
            Save Pricing Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
