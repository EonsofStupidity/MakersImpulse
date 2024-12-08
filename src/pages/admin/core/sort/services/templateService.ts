import { supabase } from "@/integrations/supabase/client";

export interface Template {
  id: string;
  name: string;
  description: string | null;
  version: number;
  status: 'draft' | 'published' | 'archived';
  created_by: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  field_mappings: Record<string, any>;
  validation_rules: Record<string, any>;
  metadata: Record<string, any>;
}

export const templateService = {
  async listTemplates() {
    const { data, error } = await supabase
      .from('data_maestro_templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getTemplate(id: string) {
    const { data, error } = await supabase
      .from('data_maestro_templates')
      .select(`
        *,
        data_maestro_collaborators (
          user_id,
          role
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createTemplate(template: { name: string } & Partial<Template>) {
    const { data, error } = await supabase
      .from('data_maestro_templates')
      .insert(template)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTemplate(id: string, updates: Partial<Template>) {
    const { data, error } = await supabase
      .from('data_maestro_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTemplate(id: string) {
    const { error } = await supabase
      .from('data_maestro_templates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};