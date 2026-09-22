# Arip Saputra Portfolio — Final Fix

This version keeps the existing portfolio design and behavior unchanged, with one addition:
**Certificates & Achievements** after Organizations and before Contact.

Certificate images:
- Put certificate images directly in the project root.
- Example: `certificate-1.jpg`, `certificate-2.jpg`, `certificate-3.jpg`.
- Duplicate the certificate card in `index.html` for as many certificates as needed.
- The certificate grid has no fixed number of cards and automatically wraps responsively.
- JPG, PNG, and WebP images are suitable.

Replace the certificate title, issuer, and year with the real information.

The repository remains flat (no src/public/assets folders).
Use Vite:
`npm install`
`npm run dev`


Desktop section heading spacing was adjusted only to prevent the subtitle from overlapping the large heading. Mobile/tablet styles remain unchanged.

\n\n## Profile photo
Put your real profile photo in the project root with the exact filename `foto-profil.png`.
The Home profile photo is now rendered inside the existing circular orb. The `AS` text is removed.
Use a portrait/cutout photo for the cleanest result.


Profile-only refinement: reduced the desktop gap between the Home text and profile visual, added a lanyard-style strap/clip frame, gentle floating motion, and responsive adjustments. Other sections remain unchanged.


Final profile visual: modern futuristic HUD/circular frame with animated glow, orbit layer, moving nodes, and floating motion. The lanyard design was removed. All other portfolio sections are unchanged.


Final profile crop fix: the profile photo now uses a taller modern HUD frame and `object-fit: contain` so the full portrait/cutout can be visible instead of being cropped to the head. Other portfolio sections are unchanged.


Final profile refinement: the Home profile frame is larger, modern rounded-HUD style, the portrait is scaled for better visibility, and responsive rules are included for desktop/tablet/mobile. The image filename is `bg-profil-1.png`. Other sections are unchanged.


Final instruction: no generated artwork is used. The profile frame and motion are made with HTML/CSS; the only profile image is the user's `bg-profil-1.png`. Contact uses a neutral mail icon, not initials.
