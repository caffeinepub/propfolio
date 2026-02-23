import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Tools() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Trading Tools</h1>
        <p className="text-muted-foreground">Professional trading calculators</p>
      </div>

      <Tabs defaultValue="risk" className="w-full">
        <TabsList className="grid w-full max-w-3xl grid-cols-5">
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="margin">Margin</TabsTrigger>
          <TabsTrigger value="pl">P/L</TabsTrigger>
          <TabsTrigger value="lot">Lot Size</TabsTrigger>
          <TabsTrigger value="swap">Swap</TabsTrigger>
        </TabsList>
        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>3% Risk Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Risk calculator coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="margin">
          <Card>
            <CardHeader>
              <CardTitle>Margin Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Margin calculator coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pl">
          <Card>
            <CardHeader>
              <CardTitle>Profit/Loss Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                P/L calculator coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lot">
          <Card>
            <CardHeader>
              <CardTitle>Lot Size Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Lot size calculator coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="swap">
          <Card>
            <CardHeader>
              <CardTitle>Swap Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Swap calculator coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
