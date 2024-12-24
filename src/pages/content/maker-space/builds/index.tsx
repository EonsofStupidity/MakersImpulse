import { motion } from "framer-motion";
import BuildsList from "@/components/maker-space/builds/BuildsList";
import { CreateBuildButton } from "@/components/maker-space/builds/CreateBuildButton";
import { useBuildsQuery } from "@/hooks/builds/useBuildsQuery";

const BuildsPage = () => {
  const { data: builds, isLoading } = useBuildsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Builds</h1>
        <CreateBuildButton />
      </div>
      <BuildsList builds={builds || []} />
    </motion.div>
  );
};

export default BuildsPage;