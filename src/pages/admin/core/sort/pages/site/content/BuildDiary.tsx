import { Card } from "@/components/ui/card";
import PageTransition from "@/components/layout/PageTransition";
import { motion } from "framer-motion";

interface DiaryEntry {
  date: string;
  title: string;
  description: string;
  hoverEffect: "scale" | "glow" | "lift" | "highlight";
}

const diaryEntries: DiaryEntry[] = [
  {
    date: "2024-04-15 09:00:00 EDT",
    title: "Project Foundation",
    description: "Set up the core project structure with React, TypeScript, and Supabase integration. Implemented shadcn/ui components and established the basic routing system.",
    hoverEffect: "scale"
  },
  {
    date: "2024-04-15 14:30:00 EDT",
    title: "Authentication System",
    description: "Integrated Supabase Auth with email/password and social login options. Added protected routes and role-based access control.",
    hoverEffect: "glow"
  },
  {
    date: "2024-04-16 10:15:00 EDT",
    title: "Database Schema Design",
    description: "Designed and implemented comprehensive database schema for printer builds, components, user profiles, and role management system.",
    hoverEffect: "lift"
  },
  {
    date: "2024-04-16 16:45:00 EDT",
    title: "Role Management System",
    description: "Developed the initial role management interface with basic CRUD operations and permission matrix visualization.",
    hoverEffect: "highlight"
  },
  {
    date: "2024-04-17 11:20:00 EDT",
    title: "Build Submission System",
    description: "Created the build submission wizard with multi-step form, image upload capabilities, and validation system.",
    hoverEffect: "scale"
  },
  {
    date: "2024-04-17 15:45:00 EDT",
    title: "Visual Editor Integration",
    description: "Added visual editor capabilities for page building with drag-and-drop interface and component library.",
    hoverEffect: "glow"
  },
  {
    date: "2024-04-18 09:30:00 EDT",
    title: "Forum Implementation",
    description: "Started development of the community forum with threading, categories, and basic moderation tools.",
    hoverEffect: "lift"
  }
];

const getHoverAnimation = (effect: DiaryEntry["hoverEffect"]) => {
  switch (effect) {
    case "scale":
      return {
        whileHover: { scale: 1.02 },
        transition: { type: "spring", stiffness: 300, damping: 30 }
      };
    case "glow":
      return {
        whileHover: { 
          boxShadow: "0 0 15px rgba(0, 233, 255, 0.3)",
          transition: { duration: 0.2 }
        }
      };
    case "lift":
      return {
        whileHover: { 
          y: -5,
          transition: { duration: 0.2 }
        }
      };
    case "highlight":
      return {
        whileHover: { 
          backgroundColor: "rgba(0, 233, 255, 0.05)",
          transition: { duration: 0.2 }
        }
      };
    default:
      return {};
  }
};

const BuildDiary = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Build Diary</h1>
        <div className="space-y-6">
          {diaryEntries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div {...getHoverAnimation(entry.hoverEffect)}>
                <Card className="p-6 cursor-pointer transition-all duration-200">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-primary">
                        {entry.title}
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleString('en-US', {
                          timeZone: 'America/New_York',
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {entry.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default BuildDiary;