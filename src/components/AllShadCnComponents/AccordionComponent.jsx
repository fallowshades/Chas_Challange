import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
const AccordionComponent = ({ uniqueId }) => {
  const idPrefix = 'radix';
  const triggerId = `${idPrefix}-trigger`;
  const contentId = `${idPrefix}-content`;
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger
          id={triggerId}
          value='account'
          aria-controls={contentId}
          aria-labelledby={triggerId}
        >
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent
          id={contentId}
          value='account'
          aria-labelledby={triggerId}
        >
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionComponent;
