export const shortcuts = [
  { id: 1, appId: 1, appSectionId: 1, action:"reset", win:"ctrl+alt+del", osx:"", pins:0, comment:"" },
  { id: 2, appId: 1, appSectionId: 1, action:"paste", win:"ctrl+z", pins:0, comment:"" },
  { id: 3, appId: 1, appSectionId: 1, action:"cut", win:"ctrl+x", pins:0, comment:"" },
  { id: 4, appId: 1, appSectionId: 1, action:"copy", win:"ctrl+c", pins:0, comment:"" },

  { id: 5, appId: 2, appSectionId: 1, action:"jump to omnibar", win:"ctrl+l q", pins:0, comment:"" },
  { id: 6, appId: 2, appSectionId: 1, action:"close tab", win:"ctrl+w", pins:0, comment:"" },
  { id: 7, appId: 2, appSectionId: 1, action:"new tab", win:"ctrl+t", pins:0, comment:"" },
  { id: 8, appId: 2, appSectionId: 1, action:"open recetly closed tab", win:"ctrl+shift+t", pins:0, comment:"" },
  { id: 9, appId: 2, appSectionId: 1, action:"zoom in", win:"ctrl+plus", pins:0, comment:"" },
  { id: 10, appId: 2, appSectionId: 1, action:"zoom out", win:"ctrl+-", pins:0, comment:"" },
  { id: 11, appId: 2, appSectionId: 1, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },
]

export const apps = [
  { id: 1, name:"Visual Studio Code", category:"IDE", sections : [{id:1, name:'General'}]},
  { id: 2, name:"Word"},
  { id: 3, name:"Photoshop"},
  { id: 4, name:"Windows"},
  { id: 5, name:"MacOS"}
]