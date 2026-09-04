# RSVP Form Component - Detailed Implementation Plan

## Overview
This plan outlines the implementation of a 4-step multipage RSVP form component built with Formik, local storage persistence, MUI components, and Tailwind CSS. The component accepts guest party data as a prop and manages form state through multiple steps with client-side validation.

---

## 1. File Structure & Component Hierarchy

```
src/
├── components/
│   └── forms/
│       └── RSVPForm/
│           ├── index.ts                          # Public exports
│           ├── RSVPForm.tsx                       # Main form wrapper (orchestrates steps)
│           ├── types.ts                           # Form-specific types and schemas
│           ├── hooks/
│           │   ├── useFormStorage.ts              # Local storage hook
│           │   └── useFormikRSVP.ts               # Formik initialization hook
│           ├── utils/
│           │   ├── formStorage.ts                 # Local storage abstraction
│           │   └── colorUtils.ts                  # Hex color picker utilities
│           └── steps/
│               ├── Step1GuestSelection.tsx        # Select guests to RSVP
│               ├── Step2Preferences.tsx           # Dietary + color + spirit animal
│               ├── Step3Contact.tsx               # Email + phone + text opt-in
│               └── Step4Confirmation.tsx          # Success/error message
```

---

## 2. Local Storage Abstraction Design

### 2.1 Storage Architecture
**File: `src/components/forms/RSVPForm/utils/formStorage.ts`**

Create a simple, key-based storage layer that:
- Uses a fixed prefix (`rsvp-form-`) to namespace all form data
- Stores form state as a single JSON object (YAGNI principle)
- Provides clear interface: `save()`, `load()`, `clear()`
- Handles JSON serialization/parsing errors gracefully
- Does NOT encrypt or compress data (per YAGNI)

```typescript
// Interface
type FormStorageKey = 'rsvp-form-data'
type FormStorageValue = {
  step: number
  formData: any // Will be the Formik values shape
  timestamp: number
}

// Functions
export const formStorage = {
  save: (data: FormStorageValue) => void
  load: () => FormStorageValue | null
  clear: () => void
  isAvailable: () => boolean // Check if localStorage is accessible
}
```

### 2.2 Hook Wrapper
**File: `src/components/forms/RSVPForm/hooks/useFormStorage.ts`**

React hook that:
- Provides hydration safety (avoid hydration mismatch on SSR)
- Tracks mounted state to prevent SSR serialization issues
- Provides `savedData` and storage mutation methods to Formik hook

---

## 3. Formik Setup & Form Structure

### 3.1 Type Definitions
**File: `src/components/forms/RSVPForm/types.ts`**

```typescript
// Form values shape - exactly what Formik manages
export type RSVPFormValues = {
  // Step 1
  selectedGuestIds: string[] // array of guest UUIDs
  
  // Step 2
  dietaryPreferences: Record<string, string> // guestId -> dietary pref
  favoriteColor: string // hex code (e.g., "#FF5733")
  spiritAnimal: string // freeform text
  
  // Step 3
  email: string
  phoneNumber: string
  textOptIn: boolean
  
  // Meta
  currentStep: number
}

// Props type for form component
export type RSVPFormProps = {
  party: Party // from weddingBackend.schemas.ts
  onSuccess?: (result: { success: true }) => void
  onError?: (error: Error) => void
  storageKey?: string // allows testing/multi-form scenarios
}

// Initial values factory
export const getInitialFormValues = (): RSVPFormValues => ({
  selectedGuestIds: [],
  dietaryPreferences: {},
  favoriteColor: '#000000',
  spiritAnimal: '',
  email: '',
  phoneNumber: '',
  textOptIn: false,
  currentStep: 1,
})
```

### 3.2 Validation Schema
**File: `src/components/forms/RSVPForm/types.ts`**

Use Zod for runtime validation (already in project):

```typescript
import { z } from 'zod'

export const RSVPFormSchema = z.object({
  selectedGuestIds: z.array(z.string()).min(1, 'Select at least one guest'),
  dietaryPreferences: z.record(z.string()),
  favoriteColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  spiritAnimal: z.string().min(1, 'Spirit animal is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().regex(/^\+?[0-9\s\-()]{10,}$/, 'Invalid phone'),
  textOptIn: z.boolean(),
  currentStep: z.number(),
})

export type RSVPFormValues = z.infer<typeof RSVPFormSchema>
```

### 3.3 Formik Hook
**File: `src/components/forms/RSVPForm/hooks/useFormikRSVP.ts`**

```typescript
type UseFormikRSVPOptions = {
  party: Party
  initialValues?: Partial<RSVPFormValues>
  onSuccess?: (result: { success: true }) => void
  onError?: (error: Error) => void
}

export const useFormikRSVP = (options: UseFormikRSVPOptions) => {
  return useFormik({
    initialValues: getInitialFormValues(),
    validationSchema: toFormikValidationSchema(RSVPFormSchema),
    onSubmit: handleFinalSubmit,
    validateOnChange: false,
    validateOnBlur: true,
  })
}
```

---

## 4. UI Component Breakdown

### 4.1 Main Form Component
**File: `src/components/forms/RSVPForm/RSVPForm.tsx`**

Responsibilities:
- Manages current step state
- Renders step-specific component based on `values.currentStep`
- Provides navigation buttons (Previous/Next)
- Handles step-to-step validation
- Integrates with form storage on mount and after each step change
- Integrates with submitRsvp server action

Structure:
```typescript
export default function RSVPForm({ party, onSuccess, onError, storageKey }: RSVPFormProps)
  └── useFormStorage(storageKey) → restored values
  └── useFormikRSVP(party, ...restored)
  └── useEffect hydration safety check
  └── Conditional render:
      ├── currentStep === 1 → <Step1GuestSelection />
      ├── currentStep === 2 → <Step2Preferences />
      ├── currentStep === 3 → <Step3Contact />
      └── currentStep === 4 → <Step4Confirmation />
  └── Navigation:
      ├── Previous button (step > 1)
      ├── Next button (step < 4) - validates current step
      └── Submit button (step === 4)
```

### 4.2 Step 1: Guest Selection
**File: `src/components/forms/RSVPForm/steps/Step1GuestSelection.tsx`**

UI:
- Title: "Who are you RSVPing for?"
- FormGroup of Checkboxes
- One checkbox per member in `party.members`
- Label: `${member['First Name']} ${member['Last Name']} (${member.age})`
- Bind to `values.selectedGuestIds`

Validation:
- At least one guest must be selected
- Validated on Next button click before advancing

### 4.3 Step 2: Preferences
**File: `src/components/forms/RSVPForm/steps/Step2Preferences.tsx`**

UI:
- Title: "Tell us about your preferences"
- Subheader: "Please provide info for each guest"
- For each selected guest:
  - Dietary preference (TextField or Select dropdown)
  - (Shared) Favorite color (Hex color input via input[type="color"] or custom hex input)
  - (Shared) Spirit animal (TextField)

Binding:
- `values.dietaryPreferences[guestId]` = string
- `values.favoriteColor` = "#RRGGBB"
- `values.spiritAnimal` = string

Notes:
- Color picker: Use HTML5 `<input type="color">` for simplicity (YAGNI)
- Dietary choices could be hardcoded array: ["Chicken", "Fish", "Vegetarian", "Vegan"]

### 4.4 Step 3: Contact Information
**File: `src/components/forms/RSVPForm/steps/Step3Contact.tsx`**

UI:
- Title: "How can we reach you?"
- Email TextField (type="email", required)
- Phone Number TextField (type="tel", required)
- Text Opt-in Checkbox: "Send me text updates about the wedding"
  - Label: "Yes, send me text updates (optional but recommended)"

Binding:
- `values.email`
- `values.phoneNumber`
- `values.textOptIn`

### 4.5 Step 4: Confirmation
**File: `src/components/forms/RSVPForm/steps/Step4Confirmation.tsx`**

Props:
- `isSubmitting: boolean` (from Formik)
- `submitError: Error | null`
- `onSubmit: () => void` (from parent RSVPForm)

UI (Success):
- Green checkmark icon
- "RSVP Received!"
- "Thank you for responding. We can't wait to see you!"
- Optional: show summary of responses
- Button: "Start Over" (resets form) or link back

UI (Error):
- Red error icon
- "Something went wrong"
- Error message
- "Please contact chelsandalsigman@gmail.com for assistance"
- Buttons: "Retry" (tries submit again) or "Edit" (goes back to step 3)

---

## 5. Type Definitions Summary

### Required Zod Schemas (new files)
- `RSVPFormSchema` - Main form validation
- `HexColorSchema` - Validate hex colors (optional, for step 2)

### Required Interfaces (new types.ts)
- `RSVPFormValues` - Formik values shape
- `RSVPFormProps` - Component props
- `FormStorageValue` - Local storage data shape

### Reuse from Existing Code
- `Party`, `Member` from `src/serverActions/rsvp/weddingBackend.schemas.ts`
- `submitRsvp` server action

---

## 6. Implementation Order (Dependency Graph)

### Phase 1: Types & Utilities (No Dependencies)
1. **Create `types.ts`** - Define RSVPFormValues, RSVPFormSchema, RSVPFormProps
2. **Create `utils/formStorage.ts`** - Implement local storage abstraction
3. **Create `utils/colorUtils.ts`** - Helper for hex color validation/formatting (if needed)

### Phase 2: Hooks (Depends on Phase 1)
4. **Create `hooks/useFormStorage.ts`** - Wrap formStorage with React hook
5. **Create `hooks/useFormikRSVP.ts`** - Initialize Formik with schema

### Phase 3: Step Components (Depends on Phases 1-2)
6. **Create `steps/Step1GuestSelection.tsx`** - Checkbox list
7. **Create `steps/Step2Preferences.tsx`** - Dietary, color, spirit animal
8. **Create `steps/Step3Contact.tsx`** - Email, phone, opt-in
9. **Create `steps/Step4Confirmation.tsx`** - Success/error

### Phase 4: Main Component (Depends on all above)
10. **Create `RSVPForm.tsx`** - Orchestrator component, step navigation, submission
11. **Create `index.ts`** - Public exports

### Phase 5: Package Setup (Before anything runs)
12. **Add Formik to package.json** - Run `npm install formik`
13. **Verify formik-to-yup or zod adapter** - May need formik wrapper

---

## 7. Key Architectural Decisions & Trade-offs

### Decision 1: Formik as State Manager
**Choice**: Use Formik with Zod validation
**Rationale**:
- Spec explicitly requires Formik
- Familiar to React developers
- Built-in touched/error tracking
- Easy integration with MUI components via `formik.getFieldProps()`
- Zod is already in project for validation
- Trade-off: Add ~20KB to bundle, but essential for form complexity

### Decision 2: Single Form State vs. Per-Step State
**Choice**: Single flat form state (Formik values), not nested per-step
**Rationale**:
- YAGNI principle - simpler architecture
- Local storage easier with flat structure
- Formik naturally works with flat objects
- Trade-off: Larger values object, but acceptable for 4 steps

### Decision 3: Local Storage Timing
**Choice**: Save after each step advance, load on mount, clear after success
**Rationale**:
- Survives browser refresh
- Recover interrupted submissions
- Auto-clear prevents stale data reuse
- Trade-off: Extra serialization overhead, negligible for this form size

### Decision 4: Color Input Widget
**Choice**: Use HTML5 `<input type="color">` not custom hex editor
**Rationale**:
- YAGNI - built-in native element
- Mobile-friendly (system color picker)
- Stores as hex internally
- Trade-off: Less control over UX, but meets requirements

### Decision 5: Shared vs. Per-Guest Fields
**Choice**:
- Per-guest: Dietary preferences (one per guest in step 2)
- Shared: Favorite color, spirit animal (once for all guests)
**Rationale**:
- Dietary needs vary by person
- Color/spirit animal are personal but make sense globally
- Simpler data model than per-guest color
- Trade-off: May need clarification if requirements shift

### Decision 6: Validation Strategy
**Choice**: Validate entire current step on Next button, not on blur
**Rationale**:
- Better UX - no errors until user tries to advance
- Prevents step progress blocking while typing
- Clear validation moment
- Trade-off: Errors only show on submit attempt

### Decision 7: Error Handling on Step 4
**Choice**: Show error inline, offer retry and edit buttons
**Rationale**:
- Don't force reset - allow fixing and retrying
- Edit button jumps back to step 3 to change contact info
- Clear fallback: contact email provided
- Trade-off: More complex step 4 UI logic

### Decision 8: Component Organization
**Choice**: Steps as separate files, hooks as separate files, utils separate
**Rationale**:
- Each file ~100-200 lines, easy to navigate
- Follows project convention (separate NavBar items)
- Step components are composable/testable independently
- Trade-off: More files, but better maintainability

---

## 8. Integration Points

### With Server Actions
```typescript
// In RSVPForm.tsx submit handler
import { submitRsvp } from '@/serverActions/rsvp/submitRsvp'

const handleFinalSubmit = async (values: RSVPFormValues) => {
  const request = {
    partyId: party.partyId,
    rsvps: values.selectedGuestIds.map(guestId => ({
      guestId,
      isAttending: true,
      mealChoice: values.dietaryPreferences[guestId],
    })),
  }
  
  try {
    await submitRsvp(request)
    formStorage.clear() // Clear after success
    onSuccess?.({ success: true })
  } catch (error) {
    setSubmitError(error as Error)
    onError?.(error as Error)
  }
}
```

### MUI Integration
- Use `TextField` for text inputs
- Use `Checkbox` and `FormGroup` for checkboxes and toggles
- Use `Box` for layout
- Use `Typography` for labels and titles
- Use `Button` for navigation
- Use `CircularProgress` for loading states
- Use `Alert` or custom component for errors

### Tailwind Integration
- Use className for spacing (gap, padding, margin)
- Use className for responsive design (md:, lg: prefixes)
- Mix MUI sx props with Tailwind classes

---

## 9. Implementation Notes

### Dependency Installation
Add to package.json:
```json
{
  "dependencies": {
    "formik": "^2.4.5"
  }
}
```

No other new dependencies needed. Zod, MUI, Tailwind already present.

### Hydration Safety
In hooks, check `typeof window !== 'undefined'` before accessing localStorage to avoid SSR hydration mismatches.

### Testing Considerations
- Mock `submitRsvp` server action in tests
- Mock localStorage for storage hook tests
- Test each step independently with different props
- Test validation at step boundaries

### Accessibility
- Add proper `htmlFor` on FormControlLabel components
- Use semantic HTML (form, fieldset, legend for checkbox groups)
- Ensure color picker is keyboard accessible
- Add aria-labels where needed

### Error Messages
- Use consistent formatting for validation errors
- Server error should be generic + fallback contact method
- Form submission errors shouldn't block state management

---

## Critical Files for Implementation

- `/Users/macuser/Desktop/ActiveProjects/wedding/wedding-site/src/components/forms/RSVPForm/types.ts`
- `/Users/macuser/Desktop/ActiveProjects/wedding/wedding-site/src/components/forms/RSVPForm/utils/formStorage.ts`
- `/Users/macuser/Desktop/ActiveProjects/wedding/wedding-site/src/components/forms/RSVPForm/RSVPForm.tsx`
- `/Users/macuser/Desktop/ActiveProjects/wedding/wedding-site/src/components/forms/RSVPForm/steps/Step1GuestSelection.tsx`
- `/Users/macuser/Desktop/ActiveProjects/wedding/wedding-site/src/components/forms/RSVPForm/steps/Step2Preferences.tsx`
