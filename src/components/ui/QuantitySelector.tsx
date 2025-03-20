
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onChange, 
  min = 1, 
  max = 99,
  size = 'sm',
  className
}) => {
  const decrementDisabled = quantity <= min;
  const incrementDisabled = quantity >= max;

  const handleDecrement = () => {
    if (!decrementDisabled) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (!incrementDisabled) {
      onChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: {
      container: 'h-8',
      button: 'h-8 w-8',
      input: 'text-sm w-8'
    },
    md: {
      container: 'h-10',
      button: 'h-10 w-10',
      input: 'text-base w-10'
    },
    lg: {
      container: 'h-12',
      button: 'h-12 w-12',
      input: 'text-lg w-12'
    }
  };

  return (
    <div className={cn(
      'flex items-center border border-mafia-gray/30 rounded-md overflow-hidden bg-mafia-gray/10',
      sizeClasses[size].container,
      className
    )}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDecrement}
        disabled={decrementDisabled}
        className={cn(
          'rounded-none text-mafia-light/70 hover:text-mafia-gold hover:bg-mafia-gray/20',
          decrementDisabled && 'opacity-50 cursor-not-allowed',
          sizeClasses[size].button
        )}
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <div 
        className={cn(
          'flex items-center justify-center border-x border-mafia-gray/30 font-medium text-mafia-light',
          sizeClasses[size].input
        )}
      >
        {quantity}
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleIncrement}
        disabled={incrementDisabled}
        className={cn(
          'rounded-none text-mafia-light/70 hover:text-mafia-gold hover:bg-mafia-gray/20',
          incrementDisabled && 'opacity-50 cursor-not-allowed',
          sizeClasses[size].button
        )}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};
