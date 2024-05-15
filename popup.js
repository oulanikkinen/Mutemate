//returns the base URL of the given URL
function getBaseUrl(url){
  return url.split("/")[2]
}

document.querySelector('#go-to-options').addEventListener("click", function() {
  //checks if the openOptionsPage method is available
  if (chrome.runtime.openOptionsPage) {
    //opens extension options page
    chrome.runtime.openOptionsPage();
  } else {
    //or options in the new tab
    window.open(chrome.runtime.getURL('options.html'));
  }
});

trustSiteButton = document.querySelector('#trust-current-site')

//adds the current site to the list of trusted sites
function trustSite(site, currTrusted) {
  console.log("Adding " + site + ".");
  if (currTrusted === undefined){
    //if empty, a new list containing the site is created
    currTrusted = [site];
  } else {
    currTrusted.push(site);
  }
  //saves to the chrome sync
  chrome.storage.sync.set({trustedSites: currTrusted}, function() {
    trustSiteButton.innerText = "Trusted!";
  });
}

//fetches the URL and checks if in the list of trusted sites
chrome.tabs.query({active:true,currentWindow:true},function(tab){
  //gets base URL
  currUrl = getBaseUrl(tab[0].url);
  //getting the list from sync
  chrome.storage.sync.get(['trustedSites'], function(result) {
    currTrusted = result.trustedSites
    //checks if site is in the list
    if (!(currTrusted === undefined) && currTrusted.includes(currUrl)) {
      //changes text and color based on trustworthiness
      trustSiteButton.innerText = "Trusted!";
      trustSiteButton.style.backgroundColor="green"
    } else {
      trustSiteButton.addEventListener("click", () => trustSite(currUrl, currTrusted));
    }
  });
});
