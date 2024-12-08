import { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    setSuggestions([...new Set([...sourceFields, ...targetFields])]);
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
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search fields..." />
          <CommandEmpty>No field found.</CommandEmpty>
          <CommandGroup>
            {suggestions.map((field) => (
              <CommandItem
                key={field}
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
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};