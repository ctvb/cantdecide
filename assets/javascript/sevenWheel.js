// (RB) GLOBALS FOR YELP API:

var city = localStorage.getItem("Location").trim();
city.split(" ").join("%20");

console.log(city);

// For Weather API (LAT AND LONG)
var lat;
var long;

//Need to link info stored in userInput to this page. Must call on localStorage
var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 500 - padding.left - padding.right,
  h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale
    .linear()
    .domain([0, 1, 2, 3, 4, 5])
    .range(["#ff0000", "#ff9c00", "#eeff00", "#1eff00", "#00beff", "#ad00ff"]); //category20c()

var winningChoice;
var location;
var cuisineArray = [];

function accessMem() {
  var userFood = JSON.parse(localStorage.getItem("cuisineVal"));
  if (!userFood) {
    return;
  }

  for (let i = 0; i < userFood.length; i++) {
    cuisineArray.push({
      label: userFood[i].value,
      value: i + 1,
      question: "API GOES HERE",
    });
    console.log(userFood[i]);
  }
  console.log(cuisineArray);
}

accessMem();

var data = cuisineArray;

var svg = d3
  .select("#chart")
  .append("svg")
  .data([data])
  .attr("width", w + padding.left + padding.right)
  .attr("height", h + padding.top + padding.bottom);
var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  );
var vis = container.append("g");

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice");

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", function (d) {
    return arc(d);
  });
// add the text
arcs
  .append("text")
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 10) +
      ")"
    );
  })
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return data[i].label;
  });
container.on("click", spin);
function spin(d) {
  container.on("click", null);
  //all slices have been seen, all done
  console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
  if (oldpick.length == data.length) {
    console.log("done");
    container.on("click", null);
    return;
  }
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;

  rotation += 90 - Math.round(ps / 2);
  vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      //mark question as seen
      d3.select(".slice:nth-child(" + (picked + 1) + ") path");
      oldrotation = rotation;

      /* Get the result value from object "data" */
      console.log(data[picked].value);
      winningChoice = data[picked].label;

      // HERE WE WILL DO OTHER API CALLS SUCH AS WEATHER AND DAY JS
      GeoLocate();
      //clearWeather();

      // MADE THIS TO CLEAR THE FOOD OPTIONS BEFORE CONFETTI CLEARS
      clearFoodOptions();

      startConfetti();
      setTimeout(function () {
        stopConfetti();
        clearInterval();
      }, 2000);

      // MADE THIS FUNCTION CALL

      getRest();

      /* Comment the below line for restrict spin to sngle time */

      container.on("click", spin);
    });
}
//make arrow

svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (w + padding.left + padding.right) +
      "," +
      (h / 2 + padding.top) +
      ")"
  )
  .append("path")
  .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z");
//(ED) component to filling in old answers
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 60)
  .style({ fill: "white", cursor: "pointer" });
//spin text
container
  .append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .text("SPIN")
  .style({ "font-weight": "bold", "font-size": "30px" });

// Rotate between function
function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

// randomizes values for wheel
function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(array);
    console.log("works");
  } else {
    //no support for crypto, get crappy random numbers

    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}

function getRest() {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" +
      city +
      "&term=" +
      winningChoice +
      "&sort_by=best_match&limit=20",
    {
      headers: {
        authorization:
          "Bearer HHdD8QKXJrbdHE86msNV_mcpTvQokFr_8FsyCI_oYC_TUVuZiPk2tG-CUYZl6n7Ecl0k8qx_spVixJu9_bX2VYwOO4aiFe3Msre6Jbtkj8lehDFRTxgIld-900gbZHYx",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var food = document.getElementById("food-options");

      // If header options doesnt exist yet, create it.
      if (!document.getElementById("headerOptions")) {
        // Create the header element and set its text content
        var here = document.createElement("div");
        here.setAttribute("id", "headerOptions");
        here.textContent = "Here are some of your options:";

        // Append
        food.appendChild(here);
      }

      // WAY TOO MUCH DATA LIMIT IT to 10
      for (var i = 0; i < 10; i++) {
        // GrandParent
        var cardCont = document.createElement("div");
        cardCont.setAttribute("class", "card foodCard");

        // FOR COLORS
        cardCont.setAttribute("id", "vibe-check-box");

        // Parent1
        var cardHeader = document.createElement("h4");
        cardHeader.setAttribute("class", "card-header");

        // EXAMPLE OF HOW TO PUT API INFO IN DYNAMIC TEXT
        cardHeader.textContent = data.businesses[i].name;

        // Parent2
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        // Child 1 of parent 2
        var cardTitle = document.createElement("h5");
        cardTitle.textContent =
          data.businesses[i].location.display_address.join(" ");
        cardTitle.setAttribute("class", "card-title");

        // Child 2 of parent 2
        var cardText = document.createElement("p");
        // Rating
        cardText.textContent =
          "Rating: " + data.businesses[i].rating.toString();
        cardText.setAttribute("class", "card-text rating");

        //  Child 3 of parent 2
        var cardPrice = document.createElement("p");

        cardPrice.textContent = "Price: " + data.businesses[i].price;
        cardText.setAttribute("class", "card-text price");

        // Child 4 of parent 2 HERE WILL BE LINK TO WHATEVER
        var cardButton = document.createElement("a");
        cardButton.textContent = "Go To Website";
        cardButton.setAttribute("class", "btn btn-primary");
        cardButton.href = data.businesses[i].url;

        // Opens new tab
        cardButton.target = "_blank";

        // Append the children to the parent
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(cardButton);

        // Append the parent to the grandparent and html
        cardCont.appendChild(cardHeader);
        cardCont.appendChild(cardBody);
        food.appendChild(cardCont);
      }
    });
}

// CLEARS OUT OTHER OPTION IF WHEEL GOES AGAIN
function clearFoodOptions() {
  var food = document.querySelectorAll(".foodCard");
  for (var i = 0; i < food.length; i++) {
    food[i].remove();
  }
}

function GeoLocate() {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=7355009108da9226df5bd810ec2a29ae"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      lat = JSON.stringify(data[0].lat);
      long = JSON.stringify(data[0].lon);
      getWeather();
    });
}

function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=7355009108da9226df5bd810ec2a29ae&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
