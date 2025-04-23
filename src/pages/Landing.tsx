
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ChevronDown, PieChart, Target, Lightbulb, TrendingUp, ShieldCheck, User, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const Landing = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  useEffect(() => {
    setVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateOpacity = (elementPosition: number) => {
    // This creates a fade-in effect as the user scrolls to the element
    const offset = 400; // Adjust based on when you want the element to start fading in
    const opacity = Math.min(1, Math.max(0, (scrollY - elementPosition + offset) / 300));
    return opacity;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 dark:from-background dark:to-finance-navy/20">
      {/* Header with smooth transitions */}
      <header className="w-full py-4 px-6 backdrop-blur-sm bg-white/80 dark:bg-black/20 sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-finance-navy dark:bg-finance-teal flex items-center justify-center">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <h1 className="text-xl font-bold">Money Mentor</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/signin">
              <Button variant="outline" className="hidden sm:flex">
                <User className="mr-2 h-4 w-4" />
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="animate-pulse-gentle">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section with enhanced animations */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
              <div className={`flex-1 max-w-2xl transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Master Your Finances with{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  Insights
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Money Mentor helps you track spending, achieve financial goals, and grow your wealth with personalized AI recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start for Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" onClick={handlePlayVideo} className="w-full sm:w-auto">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
              <div className={`flex-1 glass-card p-4 animate-float shadow-lg transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  {isVideoPlaying ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="Demo Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-finance-mint to-finance-peach/30 dark:from-slate-900 dark:to-finance-navy/50">
                      {/* YouTube Thumbnail */}
                      <img 
                        src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" 
                        alt="Video Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                      <div className="transform transition-transform hover:scale-105 z-10">
                        <div className="flex flex-col items-center">
                          <div 
                            className="rounded-full bg-white/90 dark:bg-black/50 p-4 cursor-pointer hover:bg-white dark:hover:bg-black/70 transition-colors"
                            onClick={handlePlayVideo}
                          >
                            <PlayCircle className="w-12 h-12 text-primary" />
                          </div>
                          <p className="mt-4 font-medium text-gray-900 dark:text-gray-100 bg-white/30 dark:bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">
                            Watch the demo (2:37)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalization Widget */}
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <div className={`max-w-5xl mx-auto glass-card p-6 bg-gradient-to-r from-finance-navy/10 to-finance-teal/10 dark:from-finance-navy/30 dark:to-finance-teal/30 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome, Financial Explorer!</h2>
                  <p className="text-lg text-muted-foreground">
                    You've saved <span className="text-finance-teal font-semibold">₹3,550</span> this month, which is <span className="text-green-500 font-semibold">₹1,240 more</span> than last month! 🎉
                  </p>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-finance-teal to-finance-navy rounded-full"
                      style={{ width: '75%', transition: 'width 1s ease-in-out' }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>Monthly Goal</span>
                    <span className="font-medium">75% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with staggered animations */}
        <section id="features" className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-primary/5 dark:from-background dark:to-finance-navy/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Features for Smarter Finances</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Money Mentor combines powerful AI with intuitive design to give you complete control over your financial journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Insights",
                  description: "Get personalized recommendations based on your spending patterns and financial goals.",
                  icon: <Lightbulb className="h-10 w-10 text-finance-teal" />,
                  delay: "0ms",
                  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "Goal Tracking",
                  description: "Set financial goals and track your progress with visual indicators and smart notifications.",
                  icon: <Target className="h-10 w-10 text-finance-coral" />,
                  delay: "100ms",
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "Expense Analysis",
                  description: "Visualize your spending habits with interactive charts and categorized transactions.",
                  icon: <PieChart className="h-10 w-10 text-finance-gold" />,
                  delay: "200ms",
                  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "Investment Tracking",
                  description: "Monitor your investments and get AI-powered insights on portfolio diversification.",
                  icon: <TrendingUp className="h-10 w-10 text-finance-navy" />,
                  delay: "300ms",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "Financial Tips",
                  description: "Access daily tips and educational content to improve your financial literacy.",
                  icon: <Lightbulb className="h-10 w-10 text-finance-lavender" />,
                  delay: "400ms",
                  image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                },
                {
                  title: "Bank-Level Security",
                  description: "Your data is protected with enterprise-grade encryption and security measures.",
                  icon: <ShieldCheck className="h-10 w-10 text-finance-charcoal" />,
                  delay: "500ms",
                  image: "https://images.unsplash.com/photo-1626179411952-0f27d103c6a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`glass-card overflow-hidden group hover-scale ${
                    index === 0 ? 'animate-delay-100' : 
                    index === 1 ? 'animate-delay-200' : 
                    'animate-delay-300'
                  } fade-in`}
                  style={{ opacity: calculateOpacity(600) }}
                >
                  <div className="h-40 relative overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-background/30 backdrop-blur-sm p-2 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Financial Health Meter */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Financial Health Status</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track your progress and see your financial health improve over time
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto glass-card p-8">
              <div className="flex justify-center mb-8">
                <div className="relative h-60 w-60">
                  {/* Circular progress background */}
                  <div className="absolute inset-0 rounded-full border-8 border-slate-200 dark:border-slate-700"></div>
                  
                  {/* Circular progress indicator */}
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-finance-teal border-r-finance-teal transition-all duration-1000"
                    style={{ transform: 'rotate(108deg)' }} // 108deg = 30% of the circle
                  ></div>
                  
                  {/* Inner circle */}
                  <div className="absolute inset-4 rounded-full bg-background flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-finance-teal">78</span>
                    <span className="text-sm text-muted-foreground">Good</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-background/50 dark:bg-slate-800/50 border border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Debt Management</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">65/100</span>
                    <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 dark:bg-slate-800/50 border border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Savings Rate</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">82/100</span>
                    <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 dark:bg-slate-800/50 border border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Investment Growth</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">88/100</span>
                    <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-finance-teal" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works with enhanced transitions */}
        <section id="how-it-works" className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Money Mentor Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting started is simple. Connect your accounts, set your goals, and let our AI do the rest.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Connect Your Accounts",
                  description: "Securely link your bank accounts, credit cards, and investment portfolios."
                },
                {
                  step: "2",
                  title: "Set Financial Goals",
                  description: "Define what matters to you, whether it's saving for a home, retirement, or paying off debt."
                },
                {
                  step: "3",
                  title: "Get Personalized Insights",
                  description: "Receive AI-powered recommendations tailored to your financial situation and goals."
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-4 animate-float">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials with smooth animations */}
        <section id="testimonials" className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-accent/5 dark:from-background dark:to-finance-navy/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users who have transformed their financial lives with Money Mentor.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Money Mentor helped me save for my dream house in just 18 months. The AI suggestions were spot-on!",
                  author: "Sarah Johnson",
                  role: "Marketing Director",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80"
                },
                {
                  quote: "I've tried many finance apps, but Money Mentor is the first one that actually changed my spending habits.",
                  author: "Michael Chen",
                  role: "Software Engineer",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                },
                {
                  quote: "The investment insights saved me from making costly mistakes. I've increased my portfolio by 24% this year.",
                  author: "Emma Rodriguez",
                  role: "Small Business Owner",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing with interactive hover effects */}
        <section id="pricing" className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your financial needs and goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Basic",
                  price: "$0",
                  description: "Perfect for getting started",
                  features: [
                    "Budget tracking",
                    "Expense categorization",
                    "Basic financial insights",
                    "Up to 2 financial goals",
                    "30-day transaction history"
                  ],
                  cta: "Get Started",
                  popular: false
                },
                {
                  name: "Pro",
                  price: "$9.99",
                  period: "/month",
                  description: "For serious financial planning",
                  features: [
                    "Everything in Basic",
                    "AI-powered recommendations",
                    "Unlimited financial goals",
                    "Investment portfolio tracking",
                    "1-year transaction history",
                    "Custom categories and tags"
                  ],
                  cta: "Start Free Trial",
                  popular: true
                },
                {
                  name: "Premium",
                  price: "$19.99",
                  period: "/month",
                  description: "For financial experts",
                  features: [
                    "Everything in Pro",
                    "Advanced AI insights",
                    "Tax optimization suggestions",
                    "Investment strategy recommendations",
                    "Unlimited transaction history",
                    "Priority customer support"
                  ],
                  cta: "Start Free Trial",
                  popular: false
                }
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={`glass-card p-6 ${
                    plan.popular ? 'border-2 border-primary scale-105 md:scale-110' : 'border border-gray-200 dark:border-gray-700'
                  } relative hover-scale`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex justify-center items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-lg text-muted-foreground">{plan.period || ""}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with gradient animation */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-tr from-primary to-accent text-white relative overflow-hidden">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Finances?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their financial future with Money Mentor.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-white/80">No credit card required. 14-day free trial.</p>
          </div>
        </section>

        {/* FAQ Section with smooth accordions */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "Is my financial data secure?",
                  answer: "Absolutely. Money Mentor uses bank-level 256-bit encryption to secure all your data. We never store your banking credentials, and all connections are read-only."
                },
                {
                  question: "How does the AI provide personalized recommendations?",
                  answer: "Our AI analyzes your spending patterns, income, and financial goals to provide tailored suggestions. It learns from your habits and improves its recommendations over time."
                },
                {
                  question: "Can I connect multiple bank accounts?",
                  answer: "Yes, Money Mentor supports linking multiple accounts from different financial institutions to give you a complete picture of your finances."
                },
                {
                  question: "What if I want to cancel my subscription?",
                  answer: "You can cancel your subscription at any time from your account settings. No long-term commitments, no hidden fees."
                },
                {
                  question: "Is there a mobile app available?",
                  answer: "Yes, Money Mentor is available on iOS and Android devices, providing a seamless experience across all your devices."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6"
                  style={{ opacity: calculateOpacity(2900 + index * 100) }}
                >
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    {faq.question}
                    <ChevronDown className="ml-auto h-5 w-5" />
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer with subtle hover effects */}
      <footer className="py-12 px-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-lg bg-finance-navy dark:bg-finance-teal flex items-center justify-center">
                  <span className="text-white font-bold text-xl">$</span>
                </div>
                <h1 className="text-xl font-bold">Money Mentor</h1>
              </div>
              <p className="text-muted-foreground mb-4">
                Your AI-powered financial assistant for a brighter financial future.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.772 1.153 4.902 4.902 0 01-1.153 1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">API</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; 2025 Money Mentor. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
