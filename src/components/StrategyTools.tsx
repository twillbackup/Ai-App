import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const StrategyTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('growth');

  const tools = [
    { id: 'growth', name: 'Growth Strategy', icon: TrendingUp, description: 'Develop growth plans' },
    { id: 'competitive', name: 'Competitive Analysis', icon: Target, description: 'Analyze competitors' },
    { id: 'market', name: 'Market Research', icon: Users, description: 'Research market trends' },
    { id: 'innovation', name: 'Innovation Hub', icon: Lightbulb, description: 'Generate business ideas' },
  ];

  const growthPlan = [
    { 
      phase: 'Phase 1: Foundation', 
      duration: '0-3 months',
      tasks: ['Market research', 'Product refinement', 'Team building'],
      status: 'completed'
    },
    { 
      phase: 'Phase 2: Launch', 
      duration: '3-6 months',
      tasks: ['Marketing campaign', 'Customer acquisition', 'Feedback collection'],
      status: 'current'
    },
    { 
      phase: 'Phase 3: Scale', 
      duration: '6-12 months',
      tasks: ['Expand market reach', 'Optimize operations', 'Strategic partnerships'],
      status: 'upcoming'
    },
  ];

  const competitiveAnalysis = [
    { 
      competitor: 'Competitor A', 
      strength: 'Strong brand recognition',
      weakness: 'Limited product range',
      opportunity: 'Expand into new markets',
      threat: 'Price competition'
    },
    { 
      competitor: 'Competitor B', 
      strength: 'Low pricing',
      weakness: 'Poor customer service',
      opportunity: 'Premium positioning',
      threat: 'Technology disruption'
    },
  ];

  const renderGrowthStrategy = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {growthPlan.map((phase, index) => (
          <div key={index} className="bg-slate-50 rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">{phase.phase}</h3>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                phase.status === 'completed' ? 'bg-green-500' :
                phase.status === 'current' ? 'bg-blue-500' :
                'bg-slate-300'
              }`}>
                {phase.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
                {phase.status === 'current' && <AlertCircle className="w-4 h-4 text-white" />}
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">{phase.duration}</p>
            <ul className="space-y-2">
              {phase.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-sm text-slate-700">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">AI Recommendation</h3>
        <p className="text-blue-700">
          Based on your current progress, consider focusing on customer retention strategies 
          and exploring partnerships with complementary businesses to accelerate growth.
        </p>
      </div>
    </div>
  );

  const renderCompetitiveAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitiveAnalysis.map((competitor, index) => (
          <div key={index} className="bg-slate-50 rounded-lg p-6 border">
            <h3 className="font-semibold text-slate-800 mb-4">{competitor.competitor}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm text-slate-700">Strength</p>
                  <p className="text-sm text-slate-600">{competitor.strength}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm text-slate-700">Weakness</p>
                  <p className="text-sm text-slate-600">{competitor.weakness}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm text-slate-700">Opportunity</p>
                  <p className="text-sm text-slate-600">{competitor.opportunity}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm text-slate-700">Threat</p>
                  <p className="text-sm text-slate-600">{competitor.threat}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Strategy Tools</h1>
        <p className="text-slate-600 mt-1">Plan and execute your business strategy with AI insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tool Selection */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Strategy Tools</h2>
          <div className="space-y-3">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedTool === tool.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <div>
                      <h3 className="font-medium text-sm">{tool.name}</h3>
                      <p className="text-xs text-slate-600">{tool.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tool Content */}
        <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {tools.find(t => t.id === selectedTool)?.name}
          </h2>
          
          {selectedTool === 'growth' && renderGrowthStrategy()}
          {selectedTool === 'competitive' && renderCompetitiveAnalysis()}
          
          {selectedTool === 'market' && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-6 border dark:border-gray-600">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Market Research Input</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Industry *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., SaaS, E-commerce, Healthcare"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Target Market *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Small businesses, Millennials"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Geographic Region *
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" required>
                      <option value="">Select Region</option>
                      <option value="north-america">North America</option>
                      <option value="europe">Europe</option>
                      <option value="asia">Asia</option>
                      <option value="global">Global</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Research Focus *
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" required>
                      <option value="">Select Focus</option>
                      <option value="size">Market Size</option>
                      <option value="trends">Market Trends</option>
                      <option value="competition">Competition Analysis</option>
                      <option value="opportunities">Growth Opportunities</option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Generate Research
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-slate-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Market Research Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Market Size & Growth</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Total Addressable Market:</strong> $45.2B</p>
                      <p><strong>Serviceable Market:</strong> $12.8B</p>
                      <p><strong>Annual Growth Rate:</strong> 15.3%</p>
                      <p><strong>Market Maturity:</strong> Growing</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Key Trends</h4>
                    <ul className="space-y-1 text-sm text-slate-600 dark:text-gray-400">
                      <li>• Increased demand for automation</li>
                      <li>• Shift towards subscription models</li>
                      <li>• Growing mobile-first approach</li>
                      <li>• Focus on data privacy & security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedTool === 'innovation' && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-gray-700 rounded-lg p-6 border dark:border-gray-600">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Innovation Brainstorming</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Current Business Challenge *
                    </label>
                    <textarea
                      placeholder="Describe the problem you're trying to solve..."
                      className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Innovation Type *
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" required>
                      <option value="">Select Type</option>
                      <option value="product">Product Innovation</option>
                      <option value="process">Process Innovation</option>
                      <option value="business-model">Business Model Innovation</option>
                      <option value="marketing">Marketing Innovation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Target Outcome *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Increase efficiency, Reduce costs"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                      Budget Range *
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white" required>
                      <option value="">Select Budget</option>
                      <option value="low">Under $10K</option>
                      <option value="medium">$10K - $50K</option>
                      <option value="high">$50K+</option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Generate Ideas
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-slate-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">💡 AI-Generated Innovation Ideas</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Idea #1: Automated Customer Onboarding</h4>
                    <p className="text-purple-700 dark:text-purple-400 text-sm mb-2">
                      Implement AI-powered chatbots to guide new customers through setup, reducing support tickets by 60%.
                    </p>
                    <div className="flex space-x-4 text-xs text-purple-600 dark:text-purple-400">
                      <span>💰 Cost: Medium</span>
                      <span>⏱️ Timeline: 3-4 months</span>
                      <span>📈 Impact: High</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Idea #2: Predictive Analytics Dashboard</h4>
                    <p className="text-blue-700 dark:text-blue-400 text-sm mb-2">
                      Create a dashboard that predicts customer churn and suggests retention strategies.
                    </p>
                    <div className="flex space-x-4 text-xs text-blue-600 dark:text-blue-400">
                      <span>💰 Cost: High</span>
                      <span>⏱️ Timeline: 6-8 months</span>
                      <span>📈 Impact: Very High</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Idea #3: Mobile-First Experience</h4>
                    <p className="text-green-700 dark:text-green-400 text-sm mb-2">
                      Redesign core features for mobile-first usage, targeting the 70% of users on mobile devices.
                    </p>
                    <div className="flex space-x-4 text-xs text-green-600 dark:text-green-400">
                      <span>💰 Cost: Low</span>
                      <span>⏱️ Timeline: 2-3 months</span>
                      <span>📈 Impact: Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyTools;