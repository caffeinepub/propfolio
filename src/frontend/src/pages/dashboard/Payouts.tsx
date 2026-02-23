import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Payouts() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payouts</h1>
          <p className="text-muted-foreground">Track your prop firm payouts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Payout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            No payouts recorded yet. Add your first payout to start tracking.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
