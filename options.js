//gets elements corresponding to the list, save -//- and the clear button
trustedSitesElement = document.querySelector("#trusted-sites-list");
saveButtonElement = document.querySelector("#save-trusted-sites");
clearButtonElement = document.querySelector("#clear-trusted-sites");

//initializes the list about the trusted sites stored in the Chrome Sync repository.
function fillInitial() {
    chrome.storage.sync.get(['trustedSites'], function(result) {
        tempResult = "";
        numRows = 5;
        if (result["trustedSites"] !== undefined) {
            tempResult = result["trustedSites"]
            numRows = tempResult.length
        }
        trustedSitesStr = tempResult.toString().replace(/,/g, '\n');
        trustedSitesElement.value = trustedSitesStr;
        trustedSitesElement.rows = numRows.length;
    });
}
//saves the current content as trusted sites in the Chrome Sync repository.
function saveTrusted(){
    newTrustedSites = trustedSitesElement.value.split("\n");
    chrome.storage.sync.set({trustedSites: newTrustedSites}, function() {
        console.log("Sucessfully set trusted sites.");
      });
      //new list of trusted sites
    chrome.storage.sync.get(['trustedSites'], function(result) {
        console.log(result);
    });
}
//clears saved Trusted sites from storage and text field
function clearTrusted(){
    chrome.storage.sync.clear(() => {
        console.log("Cleared Trusted Sites");
        trustedSitesElement.value = "";
    });
    
}

fillInitial();
//calls savetrusted
saveButtonElement.addEventListener("mouseup", saveTrusted);
//calls cleartrusted
clearButtonElement.addEventListener("mouseup", clearTrusted)