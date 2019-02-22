https://www.maketecheasier.com/vim-keyboard-shortcuts-cheatsheet/
headerSelector: h3
actionSelector: td:nth-child(2)
winSelector: td:nth-child(1)
osxSelector: asdasdasd
-----------------------------
# Main
# Navigation keys
# Navigate around the document
# Insert text
# Special inserts
# Delete text
# Simple replace text
# Copy/Paste text
# Undo/Redo operation
# Search and Replace keys
# Bookmarks
# Select text
# Modify selected text
# Save and quit
-----------------------------
Gets out of the current mode into the “command mode”. All keys are bound of commands. (-) Main

“Insert mode” for inserting text. Keys behave as expected. (-) Escape key
“Last-line mode” where Vim expects you to enter a command such as to save the document. (-) i
 (-) :
moves the cursor one character to the left. (-)  
moves the cursor down one line. (-) Navigation keys

moves the cursor up one line. (-) h
moves the cursor one character to the right. (-) j or Ctrl + J
moves the cursor to the beginning of the line. (-) k or Ctrl + P
moves the cursor to the end of the line. (-) l
moves the cursor to the first non-empty character of the line (-) 0
move forward one word (next alphanumeric word) (-) $
move forward one word (delimited by a white space) (-) ^
move forward five words (-) w
move backward one word (previous alphanumeric word) (-) W
move backward one word (delimited by a white space) (-) 5w
move backward five words (-) b
move to the end of the file (-) B
move to the beginning of the file. (-) 5b
 (-) G
jumps to the previous sentence (-) gg
jumps to the next sentence (-)  
jumps to the previous paragraph (-) Navigate around the document

jumps to the next paragraph (-) (
jumps to the previous section (-) )
jumps to the next section (-) {
jump to the end of the previous section (-) }
jump to the end of the next section (-) [[
 (-) ]]
Insert text after the cursor (-) []
Insert text at the end of the line (-) ][
Insert text before the cursor (-)  
Begin a new line below the cursor (-) Insert text

Begin a new line above the cursor (-) a
 (-) A
Insert the file [filename] below the cursor (-) i
Execute [command] and insert its output below the cursor (-) o
 (-) O
delete character at cursor (-)  
delete a word. (-) Special inserts

delete to the beginning of a line. (-) :r [filename]
delete to the end of a line. (-) :r ![command]
delete to the end of sentence. (-)  
delete to the beginning of the file. (-) Delete text

delete to the end of the file. (-) x
delete line (-) dw
delete three lines (-) d0
 (-) d$
Replace the character under the cursor with {text} (-) d)
Replace characters instead of inserting them (-) dgg
 (-) dG
copy current line into storage buffer (-) dd
Copy the current lines into register x (-) 3dd
paste storage buffer after current line (-)  
paste storage buffer before current line (-) Simple replace text

paste from register x after current line (-) r{text}
paste from register x before current line (-) R
 (-)  
undo the last operation. (-) Copy/Paste text

redo the last undo. (-) yy
 (-) ["x]yy
search document for search_text going forward (-) p
search document for search_text going backward (-) P
move to the next instance of the result from the search (-) ["x]p
move to the previous instance of the result (-) ["x]P
Search for the first occurrence of the string “original” and replace it with “replacement” (-)  
Search and replace all occurrences of the string “original” with “replacement” (-) Undo/Redo operation

Search for all occurrences of the string “original” but ask for confirmation before replacing them with “replacement” (-) u
 (-) Ctrl+r
Set bookmark {a-z A-Z} at the current cursor position (-)  
List all bookmarks (-) Search and Replace keys

Jumps to the bookmark {a-z A-Z} (-) /search_text
 (-) ?search_text
Enter visual mode per character (-) n
Enter visual mode per line (-) N
Exit visual mode (-) :%s/original/replacement
  (-) :%s/original/replacement/g
Switch case (-) :%s/original/replacement/gc
delete a word. (-)  
change (-) Bookmarks

yank (-) m {a-z A-Z}
shift right (-) :marks
shift left (-) `{a-z A-Z}
filter through an external command (-)  
  (-) Select text

Quits Vim but fails when file has been changed (-) v
Save the file (-) V
Save the file with the new_name filename (-) Esc
Save the file and quit Vim. (-)  
Quit Vim without saving the changes to the file. (-) Modify selected text

Write file, if modified, and quit Vim (-) ~
Same as :q! Quits Vim without writing changes (-) d
