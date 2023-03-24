// //Api


//var userInput

//jquery selectors

//current local time

//autocomplete for current location (city)

//autocomplete for food choices

//spin wheel button (one on index one on wheel page)

// dayjs()

// RANDOMIZE CHOICE
    // math.random

//set and get from local storage
    // choices that you selected 
    // date and time 

// function to set the inputs from the modal to local storage 
let submitBtn = $(".btn-under");
let cuisineVal = []
    
    submitBtn.on("click",function(){
    
     $('form input[type=text]').each(function(){
    let foodType = $(this).val();
        cuisineVal.push({
            name: this.name,
            value: foodType,
        })
    console.log(this)
     })
       localStorage.setItem("cuisineVal", JSON.stringify(cuisineVal))
       console.log(cuisineVal)
    console.log(this)
    })




