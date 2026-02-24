import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, FileText, Award, Eye } from 'lucide-react';
import AddPayoutDialog from '@/components/AddPayoutDialog';
import { useGetPayouts } from '@/hooks/useGetPayouts';
import SkeletonCard from '@/components/SkeletonCard';

export default function Payouts() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [selectedCertificateUrl, setSelectedCertificateUrl] = useState<string>('');
  const { data: payouts, isLoading } = useGetPayouts();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      AUD: 'A$',
      CAD: 'C$',
    };
    return symbols[currency] || currency;
  };

  const handleViewCertificate = (url: string) => {
    setSelectedCertificateUrl(url);
    setCertificateModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Payouts</h1>
          <p className="text-gray-400">Track your prop firm payouts</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Payout
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} variant="payout" />
          ))}
        </div>
      ) : payouts && payouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payouts.map((payout) => (
            <Card key={payout.payoutId} className="bg-[#0f2137] border-teal-500/20 hover:border-teal-500/40 hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg text-gray-100">{payout.propFirm}</span>
                  <span className="text-xl font-bold text-teal-400">
                    {getCurrencySymbol(payout.currency)}{payout.amount.toFixed(2)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-400">
                  <p>Account: {payout.accountId}</p>
                  <p>Date: {formatDate(payout.payoutDate)}</p>
                </div>
                
                <div className="flex gap-2 pt-2 border-t border-teal-500/20">
                  {payout.invoiceDocument ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                      onClick={() => {
                        const url = payout.invoiceDocument!.getDirectURL();
                        window.open(url, '_blank');
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Invoice
                    </Button>
                  ) : (
                    <div className="flex-1 text-sm text-gray-500 flex items-center justify-center">
                      No invoice
                    </div>
                  )}
                  {payout.certificateDocument && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                      onClick={() => handleViewCertificate(payout.certificateDocument!.getDirectURL())}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Certificate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-[#0f2137] border-teal-500/20">
          <CardHeader>
            <CardTitle className="text-gray-100">Payout History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-400">
              No payouts recorded yet. Click Add Payout to get started.
            </div>
          </CardContent>
        </Card>
      )}

      <AddPayoutDialog open={dialogOpen} onOpenChange={setDialogOpen} />

      {/* Certificate Modal */}
      <Dialog open={certificateModalOpen} onOpenChange={setCertificateModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-[#0f2137] border-teal-500/30">
          <DialogHeader>
            <DialogTitle className="text-gray-100 flex items-center gap-2">
              <Award className="h-5 w-5 text-teal-400" />
              Certificate
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            <img 
              src={selectedCertificateUrl} 
              alt="Certificate" 
              className="max-w-full max-h-[70vh] object-contain rounded-lg border border-teal-500/20"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
