'use client'

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Network, 
  Database, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Zap, 
  GitBranch, 
  Award, 
  Mail, 
  Linkedin, 
  Github, 
  Monitor,
  ChevronRight,
  Minimize2,
  Maximize2,
  X,
  Server,
  Activity,
  Trophy,
  Medal,
  Globe,
  Rocket
} from 'lucide-react';

/* --- TYPES --- */
type LogEntry = {
  type: 'cmd' | 'info' | 'success' | 'warning';
  text: string;
};

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

/* --- DATA CONSTANTS --- */

const PROFILE = {
  name: "Juan Douglas",
  role: "Software Engineer",
  spec: "High-Performance Backend",
  email: "juandouglas2004@gmail.com",
  linkedin: "linkedin.com/in/juan-douglas",
  github: "github.com/juandouglas",
  website: "brocode.net.br",
  location: "Brasília - DF"
};

const TERMINAL_LOGS: LogEntry[] = [
  { type: 'cmd', text: './init_portfolio.sh --verbose' },
  { type: 'info', text: 'Loading kernel... OK' },
  { type: 'info', text: 'Initializing .NET Core Runtime v8.0...' },
  { type: 'success', text: 'Memory optimization: ENABLED' },
  { type: 'warning', text: 'High-availability mode: ACTIVE' },
  { type: 'info', text: 'Mounting distributed architecture modules...' },
  { type: 'info', text: 'Connecting to neural networks (ONNX)...' },
  { type: 'success', text: 'System ready. Welcome, Juan.' },
];

const SKILLS = [
  { 
    id: "core",
    label: "CORE_ENGINEERING", 
    icon: <Code2 className="w-5 h-5" />,
    color: "text-emerald-400",
    tags: ["C#", ".NET / ASP.NET Core", "C", "Python", "JavaScript", "Angular", "PowerShell"] 
  },
  { 
    id: "arch",
    label: "ADVANCED_ARCH", 
    icon: <Layers className="w-5 h-5" />,
    color: "text-violet-400",
    tags: ["Clean Architecture", "Microservices", "EDA", "DDD", "High Availability"] 
  },
  { 
    id: "dist",
    label: "DISTRIBUTED_SYS", 
    icon: <Network className="w-5 h-5" />,
    color: "text-blue-400",
    tags: ["MQTT & SignalR", "RESTful APIs", "Fault Tolerance", "Resilience", "Low Latency"] 
  },
  { 
    id: "data",
    label: "DATA_&_AI", 
    icon: <Database className="w-5 h-5" />,
    color: "text-rose-400",
    tags: ["SQL Server Tuning", "Deep Learning", "CNNs", "ONNX Runtime", "Low-Level Sim"] 
  }
];

const EXPERIENCE = [
  {
    company: "Autotrac",
    role: "Engenheiro de Software",
    time: "2024 - Present",
    type: "CRITICAL_MISSION",
    logs: [
      "Engenharia do core de sistemas corporativos.",
      "Arquitetura de soluções escaláveis (Legado <-> Microsserviços).",
      "Modernização de stack focada em manutenibilidade.",
      "Otimização de fluxo de dados interdepartamentais."
    ]
  },
  {
    company: "Fin-X",
    role: "Backend Dev C#",
    time: "2023",
    type: "FINTECH_CORE",
    logs: [
      "APIs financeiras de alta performance (Baixa Latência).",
      "Engenharia de confiabilidade e Uptime.",
      "Deep Dive diagnosis para gargalos de throughput.",
      "Suporte Nível 2 para incidentes complexos."
    ]
  },
  {
    company: "Toledo do Brasil",
    role: "Full Stack C#",
    time: "2022 - 2023",
    type: "INDUSTRIAL_IOT",
    logs: [
      "Software industrial robusto em larga escala.",
      "Modelagem UML rigorosa.",
      "Refatoração arquitetural (Eliminação de Dívida Técnica).",
      "Módulos de monitoramento de terminais."
    ]
  },
  {
    company: "Pedido Eletronico",
    role: "Full Stack Dev",
    time: "2021 - 2022",
    type: "LEGACY_MODERNIZATION",
    logs: [
      "Sustentação estratégica de sistemas legados.",
      "Engenharia reversa e correção de falhas críticas."
    ]
  }
];

const BROCODE_INFO = {
  name: "Brocode",
  url: "https://brocode.net.br",
  tagline: "Software House & Consultoria Especializada",
  desc: "Empresa fundada para entregar excelência em engenharia de software. Focada em transformar desafios complexos em soluções digitais de alta performance, utilizando as melhores práticas de arquitetura distribuída e cloud computing.",
  services: ["Desenvolvimento Sob Medida", "Consultoria em Arquitetura", "Transformação Digital", "Sistemas de Alta Disponibilidade"]
};

const PROJECTS = [
  {
    name: "AI_VISION_CORE",
    sub: "Research & Development",
    desc: "Otimização de CNNs e inferência via ONNX Runtime em .NET.",
    tech: ["C#", "Deep Learning", "ONNX"]
  },
  {
    name: "CPU_EMULATOR",
    sub: "Low Level Eng",
    desc: "Emulador de hardware (Fetch-Decode-Execute) e modelagem ISA.",
    tech: ["C", "Assembly", "Memory Mgmt"]
  },
  {
    name: "IOT_EVENT_BUS",
    sub: "Distributed Arch",
    desc: "Arquitetura orientada a eventos com MQTT para tempo real.",
    tech: ["MQTT", "Distributed Sys", "IoT"]
  }
];

const ACHIEVEMENTS = [
  {
    id: "hackathon-2025",
    rank: "2º LUGAR",
    event: "Hackathon Cidade Mais Segura",
    org: "Campus Party 2025",
    desc: "Desenvolvimento de solução de IA Preditiva para monitoramento de riscos urbanos e segurança pública.",
    icon: <Trophy className="w-8 h-8" />,
    color: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]"
  },
  {
    id: "ctf-2023",
    rank: "4º LUGAR",
    event: "CTF PCDF - Cibersegurança",
    org: "Campus Party 2023",
    desc: "Competição de Capture The Flag focada em excelência em segurança ofensiva e resolução de problemas.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
  },
  {
    id: "worldskills",
    rank: "ELITE",
    event: "Olimpíada do Conhecimento",
    org: "WorldSkills",
    desc: "Competidor de alto nível na categoria Soluções de Software de Negócio (Business Software Solutions).",
    icon: <Medal className="w-8 h-8" />,
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
  }
];

/* --- COMPONENTS --- */

// Custom Hook for Scroll Parallax
const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * speed);
      
      // Update parallax elements
      const nebula = document.querySelector('.parallax-nebula') as HTMLElement;
      const stars = document.querySelector('.parallax-stars') as HTMLElement;
      
      if (nebula) {
        nebula.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      if (stars) {
        stars.style.transform = `translateY(-${scrollY * speed}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return offset;
};

const TerminalWindow = () => {
  const [lines, setLines] = useState<LogEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < TERMINAL_LOGS.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, TERMINAL_LOGS[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? 500 : 800); // Delay variable for realism
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-full max-w-3xl mx-auto font-mono text-sm relative group perspective-1000">
      {/* 3D Tilt Wrapper handled via CSS mostly, but structure is here */}
      <div className="relative bg-[#0c0c14]/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 hover:scale-[1.01] hover:border-violet-500/30">
        
        {/* Terminal Header */}
        <div className="bg-[#1a1a24] px-4 py-2 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <TerminalIcon className="w-3 h-3" />
            juan@server:~
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3 h-3 text-slate-500" />
          </div>
        </div>

        {/* Terminal Body */}
        <div ref={scrollRef} className="p-6 h-[320px] overflow-y-auto custom-scrollbar font-fira-code">
          {lines.map((line, i) => (
            <div key={i} className="mb-2 animate-fade-in">
              <span className="text-slate-500 mr-2">
                [{new Date().toLocaleTimeString('pt-BR', { hour12: false })}]
              </span>
              {line.type === 'cmd' && (
                <span className="text-violet-400 font-bold">$ {line.text}</span>
              )}
              {line.type === 'info' && (
                <span className="text-blue-300">INFO: {line.text}</span>
              )}
              {line.type === 'success' && (
                <span className="text-emerald-400">SUCCESS: {line.text}</span>
              )}
              {line.type === 'warning' && (
                <span className="text-amber-400">WARN: {line.text}</span>
              )}
            </div>
          ))}
          {currentIndex === TERMINAL_LOGS.length && (
            <div className="animate-pulse text-emerald-500 font-bold mt-4 flex items-center gap-2">
              <span className="text-violet-400">$</span>
              <span className="w-2 h-5 bg-emerald-500 block"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <div className={`
    bg-white/[0.03] backdrop-blur-lg 
    border border-white/[0.05] 
    rounded-xl p-6 
    hover:bg-white/[0.05] hover:border-violet-500/30 
    hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] 
    transition-all duration-300
    ${className}
  `}>
    {children}
  </div>
);

/* --- MAIN APP --- */

export default function App() {
  const scrollY = useParallax(0.2); // Slower background
  const scrollFast = useParallax(0.5); // Faster stars

  return (
    <div className="min-h-screen bg-[#030008] text-slate-200 font-sans selection:bg-violet-500/30 selection:text-white overflow-x-hidden">
      
      {/* --- GLOBAL STYLES & FONTS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;600;800&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }

        .stars-bg {
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.1;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.05), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
      `}</style>

      {/* --- PARALLAX BACKGROUNDS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Layer 1: Deep Nebula */}
        <div className="absolute inset-0 opacity-30 parallax-nebula">
           <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-900/30 blur-[120px] rounded-full mix-blend-screen"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>

        {/* Layer 2: Stars */}
        <div className="absolute inset-0 stars-bg parallax-stars"></div>

        {/* Layer 3: Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10">
        
        {/* NAV */}
        <nav className="fixed top-0 w-full z-50 px-6 py-6 mix-blend-difference text-white">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
             <span className="font-mono font-bold text-xl tracking-tighter">
                JD<span className="text-violet-500">_</span>DEV
             </span>
             <div className="flex gap-6 text-sm font-mono opacity-80">
                <a href="#monitor" className="hover:text-violet-400 transition-colors hidden md:block">./LOGS</a>
                <a href="#brocode" className="hover:text-violet-400 transition-colors hidden md:block">./BROCODE</a>
                <a href="#core" className="hover:text-violet-400 transition-colors hidden md:block">./MODULES</a>
                <a href="#achievements" className="hover:text-violet-400 transition-colors hidden md:block">./AWARDS</a>
                <a href={`mailto:${PROFILE.email}`} className="text-emerald-400 hover:underline">CONTACT</a>
             </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <header className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative scanline">
          
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/20 border border-violet-500/20 text-violet-300 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                Available for New Missions
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                Architecting <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-white">
                  Resilience.
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-violet-500/30 pl-6">
                Engenheiro de Software focado em <strong>Alta Disponibilidade</strong> e <strong>Sistemas Distribuídos</strong>. Especialista em traduzir requisitos complexos em arquiteturas .NET robustas.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                 <button className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-violet-200 transition-colors flex items-center gap-2">
                    <Monitor className="w-4 h-4" /> View Projects
                 </button>
                 <a href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer" className="px-6 py-3 border border-white/20 hover:bg-white/5 rounded font-mono text-sm flex items-center gap-2 transition-colors">
                    <Github className="w-4 h-4" /> source_code
                 </a>
              </div>
            </div>

            {/* Terminal Interaction */}
            <div className="order-1 lg:order-2 w-full">
              <TerminalWindow />
            </div>

          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
             <ChevronRight className="w-6 h-6 rotate-90" />
          </div>
        </header>

        {/* SKILLS SECTION (Modules) */}
        <section id="core" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 flex items-end gap-4">
               <h2 className="text-4xl font-bold text-white">System Modules</h2>
               <div className="h-px flex-grow bg-gradient-to-r from-violet-500/50 to-transparent mb-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {SKILLS.map((skill) => (
                 <GlassCard key={skill.id} className="group relative overflow-hidden">
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${skill.color}`}>
                       {skill.icon}
                    </div>
                    
                    <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-widest">
                       {skill.label}
                    </div>
                    
                    <ul className="space-y-3 mt-4">
                       {skill.tags.map(tag => (
                          <li key={tag} className="flex items-center gap-3 text-sm text-slate-300">
                             <div className={`w-1.5 h-1.5 rounded-full ${skill.color.replace('text-', 'bg-')} shadow-[0_0_5px_currentColor]`}></div>
                             {tag}
                          </li>
                       ))}
                    </ul>
                 </GlassCard>
               ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION (System Logs) */}
        <section id="monitor" className="py-32 px-6 bg-black/40 backdrop-blur-sm border-y border-white/5 relative">
           {/* Background Grid Accent */}
           <div className="absolute inset-0 bg-[size:20px_20px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] pointer-events-none"></div>
           
           <div className="max-w-5xl mx-auto relative z-10">
              <div className="mb-16 text-center">
                 <h2 className="text-4xl font-bold mb-4">Execution Logs</h2>
                 <p className="font-mono text-slate-500 text-sm">/var/log/career_path.log</p>
              </div>

              <div className="space-y-4">
                 {EXPERIENCE.map((job, idx) => (
                    <div key={idx} className="group">
                       <GlassCard className="flex flex-col md:flex-row gap-6 items-start md:items-center border-l-4 border-l-violet-500/0 hover:border-l-violet-500 transition-all">
                          
                          {/* Timestamp / Meta */}
                          <div className="md:w-48 flex-shrink-0 font-mono text-xs">
                             <div className="text-emerald-400 mb-1">{job.time}</div>
                             <div className="text-slate-500 uppercase">{job.type}</div>
                          </div>

                          {/* Content */}
                          <div className="flex-grow">
                             <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                                   {job.role}
                                </h3>
                                <span className="text-slate-600">@</span>
                                <span className="text-slate-300 font-medium">{job.company}</span>
                             </div>
                             
                             <div className="space-y-1">
                                {job.logs.map((log, l) => (
                                   <div key={l} className="flex gap-2 text-sm text-slate-400 font-mono">
                                      <span className="text-violet-500/50">›</span>
                                      {log}
                                   </div>
                                ))}
                             </div>
                          </div>

                          {/* Status Indicator */}
                          <div className="hidden md:block">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          </div>
                       </GlassCard>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* BROCODE SECTION (Enterprise) */}
        <section id="brocode" className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
             <div className="bg-gradient-to-r from-[#0a0a14] to-[#141420] border border-violet-500/30 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                
                {/* Background FX */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-violet-600/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-transparent"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                   <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-2">
                         <Rocket className="w-3 h-3" />
                         ENTERPRISE_MODULE
                      </div>
                      
                      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                         {BROCODE_INFO.name}<span className="text-violet-500">.</span>
                      </h2>
                      <p className="text-violet-200 font-medium text-lg">
                         {BROCODE_INFO.tagline}
                      </p>
                      <p className="text-slate-400 max-w-lg leading-relaxed">
                         {BROCODE_INFO.desc}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                         {BROCODE_INFO.services.map((service, i) => (
                            <span key={i} className="text-xs font-mono text-slate-300 bg-white/5 border border-white/5 px-3 py-1 rounded-full">
                               {service}
                            </span>
                         ))}
                      </div>
                   </div>

                   <div className="flex flex-col gap-4">
                      <div className="p-6 bg-white/5 border border-white/5 rounded-full self-center md:self-auto group-hover:scale-110 transition-transform duration-500">
                         <Globe className="w-12 h-12 text-violet-400" />
                      </div>
                      <a 
                        href={BROCODE_INFO.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2"
                      >
                         Acessar <ChevronRight className="w-4 h-4" />
                      </a>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* R&D SECTION */}
        <section className="py-32 px-6">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                 <Cpu className="text-fuchsia-500" />
                 Kernel Research
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {PROJECTS.map((proj, i) => (
                    <div key={i} className="bg-[#0f0f13] border border-white/10 rounded-lg p-1 hover:bg-white/5 transition-colors group">
                       <div className="bg-[#050505] p-6 h-full rounded border border-white/5 relative overflow-hidden">
                          {/* Corner Decorations */}
                          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-violet-500/20 to-transparent"></div>
                          
                          <div className="font-mono text-xs text-fuchsia-400 mb-2">{proj.sub}</div>
                          <h3 className="text-lg font-bold text-white mb-4 group-hover:text-fuchsia-300 transition-colors">
                             {proj.name}
                          </h3>
                          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                             {proj.desc}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-auto">
                             {proj.tech.map(t => (
                                <span key={t} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-slate-500 bg-white/5">
                                   {t}
                                </span>
                             ))}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>
        
        {/* RECOGNITION / ACHIEVEMENTS SECTION (Refactored) */}
        <section id="achievements" className="py-32 bg-[#02000b] relative overflow-hidden">
           {/* Glow Effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>

           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
                    <Award className="w-8 h-8 text-yellow-500" />
                    Achievements Unlocked
                 </h2>
                 <p className="text-slate-500 mt-2 font-mono text-sm">Validating engineering excellence through competitive benchmarks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {ACHIEVEMENTS.map((item) => (
                    <div key={item.id} className={`group relative bg-[#0a0a0f] border border-white/10 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 ${item.border} ${item.glow}`}>
                       
                       {/* Floating Icon */}
                       <div className={`mb-6 p-4 inline-block rounded-lg bg-white/5 border border-white/5 ${item.color}`}>
                          {item.icon}
                       </div>

                       <div className="flex items-center justify-between mb-4">
                          <span className={`text-3xl font-bold ${item.color} font-mono tracking-tighter`}>
                             {item.rank}
                          </span>
                       </div>

                       <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                          {item.event}
                       </h3>
                       <div className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-wide">
                          {item.org}
                       </div>
                       
                       <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                          {item.desc}
                       </p>

                       {/* Shine effect */}
                       <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-black border-t border-white/10 text-center font-mono text-sm">
           <div className="flex justify-center gap-6 mb-8">
              <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-slate-500 hover:text-white transition-colors"><Linkedin /></a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Send Email" className="text-slate-500 hover:text-white transition-colors"><Mail /></a>
              <a href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-slate-500 hover:text-white transition-colors"><Github /></a>
           </div>
           <p className="text-slate-600">
              system_status: <span className="text-emerald-500">operational</span> | built_by: {PROFILE.name}
           </p>
        </footer>

      </div>
    </div>
  );
}