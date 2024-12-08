import { supabase } from "@/integrations/supabase/client";

export const COMMON_DELIMITERS = [',', ';', '\t', '|'];

export const detectDelimiter = (text: string): string => {
  const lines = text.split('\n').slice(0, 5);
  if (lines.length === 0) return ',';

  const scores = COMMON_DELIMITERS.map(delimiter => {
    let score = 0;
    
    const fieldCounts = lines.map(line => line.split(delimiter).length);
    const isConsistent = fieldCounts.every(count => count === fieldCounts[0]);
    if (isConsistent) score += 5;

    const avgFields = fieldCounts.reduce((a, b) => a + b, 0) / fieldCounts.length;
    if (avgFields > 1 && avgFields < 100) score += 3;

    const hasQuotedFields = lines.some(line => line.includes('"'));
    if (hasQuotedFields && delimiter === ',') score += 2;

    lines.forEach(line => {
      const fields = line.split(delimiter);
      fields.forEach(field => {
        if (!COMMON_DELIMITERS.some(d => d !== delimiter && field.includes(d))) {
          score += 1;
        }
      });
    });

    return { delimiter, score };
  });

  const bestMatch = scores.reduce((a, b) => a.score > b.score ? a : b);
  logDelimiterDetection(text.split('\n')[0], bestMatch.delimiter);
  return bestMatch.delimiter;
};

const logDelimiterDetection = async (sampleLine: string, detectedDelimiter: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('delimiter_stats').insert({
      file_name: 'sample.csv',
      detected_delimiter: detectedDelimiter,
      feedback_source: user.id
    });
  } catch (error) {
    console.error('Failed to log delimiter detection:', error);
  }
};