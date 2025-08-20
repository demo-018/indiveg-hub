import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock, Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ReturnPolicy = () => {
  const returnReasons = [
    {
      icon: XCircle,
      title: "Damaged Products",
      description: "Items that arrive damaged or spoiled",
      eligibility: "100% refund or replacement",
      timeframe: "Within 24 hours",
      color: "text-red-500"
    },
    {
      icon: AlertTriangle,
      title: "Wrong Items",
      description: "Received different items than ordered",
      eligibility: "Exchange or full refund",
      timeframe: "Within 24 hours",
      color: "text-orange-500"
    },
    {
      icon: Clock,
      title: "Quality Issues",
      description: "Items not meeting freshness standards",
      eligibility: "Replacement or refund",
      timeframe: "Within 12 hours",
      color: "text-yellow-500"
    }
  ];

  const returnProcess = [
    {
      step: 1,
      title: "Contact Us",
      description: "Call our support team or raise a complaint through the app within the specified timeframe."
    },
    {
      step: 2,
      title: "Photo Verification",
      description: "Take clear photos of the damaged or incorrect items as requested by our team."
    },
    {
      step: 3,
      title: "Return Approval",
      description: "Our team will review and approve your return request within 2-4 hours."
    },
    {
      step: 4,
      title: "Pickup/Refund",
      description: "We'll arrange pickup for eligible items or process your refund immediately."
    }
  ];

  const nonReturnableItems = [
    "Items consumed or used",
    "Products returned after the specified timeframe",
    "Items without proper packaging or in altered condition",
    "Products damaged due to customer negligence",
    "Special offers or clearance items (unless damaged)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Return Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your satisfaction is our priority. Learn about our hassle-free return process.
            </p>
          </div>

          {/* Policy Highlights */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">Quality Guarantee</p>
                    <p className="text-sm text-muted-foreground">Fresh or money back</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">24 Hour Window</p>
                    <p className="text-sm text-muted-foreground">Quick return process</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">Easy Process</p>
                    <p className="text-sm text-muted-foreground">No questions asked</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Reasons */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Valid Return Reasons</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {returnReasons.map((reason, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <reason.icon className={`h-6 w-6 ${reason.color}`} />
                      <CardTitle className="text-lg">{reason.title}</CardTitle>
                    </div>
                    <CardDescription>{reason.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Eligibility:</span>
                        <Badge variant="secondary">{reason.eligibility}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Timeframe:</span>
                        <Badge variant="outline">{reason.timeframe}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Return Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Return Process
              </CardTitle>
              <CardDescription>
                Follow these simple steps to return your items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {returnProcess.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Non-Returnable Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                Non-Returnable Items
              </CardTitle>
              <CardDescription>
                Please note that these items cannot be returned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {nonReturnableItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Refund Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Refund Process
                </CardTitle>
                <CardDescription>How we process your refunds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="font-semibold">Refund Timeline:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Digital wallet: Instant</li>
                    <li>• UPI/Bank transfer: 2-3 business days</li>
                    <li>• Credit/Debit card: 5-7 business days</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Refund Method:</p>
                  <p className="text-sm text-muted-foreground">
                    Refunds are processed to the original payment method used for the order.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold">Contact Information:</p>
                  <p className="text-sm text-muted-foreground">Phone: 1800-123-4567</p>
                  <p className="text-sm text-muted-foreground">Email: returns@indiveghub.com</p>
                  <p className="text-sm text-muted-foreground">Hours: 9 AM - 8 PM (Mon-Sat)</p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <a href="/customer-service">Contact Support</a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/faq">View FAQ</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;