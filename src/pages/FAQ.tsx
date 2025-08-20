import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, Package, CreditCard, Truck, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: 'orders',
      title: 'Orders & Delivery',
      icon: Package,
      color: 'bg-blue-500',
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our vegetable categories, adding items to your cart, and proceeding to checkout. You can create an account for faster future orders or checkout as a guest.'
        },
        {
          question: 'What are the delivery charges?',
          answer: 'We offer free delivery on orders above ₹500. For orders below ₹500, delivery charges are ₹40. Same-day delivery is available for orders placed before 2 PM.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 1 hour of placing it. After that, the order goes into preparation and cannot be changed. Contact our support team for assistance.'
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order is confirmed, you will receive a tracking link via SMS and email. You can also track your order by visiting the "Order Tracking" page and entering your order ID.'
        },
        {
          question: 'What if I miss my delivery?',
          answer: 'Our delivery team will attempt delivery up to 3 times. If you miss all attempts, the order will be returned to our warehouse. You can reschedule delivery or request a refund.'
        }
      ]
    },
    {
      id: 'products',
      title: 'Products & Quality',
      icon: HelpCircle,
      color: 'bg-green-500',
      faqs: [
        {
          question: 'How do you ensure vegetable freshness?',
          answer: 'We source directly from local farms and maintain a cold chain throughout our supply process. All vegetables are quality-checked before packaging and delivered within 24 hours of harvesting.'
        },
        {
          question: 'Are your vegetables organic?',
          answer: 'We offer both organic and conventionally grown vegetables. Organic products are clearly marked and certified by recognized organic certification bodies in India.'
        },
        {
          question: 'How should I store the vegetables after delivery?',
          answer: 'Most vegetables should be stored in the refrigerator. We include storage instructions with each delivery. Leafy greens should be consumed within 2-3 days, while root vegetables can last up to a week.'
        },
        {
          question: 'What if I receive damaged vegetables?',
          answer: 'We have a 24-hour quality guarantee. If you receive damaged or poor-quality vegetables, contact us immediately with photos for a full refund or replacement.'
        },
        {
          question: 'Do you offer pre-cut vegetables?',
          answer: 'Yes, we offer pre-cut vegetables for popular items like onions, tomatoes, and mixed vegetable combos. These are cut fresh daily and delivered in hygienic packaging.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Pricing',
      icon: CreditCard,
      color: 'bg-purple-500',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets like Paytm, PhonePe, and Google Pay. Cash on delivery is also available in select areas.'
        },
        {
          question: 'Why do vegetable prices vary?',
          answer: 'Vegetable prices fluctuate based on market conditions, seasonality, and availability. We update prices daily to reflect current market rates and ensure fair pricing for both farmers and customers.'
        },
        {
          question: 'How does your pricing work for weight-based items?',
          answer: 'For items sold by weight, we show estimated prices based on average weights. The final amount is calculated after weighing the actual items during packing, and you pay only for what you receive.'
        },
        {
          question: 'Do you offer bulk discounts?',
          answer: 'Yes, we offer special pricing for bulk orders above ₹2000. Contact our customer service team for custom bulk pricing on larger quantities.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, all payment transactions are secured with 256-bit SSL encryption. We do not store your payment information on our servers and comply with PCI DSS standards.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Membership',
      icon: Users,
      color: 'bg-orange-500',
      faqs: [
        {
          question: 'Do I need to create an account to order?',
          answer: 'While you can checkout as a guest, creating an account allows you to track orders, save addresses, view order history, and receive personalized recommendations.'
        },
        {
          question: 'How do I update my delivery address?',
          answer: 'You can update your delivery address in your account settings or during checkout. We deliver to multiple cities across India, and you can save multiple addresses for convenience.'
        },
        {
          question: 'Do you have a loyalty program?',
          answer: 'Yes, our VegPoints loyalty program rewards you with points for every purchase. Earn 1 point per ₹10 spent and redeem points for discounts on future orders.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click on "Forgot Password" on the login page and enter your registered mobile number or email. You will receive an OTP to reset your password.'
        },
        {
          question: 'Can I share my account with family members?',
          answer: 'Yes, you can add multiple delivery addresses and contact numbers to your account. However, for security reasons, we recommend each person have their own account.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find quick answers to common questions about our services
            </p>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {(searchQuery ? filteredFAQs : faqCategories).map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>
                        {category.faqs.length} question{category.faqs.length !== 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {category.faqs.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {searchQuery && filteredFAQs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any FAQs matching your search. Try different keywords or contact our support team.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-primary hover:underline"
                  >
                    Clear search
                  </button>
                  <span className="text-muted-foreground">or</span>
                  <a href="/customer-service" className="text-primary hover:underline">
                    Contact support
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Support */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Our customer service team is ready to help you with any questions or concerns.
              </p>
              <div className="flex gap-2 justify-center">
                <a
                  href="/customer-service"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/order-tracking"
                  className="border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-md transition-colors"
                >
                  Track Order
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

export default FAQ;