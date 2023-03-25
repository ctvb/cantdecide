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
let cuisineVal = [];


var modalButton = $('#whatrufeelin');
var locationBox = $('.locationBox');



// Makes button appear and dissapear depending on number of char

locationBox.on('input', function () {
    if ($(this).val().trim() !== '') {
        $(modalButton).removeClass('d-none');
    } else{
        $(modalButton).addClass('d-none');
    }
});

// Here we need to take in local storage for location

    submitBtn.on("click", function () {


        // locationBox.val().trim()
 
        // Cleans out previous entries
        localStorage.removeItem("cuisineVal");
        
        $('form input[type=text]').each(function () {
            let foodType = $(this).val();
            cuisineVal.push({
                name: this.name,
                value: foodType,
            })
            console.log(this);
        })
        localStorage.setItem("cuisineVal", JSON.stringify(cuisineVal));
        console.log(cuisineVal);
        console.log(this);

       
    })







    


