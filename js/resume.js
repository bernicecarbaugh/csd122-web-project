$(document).ready(function() {
  // add event listeners for icons and resume titles
  $(".resumeTitle").click(resumeClick);
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
