# WEB103 Project 1 - Boss Rush Bestiary

Submitted by: **Tasneem Shabana**

About this web app: **A neon-themed boss bestiary built with Express + vanilla HTML/CSS/JS that lists iconic bosses and provides unique lore detail routes for each one.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
- [x] **Each detail view should be a unique endpoint, such as `localhost:3000/bosses/crystalguardian` and `localhost:3000/mantislords`**
- [x] *Note: When showing this feature in the video walkthrough, please show the unique URL for each detailed view. We will not be able to give points if we cannot see the implementation*
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

The following **optional** features are implemented:

- [x] The web app displays items in a unique format, such as cards rather than lists or animated list items

The following **additional** features are implemented:

- [x] Neon sci-fi visual theme with custom hero banners and boss-specific color accents
- [x] Separate API endpoints (`/api/bosses`, `/api/bosses/:id`) powering dynamic rendering on list and detail pages
- [x] Dedicated custom 404 page with themed messaging and return link
- [x] Accessibility improvements: skip links, focus-visible states, viewport support, and loading/error messaging with `aria-live`/`aria-busy`
- [x] Refactored frontend structure for readability by consolidating inline styles into shared `style.css`
- [x] Improved responsive behavior for hero layout and action button placement on smaller screens
- [x] Enhanced button styling to better match the in-image hero UI aesthetic while preserving keyboard accessibility

## Recent UI/UX Updates

- Home and detail pages now consistently use full-page background coverage with no white gaps
- Hero action button (`Enter The Void`) received responsive positioning and typography refinements
- Card/detail visual system was cleaned up with improved contrast and spacing
- Added more resilient fetch handling (loading and error states) for both list and detail views
- Imported and normalized typography usage across major headings and CTA elements

## Video Walkthrough

![Video Walkthrough](videos/BossRush%20(1).gif)

## Notes

One challenge was aligning large hero images and portrait layouts across screen sizes while keeping the neon design consistent. Another was connecting dynamic routes (`/bosses/:id`) with API data fetches cleanly for each boss detail page.

## License

Copyright [2026] [Tasneem Shabana]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

