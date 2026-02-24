import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Wallet } from 'lucide-react';
import AddAccountDialog from '@/components/AddAccountDialog';
import { useGetAccounts } from '@/hooks/useGetAccounts';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Accounts() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { data: accounts, isLoading } = useGetAccounts();

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Accounts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your prop firm accounts</p>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : accounts && accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="bg-white dark:bg-gray-900 border-border hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white mt-4">{account.name}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">{account.accountType}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Balance</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {account.currency} {account.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-primary/30 bg-white dark:bg-gray-900">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="h-10 w-10 text-primary" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">No accounts yet</p>
              <Button 
                variant="outline" 
                onClick={() => setShowAddDialog(true)}
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Account
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <AddAccountDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
