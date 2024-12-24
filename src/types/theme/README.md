# Theme Type System

This directory contains the complete type system for themes, organized in layers:

1. Database Layer (database.ts)
   - Exact match to Supabase schema
   - Source of truth for persistence
   - Snake_case properties

2. State Layer (state.ts)
   - Runtime state management
   - Tracks dirty state, sync status
   - Extended from database types

3. Style Layer (style.ts)
   - CSS variable definitions
   - Type-safe style properties
   - Unit handling

4. Animation Layer (animation.ts)
   - Motion/transition types
   - Animation preferences
   - Timing functions

5. Transforms (transforms.ts)
   - Type-safe transformations between layers
   - Utility functions
   - Validation

## Usage

Import types from the index:

```typescript
import { ThemeRow, ThemeState, ThemeStyles, ThemeAnimation } from '@/types/theme';
```

Use transformation utilities:

```typescript
import { transformRowToState, transformStateToStyles } from '@/types/theme';
```