export interface GeneratedTag {
  name: string;
  count: number;
  source: string;
}

export const generateTags = (
  data: any[],
  config: {
    enabled: boolean;
    minFrequency: number;
    mergeDuplicates: boolean;
  }
): GeneratedTag[] => {
  if (!config.enabled || !data.length) return [];

  const tagCounts = new Map<string, { count: number; source: string }>();

  // Count occurrences of each unique value
  data.forEach((row) => {
    Object.entries(row).forEach(([field, value]) => {
      if (typeof value === "string") {
        const tags = value
          .split(/[,\s]+/)
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag.length >= 2);

        tags.forEach((tag) => {
          const existing = tagCounts.get(tag);
          if (existing) {
            existing.count++;
          } else {
            tagCounts.set(tag, { count: 1, source: field });
          }
        });
      }
    });
  });

  // Filter by minimum frequency and convert to array
  const tags = Array.from(tagCounts.entries())
    .filter(([_, { count }]) => count >= config.minFrequency)
    .map(([name, { count, source }]) => ({ name, count, source }));

  // Merge similar tags if enabled
  if (config.mergeDuplicates) {
    return mergeSimilarTags(tags);
  }

  return tags;
};

const mergeSimilarTags = (tags: GeneratedTag[]): GeneratedTag[] => {
  const merged = new Map<string, GeneratedTag>();

  tags.forEach((tag) => {
    // Find similar existing tags
    const similar = Array.from(merged.values()).find(
      (existing) =>
        levenshteinDistance(existing.name, tag.name) <= 2 || // Similar spelling
        existing.name.includes(tag.name) || // One is substring of other
        tag.name.includes(existing.name)
    );

    if (similar) {
      // Merge into the tag with higher count
      if (tag.count > similar.count) {
        merged.set(tag.name, tag);
      }
    } else {
      merged.set(tag.name, tag);
    }
  });

  return Array.from(merged.values());
};

const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
};