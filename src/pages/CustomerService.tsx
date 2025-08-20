import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MessageCircle, Clock, HelpCircle, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CustomerService = () => {
  const serviceOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk to our experts directly",
      contact: "1800-123-4567",
      availability: "24/7 Available",
      badge: "Instant"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your queries via email",
      contact: "support@indiveghub.com",
      availability: "Response in 2-4 hours",
      badge: "Detailed"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      availability: "Mon-Sat, 9 AM - 8 PM",
      badge: "Quick"
    }
  ];

  const faqCategories = [
    {
      title: "Orders & Delivery",
      questions: [
        "How to track my order?",
        "What are the delivery charges?",
        "Can I modify my order?",
        "Delivery time estimates"
      ]
    },
    {
      title: "Products & Quality",
      questions: [
        "How to ensure freshness?",
        "Return policy for damaged items",
        "Organic certification",
        "Storage recommendations"
      ]
    },
    {
      title: "Account & Payments",
      questions: [
        "How to create an account?",
        "Payment methods accepted",
        "Refund process",
        "Loyalty programs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Customer Service</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help! Get in touch with our friendly support team for any questions or concerns.
            </p>
          </div>

          {/* Service Hours */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Customer Service Hours: Monday to Saturday, 9:00 AM - 8:00 PM IST</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6">
            {serviceOptions.map((option, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <option.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">{option.badge}</Badge>
                  </div>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">{option.contact}</p>
                    <p className="text-sm text-muted-foreground">{option.availability}</p>
                  </div>
                  <Button className="w-full">Get Support</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Help */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* FAQ Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-primary">{category.title}</h4>
                    <ul className="space-y-1">
                      {category.questions.map((question, qIndex) => (
                        <li key={qIndex} className="text-sm text-muted-foreground hover:text-primary cursor-pointer">
                          • {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <a href="/faq">View All FAQs</a>
                </Button>
              </CardContent>
            </Card>

            {/* Service Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Why Choose Our Support?
                </CardTitle>
                <CardDescription>What makes our customer service special</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Expert Team</h4>
                      <p className="text-sm text-muted-foreground">Our team knows vegetables inside and out</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Quick Resolution</h4>
                      <p className="text-sm text-muted-foreground">Most issues resolved within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Multiple Channels</h4>
                      <p className="text-sm text-muted-foreground">Reach us via phone, email, or chat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Follow-up Support</h4>
                      <p className="text-sm text-muted-foreground">We ensure your issue is completely resolved</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <a href="/contact">Contact Us Now</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerService;