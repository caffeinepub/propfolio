import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectScrollUpButton, SelectScrollDownButton } from './ui/select';
import { PROP_FIRMS } from '@/constants/propFirms';
import { toast } from 'sonner';
import { useAddAccount } from '@/hooks/useAddAccount';
import { useGetCallerUserProfile } from '@/hooks/useGetCallerUserProfile';
import { useAddCustomPropFirm } from '@/hooks/useAddCustomPropFirm';
import { getCustomPropFirms, isDuplicateFirm } from '@/utils/customPropFirmsStorage';
import { Loader2, Plus, X, Search, Star } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddAccountDialog({ open, onOpenChange }: AddAccountDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    accountType: '',
    balance: '',
    currency: 'USD',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customFirmInput, setCustomFirmInput] = useState('');

  const addAccount = useAddAccount();
  const addCustomPropFirm = useAddCustomPropFirm();
  const { data: userProfile } = useGetCallerUserProfile();

  // Merge default firms with custom firms from backend and localStorage
  const allPropFirms = useMemo(() => {
    const customFromProfile = userProfile?.customPropFirms || [];
    const customFromStorage = getCustomPropFirms();
    
    // Combine all sources and remove duplicates
    const combined = [...PROP_FIRMS, ...customFromProfile, ...customFromStorage];
    const unique = Array.from(new Set(combined));
    
    // Sort alphabetically
    return unique.sort((a, b) => a.localeCompare(b));
  }, [userProfile]);

  // Filter firms based on search term
  const filteredFirms = useMemo(() => {
    if (!searchTerm.trim()) return allPropFirms;
    
    const search = searchTerm.toLowerCase();
    return allPropFirms.filter(firm => 
      firm.toLowerCase().includes(search)
    );
  }, [allPropFirms, searchTerm]);

  // Check if a firm is custom (not in default list)
  const isCustomFirm = (firm: string) => {
    return !PROP_FIRMS.includes(firm);
  };

  const handleAddCustomFirm = async () => {
    const trimmedFirm = customFirmInput.trim();
    
    if (!trimmedFirm) {
      toast.error('Please enter a prop firm name');
      return;
    }

    // Check for duplicates
    if (isDuplicateFirm(trimmedFirm, allPropFirms)) {
      toast.error('This prop firm already exists');
      return;
    }

    try {
      await addCustomPropFirm.mutateAsync(trimmedFirm);
      toast.success('Custom prop firm added successfully!');
      setFormData({ ...formData, accountType: trimmedFirm });
      setCustomFirmInput('');
      setShowAddCustom(false);
      setSearchTerm('');
    } catch (error: any) {
      console.error('Failed to add custom prop firm:', error);
      toast.error(error?.message || 'Failed to add custom prop firm');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.accountType || !formData.balance) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addAccount.mutateAsync({
        name: formData.name,
        accountType: formData.accountType,
        balance: parseFloat(formData.balance),
        currency: formData.currency,
      });
      toast.success('Account added successfully!');
      onOpenChange(false);
      setFormData({ name: '', accountType: '', balance: '', currency: 'USD' });
      setSearchTerm('');
      setShowAddCustom(false);
      setCustomFirmInput('');
    } catch (error: any) {
      console.error('Failed to add account:', error);
      toast.error(error?.message || 'Failed to add account');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/70" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] sm:max-w-md bg-[#0f2137] border border-teal-500/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-100">Add Prop Firm Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="accountType" className="text-gray-300">Prop Firm *</Label>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search prop firms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500 pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Add Custom Firm Section */}
            {showAddCustom ? (
              <div className="space-y-2 p-3 bg-[#0a192f] border border-teal-500/30 rounded-md">
                <Label className="text-gray-300 text-sm">Add Your Prop Firm</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter prop firm name"
                    value={customFirmInput}
                    onChange={(e) => setCustomFirmInput(e.target.value)}
                    className="bg-[#0f2137] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomFirm();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddCustomFirm}
                    disabled={addCustomPropFirm.isPending}
                    className="bg-teal-500 hover:bg-teal-600 text-white shrink-0"
                  >
                    {addCustomPropFirm.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Add'
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowAddCustom(false);
                      setCustomFirmInput('');
                    }}
                    variant="outline"
                    className="border-teal-500/30 text-gray-300 hover:bg-[#0a192f] shrink-0"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => setShowAddCustom(true)}
                variant="outline"
                className="w-full border-teal-500/30 text-teal-400 hover:bg-[#0a192f] hover:text-teal-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add your Prop firm
              </Button>
            )}

            {/* Prop Firm Select Dropdown */}
            <Select value={formData.accountType} onValueChange={(value) => setFormData({ ...formData, accountType: value })}>
              <SelectTrigger className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500">
                <SelectValue placeholder="Select prop firm" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f2137] border-teal-500/30 max-h-[400px] overflow-y-auto z-50">
                <SelectScrollUpButton />
                {filteredFirms.length > 0 ? (
                  filteredFirms.map((firm) => (
                    <SelectItem 
                      key={firm} 
                      value={firm} 
                      className="text-gray-100 hover:bg-[#0a192f] focus:bg-[#0a192f] cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {firm}
                        {isCustomFirm(firm) && (
                          <Badge variant="outline" className="border-teal-500/50 text-teal-400 text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Custom
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-2 py-6 text-center text-gray-400 text-sm">
                    No prop firms found. Try a different search or add a custom firm.
                  </div>
                )}
                <SelectScrollDownButton />
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Account No *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your account number"
              className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance" className="text-gray-300">Account Balance *</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              placeholder="Enter account balance"
              className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="text-gray-300">Currency *</Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
              <SelectTrigger className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0f2137] border-teal-500/30 z-50">
                <SelectItem value="USD" className="text-gray-100">USD</SelectItem>
                <SelectItem value="EUR" className="text-gray-100">EUR</SelectItem>
                <SelectItem value="GBP" className="text-gray-100">GBP</SelectItem>
                <SelectItem value="AUD" className="text-gray-100">AUD</SelectItem>
                <SelectItem value="CAD" className="text-gray-100">CAD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={addAccount.isPending}
          >
            {addAccount.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding Account...
              </>
            ) : (
              'Add Account'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
