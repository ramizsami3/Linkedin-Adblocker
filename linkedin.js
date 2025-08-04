function removeAds() {

    
    let spans = document.getElementsByTagName("span");

    for (let i = 0; i < spans.length; ++i) {
        // Check if they contain the text 'Promoted'
        if (spans[i].innerHTML === "Promoted") {
            let card = spans[i].closest(".feed-shared-update-v2");

            if (card === null) {
                let j = 0;
                card = spans[i];
                while (j < 6) {
                    card = card.parentNode;
                    ++j;
                }
            }

            // Make the ad disappear!
            card.setAttribute("style", "display: none !important;");
        }
    }
}


removeAds();


setInterval(function () {
    removeAds();
}, 100)
