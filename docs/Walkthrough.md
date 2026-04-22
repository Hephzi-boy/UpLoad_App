# Product Upload App Walkthrough

## Objective
- Build a React Native app that allows users to upload up to 5 products.
- Each product requires:
  - Product name
  - Product image (from phone gallery)
  - Product price
- Show toast notifications for key actions.
- Use local state management with Redux.

## Tech Stack
- Expo + React Native + Expo Router
- Redux Toolkit + React Redux
- Expo Image Picker

## Current Flow
1. User opens `Home` tab (Upload screen).
2. User enters product name, price (Naira), and selects image.
3. User taps `Upload Image`.
4. Product is saved to Redux local state.
5. App immediately navigates to `Explore` tab to show uploaded product.

## Product Rules
- Maximum product uploads: 5 (`MAX_PRODUCTS = 5`).
- Validation checks before upload:
  - Name is required
  - Photo is required
  - Price is required and must be valid (> 0)
- If user tries to upload after 5/5, upload is blocked.

## Toast Notification Behavior
Global top-toasts are used (slide down from above), and trigger on:
- Successful product upload
- Product removed from Explore
- Upload limit reached (5/5)
- Validation errors (missing/invalid fields)

## UI/UX Details Implemented
- Home screen uses a full-height card layout that fits the screen safely.
- Upload button is positioned at the bottom section of Home for clear flow.
- Upload box is shown only when no image is selected.
- Currency display is Naira (`₦`) in input placeholders and product pricing.
- Explore cards are large and readable with bigger product images/details.
- Explore cards have a top-right `-` remove control.

## State Management Design
- `products` slice:
  - `addProduct`
  - `removeProduct`
  - `MAX_PRODUCTS`
- `toast` slice:
  - `showToast({ message, type })`
- Global toast component is mounted at root layout so all tabs can trigger toasts.

## Key Files
- `app/(tabs)/index.tsx`
  - Upload form, validation, add-product logic, immediate navigate to Explore
- `app/(tabs)/explore.tsx`
  - Uploaded products display and remove action
- `app/(tabs)/_layout.tsx`
  - Tabs configuration (`Home`, `Explore`)
- `app/_layout.tsx`
  - Redux Provider + global top toast mount
- `store/productsSlice.ts`
  - Product data and limit logic
- `store/toastSlice.ts`
  - Toast event state
- `store/index.ts`
  - Store reducer registration
- `components/top-toast.tsx`
  - Top-slide animated toast UI

## Safety Notes
- Product data stays local in Redux (no backend/network upload).
- Gallery access is permission-gated.
- Remove action only updates local state safely.

## Run Instructions
1. Install dependencies:
   - `npm install`
2. Start app:
   - `npm start`
3. Open on phone:
   - Scan QR with Expo Go.

## Validation Checklist
- Upload succeeds with valid name + photo + price.
- App auto-navigates to Explore after successful upload.
- Explore immediately shows uploaded item.
- `-` remove on Explore deletes item and triggers top toast.
- Limit at 5 is enforced and notifies user.
- Top toast appears from above for upload/remove/limit/validation events.
