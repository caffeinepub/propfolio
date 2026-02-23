import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PROP_FIRMS } from '@/constants/propFirms';
import { toast } from 'sonner';

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddAccountDialog({ open, onOpenChange }: AddAccountDialogProps) {
  const [formData, setFormData] = useState({
    propFirm: '',
    customFirm: '',
    accountNumber: '',
    accountSize: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.propFirm && !formData.customFirm) {
      toast.error('Please select or enter a prop firm');
      return;
    }
    
    if (!formData.accountNumber || !formData.accountSize) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Account added successfully!');
    onOpenChange(false);
    setFormData({ propFirm: '', customFirm: '', accountNumber: '', accountSize: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Prop Firm Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="propFirm">Prop Firm *</Label>
            <Select value={formData.propFirm} onValueChange={(value) => setFormData({ ...formData, propFirm: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select prop firm" />
              </SelectTrigger>
              <SelectContent>
                {PROP_FIRMS.map((firm) => (
                  <SelectItem key={firm} value={firm}>
                    {firm}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Add your own...</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.propFirm === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="customFirm">Custom Prop Firm Name *</Label>
              <Input
                id="customFirm"
                value={formData.customFirm}
                onChange={(e) => setFormData({ ...formData, customFirm: e.target.value })}
                placeholder="Enter prop firm name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number *</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="Enter account number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountSize">Account Size *</Label>
            <Input
              id="accountSize"
              type="number"
              value={formData.accountSize}
              onChange={(e) => setFormData({ ...formData, accountSize: e.target.value })}
              placeholder="Enter account size (e.g., 100000)"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
