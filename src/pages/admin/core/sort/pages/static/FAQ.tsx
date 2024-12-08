import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is MakersImpulse?",
      answer: "MakersImpulse is a community platform for 3D printer enthusiasts, builders, and makers to share knowledge, builds, and collaborate on projects."
    },
    {
      question: "How do I get started with building my first 3D printer?",
      answer: "Start by exploring our Build Wizard, which will guide you through the process step by step. You can also check out our community builds for inspiration and join our forum to ask questions."
    },
    {
      question: "What subscription options are available?",
      answer: "We offer various subscription tiers with different features and benefits. Visit our Site Membership page for detailed information about pricing and features."
    },
    {
      question: "How can I contribute to the community?",
      answer: "You can contribute by sharing your builds, participating in forum discussions, creating guides, and helping other members with their questions."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;