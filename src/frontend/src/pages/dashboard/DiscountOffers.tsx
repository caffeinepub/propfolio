import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DiscountOffers() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Discount Offers</h1>
        <p className="text-muted-foreground">Exclusive prop firm promotional offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-muted-foreground text-center">
              <p>No offers available yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
