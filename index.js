let table = document.getElementById("table");
let reset = document.getElementById("reset");
let allFilled = 0;

for(let i=0;i<3;i++)
{
    let tr = document.createElement("tr");
    let green = i%2 == 0 ? true : false;
    for(let j=0;j<3;j++)
    {
        let td = document.createElement("td");
        if(green)
        {
            td.setAttribute("class", "box green cell");
        }
        else
        {
            td.setAttribute("class", "box dark-green cell");
        }
        td.setAttribute("data-index", `${i}-${j}`);
        tr.appendChild(td);

        green = !green
    }
    table.appendChild(tr);
}

let hash = {};
let chance = true;

table.addEventListener("click", function (e) {
    if (e.target.dataset.index) {
      const [row, col] = e.target.dataset.index
        .split("-")
        .map((val) => parseInt(val));
  
      if (!hash[e.target.dataset.index]) {
        if (chance) {
          hash[e.target.dataset.index] = "X";
          e.target.classList.add("cell-withX");
        } else {
          hash[e.target.dataset.index] = "O";
          e.target.classList.add("cell-withO");
        }
  
        chance = !chance;
        allFilled++;
  
        let result = checkWin();
        if (allFilled == 9 || result.includes("Win")) {
          document.getElementById("won").textContent = result;
          table.style.pointerEvents = "none";
        }
      }
    }
  });

reset.addEventListener("click", function(e) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((val) => {
        if(val.classList.contains("cell-withX")) {
            val.classList.remove("cell-withX");
        }
        else {
            val.classList.remove("cell-withO");
        }
    });

    hash = {};
    allFilled = 0;
    chance = true;
    document.getElementById("won").textContent = "";
    table.style.pointerEvents = "auto"

});

function checkWin() {
    //row
    for (let i = 0; i < 3; i++) {
      let set = new Set();
      let player = "";
      for (let j = 0; j < 3; j++) {
        let key = `${i}-${j}`;
        set.add(hash[key]);
        player = hash[key];
      }
  
      if (set.size == 1 && player) {
        return `Player ${player} Win`;
      }
    }
  
    //col
    for (let j = 0; j < 3; j++) {
      let set = new Set();
      let player = "";
      for (let i = 0; i < 3; i++) {
        let key = `${i}-${j}`;
        set.add(hash[key]);
        player = hash[key];
      }
  
      if (set.size == 1 && player) {
        return `Player ${player} Win`;
      }
    }
  
    // diagonal
    let i = 0,
      j = 0;
    let set = new Set();
    let player = "";
    while (i < 3 && j < 3) {
      let key = `${i}-${j}`;
      set.add(hash[key]);
      player = hash[key];
      i++;
      j++;
    }
  
    if (set.size == 1 && player) {
      return `Player ${player} Win`;
    }
  
    // anti-daiagonal
    (i = 0), (j = 2);
    set.clear();
    while (i < 3 && j >= 0) {
      let key = `${i}-${j}`;
      set.add(hash[key]);
      player = hash[key];
      i++;
      j--;
    }
  
    if (set.size == 1 && player) {
      return `Player ${player} Win`;
    }
  
    return "Match draw";
  }