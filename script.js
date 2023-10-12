//constans
const input = document.getElementById("input");
const add = document.getElementById("add");
const errorText = document.getElementById('alert')
const lenName = document.querySelector('.len-name')
const search = document.getElementById('searchInput')
const menuBars = document.querySelector('.fa-bars')


//array and regex a-z
let arr = []
console.log(arr.length)
const regex = /^[A-Za-z]+$/;

//ham menu event
menuBars.addEventListener('click', function(){
  const menu = document.querySelector('.menu')
  menu.classList.toggle('active')
})

let lists;
let listsCon;
let number;

//addbutton event
add.addEventListener("click", function () {
  if (input.value !== ""  && regex.test(input.value)) {
    listsCon = document.querySelector(".nameLists");
    lists = document.createElement("p");
    let color = ['#E4A036', '#42D141', '#1CFEFA', '#C068F0', '#F90694', '#CCE442', '#677DEF']
    const randomColor = Math.floor(Math.random() * color.length)
    const displayColor = color[randomColor]
    
    //lists display
    const names = input.value.trim()
    arr.push(names)
    lists.style.backgroundColor = displayColor
    lists.style.textTransform = 'capitalize'
    for (let names of arr){
      lists.innerHTML = names
      listsCon.appendChild(lists)
    }
    input.value = "";


    //total lists calculator
    number = arr.length
    lenName.innerHTML = number
     
    //troubleshooting 
    console.log(arr)
    console.log("added");
  }
  else{
    errorText.style.visibility = 'initial'
    errorText.innerHTML = 'Input first:)'
    return false;
  }
});

//input validate
function validateInput(){
  const inputValue = input.value
  if (inputValue.length === 12) {
    errorText.innerText = 'The name has reached its max';
    errorText.style.visibility = 'initial';
  }
  else if (input.value == ''){
    errorText.style.visibility = 'hidden'
  }
  else if (!/^[a-zA-Z]+$/.test(inputValue)) {
    errorText.innerText = 'Only alphabet (a-z) allowed';
    errorText.style.visibility = 'initial';
} else {
    errorText.style.visibility = 'hidden';
}
}

const undo = document.getElementById('undo')
const redo = document.getElementById('redo')

let undoArr = []
undo.addEventListener('click', function() {
  const allNames = document.querySelectorAll('.nameLists p');
  const lastItemIndex = allNames.length - 1;

  if (lastItemIndex >= 0) {
    const lastItem = allNames[lastItemIndex];
    const removedName = arr.pop();
    lastItem.parentElement.removeChild(lastItem);
    undoArr.push(removedName);

    number = arr.length;
    lenName.innerHTML = number;

    console.log(arr)
    console.log(undoArr)
  }
});

redo.addEventListener('click', function() {
  if (undoArr.length > 0) {
    let color = ['#E4A036', '#42D141', '#1CFEFA', '#C068F0', '#F90694', '#CCE442', '#677DEF']
    const randomColor = Math.floor(Math.random() * color.length)
    const displayColor = color[randomColor]

    const restoredName = undoArr.pop();
    arr.push(restoredName);

    const listsCon = document.querySelector(".nameLists");
    const newParagraph = document.createElement("p");
    newParagraph.textContent = restoredName;

    newParagraph.style.backgroundColor = displayColor
    newParagraph.style.textTransform = 'capitalize'

    listsCon.appendChild(newParagraph);

    number = arr.length;
    lenName.innerHTML = number;

    console.log(arr)
    console.log(undoArr)
  }
});

search.addEventListener('input', function(){
  var searchText = search.value.toLowerCase();

  var paragraphs = document.querySelectorAll(".nameLists p");

  paragraphs.forEach(function(paragraph) {
    var paragraphText = paragraph.textContent.toLowerCase().trim();
      if (paragraphText.includes(searchText)) {
        paragraph.style.borderColor = "white";
        paragraph.style.transform = 'translateY(-20px)'
        paragraph.style.boxShadow = '0px 10px 10px'
      } else {
        paragraph.style.borderColor = "black";
        paragraph.style.transform = 'translateY(0px)'
        paragraph.style.boxShadow = '0px 0 0'
        
      }
  });
  if (searchText == ''){
    paragraphs.forEach(function(paragraph){
      paragraph.style.borderColor = 'black'
      paragraph.style.transform = 'translateY(0px)'
      paragraph.style.boxShadow = '0px 0 0'
    })
  }
})

const randomButton = document.getElementById('random')
const result = document.querySelector('.result')

// random button
randomButton.addEventListener('click', function(){
    const randomIndex = Math.floor(Math.random() * arr.length)
    const randomNames = arr[randomIndex]
    randomButton.disabled = true
    result.style.animation = 'moveupdown 8s '
    result.style.visibility = 'initial'
    result.innerHTML = 'Choosing....'
    
    //display chosen name
    setTimeout(() => {
        result.innerHTML =  randomNames
        result.style.animation = 'lightup 10s infinite, slidein 1s ease-in-out forwards'
        randomButton.disabled = false
        if (arr.length > 0){
        const choosecCon = document.querySelector('.choosed')
        const choosedName = document.createElement('li')
        choosedName.innerHTML = randomNames
        choosecCon.appendChild(choosedName)
        }
        else{
            result.innerHTML = 'All names have already chosen:)'
        }
    }, 8000)

    //remove name after chosen
    setTimeout(() => {
      const allNames = document.querySelectorAll('.nameLists p')
      allNames.forEach(function(item){
        if (item.innerHTML === randomNames){
          item.remove()
        }
      })
      arr.splice(randomIndex, 1)
      number = arr.length
      lenName.innerHTML = number

      console.log(arr)
    },8003)

})
