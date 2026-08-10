import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROFILE_DATA } from '../../data/profile';
import { soundEngine } from '../../utils/audio';

export function RaftelResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('poneglyph'); // 'poneglyph' | 'bounty' | 'experience' | 'contact'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (isOpen) {
      soundEngine.playRaftelBgm();
      soundEngine.playFanfare();
      // Burst gold confetti celebration on Raftel arrival!
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d8b15d', '#c49437', '#b91c1c', '#ffffff']
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper to render Lucide icon
  const renderIcon = (iconName, className = 'w-5 h-5') => {
    const IconComponent = Icons[iconName] || Icons.Code;
    return <IconComponent className={className} />;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    soundEngine.playFanfare();
    setFormSubmitted(true);
    try {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#d8b15d', '#c49437', '#b91c1c', '#7a4f2b']
      });
    } catch {}
  };

  const handlePrintBounty = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] flex flex-col op-torn-paper op-parchment-scroll text-[#3d2314] shadow-2xl overflow-hidden font-serif">
        
        {/* Filigree Inner Frame */}
        <div className="op-filigree-frame flex flex-col h-full w-full overflow-hidden">
          
          {/* Raftel Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#ebd7b3] border-b-4 border-[#3d2314] text-[#3d2314]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl op-btn-crimson-parchment text-[#f7ebd4] font-black shadow-lg">
                <Icons.Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a4f2b] font-stamp">
                    THE FINAL DESTINATION • RAFTEL (LAUGH TALE)
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#d8b15d]/40 text-[#3d2314] border border-[#3d2314]/50 font-stamp">
                    ONE PIECE TREASURE
                  </span>
                </div>
                <h2 className="text-xl font-black text-[#3d2314] font-wanted tracking-wide">
                  {PROFILE_DATA.name} — Resume & Contact Vault
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2.5 rounded-xl op-btn-tan-parchment text-[#3d2314] cursor-pointer"
            >
              <Icons.X className="w-6 h-6" />
            </button>
          </div>

          {/* Tab Navigation Bar */}
          <div className="flex items-center border-b-4 border-[#3d2314] bg-[#ebd7b3] px-6 overflow-x-auto">
            {[
              { id: 'poneglyph', label: 'Ancient Poneglyph Skills', icon: 'BookOpen' },
              { id: 'bounty', label: 'Wanted Bounty Poster CV', icon: 'FileText' },
              { id: 'experience', label: 'Voyage Experience Log', icon: 'Compass' },
              { id: 'contact', label: 'Den Den Mushi Contact', icon: 'Mail' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center space-x-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-4 whitespace-nowrap font-stamp cursor-pointer ${
                    isActive
                      ? 'border-[#3d2314] text-[#2b1707] bg-[#d8b15d]/40 font-black'
                      : 'border-transparent text-[#5c391e] hover:text-[#3d2314] hover:bg-[#ebd7b3]'
                  }`}
                >
                  {renderIcon(tab.icon, 'w-4 h-4 text-[#7a4f2b]')}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Body Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#f5e5c8] space-y-6">
            
            {/* --- TAB 1: ANCIENT PONEGLYPH SKILLS TABLET --- */}
            {activeTab === 'poneglyph' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-4 op-torn-paper bg-[#ebd7b3] border-2 border-[#3d2314] flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-[#d8b15d] text-[#2b1707]">
                    <Icons.Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#3d2314] font-wanted">
                      Deciphering the Ancient Poneglyph Tech Stack
                    </h3>
                    <p className="text-xs text-[#5c391e] font-serif">
                      Sacred technical skills carved in stone across years of engineering expeditions.
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PROFILE_DATA.skills.map((category, idx) => (
                    <div
                      key={idx}
                      className="p-5 op-torn-paper bg-[#ebd7b3] border-4 border-[#3d2314] space-y-4 shadow-xl"
                    >
                      <div className="flex items-center space-x-3 pb-3 border-b-2 border-[#3d2314]/20">
                        <div className="p-2 rounded-lg bg-[#d8b15d] text-[#2b1707]">
                          {renderIcon(category.iconName)}
                        </div>
                        <h4 className="font-bold text-[#3d2314] text-sm font-parchment">{category.category}</h4>
                      </div>

                      <div className="space-y-3">
                        {category.items.map((skill, sIdx) => (
                          <div key={sIdx} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-[#3d2314]">{skill.name}</span>
                              <span className="text-[#7a4f2b] font-mono font-bold">{skill.level}%</span>
                            </div>
                            <div className="w-full h-2.5 rounded-full bg-[#3d2314]/20 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#d8b15d] to-[#c49437] transition-all duration-1000"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- TAB 2: WANTED BOUNTY POSTER CV --- */}
            {activeTab === 'bounty' && (
              <div className="flex flex-col items-center space-y-6 animate-fade-in">
                <div className="w-full max-w-xl p-8 op-torn-paper bg-[#ebd7b3] border-6 border-[#3d2314] text-[#3d2314] shadow-2xl text-center space-y-4 font-serif">
                  <div className="border-b-4 border-[#3d2314] pb-2">
                    <h2 className="text-4xl sm:text-5xl font-black tracking-widest uppercase font-wanted">WANTED</h2>
                    <p className="text-xs font-stamp font-bold tracking-widest text-[#b91c1c]">DEAD OR ALIVE</p>
                  </div>

                  <div className="relative w-48 h-48 mx-auto op-torn-paper border-4 border-[#3d2314] bg-[#f5e5c8] flex flex-col items-center justify-center p-4">
                    <Icons.ShieldCheck className="w-16 h-16 text-[#7a4f2b] mb-2" />
                    <span className="text-sm font-black uppercase tracking-wider font-wanted">{PROFILE_DATA.name}</span>
                    <span className="text-[10px] font-stamp font-bold text-[#3d2314]">{PROFILE_DATA.title}</span>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-wide font-wanted">{PROFILE_DATA.name}</h3>
                    <p className="text-sm italic font-parchment text-[#5c391e]">{PROFILE_DATA.epithet}</p>
                  </div>

                  <div className="py-3 px-6 rounded-xl op-btn-gold-parchment text-[#2b1707] inline-block border-2 border-[#3d2314]">
                    <span className="block text-[9px] font-stamp font-bold uppercase tracking-widest text-[#7a4f2b]">REWARD</span>
                    <span className="text-2xl font-black font-mono tracking-wider">{PROFILE_DATA.bountyAmount}</span>
                  </div>

                  <p className="text-xs text-[#3d2314] font-serif max-w-md mx-auto leading-relaxed">
                    {PROFILE_DATA.bio}
                  </p>

                  <div className="pt-2 border-t-2 border-[#3d2314]/30 flex items-center justify-between text-[10px] font-stamp text-[#5c391e]">
                    <span>MARINEFORD NAVY CODE HQ</span>
                    <span>STATUS: {PROFILE_DATA.status}</span>
                  </div>
                </div>

                <button
                  onClick={handlePrintBounty}
                  className="inline-flex items-center px-6 py-3 rounded-xl op-btn-gold-parchment text-[#2b1707] font-black text-sm uppercase tracking-wider transition-colors shadow-lg border-2 border-[#3d2314] cursor-pointer"
                >
                  <Icons.Printer className="w-5 h-5 mr-2" />
                  Print / Save Wanted Poster CV
                </button>
              </div>
            )}

            {/* --- TAB 3: VOYAGE EXPERIENCE LOG --- */}
            {activeTab === 'experience' && (
              <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
                <div className="relative pl-6 border-l-4 border-[#3d2314] space-y-8">
                  {PROFILE_DATA.experience.map((exp, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#d8b15d] border-2 border-[#3d2314] shadow-glow" />

                      <div className="p-5 op-torn-paper bg-[#ebd7b3] border-2 border-[#3d2314] space-y-3 shadow-xl">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-stamp text-[#7a4f2b] font-bold">{exp.period}</span>
                            <h4 className="text-lg font-black text-[#3d2314] font-wanted">{exp.role}</h4>
                            <p className="text-xs text-[#5c391e] font-bold">{exp.company} • {exp.location}</p>
                          </div>
                        </div>

                        <ul className="space-y-2 text-xs text-[#3d2314]">
                          {exp.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start space-x-2">
                              <Icons.ChevronRight className="w-3.5 h-3.5 text-[#7a4f2b] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- TAB 4: DEN DEN MUSHI CONTACT FORM --- */}
            {activeTab === 'contact' && (
              <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'GitHub', href: PROFILE_DATA.github, icon: 'GitBranch' },
                    { label: 'LinkedIn', href: PROFILE_DATA.linkedin, icon: 'Linkedin' },
                    { label: 'Twitter', href: PROFILE_DATA.twitter, icon: 'Twitter' },
                    { label: 'Email', href: `mailto:${PROFILE_DATA.email}`, icon: 'Mail' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundEngine.playClick()}
                      className="flex items-center justify-center space-x-2 p-3 rounded-xl op-btn-tan-parchment text-[#3d2314] transition-colors text-xs font-bold font-stamp border-2 border-[#3d2314]"
                    >
                      {renderIcon(social.icon)}
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>

                <div className="p-6 op-torn-paper bg-[#ebd7b3] border-4 border-[#3d2314] shadow-2xl space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b-2 border-[#3d2314]/20">
                    <div className="p-2.5 rounded-xl bg-[#d8b15d] text-[#2b1707]">
                      <Icons.Radio className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3d2314] text-sm font-wanted">
                        Den Den Mushi Telepathy Signal
                      </h4>
                      <p className="text-xs text-[#5c391e] font-stamp">
                        Send a message directly across the Grand Line
                      </p>
                    </div>
                  </div>

                  {formSubmitted ? (
                    <div className="p-6 op-torn-paper bg-[#f5e5c8] border-2 border-[#3d2314] text-center space-y-3">
                      <Icons.CheckCircle2 className="w-12 h-12 text-[#7a4f2b] mx-auto" />
                      <h5 className="text-lg font-bold text-[#3d2314] font-wanted">
                        Den Den Mushi Signal Transmitted!
                      </h5>
                      <p className="text-xs text-[#5c391e] font-serif">
                        Thank you for setting sail with me! I will respond to your transmission shortly.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-4 py-2 rounded-lg op-btn-gold-parchment text-[#2b1707] font-bold text-xs border border-[#3d2314]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#3d2314] font-stamp">Captain Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5e5c8] border-2 border-[#3d2314] text-[#3d2314] text-xs focus:outline-none focus:border-[#d8b15d]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#3d2314] font-stamp">Den Den Email</label>
                          <input
                            type="email"
                            required
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5e5c8] border-2 border-[#3d2314] text-[#3d2314] text-xs focus:outline-none focus:border-[#d8b15d]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#3d2314] font-stamp">Transmission Message</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Write your voyage proposal or inquiry..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5e5c8] border-2 border-[#3d2314] text-[#3d2314] text-xs focus:outline-none focus:border-[#d8b15d]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl op-btn-gold-parchment text-[#2b1707] font-black text-xs uppercase tracking-wider shadow-lg border-2 border-[#3d2314] transition-colors cursor-pointer"
                      >
                        <Icons.Send className="w-4 h-4" />
                        <span>Transmit Message to Varun</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
