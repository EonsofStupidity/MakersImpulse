import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Layout,
  Type,
  Image,
  Box,
  Columns,
  PlayCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarControlsProps {
  onAddElement: (toolId: string) => void;
}

export const ToolbarControls = ({ onAddElement }: ToolbarControlsProps) => {
  const tools = [
    { 
      id: "container", 
      icon: Box, 
      label: "Add Container",
      defaultContent: {
        type: "container",
        styles: {
          padding: "1rem",
          margin: "1rem 0",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }
      }
    },
    { 
      id: "section", 
      icon: Layout, 
      label: "Add Section",
      defaultContent: {
        type: "section",
        styles: {
          padding: "2rem 0",
          margin: "2rem 0",
          width: "100%"
        }
      }
    },
    { 
      id: "columns", 
      icon: Columns, 
      label: "Add Columns",
      defaultContent: {
        type: "columns",
        columns: 2,
        styles: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem"
        }
      }
    },
    { 
      id: "text", 
      icon: Type, 
      label: "Add Text",
      defaultContent: {
        type: "text",
        content: { text: "New text block" },
        styles: {
          fontSize: "1rem",
          lineHeight: "1.5"
        }
      }
    },
    { 
      id: "image", 
      icon: Image, 
      label: "Add Image",
      defaultContent: {
        type: "image",
        content: { url: "", alt: "" },
        styles: {
          maxWidth: "100%",
          height: "auto"
        }
      }
    },
    { 
      id: "animation", 
      icon: PlayCircle, 
      label: "Add Animation",
      defaultContent: {
        type: "animation",
        animation: "fade-in",
        duration: 0.3
      }
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => onAddElement(tool.id)}
              >
                <tool.icon className="h-4 w-4" />
                <span className="hidden md:inline">{tool.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};