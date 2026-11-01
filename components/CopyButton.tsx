'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel: string;
  ariaLabel: string;
}

export default function CopyButton({ text, label, copiedLabel, ariaLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center space-x-1.5 px-3 py-2 rounded border border-[#E5E1D4] hover:bg-[#1E3F20] hover:text-[#FAF9F5] text-[#334155] text-xs font-mono tracking-tighter transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2"
        aria-label={ariaLabel}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{copiedLabel}</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{label}</span>
          </>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">{copied ? copiedLabel : ''}</span>
    </>
  );
}
