import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={() => navigate({ to: '/' })} className="mb-8">
            ← Back to Home
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Privacy Policy</CardTitle>
              <p className="text-sm text-muted-foreground">Last updated: February 23, 2026</p>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including your name, email address, 
                mobile number, Discord user ID, and trading account information.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, send you technical notices and support messages, and respond to your requests.
              </p>

              <h2>3. Information Sharing</h2>
              <p>
                We do not share your personal information with third parties except as described in this policy 
                or with your consent.
              </p>

              <h2>4. Data Security</h2>
              <p>
                We take reasonable measures to help protect your personal information from loss, theft, 
                misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information at any time 
                through your account settings.
              </p>

              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through our support channels.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
