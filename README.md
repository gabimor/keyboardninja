# Keyboard Ninja

## TODO

#### alpha

- enter all apps data
- responsive
  - mobile menu
  - cross browser/device tests
- share page
  - pin without login
  - save to localstorage
  - on share, create link and save to server
- handle 404
- favicon
- upload to server & connect domain
- sanity tests
- GA & hotjar

#### alpha 2
- images sizes (unite per category)
- embed
- my apps
- forgot password

#### beta

- login or signup to save, you can also share your shortcuts with a frien
- separate popularity and btn?
- suggest an app
- footer
- sections: text/shortcut width
- homepage: category index
- login, signup popup & load userApp on login
- search TODOs
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

- add social login
- Show: All, My Shortcuts | Grouped, Ungrouped (inside SearchWrapper)
- ?? app page - SSR load the first sections + show all
- my apps: apps you've pinned shortcuts in will show here
- homepage
  - now contains 20,123 shortcuts from 55 apps
  - links all categories at the top
- suggest app
- patreon/buy me a coffee
- spread the word in blogs/groups
- seo - find a pro friend

## Tech debt

- change memory cache to redis
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
