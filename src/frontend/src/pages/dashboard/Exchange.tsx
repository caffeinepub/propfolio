import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Exchange() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Exchange</h1>
        <p className="text-muted-foreground">Live FX and crypto converters</p>
      </div>

      <Tabs defaultValue="fx" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="fx">FX Converter</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Converter</TabsTrigger>
        </TabsList>
        <TabsContent value="fx">
          <Card>
            <CardHeader>
              <CardTitle>FX Currency Converter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                FX converter coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle>Crypto to Fiat Converter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Crypto converter coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
