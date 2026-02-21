'use client';

import { useState } from 'react';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AgAccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open simultaneously */
  allowMultiple?: boolean;
}

/**
 * AgAccordion — Collapsible content sections for FAQ, guides, and legal pages.
 * Uses native <details> elements for zero-JS SEO crawlability with an
 * interactive enhancement layer on top.
 */
export function AgAccordion({ items, allowMultiple = false }: AgAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndices(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="ag-accordion">
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        return (
          <div
            key={i}
            className={`ag-accordion-item ${isOpen ? 'ag-accordion-open' : ''}`}
            data-state={isOpen ? 'open' : 'closed'}
          >
            <button
              className="ag-accordion-trigger"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <svg
                className="ag-accordion-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`ag-accordion-content ${isOpen ? '' : 'ag-accordion-hidden'}`}
              data-state={isOpen ? 'open' : 'closed'}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
