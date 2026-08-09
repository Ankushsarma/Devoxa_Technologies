import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What types of digital products do you build?",
    answer: "We specialize in custom web platforms, AI automation tools, bespoke CRMs, and complex web applications designed to scale globally. We focus on modern tech stacks to ensure performance and longevity."
  },
  {
    question: "How do you integrate AI into existing businesses?",
    answer: "We conduct a thorough audit of your workflows, identifying bottlenecks where AI can save time or cut costs. Then, we build custom models or integrate cutting-edge APIs directly into your software."
  },
  {
    question: "How long does a typical engagement take?",
    answer: "Most MVPs and core web platforms take between 12 to 16 weeks. Smaller, fixed-scope projects can be handled in as little as 4 weeks depending on our current studio bandwidth."
  },
  {
    question: "Do you offer post-launch stewardship?",
    answer: "Absolutely. We believe in the longevity of digital products. We offer ongoing maintenance retainers and performance monitoring to ensure your product stays sharp and scales securely."
  },
  {
    question: "Where are you based and how do we communicate?",
    answer: "Our studio is based in Bihar, India, but we operate as a globally distributed team. We work seamlessly across time zones with partners from San Francisco to London, using asynchronous communication and regular video check-ins."
  }
];

const FAQAccordionItem = ({ faq, isOpen, onClick }) => {
  return (
    <div 
      className={`group rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-gradient-to-br from-[#5a1c66]/80 to-[#220727]/90 border-[#8b2fd1]/50 shadow-[0_0_30px_rgba(139,47,209,0.25)]' : 'bg-white/[0.04] backdrop-blur-xl border-white/10 border-t-white/20 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]'}`}
      style={{ padding: '12px 16px', transform: 'translate3d(0px, 0px, 0px)' }}
    >
      <button 
        className="w-full flex justify-between items-center text-left focus:outline-none px-2 py-1"
        onClick={onClick}
      >
        <span 
          className={`flex-1 break-words pr-4 text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 drop-shadow-sm ${isOpen ? 'text-white' : 'text-[#f1eef1]/95 group-hover:text-white'}`}
        >
          {faq.question}
        </span>
        <span className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 flex-shrink-0 ml-4 border ${isOpen ? 'bg-[#8b2fd1] text-white border-transparent scale-110 shadow-[0_0_15px_rgba(139,47,209,0.6)]' : 'bg-white/10 border-white/20 shadow-sm group-hover:bg-white/20 group-hover:border-white/30'}`}>
          <Plus className={`absolute w-4 h-4 text-white transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
          <Minus className={`absolute w-4 h-4 text-white transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'}`} />
        </span>
      </button>
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-2 pb-2 pt-0">
            <p className="text-white/85 font-medium leading-relaxed text-sm sm:text-base m-0 drop-shadow-sm">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full mx-auto max-w-4xl">
      {faqs.map((faq, index) => (
        <FAQAccordionItem 
          key={index} 
          faq={faq} 
          isOpen={openIndex === index} 
          onClick={() => handleToggle(index)} 
        />
      ))}
    </div>
  );
}
