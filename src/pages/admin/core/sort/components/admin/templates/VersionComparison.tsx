import { DiffEditor } from "@monaco-editor/react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { VersionComparisonProps } from "./types";

export const VersionComparison = ({ originalContent, modifiedContent, onClose }: VersionComparisonProps) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-4xl h-[80vh]">
        <div className="flex-1 min-h-0">
          <DiffEditor
            height="100%"
            original={originalContent}
            modified={modifiedContent}
            language="json"
            options={{
              readOnly: true,
              renderSideBySide: true,
            }}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};