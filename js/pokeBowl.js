// CSD122 Web Project Bernice Carbaugh
$(document).ready(function() {
  // set default poke
  let poke = new Poke();
  displayOutput();
  $("input#orderName").focus();

  $(favSeafoodBowl).click(function() {
    alert("Saefood lover");
  });

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
    let jQueryEl = $(this);
    let onOff = jQueryEl.prop("checked");
    let value = jQueryEl.val();
    let propName = jQueryEl.prop("name");
    let index = poke[propName].indexOf(value);
    // if element is checked and not in proteins list, add it; if already in, does nothing
    // if element is unchecked and in proteins list, remove it; if not in, does nothing
    if (onOff && index < 0) {
      poke[propName].push(value);
    } else if (!onOff && index >= 0) {
      poke[propName].splice(index, 1);
    }
    poke.calcPrice();
    displayOutput();
  });

  $("#btnMakePoke").click(function() {
    alert("TODO Need to validate poke order and if ok then display message.");
  });

  // **************** helper functions ***************
  // updates output
  function displayOutput() {
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
  }

  function arrayToList(myArray) {
    if (myArray == undefined || myArray.length == 0) return "<li>None</li>";
    let strHTML = myArray.toString();
    strHTML = strHTML.replace(/,/g, "</li><li>");
    strHTML = "<li>" + strHTML + "</li>";
    return strHTML;
  }

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

    this.validPoke = function() {
      let errMsg = "";
      let warnMsg = "";

      // check order name
      if (this.orderName.length < 3) {
        errMsg += "Order name must be at least 3 characters\n";
      }

      // check proteins
      // minimum 1 protein
      if (this.proteins.length < 1) {
        errMsg += "Please choose at least one protein.\n";
      }

      // check if there are no sauces, mixins and toppings
      if (this[mixins].length <= 0) {
        warnMsg += "Looks like you didn't choose any mix-ins.\n";
      }

      if (warnMsg != "") {
        alert("Review your order.\n\n" + warnMsg);
      }

      if (errMsg != "") {
        alert("There seems to be a problem with your order.\n\n" + errMsg);
      }
    };

    // calculate poke price function
    // called whenever any options are changed that affect price
    this.calcPrice = function() {
      let EXTRA_CHARGE = 1;
      let num = 0.0;
      let includedProtein = 0;

      // size based
      switch (this.size) {
        case "Regular":
          num = 10;
          includedProtein = 2;
          break;
        case "Large":
          num = 12;
          includedProtein = 3;
          break;
      }

      // extra charge for extra protein ($2 included in regular, $3 included for large)
      if (this.proteins.length > includedProtein) {
        num += (this.proteins.length - includedProtein) * EXTRA_CHARGE;
      }

      // extra charge if base is zoodles
      if (this.base == "Zoodles") {
        num += EXTRA_CHARGE;
      }

      // extras - $1 each
      num += this.extras.length * EXTRA_CHARGE;

      // set price
      this.price = num;
    };
  } // end poke
}); // end document ready
