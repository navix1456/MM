
import React, { useState } from 'react';
import { Search as SearchIcon, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { products } from '@/data/products';

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = searchQuery === '' 
    ? [] 
    : products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSelect = (productId: string) => {
    setOpen(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <Command className="rounded-lg border shadow-md bg-mafia-dark text-mafia-light">
          <div className="flex items-center border-b border-mafia-gray px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              value={searchQuery}
              onValueChange={setSearchQuery}
              placeholder="Search products..." 
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" 
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="text-mafia-light/50 hover:text-mafia-light"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {searchQuery.length > 0 && (
              <>
                <CommandEmpty className="py-6 text-center text-sm text-mafia-light/70">
                  No products found.
                </CommandEmpty>
                <CommandGroup className="text-mafia-light">
                  {filteredProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.id}
                      onSelect={() => handleSelect(product.id)}
                      className="flex items-center px-4 py-2 hover:bg-mafia-gray/30 cursor-pointer"
                    >
                      <div className="mr-2 h-8 w-8 overflow-hidden rounded">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-mafia-light">{product.name}</p>
                        <p className="text-xs text-mafia-light/60">${product.price.toFixed(2)}</p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
