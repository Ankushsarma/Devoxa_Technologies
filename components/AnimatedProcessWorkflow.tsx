"use client";

import React, { useState, useEffect } from "react";
import { Search, BarChart3, Layers, Code2, Zap } from "lucide-react";

export default function AnimatedProcessWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: <Search />, title: "Discovery", desc: "Analyze your business needs and competitive landscape" },
    { icon: <BarChart3 />, title: "Strategy", desc: "Build a data-driven technology roadmap" },
    { icon: <Layers />, title: "Design", desc: "Craft scalable, secure system architectures" },
    { icon: <Code2 />, title: "Development", desc: "Agile sprints with continuous feedback loops" },
    { icon: <Zap />, title: "Launch & Support", desc: "Deploy, monitor, and continuously optimize" }
  ];

  return (
    <div className="process-workflow reveal in">
      <div className="process-line"></div>
      {steps.map((step, idx) => (
        <div key={idx} className={`process-step ${activeStep === idx ? 'active' : ''}`} style={idx === 4 ? { marginBottom: 0 } : {}}>
          <div className="step-circle">{step.icon}</div>
          <div className="step-content">
            <div className="step-num">0{idx + 1}</div>
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
