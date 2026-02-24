# Specification

## Summary
**Goal:** Enhance the Add Account Dialog with live search, custom prop firm addition capability, fix dropdown scrolling, and resolve account submission errors.

**Planned changes:**
- Add live search functionality to filter prop firms as user types (case-insensitive, partial matching)
- Add "Add your Prop firm" option to allow manual entry of custom prop firms not in the default list
- Store custom prop firms in backend user profile and cache in frontend localStorage for persistence across sessions
- Fix dropdown scrolling issue to enable proper navigation through the full list of firms
- Diagnose and fix account submission error preventing successful account creation
- Merge and display both default PROP_FIRMS and user's custom firms in sorted, searchable dropdown

**User-visible outcome:** Users can quickly find prop firms using live search, add custom prop firms when theirs isn't listed, scroll through the full dropdown list properly, and successfully submit new accounts without errors. Custom firms persist across sessions and devices.
