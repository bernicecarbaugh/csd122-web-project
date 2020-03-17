// CSD 122 Final Project Bernice Carbaugh 3/17/2020
// JS to hide/show sections like an accordion
$(document).ready(function() {
  // add event listeners for icons and resume titles
  $(".resumeHeader").click(resumeClick);
  $("#showAll").click(showAllClick);
  $("#collapseAll").click(collapseAllClick);

  function resumeClick(event) {
    let $target = $(event.currentTarget); // cache the target in a jQuery object
    let $siblings = $target.siblings();
    $siblings.slideToggle();
  }

  function showAllClick() {
    $(".resumeSummary, .resumeDetail").slideDown();
  }

  function collapseAllClick() {
    $(".resumeSummary, .resumeDetail").slideUp();
  }
}); // end ready
