// CSD 122 Final Project Bernice Carbaugh 3/17/2020
// JS to handle order: updates divOutput based on user input, handles Submit, and prepopulates order based on selected favorite
$(document).ready(function() {
  // set default poke (Poke is custom class/object)
  let poke = new Poke();

  // event listeners when favorite is clicked, submit button clicked, and order input changes
  $(".favs li").click(onFavoriteClicked);
  $("#submit").click(onSubmitClick);

  // when name is changed
  $("input#orderName").change(function() {
    poke.orderName = $(this).val();
    displayOutput();
  });

  // when size is changed
  $("input[name='size']").change(function() {
    poke.size = $(this)
      .filter(":checked")
      .val();
    poke.calcPrice();
    displayOutput();
  });

  // when base is changed
  $("select[name='base']").change(function() {
    poke.base = $(this).val();
    poke.calcPrice();
    displayOutput();
  });

  // when spiciness is changed
  $("input#spiciness").change(function() {
    poke.spiciness = $(this).val();
    displayOutput();
  });

  // when checkboxes are changed
  $("input[type='checkbox'").change(function() {
    let $this = $(this);
    let onOff = $this.prop("checked");
    let value = $this.val();
    let propName = $this.prop("name");
    let index = poke[propName].indexOf(value);
    // if element is checked and not in list, add it; if already in, does nothing
    // if element is unchecked and in list, remove it; if not in, does nothing
    if (onOff && index < 0) {
      poke[propName].push(value);
    } else if (!onOff && index >= 0) {
      poke[propName].splice(index, 1);
    }
    poke.calcPrice();
    displayOutput();
  });

  // ready page for input
  displayOutput();
  $("input#orderName").focus();

  // ********** prepopulates order based on selected favorite ****************
  // selects html elements and sets poke object properties based on predefined favorites
  // does not change the order name, size or spiciness; only changes the checkboxes and base
  function onFavoriteClicked(event) {
    // event target id has the id of the li element selected (i.e. which favorite)
    let favSelected = event.currentTarget.id;

    // unselected all checkboxes then check the ones we want
    let $checkboxes = $("input[type='checkbox'");
    $checkboxes.prop("checked", false);

    // for each favorite - check the appropriate html elements and also update the poke object
    switch (favSelected) {
      case "favSeafoodBowl":
        // html elements - base and checkboxes
        $("select[name='base']").val("Sushi Rice");
        $checkboxes
          .filter(
            "[value='Wild Alaskan Salmon'], [value='Fresh Ahi Tuna'], [value='Seaweed Salad'], [value='Organic Edamame'], [value='Golden Pineapple Tidbits'], [value='Fresh Ginger'], [value='House Tamari Sauce'], [value='Masago'], [value='Sesame Seeds'],[value='Green Onions']"
          )
          .prop("checked", true);

        // poke object - base, proteins
        poke.base = "Sushi Rice";
        poke.proteins = ["Wild Alaskan Salmon", "Fresh Ahi Tuna"];
        poke.extras = ["Seaweed Salad"];
        poke.mixins = ["Organic Edamame", "Fresh Ginger"];
        poke.sauces = ["House Tamari Sauce"];
        poke.toppings = ["Masago", "Sesame Seeds", "Green Onions"];
        break;

      case "favVeggieBowl":
        // html elements - base and checkboxes
        $("select[name='base']").val("Zoodles");
        $checkboxes
          .filter(
            "[value='Organic Tofu'], [value='California Haas Avocado'], [value='Organic Cucumber'], [value='Organic Edamame'],  [value='House Tamari Sauce'], [value='Yuzu Ponzu'], [value='Sesame Seeds'],[value='Green Onions'],[value='Roasted Corn'] "
          )
          .prop("checked", true);

        // poke object - base, proteins
        poke.base = "Zoodles";
        poke.proteins = ["Organic Tofu"];
        poke.extras = ["California Haas Avocado"];
        poke.mixins = ["Organic Edamame", "Organic Cucumber"];
        poke.sauces = ["House Tamari Sauce", "Yuzu Ponzu"];
        poke.toppings = ["Sesame Seeds", "Roasted Corn", "Green Onions"];
        break;

      case "favMeatBowl":
        // html elements - base and checkboxes
        $("select[name='base']").val("Organic Brown Rice");
        $checkboxes
          .filter(
            "[value='Organic Free Range Chicken'], [value='Hawaiian Mango'], [value='Organic Cucumber'], [value='Organic Edamame'],  [value='Teriyaki Sauce'], [value='Sesame Seeds'], [value='Green Onions'],[value='Crunchy Onions'] "
          )
          .prop("checked", true);

        // poke object - base, proteins
        poke.base = "Organic Brown Rice";
        poke.proteins = ["Organic Free Range Chicken"];
        poke.extras = ["Hawaiian Mango"];
        poke.mixins = ["Organic Edamame", "Organic Cucumber"];
        poke.sauces = ["Teriyaki Sauce"];
        poke.toppings = ["Sesame Seeds", "Green Onions", "Crunchy Onions"];
        break;
    }

    poke.calcPrice();
    displayOutput();
  }

  // **************** submit order clicked ***************
  // Checks the order for validity. Name must be supplied.
  // If not enough or too many of the options are selected, warns user.
  // displays messages - either the warning / error message, or if all good, a random order number
  function onSubmitClick(event) {
    let strResult = "";
    let strMsg = "";
    event.preventDefault();

    // check that order is valid
    strResult = poke.validateOrder();

    // invalid order - do nothing
    if (strResult != "OK") {
      strMsg =
        "Something isn't right. Please review and try again.\n\n" + strResult;
      alert(strMsg);
      return;
    }

    // order is valid, check if it looks right (warnings, not hard stops)
    strResult = poke.checkOrder();

    // doesn't look right, so ask user to confirm
    if (strResult != "OK") {
      strMsg =
        strResult +
        "\n\nAre you sure you want to place your order the way it is?";
      if (!confirm(strMsg)) return;
    }

    // no errors or warnings - proceed and process order
    strMsg =
      "You got it! We're on it.\n\nYour order number is: " +
      Math.floor(100 + Math.random() * 900);
    alert(strMsg);

    // reset form and Poke object for next order
    document.getElementById("pokeForm").reset();
    poke = new Poke();
    displayOutput();
  }

  // **************** Poke class ***************
  // custom object to store the attribute for a Poke order
  // DOM element input changes will change this Poke object so it can be accessed by all functions
  function Poke() {
    // initialize class variables
    this.orderName = "";
    this.size = "Regular"; // default
    this.base = "Sushi Rice";
    this.proteins = [];
    this.extras = [];
    this.mixins = [];
    this.sauces = [];
    this.toppings = [];
    this.spiciness = "1";
    this.price = 10.0;

    this.includedProtein = function() {
      return this.size == "Regular" ? 2 : 3;
    };

    // calculate poke price function
    // called whenever any options are changed that affect price
    this.calcPrice = function() {
      let EXTRA_CHARGE = 1;
      let num = 0.0;

      // base price based on size
      num = this.size == "Regular" ? 10 : 12;

      // extra charge for extra protein ($2 included in regular, $3 included for large)
      if (this.proteins.length > this.includedProtein()) {
        num += (this.proteins.length - this.includedProtein()) * EXTRA_CHARGE;
      }

      // extra charge if base is zoodles
      if (this.base == "Zoodles") {
        num += EXTRA_CHARGE;
      }

      // extras - $1 each
      num += this.extras.length * EXTRA_CHARGE;

      // set price
      this.price = num;
    }; // end calcPrice

    // validateOrder returns OK if valid order and a message if not
    this.validateOrder = function() {
      let returnMsg = "";

      // check order name - throws error if less than 3 characters
      if (this.orderName.length < 3) {
        returnMsg += "Order name must be at least 3 characters\n";
      }

      // check proteins
      // minimum 1 protein
      if (this.proteins.length < 1) {
        returnMsg += "Please choose at least one protein.\n";
      }

      if (returnMsg == "") {
        returnMsg = "OK";
      }
      return returnMsg;
    };

    // checkOrder returns OK if order looks ok and a message if not
    this.checkOrder = function() {
      let returnMsg = "";

      // check if there are less proteins selected than included
      if (this.includedProtein() - this.proteins.length > 0) {
        returnMsg +=
          "You can select more proteins, or we'll just upsize what you've chosen.\n";
      }

      // check if there is not at least one sauce, and at least 2 mix-ins and toppings
      if (this.sauces.length < 1) {
        returnMsg += "You didn't choose a sauce. \n";
      } else if (this.sauces.length > 3) {
        returnMsg += "You may be overloading on the sauces. \n";
      }

      if (this.mixins.length < 2) {
        returnMsg += "Looks pretty skimpy on mix-ins. \n";
      }

      if (this.toppings.length < 2) {
        returnMsg += "Pretty light on toppings. \n";
      }

      if (returnMsg == "") {
        returnMsg = "OK";
      }
      return returnMsg;
    };
  } // end poke

  // **************** helper functions ***************
  // updates divOutput - briefly hides and slides down output as visual cue that it updated
  function displayOutput() {
    let $divOutput = $("#divOutput");
    $divOutput.hide(0);

    // title
    let strTitle = "";
    if (poke.orderName) {
      strTitle = poke.orderName + "'s custom poke bowl...";
    } else {
      strTitle = "Your custom poke bowl...";
    }

    $("#outputTitle").html(strTitle);
    $("#outputSize").html(poke.size);
    $("#outputBase").html(poke.base);
    $("#outputProteins").html(arrayToList(poke.proteins));
    $("#outputExtras").html(arrayToList(poke.extras));
    $("#outputMixins").html(arrayToList(poke.mixins));
    $("#outputSauces").html(arrayToList(poke.sauces));
    $("#outputToppings").html(arrayToList(poke.toppings));
    $("#outputSpiciness").html(poke.spiciness);
    $("#outputPrice").html(poke.price.toFixed(2));

    $divOutput.slideDown("fast");
  }

  // takes the passed array and generates the html to make each item an <li> element
  // returns html
  function arrayToList(myArray) {
    if (myArray == undefined || myArray.length == 0) return "<li>None</li>";
    let strHTML = myArray.toString();
    strHTML = strHTML.replace(/,/g, "</li><li>");
    strHTML = "<li>" + strHTML + "</li>";
    return strHTML;
  }
}); // end document ready
