import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export default function Giveaways() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Giveaways</h1>
        <p className="text-muted-foreground">Exclusive giveaways for Propfolio members</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <Gift className="h-20 w-20 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-center max-w-md">
            We're preparing exciting giveaways for our community. Stay tuned for prop firm account giveaways and more!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
