# WEB103 Project 3 - Boss Rush Bestiary (Virtual Community Space)

Submitted by: **Tasneem Shabana**

About this web app: **Boss Rush Bestiary is a game-themed community discovery app where users browse a visual list, click into unique detail pages, and explore data served from a PostgreSQL-backed API.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:
- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
	- [x] **NOTE: Your walkthrough added to the README includes a view of the Render dashboard demonstrating that the Postgres database is available**
	- [x] **NOTE: Your walkthrough added to the README includes a demonstration of the table contents using `SELECT * FROM tablename;` in psql**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
	- [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
	- [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
	- [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Search by multiple attributes using SQL `ILIKE`
- [x] Custom detail API route with unique URL per item
- [x] Custom 404 page and missing-detail handling
- [x] Featured card logic with daily rotation

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Video Walkthrough](videos/walkthrough_compressed_164mb.gif)

[Smaller quick-load version (~72 MB)](videos/walkthrough_compressed_80mb.gif) · [Full-resolution original (~328 MB)](videos/walkthrough_original_328mb.gif)

### Database Evidence (psql + dashboard)

**Render dashboard:** the walkthrough GIF shows the Render PostgreSQL instance in an "Available" state at the start of the sequence, before the terminal clip.

**psql table outputs:** captured during the same walkthrough for quick reference.

```text
SELECT * FROM locations;
    id        |           name            |       region       |                 image                  | description
--------------+---------------------------+--------------------+----------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------
 limgrave     | Limgrave Warcamp          | The Lands Between  | a_rot_goddess_with_golden_armor.png    | A goddess of rot who has never known defeat. Her Waterfowl Dance is legendary. This location hosts coordinated training events and strategy briefings for high-risk encounters.
 midgar       | Midgar Reactor District   | Gaia               | a_silver-haired_swordsman_with_a_long_blade.jpg | He seeks to become a god by wounding the planet with the meteor. This location runs tactical events focused on raid preparation and survival planning.
 hyrule       | Hyrule Castle Perimeter   | Hyrule             | a_purple_misty_demon_king.jpg          | A primal force of pure evil that has been trapped in Hyrule Castle for 100 years. This location organizes defensive events and guardian-counter drills.
 redgrave     | Red Grave Plaza           | Red Grave City     | a_blue-armored_samurai.jpg             | Dante's twin brother. He seeks more power and wields the Yamato katana. This location features advanced combat events and precision weapon workshops.
 koopa-ruins  | Koopa Ruins Coliseum      | Mushroom Kingdom   | a_skeletal_dragon_king.jpg             | The undead version of the King of Koopas. He breathes blue fire and throws bones. This location hosts endurance events and coordinated challenge runs.
(5 rows)

SELECT * FROM events;
      id         | location_id |              name              |        organizer        |       start_at        | description
-----------------+-------------+--------------------------------+-------------------------+-----------------------+------------------------------------------------------------
 evt-limgrave-1  | limgrave    | Rune Farming Group Run         | Roundtable Tacticians   | 2026-03-20 18:00:00+00| Coordinated route to farm runes and upgrade gear quickly.
 evt-limgrave-2  | limgrave    | Boss Mechanics Workshop        | Grace Site Mentors      | 2026-03-22 20:30:00+00| Learn dodge timing, spacing, and punish windows for late-game fights.
 evt-midgar-1    | midgar      | Materia Build Clinic           | Avalanche Labs          | 2026-03-19 17:00:00+00| Hands-on build reviews for support, burst, and survival playstyles.
 evt-hyrule-1    | hyrule      | Guardian Evasion Drills        | Sheikah Scouts          | 2026-03-24 16:00:00+00| Practice movement routes and beam counterplay in live simulations.
 evt-redgrave-1  | redgrave    | Yamato Technique Exhibition    | Order of Sparda         | 2026-03-26 21:00:00+00| Showcase event covering advanced weapon flow and combo routing.
 evt-koopa-1     | koopa-ruins | Undead King Challenge Night    | Shellbreak Collective   | 2026-03-29 19:30:00+00| Practice high-pressure phases and group role coordination in a rotating gauntlet.
(6 rows)
```

GIF created with **ScreenToGif**

## Notes

Challenges encountered included balancing visual design with readability across breakpoints, and tuning PostgreSQL query behavior for intuitive partial-match search.

Recent polish:
- Location cards now lock the location chip directly above the "View Lore" button for consistent CTA alignment.
- Detail hero and portrait images use a higher focal point with slight zoom-out to keep each boss's head framed.

## License

Copyright [2026] [Tasneem Shabana]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.



