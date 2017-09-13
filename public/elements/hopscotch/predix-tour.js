window.predix = window.predix || {};
window.predix.tourEventName = 'START_TOUR';
window.predix.hopscotch = window.hopscotch;
window.predix.isTouring = false;
window.predix.nextTour = { 'predixCloud' : '' };

window.predix.hopscotch.configure(
  {
    showNumber: false,
    isTourBubble: false,
    isTour: false
  }
);

window.predix.tourLauncher = function(event) {
  var tourName = event.payload.tourName || 'default';
  if (window.predix.isTouring) {
    window.predix.hopscotch.endTour(false);
    window.predix.isTouring = false;
  }
  window.predix.hopscotch.startTour(window.predix.hopscotchTour[tourName]);
  window.predix.isTouring = true;
};

window.predix.stopTour = function() {
  window.predix.hopscotch.endTour(false);
  window.predix.isTouring = false;
};

window.predix.startNextTour = function() {
  window.predix.stopTour();
  var nextTourElementID = window.predix.nextTour[window.predix.currentTourElementID];
  if (typeof nextTourElementID !== 'undefined' && nextTourElementID !== '') {
    window.predix.startTour(nextTourElementID);
  }
};

window.predix.getTour = function(elementID) {
  var tour = {};
  switch (elementID) {
    case 'predixCloud':
      tour =  {
        id: 'predixCloud',
        isTour: false,
        steps: [
        {
          title: "Welcome To Predix Cloud",
          content: "Here you bring data from multiple devices and processes together to gain insights and improve operational efficiency.  Select an asset to see its data flow from edge to cloud.",
          target: elementID,
          placement: "bottom",
          arrowOffset: "center",
          xOffset: "-145",
          showNumber: false,
          isTourBubble: false,
          showNextButton: false,
          showPrevButton: false,
          showCTAButton: true,
          ctaLabel: 'Got It',
          onCTA: window.predix.removeOverviewCurtain
        }
        ]
      };
      break;
  }
  window.predix.currentTourElementID = elementID;
  return tour;
};

window.predix.startTour = function(elementID) {
  if (window.predix.isTouring) { return; }
  var tour = window.predix.getTour(elementID);
  window.predix.hopscotch.startTour(tour);
  window.predix.currentTour = tour;
  window.predix.isTouring = true;
};

window.predix.removeOverviewCurtain = function() {
  window.predix.stopTour();
  document.querySelector('#welcomeCurtain').style.display = "none";
}
