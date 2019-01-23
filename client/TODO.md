# Keyboard ninja

## Goals

* curate all apps keyboard shortcuts
* show what is most used
* personalized view of pinned shortcuts 

## Plan

homepage

* most searched apps
* quotes
  * special hell for people
  * the ui disappears

search  

* search results
* if app not found - suggest add
* change OS
* show categorized / by popularity (flat)

add app

* name
* category
* after save - redirect to add shortcuts

add shortcuts

* search app - "cant find app ? add it"
* show existing sections, allow add
* add action/win/osx/comment
* add method
  * hold key for 1 sec to enter its name
  * hold key + enter to enter name
  * toggle text/capture
  * (Ctrl, Alt, Shift, Space, Tab, Windows, Insert, Delete, Esc, F1 ... F12, Enter, Backspace, PageUp.., Home, End, ArrowUp...)
* accessible
  * from the main page -> add a shortcut
  * from the search results ("missing a shortcuts ? add it!") -> leads to partially filled shortcut form
* detect duplicates

general

* patreon
* reporting an error/duplication
* allow change the order of shorcuts
* SSR
* SEO
* spread the word in blogs/groups
* stats page to count 
  * apps/categories/sections/shortcuts/pins/users/logins

users
  
* login
* logout
* signup
* forgot my password
* pin (requires login)
* my shortcuts/apps

## questions 

* who will add apps/sections
* allow renaming sections, moving shortcuts between sections, reordering sections
* add to redux and server at the same time ?
* one big data object vs foreign key ?
  * concurrency issues
  * duplication/misplling issues (ie sections)
* one root with header/footer
* blinking styles

* https://caniuse.com/
* https://marksheet.io/
* https://devhints.io/react/
* hotjar 

#### shortcut sheets
https://www.jetbrains.com/help/resharper/Reference__Keyboard_Shortcuts.html
https://helpx.adobe.com/il_en/premiere-pro/using/default-keyboard-shortcuts-cc.html
file:///C:/Users/gabim/Desktop/xd-keyboard-shortcuts-april2018.pdf
https://helpx.adobe.com/il_en/photoshop/using/default-keyboard-shortcuts.html
https://www.virendrachandak.com/techtalk/notepad-keyboard-shortcuts/
https://steinberg.help/cubase_ai_le_elements/v9/en/cubase_nuendo/topics/key_commands/key_commands_default_c.html
http://www.protoolskeyboardshortcuts.com/pro-tools-12-keyboard-shortcuts/
