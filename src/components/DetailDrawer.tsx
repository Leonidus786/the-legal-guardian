import React, { useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailDrawerData } from '../types';

interface DetailDrawerProps {
  data: DetailDrawerData | null;
  onClose: () => void;
  onInitiateEnquiry: (serviceName: string, entityType?: string) => void;
  theme: 'dark' | 'light';
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  data,
  onClose,
  onInitiateEnquiry,
  theme
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Slide-over panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`w-screen max-w-2xl shadow-2xl flex flex-col justify-between border-l ${
              theme === 'dark'
                ? 'bg-[#101215] text-[#F2EEE5] border-[#B89A62]/25'
                : 'bg-[#FBF9F4] text-[#171717] border-[#A98750]/25'
            }`}
          >
            {/* Header */}
            <div className={`p-6 sm:p-8 border-b flex justify-between items-start ${
              theme === 'dark' ? 'border-[#B89A62]/15 bg-[#14171B]' : 'border-[#A98750]/15 bg-[#F2EDE1]'
            }`}>
              <div className="space-y-1 pr-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B89A62] block font-semibold">
                  {data.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl italic font-normal leading-tight">
                  {data.title}
                </h2>
                {data.subtitle && (
                  <p className="font-light text-xs sm:text-sm opacity-70 pt-1 leading-relaxed">
                    {data.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="p-2 border border-current/20 rounded hover:bg-current/10 transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
              {/* Overview */}
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B89A62] mb-3 flex items-center gap-2">
                  <FileText size={13} />
                  <span>Overview</span>
                </h3>
                <p className="font-light text-sm sm:text-base leading-relaxed opacity-85">
                  {data.overview}
                </p>
              </div>

              {/* What the Service Covers */}
              <div className="border-t border-current/10 pt-6">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B89A62] mb-4 flex items-center gap-2">
                  <CheckCircle2 size={13} />
                  <span>What the Service Covers</span>
                </h3>
                <ul className="space-y-3">
                  {data.covers.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B89A62] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Typical Requirements */}
              <div className="border-t border-current/10 pt-6">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B89A62] mb-4 flex items-center gap-2">
                  <ShieldCheck size={13} />
                  <span>Typical Statutory Requirements & Documentation</span>
                </h3>
                <div className="space-y-2.5">
                  {data.requirements.map((req, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 border text-xs font-light leading-relaxed rounded-sm ${
                        theme === 'dark' ? 'border-[#B89A62]/15 bg-[#171A1E]' : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Framework */}
              {data.statutoryRef && (
                <div className={`p-4 border rounded-sm flex items-start gap-3 ${
                  theme === 'dark' ? 'border-[#B89A62]/20 bg-[#14171A]' : 'border-neutral-300 bg-[#EFECE3]'
                }`}>
                  <Scale size={16} className="text-[#B89A62] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B89A62] block">
                      Governing Statutory Framework
                    </span>
                    <span className="text-xs font-mono opacity-80">{data.statutoryRef}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer CTA */}
            <div className={`p-6 sm:p-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              theme === 'dark' ? 'border-[#B89A62]/15 bg-[#14171B]' : 'border-[#A98750]/15 bg-[#F2EDE1]'
            }`}>
              <div className="text-[11px] font-mono opacity-60">
                Discreet Advisory · Turnaround: 24 Business Hours
              </div>
              <button
                onClick={() => {
                  onInitiateEnquiry(data.title, data.entityType);
                  onClose();
                }}
                className={`w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all font-semibold ${
                  theme === 'dark'
                    ? 'bg-[#B89A62] text-[#0D0F12] hover:bg-[#F2EEE5]'
                    : 'bg-[#171717] text-[#F5F1E8] hover:bg-[#A98750]'
                }`}
              >
                <span>{data.actionLabel || 'Initiate Service Enquiry'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
