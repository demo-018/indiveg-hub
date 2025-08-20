import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsConditions = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By accessing and using IndiVeg Hub website and mobile application, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms and conditions are subject to change without notice. Continued use of the service constitutes acceptance of any changes.'
      ]
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: Shield,
      content: [
        'IndiVeg Hub provides an online marketplace for purchasing fresh vegetables, fruits, and related products.',
        'We connect customers with local farmers and suppliers to ensure fresh, quality produce.',
        'Our platform includes features for browsing products, placing orders, making payments, and tracking deliveries.',
        'We reserve the right to modify, suspend, or discontinue any part of our services at any time.'
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Registration',
      icon: Scale,
      content: [
        'To place orders, you may need to create an account with accurate and complete information.',
        'You are responsible for maintaining the confidentiality of your account and password.',
        'You must notify us immediately of any unauthorized use of your account.',
        'We reserve the right to refuse service or terminate accounts for any reason.',
        'One person may maintain only one account unless explicitly permitted by us.'
      ]
    },
    {
      id: 'orders-payments',
      title: 'Orders and Payments',
      icon: FileText,
      content: [
        'All orders are subject to acceptance and availability of products.',
        'Prices are subject to change without notice due to market fluctuations.',
        'Payment must be made at the time of ordering unless credit terms have been agreed upon.',
        'We accept various payment methods including UPI, cards, net banking, and cash on delivery.',
        'For weight-based products, final pricing will be determined after actual weighing.',
        'We reserve the right to cancel orders for any reason including stock unavailability.'
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery Terms',
      icon: Shield,
      content: [
        'We strive to deliver within the promised timeframe but are not liable for delays beyond our control.',
        'Delivery charges may apply based on order value and location.',
        'Customers must be available at the delivery address during the specified time slot.',
        'We may attempt delivery up to 3 times; after which the order may be cancelled.',
        'Risk of loss and title for products pass to you upon delivery.'
      ]
    },
    {
      id: 'quality-returns',
      title: 'Product Quality and Returns',
      icon: AlertTriangle,
      content: [
        'We guarantee the freshness and quality of our products at the time of delivery.',
        'Any quality issues must be reported within 24 hours of delivery with photographic evidence.',
        'Returns are accepted only for damaged, spoiled, or incorrect products.',
        'Refunds will be processed to the original payment method within 5-7 business days.',
        'Products that have been consumed or used cannot be returned.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      icon: Shield,
      content: [
        'We collect and use personal information in accordance with our Privacy Policy.',
        'Your personal information is used to process orders, improve services, and communicate with you.',
        'We do not sell or share personal information with third parties except as necessary for service delivery.',
        'You can request access to, correction of, or deletion of your personal data.',
        'We use cookies and similar technologies to enhance user experience.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: Scale,
      content: [
        'All content on IndiVeg Hub including text, graphics, logos, and software is our property or licensed to us.',
        'You may not reproduce, distribute, or create derivative works without written permission.',
        'Product images and descriptions are for reference only and may vary from actual products.',
        'User-generated content (reviews, comments) grants us a license to use for business purposes.'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content: [
        'Our liability is limited to the value of the products purchased.',
        'We are not liable for indirect, incidental, or consequential damages.',
        'We do not guarantee that the service will be uninterrupted or error-free.',
        'In case of disputes, our liability shall not exceed the order value.',
        'These limitations apply to the fullest extent permitted by law.'
      ]
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Jurisdiction',
      icon: Scale,
      content: [
        'These terms are governed by the laws of India.',
        'Any disputes will be subject to the exclusive jurisdiction of courts in Delhi, India.',
        'We will attempt to resolve disputes through negotiation and mediation before litigation.',
        'If any provision of these terms is found invalid, the remaining provisions shall remain in effect.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Terms & Conditions</h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms and conditions carefully before using our services
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline">Last Updated: January 2024</Badge>
              <Badge variant="outline">Version 2.1</Badge>
            </div>
          </div>

          {/* Important Notice */}
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">Important Notice</h3>
                  <p className="text-orange-700 text-sm">
                    By using IndiVeg Hub services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span>{index + 1}. {section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Questions About These Terms?</CardTitle>
              <CardDescription>
                If you have any questions about these Terms and Conditions, please contact us
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Email:</p>
                  <p className="text-muted-foreground">legal@indiveghub.com</p>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p className="text-muted-foreground">1800-123-4567</p>
                </div>
                <div>
                  <p className="font-semibold">Address:</p>
                  <p className="text-muted-foreground">123 Business Park, Delhi, India</p>
                </div>
                <div>
                  <p className="font-semibold">Business Hours:</p>
                  <p className="text-muted-foreground">Mon-Sat, 9 AM - 6 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Links */}
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
              <CardDescription>
                Please also review these important documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <a 
                  href="/return-policy" 
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-center"
                >
                  <h4 className="font-semibold">Return Policy</h4>
                  <p className="text-sm text-muted-foreground">Learn about returns and refunds</p>
                </a>
                <a 
                  href="/faq" 
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-center"
                >
                  <h4 className="font-semibold">FAQ</h4>
                  <p className="text-sm text-muted-foreground">Frequently asked questions</p>
                </a>
                <a 
                  href="/contact" 
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-center"
                >
                  <h4 className="font-semibold">Contact Us</h4>
                  <p className="text-sm text-muted-foreground">Get in touch with support</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;