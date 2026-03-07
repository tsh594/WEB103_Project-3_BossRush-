# WEB103 Project 2 - Boss Rush Bestiary

Submitted by: **Tasneem Shabana**

About this web app: **I built Boss Rush Bestiary as a full-stack web app where users can browse a database-backed list of video game bosses, search by attributes, and open dedicated detail pages for each boss. I used HTML, CSS, and JavaScript on the frontend with an Express + PostgreSQL backend.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**

- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
	- [x] **NOTE: Walkthrough includes Render dashboard evidence that the Postgres database is available**
	- [x] **NOTE: Walkthrough includes table contents shown with `SELECT * FROM bosses;`**


The following **optional** features are implemented:

- [x] The user can search for items by a specific attribute

The following **additional** features are implemented:

- [x] Unique boss detail endpoints (`/bosses/:id`) with dynamic content loaded from PostgreSQL
- [x] Custom API routes for list and detail data (`/api/bosses`, `/api/bosses/:id`)
- [x] Case-insensitive search using SQL `ILIKE` over multiple attributes (`name`, `title`, `game`)
- [x] Featured Boss CTA with deterministic daily rotation and Legendary-weighted selection
- [x] Custom 404 page and custom detail-level 404 state for missing boss IDs
- [x] Enhanced accessibility: skip links, focus-visible styling, and `aria-live`/`aria-busy` states for async loading
- [x] Responsive hero/button layout tuning and neon UI system with custom theme tokens

## Video Walkthrough

Here's a walkthrough of the implemented required features:

![Video Walkthrough](videos/walkthrough.gif)

<!-- Replace this with whatever GIF tool you used! -->
GIF created with **ScreenToGif**
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One challenge I ran into was balancing the neon visual style with responsive readability, especially around hero CTA placement and typography across breakpoints. Another challenge was tuning PostgreSQL search behavior so partial matches felt intuitive while still returning relevant boss entries.

Another important lesson for me was managing Render Postgres connection values correctly for local development (`External Hostname`) vs deployed services (`Internal Hostname`).

If you clone this repository on another machine, run the following so LFS-tracked media downloads correctly:

```bash
git lfs install
git lfs pull
```

Setup and verification commands used:

```bash
npm install
npm run reset
npm start
```

```sql
\d
\d bosses
SELECT * FROM bosses;
```

## License

Copyright [2026] [Tasneem Shabana]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

