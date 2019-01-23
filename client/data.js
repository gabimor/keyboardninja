export const shortcuts = [
  { id: 1, appId: 1, appSectionId: 1, action:"reset", win:"ctrl+alt+del", pins:0, comment:"" },
  { id: 2, appId: 1, appSectionId: 1, action:"paste", win:"ctrl+z", pins:0, comment:"" },
  { id: 3, appId: 1, appSectionId: 2, action:"cut", win:"ctrl+x", pins:0, comment:"" },
  { id: 4, appId: 1, appSectionId: 2, action:"copy", win:"ctrl+c", pins:0, comment:"" },

  { id: 5, appId: 2, appSectionId: 1, action:"jump to omnibar", win:"ctrl+l q", pins:0, comment:"" },
  { id: 6, appId: 2, appSectionId: 1, action:"close tab", win:"ctrl+w", pins:0, comment:"" },
  { id: 7, appId: 2, appSectionId: 2, action:"new tab", win:"ctrl+t", pins:0, comment:"" },
  { id: 8, appId: 2, appSectionId: 2, action:"open recetly closed tab", win:"ctrl+shift+t", pins:0, comment:"" },
  { id: 9, appId: 2, appSectionId: 3, action:"zoom in", win:"ctrl+plus", pins:0, comment:"" },
  { id: 10, appId: 2, appSectionId: 3, action:"zoom out", win:"ctrl+-", pins:0, comment:"" },
  { id: 11, appId: 2, appSectionId: 3, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },

  { id: 12, appId: 3, appSectionId: 1, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },

  { id: 13, appId: 4, appSectionId: 1, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },

  { id: 14, appId: 5, appSectionId: 1, action:"reset zoom", win:"ctrl+0", pins:0, comment:"" },
]


export const apps = [
  { id: 1, name:"Visual Studio Code", categoryId:1},
  { id: 2, name:"Word" ,categoryId:1},
  { id: 3, name:"Photoshop", categoryId:1},
  { id: 4, name:"Windows", categoryId:1},
  { id: 5, name:"MacOS", categoryId:1}
]

export const appCategories = [
  { id:1, name: "Development" }
]

export const appSections = [
  {id:1, name:"General"},
  {id:2, name:"General2"},
  {id:3, name:"General3"}
]