
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

const Customize = () => {
  const [selectedProduct, setSelectedProduct] = useState<'poster' | 'phonecase'>('poster');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedPhoneModel, setSelectedPhoneModel] = useState('iphone14');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getBasePrice = () => {
    if (selectedProduct === 'poster') {
      switch (selectedSize) {
        case 'small': return 19.99;
        case 'medium': return 29.99;
        case 'large': return 39.99;
        default: return 29.99;
      }
    } else {
      return 24.99;
    }
  };

  const getSizeLabel = () => {
    if (selectedProduct === 'poster') {
      switch (selectedSize) {
        case 'small': return '12" x 18"';
        case 'medium': return '18" x 24"';
        case 'large': return '24" x 36"';
        default: return '18" x 24"';
      }
    } else {
      return '';
    }
  };

  const getPhoneModelLabel = () => {
    switch (selectedPhoneModel) {
      case 'iphone14': return 'iPhone 14/15';
      case 'iphone13': return 'iPhone 13';
      case 'iphone12': return 'iPhone 12';
      case 'samsung': return 'Samsung Galaxy S23';
      case 'pixel': return 'Google Pixel 7';
      default: return 'iPhone 14/15';
    }
  };

  const handleAddToCart = () => {
    if (!uploadedImage) {
      toast({
        title: "Please upload an image",
        description: "You need to upload an image to customize your product.",
        variant: "destructive"
      });
      return;
    }

    const productName = selectedProduct === 'poster' 
      ? `Custom Poster (${getSizeLabel()})` 
      : `Custom Phone Case (${getPhoneModelLabel()})`;
    
    addToCart({
      id: `custom-${selectedProduct}-${Date.now()}`,
      name: productName,
      price: getBasePrice(),
      image: uploadedImage,
      quantity: 1,
      category: selectedProduct
    });

    toast({
      title: "Added to cart",
      description: `Your custom ${selectedProduct} has been added to your cart.`,
    });

    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-mafia-gold mb-6">Create Your Custom Design</h1>
      
      <Tabs defaultValue="poster" className="w-full" onValueChange={(v) => setSelectedProduct(v as 'poster' | 'phonecase')}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="poster">Custom Poster</TabsTrigger>
          <TabsTrigger value="phonecase">Custom Phone Case</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-mafia-gray/20 rounded-lg p-6 space-y-6">
            <TabsContent value="poster" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-mafia-gold mb-3">Select Size</h3>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small">Small (12" x 18")</Label>
                    </div>
                    <span className="font-semibold">$19.99</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium (18" x 24")</Label>
                    </div>
                    <span className="font-semibold">$29.99</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">Large (24" x 36")</Label>
                    </div>
                    <span className="font-semibold">$39.99</span>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="phonecase" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-mafia-gold mb-3">Select Phone Model</h3>
                <RadioGroup value={selectedPhoneModel} onValueChange={setSelectedPhoneModel} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="iphone14" id="iphone14" />
                    <Label htmlFor="iphone14">iPhone 14/15</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="iphone13" id="iphone13" />
                    <Label htmlFor="iphone13">iPhone 13</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="iphone12" id="iphone12" />
                    <Label htmlFor="iphone12">iPhone 12</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="samsung" id="samsung" />
                    <Label htmlFor="samsung">Samsung Galaxy S23</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pixel" id="pixel" />
                    <Label htmlFor="pixel">Google Pixel 7</Label>
                  </div>
                </RadioGroup>
                <div className="mt-3 text-right font-semibold">$24.99</div>
              </div>
            </TabsContent>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="text-xl font-semibold text-mafia-gold mb-3">Upload Your Design</h3>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="design-upload">Image</Label>
                  <Input 
                    id="design-upload" 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Supported formats: JPG, PNG, GIF. Max file size: 5MB
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-mafia-gold text-mafia-dark hover:bg-mafia-accent"
                disabled={!uploadedImage}
              >
                Add to Cart - ${getBasePrice().toFixed(2)}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold text-mafia-gold mb-4">Preview</h3>
              <div className="bg-mafia-gray/20 rounded-lg overflow-hidden flex items-center justify-center p-4">
                {uploadedImage ? (
                  <div className={`relative ${selectedProduct === 'poster' ? 'aspect-[3/4]' : 'aspect-[9/16]'} w-full max-h-[500px]`}>
                    {selectedProduct === 'phonecase' && (
                      <div className="absolute inset-0 bg-no-repeat bg-contain bg-center pointer-events-none z-10"
                           style={{ backgroundImage: "url('/lovable-uploads/7efc5ca1-819e-488b-b32b-7d264c876101.png')" }}>
                      </div>
                    )}
                    <img 
                      src={uploadedImage} 
                      alt="Your design" 
                      className={`w-full h-full object-contain ${selectedProduct === 'phonecase' ? 'scale-[0.65]' : ''}`} 
                    />
                  </div>
                ) : (
                  <div className="text-center py-20 px-4">
                    <p className="text-gray-400 mb-2">Upload an image to see preview</p>
                    <div className="inline-block p-4 rounded-full bg-mafia-gray/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 bg-mafia-gold/10 rounded-lg p-4 border border-mafia-gold/20">
                <h4 className="font-semibold text-mafia-gold mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span>{selectedProduct === 'poster' ? 'Custom Poster' : 'Custom Phone Case'}</span>
                  </div>
                  {selectedProduct === 'poster' && (
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{getSizeLabel()}</span>
                    </div>
                  )}
                  {selectedProduct === 'phonecase' && (
                    <div className="flex justify-between">
                      <span>Phone Model:</span>
                      <span>{getPhoneModelLabel()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${getBasePrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Customize;
