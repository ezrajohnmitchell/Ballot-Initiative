import { CheckCircle, Circle } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

function InstructionStep({
  title,
  children,
  isComplete,
}: {
  title: string;
  children: React.ReactNode;
  isComplete?: boolean;
}) {
  return (
    <AccordionItem
      value={title}
      className="px-4 mb-5 dark:border-gray-500 border-black border-1 rounded-sm"
    >
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Circle className="text-gray-400" />
          )}
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export default InstructionStep;