import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Phone, Lock, Smartphone } from 'lucide-react';
import { DEMO_CREDENTIALS } from '@/data/demoData';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !password) {
      toast({
        title: "Error",
        description: "Please enter both mobile number and password.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const success = await login(mobile, password);
    setLoading(false);

    if (success) {
      toast({
        title: "Login successful!",
        description: "Welcome back to IndiVeg Hub!"
      });
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid mobile number or password.",
        variant: "destructive"
      });
    }
  };

  const handleSendOtp = () => {
    if (!mobile) {
      toast({
        title: "Error",
        description: "Please enter your mobile number.",
        variant: "destructive"
      });
      return;
    }

    // Simulate OTP sending
    setOtpSent(true);
    toast({
      title: "OTP Sent!",
      description: `OTP sent to ${mobile}. Use ${DEMO_CREDENTIALS.otp} for demo.`
    });
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !otp) {
      toast({
        title: "Error",
        description: "Please enter both mobile number and OTP.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const success = await login(mobile, undefined, otp);
    setLoading(false);

    if (success) {
      toast({
        title: "Login successful!",
        description: "Welcome back to IndiVeg Hub!"
      });
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid mobile number or OTP.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your IndiVeg Hub account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-primary" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="otp">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile-otp">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobile-otp"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <Button type="button" onClick={handleSendOtp} className="w-full btn-secondary">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Send OTP
                  </Button>
                ) : (
                  <form onSubmit={handleOtpLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                      />
                    </div>
                    <Button type="submit" className="w-full btn-primary" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Verify & Sign In
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOtpSent(false)}
                      className="w-full"
                    >
                      Resend OTP
                    </Button>
                  </form>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            
            {/* Demo credentials */}
            <div className="p-4 bg-muted rounded-lg text-sm">
              <div className="font-medium text-center mb-2">Demo Credentials</div>
              <div className="space-y-1 text-muted-foreground">
                <div>Mobile: {DEMO_CREDENTIALS.mobile}</div>
                <div>Password: {DEMO_CREDENTIALS.password}</div>
                <div>OTP: {DEMO_CREDENTIALS.otp}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;