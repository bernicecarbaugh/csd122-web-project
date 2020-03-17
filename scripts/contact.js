// CSD 122 Final Project Bernice Carbaugh 3/17/2020
// JS to validate and process contact form (submit button doesn't actually send anything for now)

$(document).ready(function() {
  // add event listener for input fields to validate as we change
  let $formInputs = $("input[type='text'], textarea");
  $formInputs.change(onInputChange);
  // add event listener for submit button
  $("#submit").click(onSubmitClick);

  function onSubmitClick(event) {
    event.preventDefault();
    // validate form inputs

    // the input change event handlers set an errorBorder class but they are only called when that input is changed
    // so we still need to check that a minimum, the name and message should not be blank
    validateInput($("#fullName"));
    validateInput($("#message"));

    // if any fields have errors then display error message and return
    if ($formInputs.filter(".errorBorder").length > 0) {
      $("#formErrors").show();
      return;
    }

    // all good - alert user (in production, this would send a message) and reset form
    alert(
      "Thanks for contacting us. We'll process your message and and respond shortly."
    );
    document.getElementById("contactForm").reset;
  }

  // called when any input is changed - clears error message and validates input
  function onInputChange(event) {
    // error message is shown after user clicks submit
    // hide error message once user starts typing anything
    $("#formErrors").hide();
    let $this = $(event.currentTarget);
    validateInput($this);
  }

  // Validates the value passed depending on what type of value is being validated
  // separate function since called by onInputChange (jQuery event handler) as well as by onSubmitClick
  // @param: $this is the jQuery object representing the DOM element to validate
  // @result: true if valid, false otherwise
  // also sets the errorBorder class if invalid
  function validateInput($this) {
    // type is the kind of value we're looking at; expected fullName, email, phone or message
    let type = $this.attr("id");
    let value = $this.val().trim();
    let pattern = "";
    let isValid = true;

    // validate the full name entry - must be at least 2 valid characters ( a-z, ' or - or . or space )
    if (type == "fullName") {
      pattern = /^[a-z' -\.]{2,}$/i;
    }
    // validate the first email address - must be in a@domain.com format:
    //   a is 1 or more valid characters (word character, ., - or +),
    //   domain is 1 or more characters from a-z, and
    //   com is 2 or more characters from a-z, all case insensitive
    else if (type == "email") {
      pattern = /^[\w.-_]+[@][a-z]+[.][a-z]{2,}$/i;
    }
    // validate phone - accepts digits, - or space, at least 7 characters
    else if (type == "phone") {
      pattern = /^[- \d]{7,}$/i;
    }
    // validate message - must contain at least one word char
    else if (type == "message") {
      pattern = /\w+/i;
    } else return false;

    // test pattern to check for validity and set css class
    isValid = pattern.test(value);

    // allow null email and phone
    if ((value = "" && (type == "email" || type == "phone"))) isValid = true;
    isValid ? $this.removeClass("errorBorder") : $this.addClass("errorBorder");
  }
}); // end ready
