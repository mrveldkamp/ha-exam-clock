// Plus Row Button -> Add Table Row
document.getElementById("add-row").addEventListener("click", () => {
  let tBody = document.querySelector(".exam-times")
  tBody.insertAdjacentHTML(
    "beforeend",
    `
    <tr>
      <td contenteditable="plaintext-only">-------</td>
      <td contenteditable="plaintext-only">--:-- AM</td>
      <td contenteditable="plaintext-only">--:-- PM</td>
      <td>A <em class="not-bold">(< 2.5 hours)</em></td>
      <td>
        <img class="trash" src="img/trashcan.svg" alt="Trashcan" />
      </td>
    </tr>
    `,
  )
  activateTrashCans()
})

// Trach Can Buttons -> Remove Row
activateTrashCans()

function activateTrashCans() {
  let trashcans = document.querySelectorAll(".trash")
  for (let trashcan of trashcans) {
    trashcan.addEventListener("click", (e) => e.target.closest("tr").remove())
  }
}
