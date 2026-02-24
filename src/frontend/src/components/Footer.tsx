import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'propfolio-app';

  return (
    <footer className="bg-[#0a192f] border-t border-teal-500/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-100 mb-4">Propfolio</h3>
            <p className="text-gray-400 text-sm">
              The complete portfolio management platform for prop traders.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-100 mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Dashboard</a></li>
              <li><a href="/dashboard/tools" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Tools</a></li>
              <li><a href="/dashboard/exchange" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Exchange</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-100 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="/refund-policy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">Refund Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-100 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-teal-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Propfolio. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
