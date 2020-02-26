$(document).ready(function() {
  // add event listeners for button and input fields
  $("input[type='text']").change(validateEntries);
  $("input[type='submit']").click(function(event) {
    event.preventDefault();
    alert("TODO");
  });

  function validateEntries(event) {
    $target = $(event.currentTarget);
    let isValid;
    switch (event.target.id) {
      case "email":
        isValid = validEmail($target.val());
        break;
      case "phone":
        isValid = validPhone($target.val());
        break;
      case "fullName":
        isValid = validName($target.val());
        break;
    }
    console.log($target.prop("id") + " is valid? " + isValid);
    isValid ? $target.removeClass("error") : $target.addClass("error");
  }

  // TODO - refactor these 3 validation into one function
  // validate the first email address - must be in a@domain.com format:
  //   a is 1 or more valid characters (word character, ., - or +),
  //   domain is 1 or more characters from a-z, and
  //   com is 2 or more characters from a-z, all case insensitive

  // validate the full name entry - must be at least 2 valid characters ( a-z, ' or - or space )
  function validName(name) {
    let namePattern = /^[a-z'-]{2,}$/i;
    if (name.trim() == "") return false;
    return !namePattern.test(name);
  }

  function validEmail(email) {
    let emailpattern = /^[\w.-_]+[@][a-z]+[.][a-z]{2,}$/i;
    if (email == "") return false;
    return emailpattern.test(email);
  }
  // TODO this isn't working - letting letters through
  function validPhone(phone) {
    let phonepattern = /^[()-.\d]{7,}$/i;
    if (phone == "") return false;
    return !phonepattern.test(phone);
  }
}); // end ready
