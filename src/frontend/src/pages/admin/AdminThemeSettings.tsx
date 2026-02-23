import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Palette, Sun, Moon } from 'lucide-react';

export default function AdminThemeSettings() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState({
    mode: 'dark',
    primaryColor: 'purple',
    accentColor: 'blue',
  });

  const handleSave = () => {
    toast.success('Theme settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Theme Settings</h1>
            <p className="text-muted-foreground">Customize the application appearance</p>
          </div>
          <Button variant="outline" onClick={() => navigate({ to: '/admin' })}>
            Back to Admin
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Scheme
              </CardTitle>
              <CardDescription>Select the default color theme for the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mode">Theme Mode</Label>
                <Select value={theme.mode} onValueChange={(value) => setTheme(prev => ({ ...prev, mode: value }))}>
                  <SelectTrigger id="mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light Mode
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark Mode
                      </div>
                    </SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Select value={theme.primaryColor} onValueChange={(value) => setTheme(prev => ({ ...prev, primaryColor: value }))}>
                  <SelectTrigger id="primary-color">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <Select value={theme.accentColor} onValueChange={(value) => setTheme(prev => ({ ...prev, accentColor: value }))}>
                  <SelectTrigger id="accent-color">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="teal">Teal</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your theme changes will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border-2 border-dashed rounded-lg space-y-4">
                <div className="flex gap-3">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Sample Card</CardTitle>
                    <CardDescription>This is how cards will appear</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Sample content text</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} size="lg" className="w-full">
            Save Theme Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
