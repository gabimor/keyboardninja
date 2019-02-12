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
 (-) undefined
“Insert mode” for inserting text. Keys behave as expected. (-) Escape key (-) undefined
“Last-line mode” where Vim expects you to enter a command such as to save the document. (-) i (-) undefined
 (-) : (-) undefined
moves the cursor one character to the left. (-)   (-) undefined
moves the cursor down one line. (-) Navigation keys
 (-) undefined
moves the cursor up one line. (-) h (-) undefined
moves the cursor one character to the right. (-) j or Ctrl + J (-) undefined
moves the cursor to the beginning of the line. (-) k or Ctrl + P (-) undefined
moves the cursor to the end of the line. (-) l (-) undefined
moves the cursor to the first non-empty character of the line (-) 0 (-) undefined
move forward one word (next alphanumeric word) (-) $ (-) undefined
move forward one word (delimited by a white space) (-) ^ (-) undefined
move forward five words (-) w (-) undefined
move backward one word (previous alphanumeric word) (-) W (-) undefined
move backward one word (delimited by a white space) (-) 5w (-) undefined
move backward five words (-) b (-) undefined
move to the end of the file (-) B (-) undefined
move to the beginning of the file. (-) 5b (-) undefined
 (-) G (-) undefined
jumps to the previous sentence (-) gg (-) undefined
jumps to the next sentence (-)   (-) undefined
jumps to the previous paragraph (-) Navigate around the document
 (-) undefined
jumps to the next paragraph (-) ( (-) undefined
jumps to the previous section (-) ) (-) undefined
jumps to the next section (-) { (-) undefined
jump to the end of the previous section (-) } (-) undefined
jump to the end of the next section (-) [[ (-) undefined
 (-) ]] (-) undefined
Insert text after the cursor (-) [] (-) undefined
Insert text at the end of the line (-) ][ (-) undefined
Insert text before the cursor (-)   (-) undefined
Begin a new line below the cursor (-) Insert text
 (-) undefined
Begin a new line above the cursor (-) a (-) undefined
 (-) A (-) undefined
Insert the file [filename] below the cursor (-) i (-) undefined
Execute [command] and insert its output below the cursor (-) o (-) undefined
 (-) O (-) undefined
delete character at cursor (-)   (-) undefined
delete a word. (-) Special inserts
 (-) undefined
delete to the beginning of a line. (-) :r [filename] (-) undefined
delete to the end of a line. (-) :r ![command] (-) undefined
delete to the end of sentence. (-)   (-) undefined
delete to the beginning of the file. (-) Delete text
 (-) undefined
delete to the end of the file. (-) x (-) undefined
delete line (-) dw (-) undefined
delete three lines (-) d0 (-) undefined
 (-) d$ (-) undefined
Replace the character under the cursor with {text} (-) d) (-) undefined
Replace characters instead of inserting them (-) dgg (-) undefined
 (-) dG (-) undefined
copy current line into storage buffer (-) dd (-) undefined
Copy the current lines into register x (-) 3dd (-) undefined
paste storage buffer after current line (-)   (-) undefined
paste storage buffer before current line (-) Simple replace text
 (-) undefined
paste from register x after current line (-) r{text} (-) undefined
paste from register x before current line (-) R (-) undefined
 (-)   (-) undefined
undo the last operation. (-) Copy/Paste text
 (-) undefined
redo the last undo. (-) yy (-) undefined
 (-) ["x]yy (-) undefined
search document for search_text going forward (-) p (-) undefined
search document for search_text going backward (-) P (-) undefined
move to the next instance of the result from the search (-) ["x]p (-) undefined
move to the previous instance of the result (-) ["x]P (-) undefined
Search for the first occurrence of the string “original” and replace it with “replacement” (-)   (-) undefined
Search and replace all occurrences of the string “original” with “replacement” (-) Undo/Redo operation
 (-) undefined
Search for all occurrences of the string “original” but ask for confirmation before replacing them with “replacement” (-) u (-) undefined
 (-) Ctrl+r (-) undefined
Set bookmark {a-z A-Z} at the current cursor position (-)   (-) undefined
List all bookmarks (-) Search and Replace keys
 (-) undefined
Jumps to the bookmark {a-z A-Z} (-) /search_text (-) undefined
 (-) ?search_text (-) undefined
Enter visual mode per character (-) n (-) undefined
Enter visual mode per line (-) N (-) undefined
Exit visual mode (-) :%s/original/replacement (-) undefined
  (-) :%s/original/replacement/g (-) undefined
Switch case (-) :%s/original/replacement/gc (-) undefined
delete a word. (-)   (-) undefined
change (-) Bookmarks
 (-) undefined
yank (-) m {a-z A-Z} (-) undefined
shift right (-) :marks (-) undefined
shift left (-) `{a-z A-Z} (-) undefined
filter through an external command (-)   (-) undefined
  (-) Select text
 (-) undefined
Quits Vim but fails when file has been changed (-) v (-) undefined
Save the file (-) V (-) undefined
Save the file with the new_name filename (-) Esc (-) undefined
Save the file and quit Vim. (-)   (-) undefined
Quit Vim without saving the changes to the file. (-) Modify selected text
 (-) undefined
Write file, if modified, and quit Vim (-) ~ (-) undefined
Same as :q! Quits Vim without writing changes (-) d (-) undefined
