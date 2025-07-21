import React, { useState, useEffect } from 'react';
import {
    Globe,
    Edit,
    Eye,
    Share2,
    Save,
    Plus,
    Trash2,
    ExternalLink,
    Copy,
    Check,
    Upload,
    Image as ImageIcon,
    Palette,
    Sparkles
} from 'lucide-react';
import { database } from '../lib/database';
import ImageUpload from './ImageUpload';

interface PortfolioBuilderProps {
    user: any;
}

const PortfolioBuilder: React.FC<PortfolioBuilderProps> = ({ user }) => {
    const [portfolio, setPortfolio] = useState({
        business_name: '',
        tagline: '',
        description: '',
        logo: '',
        hero_image: '',
        profile_image: '',
        services: [''],
        portfolio_items: [
            {
                title: '',
                description: '',
                image: '',
                tech: [''],
                link: ''
            }
        ],
        contact_info: {
            email: '',
            phone: '',
            address: ''
        },
        social_links: {
            website: '',
            linkedin: '',
            facebook: '',
            twitter: '',
            instagram: '',
            github: ''
        },
        theme_settings: {
            primary_color: '#3B82F6',
            secondary_color: '#8B5CF6',
            accent_color: '#10B981',
            background_style: 'gradient'
        },
        is_public: false,
        slug: '',
        unique_id: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');

    useEffect(() => {
        loadPortfolio();
    }, [user]);

    const loadPortfolio = async () => {
        if (!user) return;

        setLoading(true);
        const { data, error } = await database.getPortfolio(user.id);

        if (data) {
            setPortfolio(data);
        } else {
            // Initialize with user data
            setPortfolio(prev => ({
                ...prev,
                business_name: user.company || `${user.name}'s Business`,
                contact_info: {
                    ...prev.contact_info,
                    email: user.email
                },
                slug: user.name.toLowerCase().replace(/\s+/g, '-'),
                unique_id: `portfolio-${user.id}-${Date.now()}`
            }));
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);

        if (!user) {
            alert('Please log in to save your portfolio');
            setSaving(false);
            return;
        }

        if (!portfolio.business_name.trim()) {
            alert('Please enter a business name');
            setSaving(false);
            return;
        }
        const portfolioData = {
            ...portfolio,
            slug: portfolio.slug || `${portfolio.business_name.toLowerCase().replace(/\s+/g, '-')}-${user.id}`,
            unique_id: portfolio.unique_id || `portfolio-${user.id}-${Date.now()}`
        };

        console.log('💾 Saving portfolio:', portfolioData);
        const { data, error } = await database.createOrUpdatePortfolio(portfolioData);

        if (!error && data) {
            setPortfolio(data);
            console.log('✅ Portfolio saved successfully:', data);
            alert(`Portfolio saved successfully! ${data.is_public ? `Your portfolio is now live at: ${window.location.origin}/portfolio/${data.slug}` : 'Make it public to share with others.'}`);
        } else {
            console.error('❌ Portfolio save error:', error);
            alert(`Error saving portfolio: ${error?.message || 'Please try again.'}`);
        }

        setSaving(false);
    };

    const addService = () => {
        setPortfolio(prev => ({
            ...prev,
            services: [...prev.services, '']
        }));
    };

    const removeService = (index: number) => {
        setPortfolio(prev => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index)
        }));
    };

    const updateService = (index: number, value: string) => {
        setPortfolio(prev => ({
            ...prev,
            services: prev.services.map((service, i) => i === index ? value : service)
        }));
    };

    const addPortfolioItem = () => {
        setPortfolio(prev => ({
            ...prev,
            portfolio_items: [...prev.portfolio_items, {
                title: '',
                description: '',
                image: '',
                tech: [''],
                link: ''
            }]
        }));
    };

    const removePortfolioItem = (index: number) => {
        setPortfolio(prev => ({
            ...prev,
            portfolio_items: prev.portfolio_items.filter((_, i) => i !== index)
        }));
    };

    const updatePortfolioItem = (index: number, field: string, value: any) => {
        setPortfolio(prev => ({
            ...prev,
            portfolio_items: prev.portfolio_items.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addTechToItem = (itemIndex: number) => {
        setPortfolio(prev => ({
            ...prev,
            portfolio_items: prev.portfolio_items.map((item, i) => 
                i === itemIndex ? { ...item, tech: [...item.tech, ''] } : item
            )
        }));
    };

    const removeTechFromItem = (itemIndex: number, techIndex: number) => {
        setPortfolio(prev => ({
            ...prev,
            portfolio_items: prev.portfolio_items.map((item, i) => 
                i === itemIndex ? { ...item, tech: item.tech.filter((_, ti) => ti !== techIndex) } : item
            )
        }));
    };

    const updateTechInItem = (itemIndex: number, techIndex: number, value: string) => {
        setPortfolio(prev => ({
            ...prev,
            portfolio_items: prev.portfolio_items.map((item, i) => 
                i === itemIndex ? { 
                    ...item, 
                    tech: item.tech.map((tech, ti) => ti === techIndex ? value : tech)
                } : item
            )
        }));
    };

    const copyPortfolioLink = () => {
        if (!portfolio.slug) {
            alert('Please save your portfolio first to generate a link');
            return;
        }
        const link = `${window.location.origin}/portfolio/${portfolio.slug}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateUniqueLink = () => {
        if (!user || !portfolio.business_name) {
            alert('Please fill in business name first');
            return '';
        }
        const uniqueId = `${user.id}-${Date.now()}`;
        const newSlug = `${portfolio.business_name.toLowerCase().replace(/\s+/g, '-')}-${uniqueId}`;
        setPortfolio(prev => ({ ...prev, slug: newSlug, unique_id: uniqueId }));
        return `${window.location.origin}/portfolio/${newSlug}`;
    };

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: Edit },
        { id: 'images', label: 'Images & Logo', icon: ImageIcon },
        { id: 'services', label: 'Services', icon: Sparkles },
        { id: 'portfolio', label: 'Portfolio Items', icon: Globe },
        { id: 'theme', label: 'Theme & Style', icon: Palette }
    ];

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-gray-400">Loading portfolio...</p>
            </div>
        );
    }

    if (previewMode) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Portfolio Preview</h1>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setPreviewMode(false)}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                        {portfolio.is_public && (
                            <button
                                onClick={copyPortfolioLink}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                <span>{copied ? 'Copied!' : 'Share Link'}</span>
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Portfolio Preview Component would go here */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div 
                        className="h-64 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 flex items-center justify-center"
                        style={{
                            background: portfolio.hero_image 
                                ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${portfolio.hero_image})`
                                : `linear-gradient(to right, ${portfolio.theme_settings.primary_color}, ${portfolio.theme_settings.secondary_color})`
                        }}
                    >
                        <div className="text-center">
                            {portfolio.logo && (
                                <img 
                                    src={portfolio.logo} 
                                    alt="Logo" 
                                    className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-white"
                                />
                            )}
                            <h1 className="text-4xl font-bold mb-2">{portfolio.business_name}</h1>
                            <p className="text-xl opacity-90">{portfolio.tagline}</p>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">About</h2>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{portfolio.description}</p>
                        </section>
                        
                        {portfolio.services.filter(s => s.trim()).length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Services</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {portfolio.services.filter(service => service.trim()).map((service, index) => (
                                        <div key={index} className="p-4 bg-slate-50 dark:bg-gray-700 rounded-lg border">
                                            <p className="font-medium text-slate-800 dark:text-white">{service}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {portfolio.portfolio_items.filter(item => item.title.trim()).length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Portfolio</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {portfolio.portfolio_items.filter(item => item.title.trim()).map((item, index) => (
                                        <div key={index} className="bg-slate-50 dark:bg-gray-700 rounded-lg overflow-hidden border">
                                            {item.image && (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
                                            <div className="p-4">
                                                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                                                <p className="text-slate-600 dark:text-gray-300 text-sm mb-3">{item.description}</p>
                                                {item.tech.filter(t => t.trim()).length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {item.tech.filter(tech => tech.trim()).map((tech, techIndex) => (
                                                            <span 
                                                                key={techIndex}
                                                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                {item.link && (
                                                    <a 
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        <span>View Project</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Portfolio Builder</h1>
                    <p className="text-slate-600 dark:text-gray-400 mt-1">Create your professional animated portfolio</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setPreviewMode(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700">
                <div className="border-b border-slate-200 dark:border-gray-700">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300'
                                    }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Basic Information Tab */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Business Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={portfolio.business_name}
                                        onChange={(e) => setPortfolio(prev => ({ ...prev, business_name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="Your Business Name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Tagline
                                    </label>
                                    <input
                                        type="text"
                                        value={portfolio.tagline}
                                        onChange={(e) => setPortfolio(prev => ({ ...prev, tagline: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="A brief, catchy description"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={portfolio.description}
                                    onChange={(e) => setPortfolio(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none dark:bg-gray-700 dark:text-white"
                                    placeholder="Tell visitors about your business..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    Portfolio URL Slug
                                </label>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mb-2">
                                    This will be your portfolio's web address. Save your portfolio to activate the link.
                                </p>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-600 text-slate-500 dark:text-gray-400 text-sm">
                                        {window.location.origin}/portfolio/
                                    </span>
                                    <input
                                        type="text"
                                        value={portfolio.slug}
                                        onChange={(e) => setPortfolio(prev => ({ 
                                            ...prev, 
                                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-') 
                                        }))}
                                        className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder={portfolio.business_name ? `${portfolio.business_name.toLowerCase().replace(/\s+/g, '-')}-${user?.id || 'user'}` : 'your-business-name'}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                                    Only lowercase letters, numbers, and hyphens allowed
                                </p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_public"
                                    checked={portfolio.is_public}
                                    onChange={(e) => setPortfolio(prev => ({ ...prev, is_public: e.target.checked }))}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="is_public" className="text-sm text-slate-700 dark:text-gray-300">
                                    Make portfolio public (visible to everyone)
                                </label>
                            </div>

                            {/* Contact Information */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={portfolio.contact_info.email}
                                            onChange={(e) => setPortfolio(prev => ({
                                                ...prev,
                                                contact_info: { ...prev.contact_info, email: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="contact@yourbusiness.com"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={portfolio.contact_info.phone}
                                            onChange={(e) => setPortfolio(prev => ({
                                                ...prev,
                                                contact_info: { ...prev.contact_info, phone: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="+1 300 1234567"
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        value={portfolio.contact_info.address}
                                        onChange={(e) => setPortfolio(prev => ({
                                            ...prev,
                                            contact_info: { ...prev.contact_info, address: e.target.value }
                                        }))}
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none dark:bg-gray-700 dark:text-white"
                                        placeholder="Your business address"
                                    />
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Social Links</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(portfolio.social_links).map(([platform, url]) => (
                                        <div key={platform}>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 capitalize">
                                                {platform}
                                            </label>
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) => setPortfolio(prev => ({
                                                    ...prev,
                                                    social_links: { ...prev.social_links, [platform]: e.target.value }
                                                }))}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder={`https://${platform}.com/yourprofile`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Images & Logo Tab */}
                    {activeTab === 'images' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <ImageUpload
                                    label="Business Logo"
                                    currentImage={portfolio.logo}
                                    onImageUpload={(imageUrl) => setPortfolio(prev => ({ ...prev, logo: imageUrl }))}
                                />
                                
                                <ImageUpload
                                    label="Profile/Team Image"
                                    currentImage={portfolio.profile_image}
                                    onImageUpload={(imageUrl) => setPortfolio(prev => ({ ...prev, profile_image: imageUrl }))}
                                />
                            </div>
                            
                            <ImageUpload
                                label="Hero Background Image"
                                currentImage={portfolio.hero_image}
                                onImageUpload={(imageUrl) => setPortfolio(prev => ({ ...prev, hero_image: imageUrl }))}
                            />
                        </div>
                    )}

                    {/* Services Tab */}
                    {activeTab === 'services' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Services</h3>
                                <button
                                    onClick={addService}
                                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Service</span>
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {portfolio.services.map((service, index) => (
                                    <div key={index} className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={service}
                                            onChange={(e) => updateService(index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Service name"
                                        />
                                        {portfolio.services.length > 1 && (
                                            <button
                                                onClick={() => removeService(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Portfolio Items Tab */}
                    {activeTab === 'portfolio' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Portfolio Items</h3>
                                <button
                                    onClick={addPortfolioItem}
                                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Project</span>
                                </button>
                            </div>
                            
                            {portfolio.portfolio_items.map((item, index) => (
                                <div key={index} className="p-6 border border-slate-200 dark:border-gray-600 rounded-lg space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-slate-800 dark:text-white">Project {index + 1}</h4>
                                        {portfolio.portfolio_items.length > 1 && (
                                            <button
                                                onClick={() => removePortfolioItem(index)}
                                                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                                Project Title
                                            </label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => updatePortfolioItem(index, 'title', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="Project name"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                                Project Link
                                            </label>
                                            <input
                                                type="url"
                                                value={item.link}
                                                onChange={(e) => updatePortfolioItem(index, 'link', e.target.value)}
                                                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="https://project-url.com"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => updatePortfolioItem(index, 'description', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none dark:bg-gray-700 dark:text-white"
                                            placeholder="Project description"
                                        />
                                    </div>
                                    
                                    <ImageUpload
                                        label="Project Image"
                                        currentImage={item.image}
                                        onImageUpload={(imageUrl) => updatePortfolioItem(index, 'image', imageUrl)}
                                    />
                                    
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                                                Technologies Used
                                            </label>
                                            <button
                                                onClick={() => addTechToItem(index)}
                                                className="text-sm text-blue-600 hover:text-blue-700"
                                            >
                                                + Add Tech
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {item.tech.map((tech, techIndex) => (
                                                <div key={techIndex} className="flex space-x-2">
                                                    <input
                                                        type="text"
                                                        value={tech}
                                                        onChange={(e) => updateTechInItem(index, techIndex, e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                        placeholder="Technology name"
                                                    />
                                                    {item.tech.length > 1 && (
                                                        <button
                                                            onClick={() => removeTechFromItem(index, techIndex)}
                                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Theme & Style Tab */}
                    {activeTab === 'theme' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Theme Customization</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Primary Color
                                    </label>
                                    <input
                                        type="color"
                                        value={portfolio.theme_settings.primary_color}
                                        onChange={(e) => setPortfolio(prev => ({
                                            ...prev,
                                            theme_settings: { ...prev.theme_settings, primary_color: e.target.value }
                                        }))}
                                        className="w-full h-10 border border-slate-300 dark:border-gray-600 rounded-lg"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Secondary Color
                                    </label>
                                    <input
                                        type="color"
                                        value={portfolio.theme_settings.secondary_color}
                                        onChange={(e) => setPortfolio(prev => ({
                                            ...prev,
                                            theme_settings: { ...prev.theme_settings, secondary_color: e.target.value }
                                        }))}
                                        className="w-full h-10 border border-slate-300 dark:border-gray-600 rounded-lg"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Accent Color
                                    </label>
                                    <input
                                        type="color"
                                        value={portfolio.theme_settings.accent_color}
                                        onChange={(e) => setPortfolio(prev => ({
                                            ...prev,
                                            theme_settings: { ...prev.theme_settings, accent_color: e.target.value }
                                        }))}
                                        className="w-full h-10 border border-slate-300 dark:border-gray-600 rounded-lg"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    Background Style
                                </label>
                                <select
                                    value={portfolio.theme_settings.background_style}
                                    onChange={(e) => setPortfolio(prev => ({
                                        ...prev,
                                        theme_settings: { ...prev.theme_settings, background_style: e.target.value }
                                    }))}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="gradient">Gradient</option>
                                    <option value="solid">Solid Color</option>
                                    <option value="pattern">Pattern</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Portfolio Link */}
            {portfolio.is_public && portfolio.slug && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">🎉 Portfolio is Live!</h3>
                            <p className="text-green-700 dark:text-green-400 text-sm mb-3">
                                Your beautiful, animated portfolio is now publicly accessible:
                            </p>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700 mb-3">
                                <code className="text-green-800 dark:text-green-300 text-sm font-mono">
                                    {window.location.origin}/portfolio/{portfolio.slug}
                                </code>
                            </div>
                            <div className="mb-3">
                                <p className="text-xs text-green-600 dark:text-green-400 mb-2">
                                    This is your unique portfolio URL linked to your account. All your portfolio data will be displayed dynamically.
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-400">
                                    💡 Tip: Save your portfolio first, then the link will work correctly!
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-green-600 dark:text-green-400">
                                <span className="flex items-center space-x-1">
                                    <span>✨</span>
                                    <span>Animated Design</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <span>📱</span>
                                    <span>Mobile Responsive</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <span>🚀</span>
                                    <span>Fast Loading</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <span>🎨</span>
                                    <span>Custom Branding</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <span>🔗</span>
                                    <span>Unique User Link</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={copyPortfolioLink}
                                disabled={!portfolio.slug}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                <span>{copied ? 'Copied!' : 'Share Link'}</span>
                            </button>
                            <a
                                href={`${window.location.origin}/portfolio/${portfolio.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-center ${
                                    portfolio.slug 
                                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                }`}
                                onClick={(e) => {
                                    if (!portfolio.slug) {
                                        e.preventDefault();
                                        alert('Please save your portfolio first!');
                                    }
                                }}
                            >
                                <Eye className="w-4 h-4" />
                                <span>View Live</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioBuilder;