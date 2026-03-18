'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../primitives/accordion';
import { Input } from '../primitives/input';

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  items: FAQItem[];
  showSearch?: boolean;
  defaultOpen?: string;
  className?: string;
}

export function FAQSection({
  items,
  showSearch = true,
  defaultOpen,
  className,
}: FAQSectionProps) {
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="질문을 검색하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              'h-10 w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
            )}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-8">검색 결과가 없습니다.</p>
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultOpen ?? filtered[0]?.id ?? 'faq-0'}
          className="w-full"
        >
          {filtered.map((item, i) => (
            <AccordionItem key={item.id ?? i} value={item.id ?? `faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium text-gray-900 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
