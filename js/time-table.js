function getExamData() {
  let examData = JSON.parse(localStorage.getItem("examData"))
  if (examData) {
    return examData
  } else {
    return [newTableRow()]
  }
}

function newTableRow() {
  return {
    name: "-------",
    start: "9:00 AM",
    end: "3:00 PM",
  }
}

function addTableRow(examData) {
  examData.push(newTableRow())
  populateExamTable(examData)
  updateClock()
  localStorage.setItem("examData", JSON.stringify(examData))
}

function populateExamTable(examData) {
  let tBodyEl = document.querySelector(".exam-times")
  tBodyEl.innerHTML = ""
  for (let i = 0; i < examData.length; i++) {
    tBodyEl.innerHTML += `
      <tr>
        <td data-index="${i}" data-key="name" contenteditable="plaintext-only">${examData[i].name}</td>
        <td data-index="${i}" data-key="start" contenteditable="plaintext-only">${examData[i].start}</td>
        <td data-index="${i}" data-key="end" contenteditable="plaintext-only">${examData[i].end}</td>
        <td>-------</td>
        <td>
          <img data-index="${i}" class="trash" src="img/trashcan.svg" alt="Trashcan" />
        </td>
      </tr>`
  }

  activateTrashCans(examData)
  activateEditFields(examData)
}

function activateTrashCans(examData) {
  let trashcans = document.querySelectorAll(".trash")
  for (let trashcan of trashcans) {
    trashcan.addEventListener("click", (e) => {
      let index = e.target.dataset.index
      examData.splice(index, 1)
      populateExamTable(examData)
      localStorage.setItem("examData", JSON.stringify(examData))
    })
  }
}

function activateEditFields(examData) {
  let editEls = document.querySelectorAll('[contenteditable="plaintext-only"]')
  for (let el of editEls) {
    el.addEventListener("input", (e) => {
      let index = e.target.dataset.index
      let key = e.target.dataset.key
      examData[index][key] = e.target.textContent
      updateClock()
      localStorage.setItem("examData", JSON.stringify(examData))
    })
  }
}
