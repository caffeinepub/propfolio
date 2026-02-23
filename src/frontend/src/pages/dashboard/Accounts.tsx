import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddAccountDialog from '@/components/AddAccountDialog';

export default function Accounts() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage your prop firm accounts</p>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-dashed border-2 hover:border-primary/50 hover:shadow-elevated transition-all duration-300 animate-scale-in">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-muted-foreground text-center space-y-2">
              <p>No accounts yet</p>
              <Button 
                variant="outline" 
                onClick={() => setShowAddDialog(true)}
                className="transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddAccountDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
