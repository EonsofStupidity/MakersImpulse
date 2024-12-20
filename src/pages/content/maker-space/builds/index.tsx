import { motion } from "framer-motion";
import { BuildsList } from "@/components/maker-space/builds/BuildsList";
import { CreateBuildButton } from "@/components/maker-space/builds/CreateBuildButton";

const Builds = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">3D Printer Builds</h1>
        <CreateBuildButton />
      </div>
      <BuildsList />
    </div>
  );
};

export default Builds;