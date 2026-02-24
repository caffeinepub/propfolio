import { Heart } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'propfolio-app'
  );

  const socialLinks = [
    { icon: SiFacebook, href: '#', label: 'Facebook', color: 'hover:text-[#1877F2]' },
    { icon: SiX, href: '#', label: 'X (Twitter)', color: 'hover:text-foreground' },
    { icon: SiLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
    { icon: SiInstagram, href: '#', label: 'Instagram', color: 'hover:text-[#E4405F]' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-t border-border/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-gradient-vibrant mb-4">Propfolio</h3>
            <p className="text-muted-foreground mb-4">
              The ultimate financial management platform for prop traders worldwide.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 rounded-full bg-card border border-border transition-all duration-300 ${social.color} hover:shadow-glow hover:scale-110 hover:rotate-12 animate-bounce-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-semibold mb-4 text-gradient">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Features', 'Pricing', 'Support'].map((link, index) => (
                <li key={link} className="animate-slide-in-left" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-2"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold mb-4 text-gradient">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Refund Policy', href: '/refund-policy' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Contact Us', href: '#' },
              ].map((link, index) => (
                <li key={link.label} className="animate-slide-in-left" style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Propfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            Built with{' '}
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gradient-vibrant hover:underline hover:scale-110 transition-transform duration-300 inline-block"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
