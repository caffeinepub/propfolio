import { Card, CardContent } from '@/components/ui/card';
import { Repeat } from 'lucide-react';

export default function P2PExchange() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">P2P Exchange</h1>
        <p className="text-muted-foreground">Peer-to-peer crypto exchange</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <Repeat className="h-20 w-20 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-center max-w-md">
            P2P crypto exchange feature is under development. Trade cryptocurrencies directly with other traders.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
