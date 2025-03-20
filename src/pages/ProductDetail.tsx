
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-mafia-gold mb-4">Product Not Found</h1>
        <p className="text-gray-400 mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate('/products')} className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
          Return to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      category: product.category
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-mafia-gold transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="aspect-square bg-mafia-gray rounded-lg overflow-hidden">
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`aspect-square bg-mafia-gray rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImageIndex === index ? 'border-mafia-gold' : 'border-transparent'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-mafia-gold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-400 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <QuantitySelector 
              quantity={quantity} 
              onChange={setQuantity}
            />
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-mafia-gold text-mafia-dark hover:bg-mafia-accent mb-4"
          >
            Add to Cart
          </Button>
          
          {product.customizable && (
            <Link to="/customize">
              <Button 
                variant="outline"
                className="w-full border-mafia-gold text-mafia-gold hover:bg-mafia-gold/10 mb-4"
              >
                Customize This Design
              </Button>
            </Link>
          )}
          
          <Separator className="my-6 bg-mafia-gray" />
          
          <div>
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Category: {product.category}</li>
              {product.details && product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
