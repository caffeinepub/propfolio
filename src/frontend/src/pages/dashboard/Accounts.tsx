import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddAccountDialog from '@/components/AddAccountDialog';

export default function Accounts() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold text-gradient-vibrant">Accounts</h1>
          <p className="text-muted-foreground mt-2">Manage your prop firm accounts</p>
        </div>
        <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <Card className="border-dashed border-4 border-primary/30 hover:border-primary/60 hover:shadow-glow transition-all duration-300 bg-gradient-to-br from-card to-primary/5 backdrop-blur-sm group">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-muted-foreground text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow group-hover:rotate-12 transition-transform duration-300 animate-pulse-slow">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <p className="text-lg font-semibold">No accounts yet</p>
              <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddDialog(true)}
                  className="border-2 border-primary hover:bg-primary/10 hover:shadow-glow-accent transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddAccountDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
