# Keyboard Ninja

## TODO

- clicking a shortcut saves it to localstorage
- refreshing loads from localstorage
- Get Link hashes sessionid & all the shortcutsids and creates a hash for link
  - creating two links for the same input will not create a new hash
  - message "login to to be able to edit that page"
- logged in user saves the page automatically

#### alpha

- UI
  - home page categories
  - category names
  - get link popup, spinner
  - first time message
  - responsive
    - mobile menu
    - cross browser/device tests
- share page
  - issues
    - userless voting, how to prevent voting more than one time ?
    - count only shares ?
    - resort on vote ?
  - pin without login
  - save to localstorage/session ?
  - sticky header
  - on share, create link and save to server
  - separate popularity and btn?
- found an error ?
  - proofing (search "fix")
  - cmd or ⌘, ⌥, ⇧, ^
- enter all apps data
  - visual studio - mac
  - firefox - mac
- go live
  - search TODOs
  - upload to server & connect domain
  - sanity tests
  - 500 page
  - error handling (fetch, try catch)
  - GA & hotjar
- UI
  - favicon  

#### alpha 2

- find
- Show: All, My Shortcuts | Grouped, Ungrouped (inside SearchWrapper)
- images sizes (unite per category)
- homepage: category index
- sort by popularity
- flat 
- embed

- forgot password

#### beta

- suggest an app / new app poll
- footer
- show related apps in app page (to show there's more content on the site)
- login, signup popup & load userApp on login
- performance
  - render times
  - server times
  - lighthouse
  - move to svg
  - fonts - only load required weights
  - bundle size (code split between home and app ?)

### thoughts

- You register i the site invokes emotional feeling, its your your clan

### bugs

- notify when signing up twice

### low priority

- login
  - add social login
  - forgot password
- ?? app page - SSR load the first sections + show all
- my apps: apps you've pinned shortcuts in will show here
- homepage
  - now contains 20,123 shortcuts from 55 apps
  - links all categories at the top
- suggest app
- patreon/buy me a coffee
- spread the word in blogs/groups

## Tech debt

- store sessions in redis
- change memory cache to redis
- dont cache 404
- users: service workers, transform stream + gzip
- components: functions or arrow functions ? (check react devtools)
- Add <> </> support
- no-unused-vars error
- package sizes thing
- react
  - portals
  - react morph
- express - advanced topics https://expressjs.com/en/advanced/best-practice-performance.html
- https://github.com/i0natan/nodebestpractices

## Backlog

- theme pages ("top shortcuts for a web developer")
- advanced mode
  - several shortcuts to the same action
  - text edit the shortcut
  - support VS code "Ctrl+K V" type shortcuts
- share my personalized page of shortcuts

## Take over the world

- "wanna learn how I built this site on my own completely from scratch, from the design to the finished product?"
- a payed tour of kbn
- offer courses, make money
- tree of knowledge - each subject refrences required subjects

## Taglines

- a ninja community for keyboard shortcuts
- Every app, every shortcut, the best ones first
- Every app, every shortcut, find the best ones
- Discover shortcuts, see what everybody’s using
- Learn your shortcuts, see what others are using
- Every app shortcuts, by ninjas for ninjas
- Every app shortcuts, by importance
- Every app's shortcuts
- Discover, save, share your shortcuts

## Places to post

- digital nomads israel
- react israel
- geektime (PR)
- uzi
- sound groups
- product hunt
- my facebook
- class slack
- friends: ami, ori, roni, ariel, yoni, uzi

## Check out

- https://www.producthunt.com/
- https://github.com/michelvanheest/shortcuts-design-data/issues/12
- https://varnish-cache.org/intro/index.html#intro
- https://nomadlist.com/
- https://tylermcginnis.com/react-router-server-rendering/

## UI Reference

- https://caniuse.com/
- https://marksheet.io/
- https://devhints.io/react/
- https://alligator.io/react/react-powerplug/
