// Populate Time Table - localStorage or Default
let examData = getExamData()
populateExamTable(examData)

// Run the clock immediately when the page loads
updateClock()

// Refresh the clock every 1000 milliseconds (1 second)
setInterval(updateClock, 1000)

// EVENT LISTENER - Click Plus Row Button -> Add Table Row
document
  .getElementById("add-row")
  .addEventListener("click", () => addTableRow(examData))

// EVENT LISTENER - Click Font Size + & - buttons
document
  .getElementById("plus")
  .addEventListener("click", () => adjustRootFontSize(1))
document
  .getElementById("minus")
  .addEventListener("click", () => adjustRootFontSize(-1))

// Adjust the html root font-size when + or - buttons clicked
function adjustRootFontSize(delta) {
  let currentFS = document.documentElement.style.fontSize

  // First time, currentFS is the empty string
  currentFS == "" ? (currentFS = 32) : (currentFS = parseInt(currentFS))
  currentFS += delta
  document.documentElement.style.fontSize = currentFS + "px"
}
