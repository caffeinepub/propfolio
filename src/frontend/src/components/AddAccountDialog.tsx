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
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-card/95 border-2 border-primary/30 shadow-glow animate-scale-in">
        <div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient-vibrant">Add Prop Firm Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <Label htmlFor="propFirm">Prop Firm *</Label>
              <Select value={formData.propFirm} onValueChange={(value) => setFormData({ ...formData, propFirm: value })}>
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary hover:border-primary/30">
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
              <div className="space-y-2 animate-slide-down overflow-hidden">
                <Label htmlFor="customFirm">Custom Prop Firm Name *</Label>
                <Input
                  id="customFirm"
                  value={formData.customFirm}
                  onChange={(e) => setFormData({ ...formData, customFirm: e.target.value })}
                  placeholder="Enter prop firm name"
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary hover:border-primary/30"
                />
              </div>
            )}

            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.15s' }}>
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                placeholder="Enter account number"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary hover:border-primary/30"
              />
            </div>

            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="accountSize">Account Size *</Label>
              <Input
                id="accountSize"
                type="number"
                value={formData.accountSize}
                onChange={(e) => setFormData({ ...formData, accountSize: e.target.value })}
                placeholder="Enter account size (e.g., 100000)"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary hover:border-primary/30"
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <Button 
                type="submit" 
                className="w-full transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow"
              >
                Add Account
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
