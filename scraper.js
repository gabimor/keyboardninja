copy(scrape("th", "td:nth-child(1)", "asdasdasd", "td:nth-child(2)"))

function scrape(headerSelector, actionSelector, winSelector, osxSelector) {
  let results = window.location.href + "\n"
  results += `headerSelector: ${headerSelector}\n`
  results += `actionSelector: ${actionSelector}\n`
  results += `winSelector: ${winSelector}\n`
  results += `osxSelector: ${osxSelector}\n`
  results += "-----------------------------\n"

  results += [...document.querySelectorAll(headerSelector)]
    .map(e => "# " + e.innerText)
    .join("\n")

  results += "\n-----------------------------\n"
  const actions = [...document.querySelectorAll(actionSelector)].map(e => e.innerText)
  const winKeys = [...document.querySelectorAll(winSelector)].map(e => e.innerText)
  const osxKeys = [...document.querySelectorAll(osxSelector)].map(e => e.innerText)
  results.actions = []

  for (let i = 0; i < actions.length; i++) {
    results += `${actions[i]} (-) ${winKeys[i]} (-) ${osxKeys[i]}\n`
  }

  return results
}

// function scrapeV2(headerSelector, actionSelector, keySelector) {
//   let results = { url: window.location.href }

//   const headers = [...document.querySelectorAll(headerSelector)]

//   const actions = [...document.querySelectorAll(actionSelector)]
//   const keys = [...document.querySelectorAll(keySelector)]
//   // results.actions = []
//   let currentHeader = headers[0].innerText
//   const currentSection = {[currentHeader] : []}
//   console.log(actions.length, keys.length)
//   for (let i = 0; i < actions.length; i++) {
//     // if header is after current action
//     if (headers[0].compareDocumentPosition(actions[i]) & 2) {
//       results = { ...results, ...currentSection }
//       headers.shift()
//       currentHeader = headers[0].innerText
//       currentSection[currentHeader] = []
//     }
//     currentSection[[currentHeader]].push({ [actions[i].innerText]: keys[i].innerText })
//   }

//   return results
// }
