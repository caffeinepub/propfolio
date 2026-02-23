import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IncomeTaxCalculator() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Income Tax Calculator</h1>
        <p className="text-muted-foreground">Calculate your income tax with quarterly reminders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Tax calculator coming soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
