// //Api

//jquery selectors

//current local time

// dayjs()

// Get current time using dayjs
var now = dayjs();

$('#headerTime').text(now.format('MMM D, YYYY, h:mm:ss a'));


function updateTime() {
  var now = dayjs();
  $('#headerTime').text(now.format('MMM D, YYYY, h:mm:ss a'));
}

setInterval(updateTime, 1000);

// function to set the inputs from the modal to local storage
let submitBtn = $(".btn-under");
let cuisineVal = [];

var modalButton = $("#whatrufeelin");
var locationBox = $(".locationBox");

// Makes button appear and dissapear depending on number of char

locationBox.on("input", function () {
  if ($(this).val().trim() !== "") {
    $(modalButton).removeClass("d-none");
  } else {
    $(modalButton).addClass("d-none");
  }
});

// Here we need to take in local storage for location

submitBtn.on("click", function () {
  // Puts in stuff for local Storage

  localStorage.setItem("Location", $(locationBox).val().trim());

  $("form input[type=text]").each(function () {
    let foodType = $(this).val();
    cuisineVal.push({
      name: this.name,
      value: foodType,
    });
    console.log(this);
  });
  localStorage.setItem("cuisineVal", JSON.stringify(cuisineVal));
  console.log(cuisineVal);
  console.log(this);
});
