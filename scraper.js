// pdf to html - https://www.idrsolutions.com/online-pdf-to-html5-converter/

copy(scrape(".s1_2",".s2_2", ".s3_2"))

function scrape(headerSelector, actionSelector, keySelector) {
  let results = window.location.href + "\n"
  results += `headerSelector: ${headerSelector}\n`
  results += `actionSelector: ${actionSelector}\n`
  results += `keySelector: ${keySelector}\n`
  results += "-----------------------------\n"

  results += [...document.querySelectorAll(headerSelector)]
    .map(e => "# " + e.innerText)
    .join("\n")

  results += "\n-----------------------------\n"
  const actions = [...document.querySelectorAll(actionSelector)].map(e => e.innerText)
  const keys = [...document.querySelectorAll(keySelector)].map(e => e.innerText)
  results.actions = []

  for (let i = 0; i < actions.length; i++) {
    results += `${actions[i]} (-) ${keys[i]}\n`
  }

  return results
}