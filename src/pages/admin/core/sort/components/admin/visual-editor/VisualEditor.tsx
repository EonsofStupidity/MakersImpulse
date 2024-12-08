import { motion, AnimatePresence } from "framer-motion";
import { VisualEditorToggle } from "../toolbar/VisualEditorToggle";
import VisualEditorControls from "./VisualEditorControls";

interface VisualEditorProps {
  userId: string;
  enabled: boolean;
}

export const VisualEditor = ({ userId, enabled }: VisualEditorProps) => {
  return (
    <AnimatePresence>
      {enabled ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b"
        >
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
              <VisualEditorToggle enabled={enabled} userId={userId} />
              <VisualEditorControls />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};