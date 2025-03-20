
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  Phone,
  CreditCard,
  ShieldCheck,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-mafia-dark border-t border-mafia-gray/30 pt-16 pb-8 mt-16">
      <div className="container-custom">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-mafia-gray/30 pb-12">
          <div className="flex flex-col items-center text-center">
            <CreditCard className="h-10 w-10 text-mafia-gold mb-4" />
            <h3 className="text-mafia-light text-lg font-medium mb-2">Secure Payment</h3>
            <p className="text-mafia-light/60 text-sm">All transactions are secure and encrypted</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="h-10 w-10 text-mafia-gold mb-4" />
            <h3 className="text-mafia-light text-lg font-medium mb-2">Quality Guarantee</h3>
            <p className="text-mafia-light/60 text-sm">Premium materials for all our products</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Truck className="h-10 w-10 text-mafia-gold mb-4" />
            <h3 className="text-mafia-light text-lg font-medium mb-2">Fast Shipping</h3>
            <p className="text-mafia-light/60 text-sm">Quick delivery across the country</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="h-10 w-10 text-mafia-gold mb-4" />
            <h3 className="text-mafia-light text-lg font-medium mb-2">30-Day Returns</h3>
            <p className="text-mafia-light/60 text-sm">Easy returns if you're not satisfied</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* About & Newsletter */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/3e548e41-8863-46c4-804b-24653ba06cb4.png" 
                alt="MERCH MAFIA" 
                className="h-8 w-auto" 
              />
            </div>
            <p className="text-mafia-light/70 mb-6">
              MERCH MAFIA offers premium clothing, posters, and phone cases with our iconic designs. 
              Join our community and show your style with our exclusive merch.
            </p>
            <div className="mb-6">
              <h3 className="text-mafia-light font-medium mb-3 text-lg">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-mafia-gray/20 border-mafia-gray/60 text-mafia-light focus:border-mafia-gold" 
                />
                <Button size="sm" className="bg-mafia-gold hover:bg-mafia-gold/80 text-mafia-dark">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-mafia-light font-medium mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-mafia-light/70 hover:text-mafia-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-mafia-light/70 hover:text-mafia-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-mafia-light/70 hover:text-mafia-gold transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=poster" className="text-mafia-light/70 hover:text-mafia-gold transition-colors">
                  Posters
                </Link>
              </li>
              <li>
                <Link to="/products?category=phonecase" className="text-mafia-light/70 hover:text-mafia-gold transition-colors">
                  Phone Cases
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-mafia-light/70 hover:text-mafia-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-mafia-light/70 hover:text-mafia-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-mafia-light font-medium mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-mafia-gold mr-3 mt-0.5" />
                <span className="text-mafia-light/70">support@merchmafia.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-mafia-gold mr-3 mt-0.5" />
                <span className="text-mafia-light/70">+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-mafia-light font-medium mb-3 text-lg">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-mafia-gray/30 flex items-center justify-center text-mafia-light hover:bg-mafia-gold/20 hover:text-mafia-gold transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-mafia-gray/30 flex items-center justify-center text-mafia-light hover:bg-mafia-gold/20 hover:text-mafia-gold transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-mafia-gray/30 flex items-center justify-center text-mafia-light hover:bg-mafia-gold/20 hover:text-mafia-gold transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-mafia-gray/30 pt-8 text-center">
          <p className="text-mafia-light/50 text-sm">
            &copy; {new Date().getFullYear()} MERCH MAFIA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
