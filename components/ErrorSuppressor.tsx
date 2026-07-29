'use client';
import { useEffect } from 'react';

export default function ErrorSuppressor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalError = console.error;
      console.error = function(...args) {
        if (typeof args[0] === 'string' && (
          args[0].toLowerCase().includes('unable to create webgl context') || 
          args[0].toLowerCase().includes('webglrenderer') || 
          args[0].toLowerCase().includes('bindtocurrentsequence') ||
          args[0].toLowerCase().includes('webgl') ||
          args[0].toLowerCase().includes('reading \\\'domelement\\\'') ||
          args[0].toLowerCase().includes('reading \\\'canvas\\\'') ||
          args[0].toLowerCase().includes('setting \\\'renderer\\\'')
        )) {
          return;
        }
        originalError.apply(console, args);
      };
      
      window.addEventListener('error', function(e) {
        if (e.message && (e.message.toLowerCase().includes('webgl') || e.message.includes('reading \\\'domElement\\\'') || e.message.includes('reading \\\'canvas\\\'') || e.message.includes('setting \\\'renderer\\\''))) {
          e.stopImmediatePropagation();
        }
      }, true);
      
      window.addEventListener('unhandledrejection', function(e) {
        if (e.reason && e.reason.message && (e.reason.message.toLowerCase().includes('webgl') || e.reason.message.includes('reading \\\'canvas\\\'') || e.reason.message.includes('setting \\\'renderer\\\''))) {
          e.stopImmediatePropagation();
        }
      }, true);
    }
  }, []);
  
  return null;
}
