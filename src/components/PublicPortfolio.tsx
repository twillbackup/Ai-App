import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Calendar,
  User,
  Briefcase,
  Award,
  TrendingUp,
  Share2,
  Copy,
  Check,
  Star,
  Code,
  Palette,
  Zap,
  Heart,
  Download,
  Eye,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  Play,
  ChevronDown
} from 'lucide-react';
import { database } from '../lib/database';

interface PublicPortfolioProps {
  slug: string;
}

const PublicPortfolio: React.FC<PublicPortfolioProps> = ({ slug }) => {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadPortfolio();
    setIsVisible(true);
  }, [slug]);

  const loadPortfolio = async () => {
    setLoading(true);
    
    // Enhanced portfolio data with images and animations
    const samplePortfolio = {
      id: '1',
      business_name: 'Ayyan Digital Solutions',
      tagline: 'Transforming businesses through innovative digital solutions',
      description: `I'm a passionate digital entrepreneur with over 5 years of experience in building scalable web applications and helping businesses grow through technology. 

My expertise spans across full-stack development, AI integration, and business strategy. I've successfully delivered 50+ projects for clients ranging from startups to enterprise companies.

I believe in creating solutions that not only solve problems but also drive meaningful business growth. My approach combines technical excellence with strategic thinking to deliver results that matter.`,
      hero_image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      profile_image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      services: [
        {
          title: 'Full-Stack Web Development',
          description: 'Modern web applications using React, Node.js, and cloud technologies',
          icon: Code,
          image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
        },
        {
          title: 'AI & Machine Learning Integration',
          description: 'Intelligent solutions that automate and optimize business processes',
          icon: Zap,
          image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
        },
        {
          title: 'Business Process Automation',
          description: 'Streamline operations with custom automation solutions',
          icon: TrendingUp,
          image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
        },
        {
          title: 'Digital Marketing Strategy',
          description: 'Data-driven marketing campaigns that deliver results',
          icon: Palette,
          image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
        },
        {
          title: 'E-commerce Solutions',
          description: 'Complete online stores with payment integration and analytics',
          icon: Globe,
          image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
        },
        {
          title: 'Mobile App Development',
          description: 'Cross-platform mobile applications for iOS and Android',
          icon: User,
          image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
        }
      ],
      portfolio_items: [
        {
          title: 'E-commerce Platform',
          description: 'Modern online store with AI-powered recommendations',
          image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          link: 'https://example.com'
        },
        {
          title: 'AI Business Assistant',
          description: 'Comprehensive SaaS platform for business automation',
          image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          tech: ['React', 'TypeScript', 'Supabase', 'OpenAI'],
          link: 'https://example.com'
        },
        {
          title: 'Healthcare Management System',
          description: 'Patient management and appointment scheduling platform',
          image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          tech: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
          link: 'https://example.com'
        }
      ],
      contact_info: {
        email: 'ayyan@digitalsolutions.com',
        phone: '+92 300 1234567',
        address: 'Karachi, Pakistan'
      },
      social_links: {
        website: 'https://ayyandigital.com',
        linkedin: 'https://linkedin.com/in/ayyan',
        github: 'https://github.com/ayyan',
        twitter: 'https://twitter.com/ayyan',
        instagram: 'https://instagram.com/ayyan'
      },
      is_public: true,
      slug: 'ayyan',
      stats: {
        projects_completed: 52,
        clients_served: 28,
        years_experience: 5,
        success_rate: 98
      },
      tools: [
        'React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'AWS', 
        'Docker', 'TensorFlow', 'Figma', 'Supabase', 'Next.js', 'Vue.js'
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          company: 'TechStart Inc.',
          text: 'Ayyan delivered an exceptional e-commerce platform that increased our sales by 300%. His attention to detail and technical expertise are outstanding.',
          rating: 5,
          image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          name: 'Ahmed Khan',
          company: 'Digital Marketing Pro',
          text: 'Professional, reliable, and delivers on time. The AI integration he built saved us 20 hours per week and transformed our workflow.',
          rating: 5,
          image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          name: 'Maria Rodriguez',
          company: 'Healthcare Solutions',
          text: 'The patient management system Ayyan developed has revolutionized our clinic operations. Highly recommended for any healthcare technology needs.',
          rating: 5,
          image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        }
      ]
    };
    
    setPortfolio(samplePortfolio);
    setLoading(false);
  };

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'instagram': return Instagram;
      case 'facebook': return Facebook;
      case 'website': return Globe;
      default: return ExternalLink;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-white text-xl font-medium">Loading portfolio...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Portfolio Not Found</h1>
          <p className="text-red-200">The portfolio you're looking for doesn't exist or is not public.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {portfolio.business_name}
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['about', 'services', 'portfolio', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`capitalize transition-all duration-300 ${
                    activeSection === section 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={copyPortfolioLink}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={portfolio.hero_image} 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>
        
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <img 
              src={portfolio.profile_image}
              alt={portfolio.business_name}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-2xl animate-bounce-in"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in">
            {portfolio.business_name}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
            {portfolio.tagline}
          </p>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { label: 'Projects', value: portfolio.stats.projects_completed, suffix: '+' },
              { label: 'Clients', value: portfolio.stats.clients_served, suffix: '+' },
              { label: 'Years', value: portfolio.stats.years_experience, suffix: '+' },
              { label: 'Success', value: portfolio.stats.success_rate, suffix: '%' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in" style={{ animationDelay: '1s' }}>
            <button
              onClick={() => setActiveSection('contact')}
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <Mail className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-semibold">Get In Touch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setActiveSection('portfolio')}
              className="flex items-center space-x-2 px-6 py-4 border-2 border-white/20 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              <span>View Work</span>
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {portfolio.description.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-300 leading-relaxed text-lg animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
                  <Code className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold text-white mb-2">Development</h3>
                  <p className="text-gray-400 text-sm">Full-stack solutions</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
                  <Zap className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="font-semibold text-white mb-2">AI Integration</h3>
                  <p className="text-gray-400 text-sm">Smart automation</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
                  <TrendingUp className="w-8 h-8 text-indigo-400 mb-4" />
                  <h3 className="font-semibold text-white mb-2">Strategy</h3>
                  <p className="text-gray-400 text-sm">Business growth</p>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
                  <Palette className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="font-semibold text-white mb-2">Design</h3>
                  <p className="text-gray-400 text-sm">User experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions to transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.services.map((service: any, index: number) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing some of my best projects and achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {portfolio.portfolio_items.map((item: any, index: number) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full text-sm border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tools & Technologies
            </h2>
            <p className="text-xl text-gray-300">
              Cutting-edge technologies I use to build amazing solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {portfolio.tools.map((tool: string, index: number) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium group-hover:text-blue-400 transition-colors duration-300">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-300">
              What my clients say about working with me
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.testimonials.map((testimonial: any, index: number) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business? Let's discuss your next project
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                
                <div className="space-y-4">
                  {portfolio.contact_info.email && (
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <a 
                          href={`mailto:${portfolio.contact_info.email}`}
                          className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
                        >
                          {portfolio.contact_info.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {portfolio.contact_info.phone && (
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <a 
                          href={`tel:${portfolio.contact_info.phone}`}
                          className="text-white hover:text-green-400 transition-colors duration-300 font-medium"
                        >
                          {portfolio.contact_info.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {portfolio.contact_info.address && (
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-medium">{portfolio.contact_info.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Social Links */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(portfolio.social_links).map(([platform, url]) => {
                    if (!url) return null;
                    const IconComponent = getSocialIcon(platform);
                    return (
                      <a 
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-3 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 transform hover:scale-105"
                      >
                        <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        <span className="capitalize text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                          {platform}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <Heart className="w-16 h-16 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Start?
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Let's bring your vision to life with cutting-edge technology and creative solutions.
                </p>
                
                <a
                  href={`mailto:${portfolio.contact_info.email}?subject=Project Inquiry&body=Hi Ayyan,%0D%0A%0D%0AI'm interested in discussing a project with you.%0D%0A%0D%0AProject details:%0D%0A- %0D%0A%0D%0ABest regards`}
                  className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <Mail className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="font-semibold">Start a Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {portfolio.business_name}
              </span>
            </div>
            
            <p className="text-gray-400 mb-6">
              Transforming businesses through innovative digital solutions
            </p>
            
            <div className="flex justify-center space-x-6 mb-6">
              {Object.entries(portfolio.social_links).map(([platform, url]) => {
                if (!url) return null;
                const IconComponent = getSocialIcon(platform);
                return (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group"
                  >
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
            
            <p className="text-gray-500 text-sm">
              © 2024 {portfolio.business_name}. All rights reserved. Built with ❤️ for amazing clients.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortfolio;