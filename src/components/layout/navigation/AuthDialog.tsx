
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, setOpen }) => {
  const { login, register } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(loginEmail, loginPassword);
    setIsLoading(false);
    if (success) {
      setOpen(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await register(registerName, registerEmail, registerPassword);
    setIsLoading(false);
    if (success) {
      setOpen(false);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hidden sm:flex text-mafia-light/80 hover:text-mafia-gold hover:bg-transparent"
        >
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-mafia-dark border-mafia-gray">
        <DialogHeader>
          <DialogTitle className="text-mafia-gold">Account</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-mafia-gray/30">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="bg-mafia-gray/20 border-mafia-gray focus:border-mafia-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="bg-mafia-gray/20 border-mafia-gray focus:border-mafia-gold"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-mafia-gold hover:bg-mafia-gold/80 text-mafia-dark"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input 
                  id="register-name" 
                  type="text" 
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  className="bg-mafia-gray/20 border-mafia-gray focus:border-mafia-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="bg-mafia-gray/20 border-mafia-gray focus:border-mafia-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  className="bg-mafia-gray/20 border-mafia-gray focus:border-mafia-gold"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-mafia-gold hover:bg-mafia-gold/80 text-mafia-dark"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
