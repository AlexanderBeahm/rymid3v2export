//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Working_with_files
//https://community.mp3tag.de/t/text-file-to-tag-conversion-tips/8299
//https://docs.mp3tag.de/export/

// On button/icon press...
function temp_display(str){
    console.log(str);
}

function scrapeMeta(){
    var metaTags = document.getElementsByTagName("meta");
}

function scrapeAlbumInfo(){
    var albumInfo = document.getElementsByClassName("album_info");
}

function scrapeTracks(){
    var tracks = document.getElementById("tracks_mobile");
}

function scrapeCatalog(){
    var catalogInfo = document.getElementById("my_catalog");
}

function scrapeCredits(){
    var credits = document.getElementById("credits_credits_mobile");
}

function pullData(){
    scrapeMeta();
    scrapeAlbumInfo();
    scrapeTracks();
    scrapeCatalog();
    scrapeCredits();
}

function parseDict(dict){
    //TODO Need to make some objects or dict that supports the multiple tracks across the spectrum of metadata.
}

function generateFile(text){
    var blob = new Blob([text], {type: "text/plain"});
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    //Change filename to specific version config?
    link.download = "id3v2_3.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

browser.action.onclicked.addListener((tab) => {
    let title = browser.action.getTitle();
    temp_display(title);
    generateFile(parseDict(pullData()));
})


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


//Collect this information into a txt format with following format:
//TODO: Figure out format, whole album info needs to be on each track.
//TODO: WOAS VS. WXXX for RYM url
let formatString = "MVIN;;MVNM;;TALB;;TCMP;;TCOM;;TCON;;TDAT;;TEXT;;TIT2;;TLAN;;TLEN;;TOAL;;TORY;;TPE1;;TPE3;;TPUB;;TRCK;;TRDA;;TXXX;;TYER;;WOAS;;WXXX;;"

//Download file to folder. Error handling?