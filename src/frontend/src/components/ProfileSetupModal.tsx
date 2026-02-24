import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useSaveCallerUserProfile } from '../hooks/useSaveCallerUserProfile';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ProfileSetupModal() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    mobile: '',
    discordUserId: '',
  });

  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.fullName || !formData.email || !formData.mobile || !formData.discordUserId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await saveProfile.mutateAsync(formData);
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create profile');
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent 
        className="sm:max-w-md backdrop-blur-xl bg-card/95 border-2 border-primary/30 shadow-glow animate-scale-in" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient-vibrant">Complete Your Profile</DialogTitle>
            <DialogDescription>
              Please provide your information to get started with Propfolio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30"
              />
            </div>
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.15s' }}>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30"
              />
            </div>
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30"
              />
            </div>
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.25s' }}>
              <Label htmlFor="mobile">Mobile *</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter mobile number"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30"
              />
            </div>
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <Label htmlFor="discordUserId">Discord User ID *</Label>
              <Input
                id="discordUserId"
                value={formData.discordUserId}
                onChange={(e) => setFormData({ ...formData, discordUserId: e.target.value })}
                placeholder="Enter Discord user ID"
                className="transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.35s' }}>
              <Button 
                type="submit" 
                className="w-full transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow" 
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
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
