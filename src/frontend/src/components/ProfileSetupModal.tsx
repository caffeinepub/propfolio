import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useSaveCallerUserProfile } from '../hooks/useSaveCallerUserProfile';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '../backend';

export default function ProfileSetupModal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const profile: UserProfile = {
        name: formData.name,
        email: formData.email,
        createdAt: BigInt(Date.now() * 1000000),
        customPropFirms: [],
      };
      await saveProfile.mutateAsync(profile);
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create profile');
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent 
        className="sm:max-w-md bg-[#0f2137] border border-teal-500/30" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-100">Complete Your Profile</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide your information to get started with Propfolio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="bg-[#0a192f] border-teal-500/30 text-gray-100 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white" 
              disabled={saveProfile.isPending}
            >
              {saveProfile.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                'Create Profile'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
