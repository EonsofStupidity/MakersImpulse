import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FieldMappingAutocompleteProps {
  sourceFields: string[];
  targetFields: string[];
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const FieldMappingAutocomplete = ({
  sourceFields,
  targetFields,
  value,
  onSelect,
  placeholder = "Select field..."
}: FieldMappingAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate suggestions based on similarity
    const generateSuggestions = () => {
      return targetFields.sort((a, b) => {
        const aScore = sourceFields.some(sf => 
          sf.toLowerCase().includes(a.toLowerCase()) || 
          a.toLowerCase().includes(sf.toLowerCase())
        ) ? 0 : 1;
        const bScore = sourceFields.some(sf => 
          sf.toLowerCase().includes(b.toLowerCase()) || 
          b.toLowerCase().includes(sf.toLowerCase())
        ) ? 0 : 1;
        return aScore - bScore;
      });
    };

    setSuggestions(generateSuggestions());
  }, [sourceFields, targetFields]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search fields..." />
          <CommandEmpty>No field found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-72">
              {suggestions.map((field) => (
                <CommandItem
                  key={field}
                  value={field}
                  onSelect={() => {
                    onSelect(field);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === field ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {field}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};