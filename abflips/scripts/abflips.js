// CSD 122 Final Project Bernice Carbaugh 3/17/2020
// JS to display property information dynamically from properties object
// Uses third party carousel https://kenwheeler.github.io/slick/

$(document).ready(function() {
  // add photos from PROPERTIES object array to carousel
  let $carouselGallery = $(".carouselGallery");
  PROPERTIES.forEach(property => {
    let carouselItem =
      "<div class='carouselItem'><img src='images/" +
      property.tag +
      "_01after.webp'/></div>";
    $carouselGallery.append(carouselItem);
  });

  // load project data - set to first property at initial load
  loadProject(PROPERTIES[0]);

  // call third-party slick ui
  $carouselGallery.slick({
    rows: 0,
    prevArrow: "#arrow-left",
    nextArrow: "#arrow-right",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    focusOnSelect: true
  });

  // add custom function to carousel on change event to load project data
  $carouselGallery.on("afterChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    loadProject(PROPERTIES[currentSlide]);
  });

  // loads project data into DOM projectSpecific div section
  function loadProject(property) {
    // replace project title
    $("#projecttitle").text(property.title);

    // for each project data element, get the data from property object
    $("span.projectData").each(function() {
      let propName = $(this)
        .attr("id")
        .replace("project", "");
      $(this).text(property[propName]);
    });

    // set before and after img src's
    $("#imgBefore").attr("src", "images/" + property.tag + "_01before.webp");
    $("#imgAfter").attr("src", "images/" + property.tag + "_01after.webp");

    // blink the project specific section as a visual cue that it "refreshed"
    $("#projectSpecific")
      .animate({ opacity: "0" }, "fast")
      .animate({ opacity: "1" }, "fast");
  }
}); // end document ready

// ******************************** PROPERTIES DATA ********************************
// define PROPERTIES constant in JSON notation which has all the information about each property
const PROPERTIES = [
  {
    propId: 1,
    tag: "highlandpark1",
    title: "Highland Park Rambler",
    neighborhood: "Highland Park, Seattle",
    address: "8118 15th Ave SW, Seattle, WA 98106",
    description:
      "The project that started it all! We purchased this house in a foreclosure auction, never having stepped foot inside…that is what they call jumping into the deep end! We got off to a rocky start since the house was dirty!!! We spent a lot of time just getting rid a lot of smelly things, including an illegal addition in the back that was just gross. But the house was in a great street in an up and coming neighborhood within easy commute to downtown Seattle. And the existing layout was already very workable, so once we got through clearing out all the yucky stuff, it ended up being a perfect first project to get our feet wet.",
    purchaseDate: "Aug-2014",
    saleDate: "Jan-2015"
  },
  {
    propId: 2,
    tag: "hallslake",
    title: "Halls Lake Midcentury",
    neighborhood: "Halls Lake, Lynnwood",
    address: "5804 202nd St SW, Lynnwood, WA 98036",
    description:
      "We fell in love with the architecture of this house since it was so different from most other houses in the area. But it was tiny, had an really unworkable kitchen layout and to top it off, years and years of heavy smoking inside had taken its toll. It took some clever reimagining of the layout (without actually adding any square footage) along with hours spent scrubbing down windows but the end result was a light-filled, Frank Lloyd Wright-ish home that felt much larger than it actually was.",
    purchaseDate: "Feb-2015",
    saleDate: "May-2015"
  },
  {
    propId: 3,
    tag: "lakeview",
    title: "Cottage Lake View Treehouse",
    neighborhood: "Cottage Lake, Woodinville",
    address: "17701 185th Ave NE Woodinville, WA 98072",
    description:
      "After a few houses under our belt, we decided that we needed a challenge…so what better project than a dodecagon (that’s 12-sides for all us non-math geeks) house built on stilts into a hillside? Most people would run away but not us! And there sure are a lot of design dilemmas that come up when you don’t have square rooms. But we took advantage every nook and cranny to create a much more open and functional layout in the upstairs main living space and then added a bathroom downstairs to appeal to more buyers. This was a tough one but in the end, the great views of Cottage Lake and just the sheer uniqueness of this house made it worthwhile.",
    purchaseDate: "Jul-2015",
    saleDate: "Feb-2016"
  },
  {
    propId: 4,
    tag: "rollinghills",
    title: "Rolling Hills Condo",
    neighborhood: "Rolling Hills, Renton",
    address: "2020 Grant Ave S Unit F201 Renton, WA 98055",
    description:
      "This condo renovation is a great example of the difference a few simple cosmetic changes can make. The unit had wonderful vaulted ceilings in the main living space and a totally functional layout. But it was awash in builder beige and just felt so dark and claustrophobic. A ton of paint, updated cabinets and fixtures and new carpeting…and voila!",
    purchaseDate: "Mar-2016",
    saleDate: "May-2016"
  },
  {
    propId: 5,
    tag: "highlandpark2",
    title: "Highland Park Cape Cod",
    neighborhood: "Highland Park, Seattle",
    address: "7938 20th Ave SW, Seattle, WA 98106",
    description:
      "First time we walked though this house perhaps the only thing going for it was that it was on a great street in one of our favorite up and coming Seattle neighborhoods. Plus the house actually did sit up high off the street so there was a great territorial view. But the layout was super funky...with an addition in the back that was disconnected from the rest of the house and was dark and grungy. We started with creating a more open connection between the original house and the addition. And then we focused on maximizing the house’s original charms, including restoring the wonderful hardwood floors throughout and creating these cozy rooms in the attic which took full advantage of all the architectural details.",
    purchaseDate: "Aug-2016",
    saleDate: "Jan-2017"
  },
  {
    propId: 6,
    tag: "matthewsbeach",
    title: "Matthews Beach Bungalow",
    neighborhood: "Matthews Beach, Seattle",
    address: "11332 36th Ave NE, Seattle, WA 98125",
    description:
      "We could see the potential in this rambler on a quiet cul de sac from the minute we walked in. It was almost 1,400 sq feet all on one level…that is a ton of space! We knew right away that we had to open up the kitchen to the main living space. Doing just that really changed the way the house functioned. But the best thing we did here was taking an unusable alcove and adding it to an existing bedroom to create a master suite, completely with its own bathroom and walk-in closet.",
    purchaseDate: "Sep-2016",
    saleDate: "Mar-2017"
  },
  {
    propId: 7,
    tag: "broadview2",
    title: "Broadview Brick Classic",
    neighborhood: "Broadview, Seattle",
    address: "104 NW 137th St, Seattle, WA 98177",
    description:
      "Walking up to this house, we loved the classic brick façade, the huge corner lot with a nice level backyard and the potential that was evident in the upstairs which was at that time pretty much unused attic space.  We turned that into a great kids space with two spacious bedrooms and a full bathroom. This left us ample space in the main floor to create a master suite, a huge open kitchen and separate living and dining rooms. But what really made this home sing was the spacious deck off the back, surrounded by a fenced-in private backyard, which really promoted true indoor-outdoor living!",
    purchaseDate: "Mar-2017",
    saleDate: "Aug-2017"
  },
  {
    propId: 8,
    tag: "arrowhead",
    title: "Arrowhead Split-Level",
    neighborhood: "Arrowhead, Kenmore",
    address: "7216 NE 150th St, Kenmore, WA 98028",
    description:
      "This project was an exercise in tree trimming! At first you couldn’t even really see the house given all the vegetation surrounding it. But once we cleared out the trees and shrubs, we were still left with a split-level house that felt closed in and dark. The biggest changes we made to this house were changing the entryway to create a bigger landing zone, adding windows where we could and building a walk out deck from the living room. Then we focused on making the inside as light and bright as possible by picking the right materials.",
    purchaseDate: "Jun-2017",
    saleDate: "Sep-2017"
  },
  {
    propId: 9,
    tag: "magnolia",
    title: "Magnolia View Tudor",
    neighborhood: "Magnolila, Seattle",
    address: "2606 W Boston St, Seattle, WA 98199",
    description:
      "This house was all about the view, which was spectacular! But it had only one true bedroom and had clearly not been touched since the 70s. And to top it off, we were stumped at how to address the exterior…which to put it kindly was a mishmash of architectural styles. Our biggest project to date, this one took over a year and required a lot of patience and cooperation from our architect and contractor who really worked hand in hand with us. But the end result is amazing…from a house that made no sense, to the perfect family home with a unique exterior and an interior that took full advantage of that classic Seattle view.",
    purchaseDate: "Mar-2017",
    saleDate: "Oct-2018"
  },
  {
    propId: 10,
    tag: "queenanne2",
    title: "Queen Anne Classic Charmer",
    neighborhood: "Queen Anne, Seattle",
    address: "2617 2nd Ave N, Seattle, WA 98109",
    description:
      "Wow this house was in very rough shape when we bought it so in some ways this might be our biggest transformation yet. We loved how the exterior looked with the interesting swoosh roofline and the rounded front door. On the main floor, the coved ceilings and original built-ins and windows just screamed to be restored. The biggest challenges with this house was to first create a more open concept living area (this house was definitely built in a time where they preferred their rooms to be quite compartmentalized!) and to carve out the right number of bedrooms and bathrooms (somehow we didn’t think 1.5 bathrooms was going to cut it for today’s families!).  We loved how it turned out and think the end result speaks for itself.",
    purchaseDate: "Jun-2018",
    saleDate: "Mar-2019"
  }
];
