import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { useAddPayout } from '@/hooks/useAddPayout';
import { useGetAccounts } from '@/hooks/useGetAccounts';
import { Loader2, Upload } from 'lucide-react';
import { ExternalBlob } from '@/backend';

interface AddPayoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddPayoutDialog({ open, onOpenChange }: AddPayoutDialogProps) {
  const [formData, setFormData] = useState({
    propFirm: '',
    accountId: '',
    amount: '',
    currency: 'USD',
    payoutDate: '',
  });
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const addPayout = useAddPayout();
  const { data: accounts, isLoading: accountsLoading } = useGetAccounts();

  // Get unique prop firms from user's accounts
  const userPropFirms = accounts
    ? Array.from(new Set(accounts.map((acc) => acc.accountType)))
    : [];

  // Get accounts for selected prop firm
  const accountsForFirm = accounts
    ? accounts.filter((acc) => acc.accountType === formData.propFirm)
    : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'invoice' | 'certificate') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a JPEG, PNG, or PDF file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      if (type === 'invoice') {
        setInvoiceFile(file);
      } else {
        setCertificateFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.propFirm || !formData.accountId || !formData.amount || !formData.payoutDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!certificateFile) {
      toast.error('Certificate is required');
      return;
    }

    try {
      // Convert files to ExternalBlob if provided
      let invoiceBlob: ExternalBlob | undefined;
      let certificateBlob: ExternalBlob | undefined;

      if (invoiceFile) {
        const invoiceBytes = new Uint8Array(await invoiceFile.arrayBuffer());
        invoiceBlob = ExternalBlob.fromBytes(invoiceBytes);
      }

      if (certificateFile) {
        const certificateBytes = new Uint8Array(await certificateFile.arrayBuffer());
        certificateBlob = ExternalBlob.fromBytes(certificateBytes);
      }

      // Convert date to timestamp (nanoseconds)
      const payoutDate = BigInt(new Date(formData.payoutDate).getTime() * 1_000_000);

      await addPayout.mutateAsync({
        propFirm: formData.propFirm,
        accountId: formData.accountId,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        payoutDate,
        invoiceDocument: invoiceBlob,
        certificateDocument: certificateBlob,
      });

      toast.success('Payout added successfully!');
      onOpenChange(false);
      setFormData({ propFirm: '', accountId: '', amount: '', currency: 'USD', payoutDate: '' });
      setInvoiceFile(null);
      setCertificateFile(null);
    } catch (error) {
      toast.error('Failed to add payout');
      console.error('Payout error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/70" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] sm:max-w-md bg-[#0f2137] border border-teal-500/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-100">Add Payout</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="propFirm" className="text-gray-300">Prop Firm *</Label>
            <Select 
              value={formData.propFirm} 
              onValueChange={(value) => setFormData({ ...formData, propFirm: value, accountId: '' })}
              disabled={accountsLoading}
            >
              <SelectTrigger className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500">
                <SelectValue placeholder={accountsLoading ? "Loading..." : "Select prop firm"} />
              </SelectTrigger>
              <SelectContent className="bg-[#0f2137] border-teal-500/30">
                {userPropFirms.length === 0 ? (
                  <SelectItem value="none" disabled>No accounts added yet</SelectItem>
                ) : (
                  userPropFirms.map((firm) => (
                    <SelectItem key={firm} value={firm} className="text-gray-100">
                      {firm}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountId" className="text-gray-300">Account *</Label>
            <Select 
              value={formData.accountId} 
              onValueChange={(value) => setFormData({ ...formData, accountId: value })}
              disabled={!formData.propFirm || accountsForFirm.length === 0}
            >
              <SelectTrigger className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f2137] border-teal-500/30">
                {accountsForFirm.map((account) => (
                  <SelectItem key={account.id} value={account.id} className="text-gray-100">
                    {account.name} ({account.currency} {account.balance.toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">Payout Amount *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter payout amount"
              className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="text-gray-300">Currency *</Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
              <SelectTrigger className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0f2137] border-teal-500/30">
                <SelectItem value="USD" className="text-gray-100">USD</SelectItem>
                <SelectItem value="EUR" className="text-gray-100">EUR</SelectItem>
                <SelectItem value="GBP" className="text-gray-100">GBP</SelectItem>
                <SelectItem value="AUD" className="text-gray-100">AUD</SelectItem>
                <SelectItem value="CAD" className="text-gray-100">CAD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payoutDate" className="text-gray-300">Payout Date *</Label>
            <Input
              id="payoutDate"
              type="date"
              value={formData.payoutDate}
              onChange={(e) => setFormData({ ...formData, payoutDate: e.target.value })}
              className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoice" className="text-gray-300">Payout Invoice (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="invoice"
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                onChange={(e) => handleFileChange(e, 'invoice')}
                className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
              />
              {invoiceFile && (
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  {invoiceFile.name}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">JPEG, PNG, or PDF (max 5MB)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificate" className="text-gray-300">Certificate *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="certificate"
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                onChange={(e) => handleFileChange(e, 'certificate')}
                className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
              />
              {certificateFile && (
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  {certificateFile.name}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">JPEG, PNG, or PDF (max 5MB)</p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={addPayout.isPending}
          >
            {addPayout.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding Payout...
              </>
            ) : (
              'Add Payout'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
