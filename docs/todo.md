## Project Tasks

### Frontend

- [x] ~~Login page~~
- [ ] Home page (Dominic)
- [ ] Search (Shane)
- [ ] Recipe viewer (Kobie)
- [ ] Recipe editor (Adolfo)
- [ ] PDF preview/printing page (Katie)
- [x] ~~Landing page~~
- [ ] Settings page
- [ ] Fullscreen categories/recipes page

### Backend

- [x] ~~Gemini API~~
- [x] ~~Define SQL schemas~~
- [ ] DB to JSON converter
- [x] ~~Auth~~
- [x] ~~S3 storage bucket~~
- [x] ~~Deploy to Vercel~~
- [ ] Read-only links

### Documentation

- [x] ~~Requirements doc~~
- [x] ~~Design doc~~
- [ ] Programmer's manual
- [ ] User manual
- [ ] Integration task
- [ ] Final testing
- [ ] Final presentation

### Misc

- More fallback spinners/ui
- Logo
- Server action to take (tweaked) recipe json from client and update db accordingly
- TOS/Privacy policy?
- Native image selector popup should be in "all files" mode, not just "images" mode
- Add image upload to recipe editor (also need to adjust recipe/db schema)

### Notes
- Does our DB need a users table?
- Print page should include QR code linking back to original
- Search should be a "go to recipe" fuzzy-finder with a few symbols for advanced search (hinted at in the ui), e.g. # for category, @ for ingredient, etc). We should probably use cmdk (for ui) and fuse.js (for simple fuzzy searching). Since our recipe data is so small we can get by with sending everything to the client on first page load, and as a result we can fuzzy-search everything blazingly fast.
- Add rest of env vars (incl turso db) to github actions env

### Bugs
- Weird hydration error (possibly fixed with clerk update)
