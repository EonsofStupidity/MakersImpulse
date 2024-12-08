import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import type { BuildConfig, ComponentData, BuildVolume } from "@/types/build";
import type { BuildWizardState, BuildWizardStatus } from "@/types/buildWizard";
import { useBuildWizardDB } from "./useBuildWizardDB";
import type { Json } from "@/integrations/supabase/types";

const initialState: BuildWizardState = {
  currentStep: 0,
  saving: false,
  buildConfig: {
    name: "",
    components: {},
    addons: [],
    estimated_cost: 0,
    status: "draft" as BuildWizardStatus,
    kinematic_type: null,
    build_volume: { x: 0, y: 0, z: 0 },
    core_components: {},
  }
};

export const useBuildWizard = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<BuildWizardState>(initialState);
  const { saveToDatabase, loadFromDatabase } = useBuildWizardDB();

  const debouncedSave = useCallback(
    debounce(async (configData: BuildConfig, step: number) => {
      setState(prev => ({ ...prev, saving: true }));
      await saveToDatabase(configData, step, configData.status as BuildWizardStatus);
      setState(prev => ({ 
        ...prev, 
        saving: false,
        lastSaved: new Date()
      }));
    }, 1000),
    []
  );

  useEffect(() => {
    if (state.buildConfig.name) {
      debouncedSave(state.buildConfig, state.currentStep);
    }
    return () => debouncedSave.cancel();
  }, [state.buildConfig, state.currentStep, debouncedSave]);

  useEffect(() => {
    const loadSavedConfig = async () => {
      const data = await loadFromDatabase();
      if (data) {
        setState(prev => ({
          ...prev,
          currentStep: data.last_step_completed || 0,
          buildConfig: {
            ...prev.buildConfig,
            name: data.name || "",
            kinematic_type: data.kinematic_type,
            build_volume: data.build_volume as unknown as BuildVolume || { x: 0, y: 0, z: 0 },
            core_components: (data.core_components as unknown as Record<string, ComponentData | null>) || {},
            addons: ((data.addons || []) as unknown as ComponentData[]) || [],
            estimated_cost: data.estimated_cost || 0,
            status: data.status as BuildWizardStatus
          }
        }));
      }
    };

    loadSavedConfig();
  }, [loadFromDatabase]);

  return {
    currentStep: state.currentStep,
    setCurrentStep: (step: number) => setState(prev => ({ ...prev, currentStep: step })),
    saving: state.saving,
    lastSaved: state.lastSaved,
    buildConfig: state.buildConfig,
    setBuildConfig: (config: BuildConfig) => setState(prev => ({ ...prev, buildConfig: config })),
    handleSaveProgress: () => debouncedSave(state.buildConfig, state.currentStep),
  };
};