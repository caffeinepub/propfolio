import { useNavigate } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'propfolio');

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/assets/generated/propfolio-logo.dim_200x60.png" 
              alt="Propfolio" 
              className="h-10 mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Professional trading management platform for prop traders
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate({ to: '/privacy-policy' })}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate({ to: '/refund-policy' })}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Refund Policy
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate({ to: '/subscribe' })}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Subscribe
              </button>
              <button
                onClick={() => navigate({ to: '/dashboard/affiliate' })}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Affiliate Program
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {currentYear} Propfolio. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
