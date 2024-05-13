"use strict"

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const shopBranch = recommendNearestShop(lat, long);
    const yourShop = document.querySelector(".your-shop")
    const yourMapLink = document.querySelector(".geo-location-map-link")
    const iframe = document.querySelector(".geo-location-map")
    yourShop.setAttribute("href", shopBranch.mapLink)
    yourMapLink.setAttribute("href", shopBranch.mapLink)
    yourShop.innerHTML = `<div>Your Shop: <p>${shopBranch.street}. ${shopBranch.houseNr}</p><p> ${shopBranch.PLZ} ${shopBranch.City}</p></div>`
    iframe.setAttribute("src",shopBranch.mapIframe);
  }, function(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred.");
        break;
    }
  });
} else {
  console.error("Geolocation is not supported by this browser.");
}

function recommendNearestShop(lat, long) {
  const germanyBounds = {
      north: 55.0585,
      middleUpper: 52.4624,
      middleLower: 49.8663,
      south: 47.2702,
      west: 5.8663,
      east: 15.0399
  };

  const shopBranches = [
      {
          street: "Hachmannplatz",
          houseNr: "16",
          PLZ: 20099,
          City: "Hamburg",
          mapLink : "https://www.google.com/maps/place/Hamburg+Central+Station/@53.5529962,10.004062,17z/data=!3m1!4b1!4m6!3m5!1s0x47b18ee1440cd7f3:0x495c80b97a016024!8m2!3d53.552993!4d10.0066369!16zL20vMGRmMF8y?entry=ttu",
          mapIframe : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4740.534555872034!2d10.001765994021913!3d53.55299608795406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18ee1440cd7f3%3A0x495c80b97a016024!2sHamburg%20Central%20Station!5e0!3m2!1sen!2sde!4v1714424520956!5m2!1sen!2sde"
      },
      {
          street: "Pforzheimer Str.",
          houseNr: "11",
          PLZ: 60329,
          City: "Frankfurt am Main",
          mapLink : "https://www.google.com/maps/place/Frankfurt+Central+Station/@50.1071439,8.6612034,17z/data=!3m1!4b1!4m6!3m5!1s0x47bd0bfe3791b2f9:0x4366c932973aafac!8m2!3d50.1071439!4d8.6637837!16zL20vMGNjNnM0?entry=ttu",
          mapIframe : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.885832513887!2d8.661203412436857!3d50.10714387140991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0bfe3791b2f9%3A0x4366c932973aafac!2sFrankfurt%20Central%20Station!5e0!3m2!1sen!2sde!4v1714424333869!5m2!1sen!2sde"
      },
      { 
          street: "Bayerstraße",
          houseNr: "10A",
          PLZ: 80335,
          City: "München",
          mapLink : "https://www.google.com/maps/place/M%C3%BCnchen+Hbf/@48.1402939,11.5574226,17z/data=!3m1!4b1!4m6!3m5!1s0x479e75fec5b151b9:0x43ec2bf2c2451cc2!8m2!3d48.1402903!4d11.5599975!16zL20vMGQ2aG5z?entry=ttu",
          mapIframe : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.44145630732!2d11.557422576835961!3d48.140293850971354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75fec5b151b9%3A0x43ec2bf2c2451cc2!2sM%C3%BCnchen%20Hbf!5e0!3m2!1sen!2sde!4v1714417169293!5m2!1sen!2sde"
      }
  ];

  if (lat < germanyBounds.north && lat > germanyBounds.middleUpper && long < germanyBounds.east && long > germanyBounds.west) {
      return shopBranches[0];
  } else if (lat < germanyBounds.middleUpper && lat > germanyBounds.middleLower && long < germanyBounds.east && long > germanyBounds.west) {
      return shopBranches[1];
  } else if (lat < germanyBounds.middleLower && lat > germanyBounds.south && long < germanyBounds.east && long > germanyBounds.west) {
      return shopBranches[2];
  } else {
      return "outside";
  }
}

