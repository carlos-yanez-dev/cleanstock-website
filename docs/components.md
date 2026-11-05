# Shared components

The root page is a noindex Phase 1 review gallery. It demonstrates shared components only; sample values are illustrative, not business metrics or calculator results.

- Button supports primary/secondary styles, native props, disabled state, and a non-animated pending label with aria-busy.
- Card requires a unique heading ID and title.
- InputField and SelectField connect labels, hints, and errors. Native props and React 19 refs pass through for React Hook Form.
- FieldError announces a textual error, not just a colored border.
- ResultPanel groups contextual values and announces updates politely. Future live calculators must debounce updates before passing results.
- DataTable supplies a caption, column/row headers, a named focusable scroll region, and an empty state.
- SiteFrame supplies a skip link, focusable main landmark, content container, and preview header/footer.

Colors and typography are defined as Tailwind CSS theme tokens in src/app/globals.css. Content uses a system font without external font requests. Focus outlines use a separate blue token with an offset; buttons and input targets are at least 46 CSS pixels high. Table overflow is contained in its region.

Run npm run test:e2e to check keyboard access, focus visibility, error association, 320-pixel reflow, and automated WCAG contrast/accessibility rules in Chromium. Full-page screenshots are saved to the per-test directory under test-results. Automated checks are not proof of full WCAG conformance; manual zoom and screen-reader review remains part of the later public-site phases.
