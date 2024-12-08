export const HELP_CONTENT = {
  tableDefinition: {
    title: "Table Definition",
    description: "Define the basic structure of your import table",
    tips: [
      "Table names must be lowercase and use underscores",
      "Names must be unique across the database",
      "Choose descriptive names that reflect the data",
    ],
  },
  fieldMapping: {
    title: "Field Mapping",
    description: "Map CSV columns to database fields",
    tips: [
      "At least 3 primary fields are required",
      "Consider which fields are essential for identification",
      "Use consistent naming conventions",
    ],
  },
  validation: {
    title: "Validation Rules",
    description: "Set up data validation rules",
    tips: [
      "Required fields should be marked clearly",
      "Set appropriate length limits for text fields",
      "Consider adding pattern validation for formatted data",
    ],
  },
  preview: {
    title: "Data Preview",
    description: "Review and validate your import data",
    tips: [
      "Check for data consistency",
      "Verify field mappings are correct",
      "Look for potential data quality issues",
    ],
  },
  review: {
    title: "Final Review",
    description: "Review your import configuration",
    tips: [
      "Verify all required fields are mapped",
      "Check validation rules are appropriate",
      "Ensure relationships are correctly defined",
    ],
  },
};