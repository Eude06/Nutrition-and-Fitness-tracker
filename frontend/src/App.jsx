import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Flame, 
  Heart, 
  Droplets, 
  Moon, 
  TrendingUp, 
  Award, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  RefreshCw, 
  Utensils, 
  Dumbbell, 
  User, 
  Search, 
  ChevronRight, 
  BarChart3, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const MOCK_WEEKLY_ACTIVITY = [
  { day: 'Mon', steps: 8420, calories: 2100, activeMins: 45 },
  { day: 'Tue', steps: 10150, calories: 2450, activeMins: 60 },
  { day: 'Wed', steps: 6800, calories: 1900, activeMins: 30 },
  { day: 'Thu', steps: 11200, calories: 2600, activeMins: 75 },
  { day: 'Fri', steps: 9500, calories: 2300, activeMins: 50 },
  { day: 'Sat', steps: 12400, calories: 2800, activeMins: 90 },
  { day: 'Sun', steps: 7900, calories: 2050, activeMins: 40 },
];

const MACRO_BREAKDOWN = [
  { name: 'Protein', value: 30, color: '#3B82F6', grams: '140g' },
  { name: 'Carbs', value: 45, color: '#10B981', grams: '210g' },
  { name: 'Fats', value: 25, color: '#F59E0B', grams: '58g' },
];

const TODAY_MEALS = [
  { id: 1, name: 'Oatmeal with Berries & Whey', category: 'Breakfast', calories: 420, time: '08:30 AM', icon: '🥣' },
  { id: 2, name: 'Grilled Chicken Caesar Salad', category: 'Lunch', calories: 650, time: '01:15 PM', icon: '🥗' },
  { id: 3, name: 'Greek Yogurt & Almonds', category: 'Snack', calories: 220, time: '04:45 PM', icon: '🥜' },
  { id: 4, name: 'Baked Salmon with Quinoa', category: 'Dinner', calories: 580, time: '07:30 PM', icon: '🐟' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [waterCups, setWaterCups] = useState(6);
  const [backendStatus, setBackendStatus] = useState('connecting'); // 'connected', 'error', 'connecting'
  const [data, setData] = useState(MOCK_WEEKLY_ACTIVITY);
  const [loading, setLoading] = useState(false);

  // Attempt to fetch live data from FastAPI backend
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://127.0.0.1:8000/api/cleaned-data');
        if (res.ok) {
          const result = await res.json();
          if (Array.isArray(result) && result.length > 0) {
            setData(result);
          }
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      } catch (err) {
        setBackendStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchBackendData();
  }, []);

  const addWater = () => setWaterCups(prev => Math.min(prev + 1, 12));
  const removeWater = () => setWaterCups(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              NutriFit <span className="text-cyan-400 font-extrabold">Tracker</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            {['dashboard', 'analytics', 'meals', 'goals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Right Status Badge */}
          <div className="flex items-center space-x-3">
            <div className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
              backendStatus === 'connected'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>{backendStatus === 'connected' ? 'Backend Live' : 'Offline / Demo Data'}</span>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 p-0.5 cursor-pointer hover:ring-2 ring-cyan-400 transition-all">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome & Quick Summary Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>Daily Streak: 12 Days 🔥</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome back, Eude! 👋
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                You've hit <span className="text-cyan-400 font-semibold">82%</span> of your daily movement goals today. Keep up the momentum!
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-2 transition-all">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Today, Sep 25</span>
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all active:scale-95">
                <Plus className="w-4 h-4" />
                <span>Log Activity</span>
              </button>
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Steps */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 p-5 rounded-2xl transition-all shadow-lg group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Steps</span>
              <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-white">9,540</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">Target: 10,000</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 2: Calories */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 p-5 rounded-2xl transition-all shadow-lg group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Calories Burned</span>
              <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-white">2,350 <span className="text-xs text-slate-400 font-normal">kcal</span></div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">Target: 2,500 kcal</span>
                <span className="text-xs text-amber-400 font-semibold">94%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 3: Water Intake */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 p-5 rounded-2xl transition-all shadow-lg group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Water Intake</span>
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                <Droplets className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-white">{waterCups} <span className="text-xs text-slate-400 font-normal">/ 8 cups</span></div>
                <div className="flex space-x-1">
                  <button onClick={removeWater} className="w-6 h-6 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center justify-center font-bold text-xs transition">-</button>
                  <button onClick={addWater} className="w-6 h-6 bg-blue-600 hover:bg-blue-500 rounded text-white flex items-center justify-center font-bold text-xs transition">+</button>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${(waterCups/8)*100}%` }}></div>
              </div>
            </div>
          </div>

          {/* Card 4: Sleep Score */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 p-5 rounded-2xl transition-all shadow-lg group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Sleep Duration</span>
              <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                <Moon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-white">7h 45m</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">Quality: 88% (Restful)</span>
                <span className="text-xs text-purple-400 font-semibold">+45m</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Activity Chart */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Weekly Activity & Calories
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Step counts paired with daily calorie expenditure</p>
              </div>
              <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 text-cyan-400">Steps</span>
                <span className="px-3 py-1 text-xs font-medium text-slate-400">Calories</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Area type="monotone" dataKey="steps" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorSteps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Nutrition & Macro Breakdown */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-emerald-400" />
                  Macro Distribution
                </h3>
                <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">1,830 kcal</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">Today's macronutrient ratio goal</p>

              <div className="h-48 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MACRO_BREAKDOWN}
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {MACRO_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-white">100%</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Logged</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {MACRO_BREAKDOWN.map((macro) => (
                <div key={macro.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></span>
                    <span className="text-xs font-semibold text-slate-200">{macro.name}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-slate-400">{macro.grams}</span>
                    <span className="font-bold text-white">{macro.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Meal Logs */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Today's Meal Log</h3>
                <p className="text-xs text-slate-400 mt-0.5">4 meals registered for today</p>
              </div>
              <button className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {TODAY_MEALS.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-3.5 bg-slate-950/60 hover:bg-slate-800/40 border border-slate-800/80 rounded-xl transition-all">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg shadow-inner">
                      {meal.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100">{meal.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                        <span className="text-cyan-400 font-medium">{meal.category}</span>
                        <span>•</span>
                        <span>{meal.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{meal.calories}</span>
                    <span className="text-xs text-slate-400 block">kcal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Target Progress */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Weekly Goals</h3>
              <p className="text-xs text-slate-400 mb-6">Consistently tracked objectives</p>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">Active Workout Days</span>
                    <span className="text-cyan-400 font-bold">5 / 6 days</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">Caloric Deficit Goal</span>
                    <span className="text-emerald-400 font-bold">2,100 / 2,500 kcal</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">Sleep Consistency</span>
                    <span className="text-purple-400 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <p className="text-[11px] text-cyan-200/80 leading-relaxed">
                Synced with backend database automatically.
              </p>
            </div>
          </div>

        </div>

      </main>

      {}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Health & Fitness Tracker Dashboard • FastAPI & React Integration</p>
      </footer>
    </div>
  );
}
