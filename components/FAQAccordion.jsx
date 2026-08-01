import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

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
    <div className="border-b border-[rgba(255,255,255,0.08)] group">
      <button 
        className="w-full flex justify-between items-center text-left focus:outline-none"
        style={{ padding: "16px 0" }}
        onClick={onClick}
      >
        <span 
          className={`text-2xl font-serif transition-colors duration-300 ${isOpen ? 'text-[#5B1FA0]' : 'text-[#FFFFFF] group-hover:text-[#FFFFFF]/70'}`}
          style={{ lineHeight: 1 }}
        >
          {faq.question}
        </span>
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-transparent group-hover:bg-white/10 transition-colors duration-300 flex-shrink-0 ml-4">
          <Plus className={`absolute w-5 h-5 text-[#FFFFFF] transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
          <X className={`absolute w-5 h-5 text-[#5B1FA0] transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'}`} />
        </span>
      </button>
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="pb-8 md:pb-10">
            <div className="flex gap-4 md:gap-5">
              {/* Line Sidebar Effect */}
              <div 
                className="w-[3px] rounded-full shrink-0 my-2.5 transition-all duration-500 ease-out bg-gradient-to-b from-[#5B1FA0] to-[#5B1FA0] shadow-[0_0_40px_rgba(139,47,209,0.15)]"
              />
              <p className="text-[#A8A5AD] font-light leading-relaxed max-w-xl text-lg pr-12 m-0">
                {faq.answer}
              </p>
            </div>
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
    <div className="border-t border-[rgba(255,255,255,0.08)]">
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
