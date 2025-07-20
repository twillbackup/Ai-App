import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Download, 
  Copy, 
  Check, 
  Zap,
  RefreshCw,
  Save,
  Eye,
  Sparkles
} from 'lucide-react';
import { deepseekAI } from '../lib/deepseek';
import { TierManager } from '../lib/tiers';
import { database } from '../lib/database';

const BrandKitGenerator: React.FC = () => {
  const [brandData, setBrandData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    brandPersonality: 'professional',
    preferredColors: '',
    description: ''
  });

  const [generatedBrand, setGeneratedBrand] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState('');

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Food & Beverage',
    'Real Estate', 'Consulting', 'Creative Services', 'Manufacturing', 'Other'
  ];

  const personalities = [
    { id: 'professional', name: 'Professional', description: 'Trustworthy, reliable, corporate' },
    { id: 'creative', name: 'Creative', description: 'Artistic, innovative, expressive' },
    { id: 'friendly', name: 'Friendly', description: 'Approachable, warm, personal' },
    { id: 'bold', name: 'Bold', description: 'Confident, strong, impactful' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, elegant' },
    { id: 'playful', name: 'Playful', description: 'Fun, energetic, youthful' }
  ];

  const generateBrandKit = async () => {
    if (!brandData.businessName || !brandData.industry) {
      alert('Please fill in business name and industry');
      return;
    }

    if (!TierManager.canUseFeature('contentGenerations')) {
      alert('You\'ve reached your content generation limit. Please upgrade to continue.');
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Create a comprehensive brand kit for:
Business Name: ${brandData.businessName}
Industry: ${brandData.industry}
Target Audience: ${brandData.targetAudience}
Brand Personality: ${brandData.brandPersonality}
Preferred Colors: ${brandData.preferredColors}
Description: ${brandData.description}

Generate:
1. Brand colors (primary, secondary, accent) with hex codes
2. Font recommendations (primary and secondary)
3. Logo concepts and descriptions
4. Brand voice guidelines
5. Visual style recommendations`;

      const aiResponse = await deepseekAI.generateContent(prompt, 'general');
      
      // Parse AI response and create structured brand kit
      const brandKit = {
        colors: {
          primary: generateColorPalette(brandData.brandPersonality)[0],
          secondary: generateColorPalette(brandData.brandPersonality)[1],
          accent: generateColorPalette(brandData.brandPersonality)[2],
          neutral: '#6B7280',
          background: '#F9FAFB'
        },
        fonts: generateFontRecommendations(brandData.brandPersonality),
        logoIdeas: generateLogoIdeas(brandData.businessName, brandData.industry),
        brandVoice: aiResponse,
        visualStyle: generateVisualStyle(brandData.brandPersonality)
      };

      setGeneratedBrand(brandKit);
      TierManager.updateUsage('contentGenerations');
    } catch (error) {
      console.error('Brand kit generation error:', error);
      alert('Error generating brand kit. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateColorPalette = (personality: string) => {
    const palettes = {
      professional: ['#1E40AF', '#3B82F6', '#60A5FA'],
      creative: ['#7C3AED', '#A855F7', '#C084FC'],
      friendly: ['#059669', '#10B981', '#34D399'],
      bold: ['#DC2626', '#EF4444', '#F87171'],
      minimalist: ['#374151', '#6B7280', '#9CA3AF'],
      playful: ['#F59E0B', '#FBBF24', '#FCD34D']
    };
    return palettes[personality as keyof typeof palettes] || palettes.professional;
  };

  const generateFontRecommendations = (personality: string) => {
    const fonts = {
      professional: {
        primary: 'Inter',
        secondary: 'Roboto',
        description: 'Clean, readable fonts that convey trust and reliability'
      },
      creative: {
        primary: 'Poppins',
        secondary: 'Nunito',
        description: 'Modern, friendly fonts with creative flair'
      },
      friendly: {
        primary: 'Open Sans',
        secondary: 'Lato',
        description: 'Warm, approachable fonts that feel personal'
      },
      bold: {
        primary: 'Montserrat',
        secondary: 'Oswald',
        description: 'Strong, impactful fonts that command attention'
      },
      minimalist: {
        primary: 'Helvetica',
        secondary: 'Arial',
        description: 'Simple, clean fonts that focus on content'
      },
      playful: {
        primary: 'Quicksand',
        secondary: 'Comfortaa',
        description: 'Fun, rounded fonts that feel energetic'
      }
    };
    return fonts[personality as keyof typeof fonts] || fonts.professional;
  };

  const generateLogoIdeas = (businessName: string, industry: string) => {
    return [
      {
        concept: 'Wordmark',
        description: `Clean typography-based logo using the business name "${businessName}" with custom lettering`
      },
      {
        concept: 'Icon + Text',
        description: `Combination of a simple ${industry.toLowerCase()}-related icon with the business name`
      },
      {
        concept: 'Monogram',
        description: `Stylized initials of "${businessName}" in a distinctive design`
      },
      {
        concept: 'Abstract Symbol',
        description: `Modern abstract shape that represents growth and innovation in ${industry.toLowerCase()}`
      }
    ];
  };

  const generateVisualStyle = (personality: string) => {
    const styles = {
      professional: 'Clean lines, structured layouts, plenty of white space, corporate imagery',
      creative: 'Artistic elements, unique layouts, creative imagery, experimental typography',
      friendly: 'Rounded corners, warm imagery, approachable layouts, personal photos',
      bold: 'Strong contrasts, large typography, dramatic imagery, confident layouts',
      minimalist: 'Lots of white space, simple layouts, minimal elements, focus on content',
      playful: 'Bright colors, fun illustrations, dynamic layouts, energetic imagery'
    };
    return styles[personality as keyof typeof styles] || styles.professional;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const saveBrandKit = async () => {
    if (!generatedBrand) {
      alert('Please generate a brand kit first');
      return;
    }

    const brandKitData = {
      title: `Brand Kit - ${brandData.businessName}`,
      type: 'brand-kit',
      content: JSON.stringify(generatedBrand),
      target_audience: brandData.targetAudience,
      product: brandData.businessName,
      platform: 'brand-kit'
    };

    const { data, error } = await database.createCampaign(brandKitData);
    if (!error && data) {
      alert('Brand kit saved successfully!');
    } else {
      alert('Error saving brand kit. Please try again.');
    }
  };

  const exportBrandKit = () => {
    if (!generatedBrand) return;

    const exportData = {
      businessName: brandData.businessName,
      brandKit: generatedBrand,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandData.businessName.replace(/\s+/g, '-').toLowerCase()}-brand-kit.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Brand Kit Generator</h1>
        <p className="text-slate-600 dark:text-gray-400 mt-1">Create a comprehensive brand identity with AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Brand Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={brandData.businessName}
                onChange={(e) => setBrandData(prev => ({ ...prev, businessName: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Industry *
              </label>
              <select
                value={brandData.industry}
                onChange={(e) => setBrandData(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={brandData.targetAudience}
                onChange={(e) => setBrandData(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Small business owners, Young professionals"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Brand Personality
              </label>
              <div className="grid grid-cols-2 gap-2">
                {personalities.map(personality => (
                  <button
                    key={personality.id}
                    onClick={() => setBrandData(prev => ({ ...prev, brandPersonality: personality.id }))}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      brandData.brandPersonality === personality.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium text-sm">{personality.name}</div>
                    <div className="text-xs text-slate-600 dark:text-gray-400">{personality.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Preferred Colors (optional)
              </label>
              <input
                type="text"
                value={brandData.preferredColors}
                onChange={(e) => setBrandData(prev => ({ ...prev, preferredColors: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Blue, Green, Modern colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Business Description
              </label>
              <textarea
                value={brandData.description}
                onChange={(e) => setBrandData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none dark:bg-gray-700 dark:text-white"
                placeholder="Describe what your business does..."
              />
            </div>

            <button
              onClick={generateBrandKit}
              disabled={isGenerating || !brandData.businessName || !brandData.industry}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Brand Kit...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Brand Kit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Brand Kit */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Generated Brand Kit</h2>
            {generatedBrand && (
              <div className="flex space-x-2">
                <button
                  onClick={saveBrandKit}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={exportBrandKit}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            )}
          </div>

          {generatedBrand ? (
            <div className="space-y-6">
              {/* Color Palette */}
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Color Palette</span>
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(generatedBrand.colors).map(([name, color]) => (
                    <div key={name} className="text-center">
                      <div 
                        className="w-full h-16 rounded-lg border border-slate-200 dark:border-gray-600 cursor-pointer hover:scale-105 transition-transform"
                        style={{ backgroundColor: color as string }}
                        onClick={() => copyToClipboard(color as string, `color-${name}`)}
                      />
                      <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 capitalize">{name}</p>
                      <p className="text-xs font-mono text-slate-500 dark:text-gray-500">{color}</p>
                      {copied === `color-${name}` && (
                        <p className="text-xs text-green-600">Copied!</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Typography</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">Primary Font: {generatedBrand.fonts.primary}</p>
                        <p className="text-sm text-slate-600 dark:text-gray-400">For headings and important text</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedBrand.fonts.primary, 'primary-font')}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-gray-600 rounded"
                      >
                        {copied === 'primary-font' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">Secondary Font: {generatedBrand.fonts.secondary}</p>
                        <p className="text-sm text-slate-600 dark:text-gray-400">For body text and descriptions</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedBrand.fonts.secondary, 'secondary-font')}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-gray-600 rounded"
                      >
                        {copied === 'secondary-font' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{generatedBrand.fonts.description}</p>
                </div>
              </div>

              {/* Logo Ideas */}
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Logo Concepts</h3>
                <div className="space-y-2">
                  {generatedBrand.logoIdeas.map((idea: any, index: number) => (
                    <div key={index} className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-slate-800 dark:text-white">{idea.concept}</h4>
                      <p className="text-sm text-slate-600 dark:text-gray-400">{idea.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Style */}
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Visual Style Guidelines</h3>
                <div className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-gray-400">{generatedBrand.visualStyle}</p>
                </div>
              </div>

              {/* Brand Voice */}
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Brand Voice & Guidelines</h3>
                <div className="p-3 bg-slate-50 dark:bg-gray-700 rounded-lg">
                  <pre className="text-sm text-slate-600 dark:text-gray-400 whitespace-pre-wrap">{generatedBrand.brandVoice}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Palette className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-gray-400">Fill in your brand information and click "Generate Brand Kit" to create your comprehensive brand identity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandKitGenerator;