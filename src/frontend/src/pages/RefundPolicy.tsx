import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

export default function RefundPolicy() {
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
              <CardTitle className="text-3xl">Refund Policy</CardTitle>
              <p className="text-sm text-muted-foreground">Last updated: February 23, 2026</p>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <h2>1. Subscription Refunds</h2>
              <p>
                We offer a 30-day money-back guarantee for annual subscriptions. If you're not satisfied 
                with Propfolio within the first 30 days of your subscription, you can request a full refund.
              </p>

              <h2>2. Refund Eligibility</h2>
              <p>
                To be eligible for a refund, you must request it within 30 days of your initial subscription 
                purchase. Refunds are not available for subscription renewals.
              </p>

              <h2>3. How to Request a Refund</h2>
              <p>
                To request a refund, please contact our support team with your account details and reason 
                for the refund request. We will process your request within 5-7 business days.
              </p>

              <h2>4. Processing Time</h2>
              <p>
                Once your refund is approved, it will be processed and a credit will automatically be 
                applied to your original method of payment within 7-10 business days.
              </p>

              <h2>5. Non-Refundable Items</h2>
              <p>
                Trading tools purchased separately from the subscription are non-refundable unless 
                they are defective or not as described.
              </p>

              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about our refund policy, please contact our support team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
