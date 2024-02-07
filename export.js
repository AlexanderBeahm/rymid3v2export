//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Working_with_files
//https://community.mp3tag.de/t/text-file-to-tag-conversion-tips/8299
//https://docs.mp3tag.de/export/

// On button/icon press...
// Collect all items under these banners
//<meta itemprop="url"
//-  url stub

//<table class="album_info">
// - Title
// - Artist
// - Type
// - Release Date
// - Recorded
// - Genres/subgenres
// - Descriptors
// - Language
// - Common tags

//<ul id="tracks_mobile">
//- Tracks
//  - Track number
//  - Track title
//  - Featured artist (default none)
//  - Track length
//- Total length

//<div id="my_catalog">
//- Tags
//- Rating
//- Review
//- Track ratings

//<ul id="credits_credits_mobile">
//- Name
//- Roles
//  - Name
//  - Track (default all)

//TODO Renable when extensions finally get recognized.
// function temp_display(str) {
//   console.log(str);
// }

// function scrapeMeta(dict) {
//   var metaTags = document.getElementsByTagName("meta");
//   dict["meta"] = metaTags;
// }

// function scrapeAlbumInfo(dict) {
//   var albumInfo = document.getElementsByClassName("album_info");
//   dict["album"] = albumInfo;
// }

// function scrapeTracks(dict) {
//   var tracks = document.getElementById("tracks_mobile");
//   dict["tracks"] = tracks;
// }

// function scrapeCatalog(dict) {
//   var catalogInfo = document.getElementById("my_catalog");
//   dict["catalog"] = catalogInfo;
// }

// function scrapeCredits(dict) {
//   var credits = document.getElementById("credits_credits_mobile");
//   dict["credits"] = credits;
// }

// function pullData(dict) {
//   scrapeTracks(dict);
//   scrapeCredits(dict);
//   scrapeMeta(dict);
//   scrapeAlbumInfo(dict);
//   scrapeCatalog(dict);
//   return dict;
// }

// function parseDict(dict) {
//   //TODO Need to make some objects or dict that supports the multiple tracks across the spectrum of metadata.
//   // Return primitives as-is
//   if (!(dict instanceof Object)) return dict;

//   // Loop through object properties and generate array
//   var result = [];
//   for (var key in dict) {
//     result.push({
//       name: key,
//       children: generate(dict[key]),
//     });
//   }

//   // Return resulting array
//   return result;
// }

// function generateFile(text) {
//   var blob = new Blob([text], { type: "text/plain" });
//   var url = URL.createObjectURL(blob);
//   var link = document.createElement("a");
//   link.href = url;
//   //Change filename to specific version config?
//   link.download = "id3v2_3.txt";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

//Collect this information into a txt format with following format:
//TODO: Figure out format, whole album info needs to be on each track.
//TODO: WOAS VS. WXXX for RYM url
let formatString =
  "MVIN;;MVNM;;TALB;;TCMP;;TCOM;;TCON;;TDAT;;TEXT;;TIT2;;TLAN;;TLEN;;TOAL;;TORY;;TPE1;;TPE3;;TPUB;;TRCK;;TRDA;;TXXX;;TYER;;WOAS;;WXXX;;";

function listenForClicks() {
  document.addEventListener("click", (e) => {
    console.log("clicked!");

    function exportTags(tabs) {
      // browser.tabs.insertCSS({ code: hidePage }).then(() => {
      //   const url = beastNameToURL(e.target.textContent);

      // });
      browser.tabs.sendMessage(tabs[0].id, {
        command: "exportTags",
        arguments: "hi"
      });
    }

    /**
     * There was an error executing the script.
     * Display the popup's error message, and hide the normal UI.
     */
    function reportExecuteScriptError(error) {
      document.querySelector("#popup-content").classList.add("hidden");
      document.querySelector("#error-content").classList.remove("hidden");
      console.error(
        `Failed to execute rymid3v2 content script: ${error.message}`
      );
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      // Ignore when click is not on a button within <div id="popup-content">.
      return;
    }
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(exportTags)
      .catch(reportExecuteScriptError);
  });
}


//Download file to folder. Error handling?

//Reuse when ext button press is fixed.
// browser.tabs.onActivated.addListener((tab) => {
//     console.log("running...");
//     let metadataDict = {};
//     let title = "hi";
//     temp_display(title);
//     generateFile(parseDict(pullData(metadataDict)));
//   });

browser.tabs
  .executeScript({ file: "/content_scripts/rymid3v2export.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);