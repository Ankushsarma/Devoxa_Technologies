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
    <div className={`group rounded-2xl overflow-hidden transition-all duration-300 border border-[rgba(255,255,255,0.05)] ${isOpen ? 'bg-[#26082a] shadow-2xl' : 'bg-[#14061a] hover:bg-[#1a061c]'}`}>
      <button 
        className="w-full flex justify-between items-center text-left focus:outline-none p-6 sm:px-8 sm:py-7"
        onClick={onClick}
      >
        <span 
          className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-[#f1eef1]' : 'text-[#f1eef1]/90 group-hover:text-[#f1eef1]'}`}
        >
          {faq.question}
        </span>
        <span className={`relative flex items-center justify-center w-12 h-12 rounded-[14px] transition-colors duration-300 flex-shrink-0 ml-6 border ${isOpen ? 'bg-[#523056]/80 border-[#705474]/50' : 'bg-[#1a061c] border-[rgba(255,255,255,0.08)] group-hover:bg-[#26082a]'}`}>
          <Plus className={`absolute w-5 h-5 text-[#f1eef1] transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
          <Minus className={`absolute w-5 h-5 text-[#f1eef1] transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'}`} />
        </span>
      </button>
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 sm:px-8 pb-8 pt-0">
            <p className="text-[#ad9daf] font-light leading-relaxed text-sm sm:text-base m-0">
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
    <div className="flex flex-col gap-5 w-full mx-auto max-w-4xl">
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
