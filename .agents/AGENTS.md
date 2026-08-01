# Project Rules

- **Desktop File Integrity**: Do NOT modify `HomePageDesktop.tsx` or any desktop-specific files unless explicitly requested by the user. All mobile responsive UI design changes, height adjustments, and component layout updates must be applied strictly to mobile files (such as `HomePageMobile.tsx`).
- **Desktop Footer Size Locked**: The overall size, top padding, and bottom layout of the footer on the desktop home page (controlled via inline styles in `HomePageDesktop.tsx` and classes in `footer-section.tsx`) are strictly locked to the user's preferred layout. Do NOT change its height or padding again in future modifications.
