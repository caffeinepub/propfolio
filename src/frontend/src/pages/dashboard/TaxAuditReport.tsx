import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TaxAuditReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tax Audit Report</h1>
          <p className="text-muted-foreground">Generate audit-ready tax reports</p>
        </div>
        <Button>Export PDF</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Configure your tax settings to generate reports
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
