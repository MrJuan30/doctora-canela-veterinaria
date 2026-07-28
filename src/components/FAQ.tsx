import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ServiceFAQ } from '@/cms/types';

export function FAQ({ faqs }: { faqs: ServiceFAQ[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="border-b border-[rgba(0,72,131,0.15)]"
        >
          <AccordionTrigger className="text-left font-display font-bold text-[var(--brand-ink)] hover:text-[var(--brand)] hover:no-underline py-5 text-base md:text-lg">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-[rgba(6,42,69,0.70)] leading-relaxed pb-5">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
