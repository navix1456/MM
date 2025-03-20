
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/features/ProductGrid';
import { products } from '@/data/products';

const Index = () => {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  // Get a product from each category for display
  const clothingProduct = products.find(p => p.category === 'clothing');
  const phonecaseProduct = products.find(p => p.category === 'phonecase');
  const posterProduct = products.find(p => p.category === 'poster');

  return (
    <div className="bg-mafia-dark text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center mt-16">
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-[-1]" 
          style={{ backgroundImage: `url(${products[0].images[0]})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-mafia-gold animate-fade-up">
              Premium Merch for True Fans
            </h1>
            <p className="text-xl mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Express yourself with exclusive, high-quality merchandise. From custom apparel to phone cases and posters.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/products">
                <Button className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
                  Shop Now
                </Button>
              </Link>
              <Link to="/customize">
                <Button variant="outline" className="border-mafia-gold text-mafia-gold hover:bg-mafia-gold hover:text-mafia-dark">
                  Customize Merch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-mafia-gold mb-4">Featured Products</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our most popular items, handpicked for quality and style.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} columns={4} featured={true} />
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" className="border-mafia-gold text-mafia-gold hover:bg-mafia-gold hover:text-mafia-dark">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-mafia-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-mafia-gold mb-4">Shop By Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our collections by category to find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Clothing Category */}
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
              <img 
                src={clothingProduct?.images[0] || '/placeholder.svg'} 
                alt="Clothing" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <h3 className="text-2xl font-bold text-mafia-gold mb-4">Clothing</h3>
                <Link to="/products?category=clothing">
                  <Button className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
                    Shop Clothing
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Phone Cases Category */}
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
              <img 
                src={phonecaseProduct?.images[0] || '/placeholder.svg'} 
                alt="Phone Cases" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <h3 className="text-2xl font-bold text-mafia-gold mb-4">Phone Cases</h3>
                <Link to="/products?category=phonecase">
                  <Button className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
                    Shop Cases
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Posters Category */}
            <div className="relative h-80 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
              <img 
                src={posterProduct?.images[0] || '/placeholder.svg'} 
                alt="Posters" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <h3 className="text-2xl font-bold text-mafia-gold mb-4">Posters</h3>
                <Link to="/products?category=poster">
                  <Button className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
                    Shop Posters
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-mafia-gray rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-mafia-gold mb-4">Create Your Custom Design</h2>
              <p className="text-gray-400 mb-6">
                Express your unique style with our custom design tools. Upload your artwork, select your product, and we'll handle the rest. Perfect for gifts, personal expression, or promoting your brand.
              </p>
              <Link to="/customize">
                <Button className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
                  Start Designing
                </Button>
              </Link>
            </div>
            <div className="md:w-1/3">
              <div className="relative aspect-square bg-mafia-dark rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Custom Design" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-mafia-gold text-mafia-dark px-3 py-1 rounded-full text-sm font-bold">
                  Custom
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
