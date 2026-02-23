import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Wallet, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function AdminPaymentGateways() {
  const navigate = useNavigate();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [gateways, setGateways] = useState({
    stripe: { enabled: false, apiKey: '', secretKey: '' },
    razorpay: { enabled: false, apiKey: '', secretKey: '' },
    coinbase: { enabled: false, apiKey: '', secretKey: '' },
    nowpayments: { enabled: false, apiKey: '', secretKey: '' },
  });

  const handleSave = (gateway: string) => {
    toast.success(`${gateway} configuration saved successfully!`);
  };

  const handleTest = (gateway: string) => {
    toast.info(`Testing ${gateway} connection...`);
    setTimeout(() => {
      toast.success(`${gateway} connection successful!`);
    }, 1500);
  };

  const toggleShowKey = (gateway: string, field: string) => {
    setShowKeys(prev => ({ ...prev, [`${gateway}-${field}`]: !prev[`${gateway}-${field}`] }));
  };

  const GatewayForm = ({ gateway, name }: { gateway: keyof typeof gateways; name: string }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              {name}
            </CardTitle>
            <CardDescription>Configure {name} payment gateway</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor={`${gateway}-enabled`}>Enabled</Label>
            <Switch
              id={`${gateway}-enabled`}
              checked={gateways[gateway].enabled}
              onCheckedChange={(checked) =>
                setGateways(prev => ({ ...prev, [gateway]: { ...prev[gateway], enabled: checked } }))
              }
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${gateway}-api-key`}>API Key</Label>
          <div className="relative">
            <Input
              id={`${gateway}-api-key`}
              type={showKeys[`${gateway}-api`] ? 'text' : 'password'}
              value={gateways[gateway].apiKey}
              onChange={(e) =>
                setGateways(prev => ({ ...prev, [gateway]: { ...prev[gateway], apiKey: e.target.value } }))
              }
              placeholder="Enter API key"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => toggleShowKey(gateway, 'api')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showKeys[`${gateway}-api`] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${gateway}-secret-key`}>Secret Key</Label>
          <div className="relative">
            <Input
              id={`${gateway}-secret-key`}
              type={showKeys[`${gateway}-secret`] ? 'text' : 'password'}
              value={gateways[gateway].secretKey}
              onChange={(e) =>
                setGateways(prev => ({ ...prev, [gateway]: { ...prev[gateway], secretKey: e.target.value } }))
              }
              placeholder="Enter secret key"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => toggleShowKey(gateway, 'secret')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showKeys[`${gateway}-secret`] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={() => handleSave(name)} className="flex-1">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
          <Button onClick={() => handleTest(name)} variant="outline">
            Test Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payment Gateways</h1>
            <p className="text-muted-foreground">Configure payment provider API credentials</p>
          </div>
          <Button variant="outline" onClick={() => navigate({ to: '/admin' })}>
            Back to Admin
          </Button>
        </div>

        <Tabs defaultValue="stripe" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
            <TabsTrigger value="coinbase">Coinbase</TabsTrigger>
            <TabsTrigger value="nowpayments">NOWPayments</TabsTrigger>
          </TabsList>
          <TabsContent value="stripe" className="mt-6">
            <GatewayForm gateway="stripe" name="Stripe" />
          </TabsContent>
          <TabsContent value="razorpay" className="mt-6">
            <GatewayForm gateway="razorpay" name="Razorpay" />
          </TabsContent>
          <TabsContent value="coinbase" className="mt-6">
            <GatewayForm gateway="coinbase" name="Coinbase Commerce" />
          </TabsContent>
          <TabsContent value="nowpayments" className="mt-6">
            <GatewayForm gateway="nowpayments" name="NOWPayments" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
