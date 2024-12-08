import { useSettingsFetch } from "./handlers/useSettingsFetch";
import { useSettingsUpdateHandlers } from "./handlers/useSettingsUpdateHandlers";
import { useSettingsReset } from "./handlers/useSettingsReset";

export const useSettingsForm = () => {
  const { settings, isLoading, setSettings } = useSettingsFetch();
  const { 
    isSaving, 
    logoFile, 
    faviconFile, 
    handleLogoUpload, 
    handleFaviconUpload, 
    handleSettingsUpdate 
  } = useSettingsUpdateHandlers();
  const { isResetting, handleResetToDefault } = useSettingsReset();

  return {
    settings,
    isLoading,
    isSaving,
    isResetting,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  };
};