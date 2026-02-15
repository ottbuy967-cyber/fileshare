
import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Send as SendIcon, 
  Download as ReceiveIcon, 
  History as HistoryIcon, 
  Settings as SettingsIcon,
  ShieldCheck,
  Zap,
  Globe,
  QrCode,
  Scan,
  Sparkles,
  File as LucideFile,
  Hash,
  X,
  ArrowRight
} from 'lucide-react';
import { Button } from './components/Button';
import { AppRoute } from './types';
import { FileTransferUI } from './components/FileTransferUI';
import { QRScanner } from './components/QRScanner';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [showScanner, setShowScanner] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  const navigateTo = (route: AppRoute) => setCurrentRoute(route);

  const handleScan = (data: string) => {
    console.log("Scanned QR Data:", data);
    setShowScanner(false);
    setCurrentRoute(AppRoute.RECEIVE);
  };

  const handleCodeSubmit = (code: string) => {
    console.log("Submitted Transfer Code:", code);
    setShowCodeInput(false);
    setCurrentRoute(AppRoute.RECEIVE);
  };

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return (
          <HomeView 
            onSend={() => navigateTo(AppRoute.SEND)} 
            onReceiveQR={() => setShowScanner(true)} 
            onReceiveCode={() => setShowCodeInput(true)} 
          />
        );
      case AppRoute.SEND:
        return <FileTransferUI mode="send" onComplete={() => navigateTo(AppRoute.HOME)} />;
      case AppRoute.RECEIVE:
        return <FileTransferUI mode="receive" onComplete={() => navigateTo(AppRoute.HOME)} />;
      case AppRoute.HISTORY:
        return <HistoryView />;
      default:
        return <div className="p-8 text-center">Work in Progress</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 p-6 sticky top-0 h-screen">
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900">SwiftShare<span className="text-indigo-600">.</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavButton active={currentRoute === AppRoute.HOME} icon={<HomeIcon />} label="Dashboard" onClick={() => navigateTo(AppRoute.HOME)} />
          <NavButton active={currentRoute === AppRoute.SEND} icon={<SendIcon />} label="Send Files" onClick={() => navigateTo(AppRoute.SEND)} />
          <NavButton active={currentRoute === AppRoute.RECEIVE} icon={<ReceiveIcon />} label="Receive" onClick={() => setShowCodeInput(true)} />
          <NavButton active={currentRoute === AppRoute.HISTORY} icon={<HistoryIcon />} label="History" onClick={() => navigateTo(AppRoute.HISTORY)} />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <NavButton active={currentRoute === AppRoute.SETTINGS} icon={<SettingsIcon />} label="Settings" onClick={() => navigateTo(AppRoute.SETTINGS)} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-y-auto pb-24 md:pb-0">
        <header className="bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-30">
          <div className="md:hidden flex items-center space-x-2">
            <Zap className="text-indigo-600 w-6 h-6 fill-current" />
            <span className="text-lg font-black tracking-tighter">SwiftShare.</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{currentRoute}</h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="hidden sm:flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
               <ShieldCheck className="w-4 h-4" />
               <span>E2EE Active</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-600 font-bold">
               JD
             </div>
          </div>
        </header>

        {renderContent()}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-4 z-40">
        <MobileNavButton active={currentRoute === AppRoute.HOME} icon={<HomeIcon />} onClick={() => navigateTo(AppRoute.HOME)} />
        <MobileNavButton active={currentRoute === AppRoute.SEND} icon={<SendIcon />} onClick={() => navigateTo(AppRoute.SEND)} />
        <div className="relative -top-10">
          <button 
            onClick={() => setShowScanner(true)}
            className="w-16 h-16 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white border-4 border-gray-50"
          >
            <Scan className="w-8 h-8" />
          </button>
        </div>
        <MobileNavButton active={currentRoute === AppRoute.HISTORY} icon={<HistoryIcon />} onClick={() => navigateTo(AppRoute.HISTORY)} />
        <MobileNavButton active={currentRoute === AppRoute.RECEIVE || showCodeInput} icon={<Hash />} onClick={() => setShowCodeInput(true)} />
      </nav>

      {showScanner && <QRScanner onScan={handleScan} onClose={() => setShowScanner(false)} />}
      {showCodeInput && <CodeInputModal onSubmit={handleCodeSubmit} onClose={() => setShowCodeInput(false)} />}
    </div>
  );
};

const CodeInputModal = ({ onSubmit, onClose }: { onSubmit: (code: string) => void, onClose: () => void }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length >= 4) {
      onSubmit(code);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-900">Enter Transfer Code</h3>
            <p className="text-gray-500 text-sm mt-1">Ask the sender for their 6-digit alphanumeric code.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
              <Hash className="w-6 h-6" />
            </div>
            <input 
              autoFocus
              type="text"
              placeholder="Ex: AB12CD"
              className="w-full bg-gray-50 border-2 border-gray-100 focus:border-indigo-500 focus:ring-0 rounded-2xl py-4 pl-12 pr-4 text-2xl font-black tracking-[0.5em] uppercase placeholder:tracking-normal placeholder:font-medium placeholder:text-gray-300 transition-all"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
            />
          </div>

          <Button 
            fullWidth 
            size="lg" 
            className="h-14 rounded-2xl text-lg font-bold"
            disabled={code.length < 4}
          >
            Connect & Download <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <span className={`${active ? 'text-indigo-600' : 'text-gray-400'}`}>
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 20 }) : icon}
    </span>
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

const MobileNavButton = ({ active, icon, onClick }: { active: boolean, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-xl ${active ? 'text-indigo-600' : 'text-gray-400'}`}
  >
    {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 24 }) : icon}
  </button>
);

const HomeView = ({ onSend, onReceiveQR, onReceiveCode }: { onSend: () => void, onReceiveQR: () => void, onReceiveCode: () => void }) => (
  <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
    <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-white shadow-2xl">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Zap className="w-64 h-64" />
      </div>
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Sharing</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">Share anything, anywhere, instantly.</h2>
        <p className="text-indigo-100 text-lg mb-8 font-medium">No cables, no setup. Secure peer-to-peer file transfer enhanced with Gemini insights.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onSend} size="lg" variant="secondary" className="rounded-2xl group">
            <SendIcon className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            Start Sending
          </Button>
          <div className="flex gap-2">
            <Button onClick={onReceiveQR} size="lg" variant="outline" className="border-indigo-300 text-white hover:bg-white/10 rounded-2xl flex-1">
              <QrCode className="w-5 h-5 mr-3" />
              Scan QR
            </Button>
            <Button onClick={onReceiveCode} size="lg" variant="outline" className="border-indigo-300 text-white hover:bg-white/10 rounded-2xl flex-1">
              <Hash className="w-5 h-5 mr-3" />
              Enter Code
            </Button>
          </div>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-3">Military-Grade Security</h3>
        <p className="text-gray-500 text-sm leading-relaxed">End-to-end encrypted tunnels ensure your data never touches a server.</p>
      </div>
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Zap className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-3">Instant Pairing</h3>
        <p className="text-gray-500 text-sm leading-relaxed">Scan a QR code or use a simple numeric code to establish a fast P2P connection.</p>
      </div>
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Globe className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-3">No File Limits</h3>
        <p className="text-gray-500 text-sm leading-relaxed">Send 4K videos or huge archives without any compression or size caps.</p>
      </div>
    </div>
  </div>
);

const HistoryView = () => (
  <div className="p-8 max-w-6xl mx-auto animate-in slide-in-from-right-4 duration-500">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Transfer History</h2>
        <p className="text-gray-500 mt-1">Review your past peer-to-peer exchanges.</p>
      </div>
      <Button variant="outline" size="sm" className="rounded-full">Clear History</Button>
    </div>

    <div className="space-y-4">
      {[
        { name: "Project_Proposal.pdf", size: "2.4 MB", date: "Today, 2:45 PM", status: "Received", from: "iPhone 15 Pro" },
        { name: "Photos_SanFrancisco.zip", size: "1.2 GB", date: "Yesterday", status: "Sent", to: "MacBook Pro" },
        { name: "Meeting_Audio.mp3", size: "14 MB", date: "Oct 24, 2023", status: "Sent", to: "Android Pixel" },
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.status === 'Sent' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <LucideFile className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</p>
              <p className="text-xs text-gray-400 font-medium">{item.size} • {item.date}</p>
            </div>
          </div>
          <div className="text-right">
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Sent' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
               {item.status}
             </span>
             <p className="text-xs text-gray-400 mt-1 font-medium">{item.status === 'Sent' ? `To: ${item.to}` : `From: ${item.from}`}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default App;
