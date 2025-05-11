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
      data-complete={isComplete}
      className="group px-4 mb-5 data-[complete=true]:bg-success/20 data-[complete=true]:text-muted-foreground/95 border-border border-1 rounded-sm"
    >
      <AccordionTrigger className="hover:cursor-pointer">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="text-success" />
          ) : (
            <Circle className="text-muted-foreground" />
          )}
          <span className="group-data-[complete=true]:text-muted-foreground/95">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export default InstructionStep;