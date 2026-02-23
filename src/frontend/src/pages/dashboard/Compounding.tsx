import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Compounding() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Capital Growth Simulator</h1>
        <p className="text-muted-foreground">Project your trading account growth</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compounding Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Compounding simulator coming soon
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
