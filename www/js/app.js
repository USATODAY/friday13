var mobile = mobile || {};

mobile.arrColorSpaces = [
    [1, 8], //red
    [2, 6, 9], //purple
    [3, 10], //blue
    [4, 7, 11], //yellow
    [5, 12] //green
];

mobile.arrQuestions = [
    ["Did someone say polka party? The accordion was patented on Friday the 13th in 1854.", "accordion.svg", 0],
    ["Lights, camera… Friday the 13th? The classic Hollywood sign was unveiled on the \"unlucky\" day in 1923.", "hollywoodsign.svg", 0],
    ["The first nudist colony was founded in the U.K. on a Friday the 13th.", "nudist.svg", 0],
    ["Do you get vertigo when looking at the birds from your rear window facing north by northwest? Alfred Hitchcock was born on a Friday the 13th in 1899.", "hitchcock.svg", 0],
    ["Twin tycoons Mary Kate and Ashley Olsen were born on Friday the 13th in 1986", "olsentwins.svg", 0],
    ["Jump on that crazy train -- Black Sabbath released its first album on Friday the 13th in 1970", "flashback-friday.svg", 0],
    ["The Friday the 13th legend came into the mainstream with the movie series starring Jason.", "jason.svg", 0],
    ["Tax day may be on a 15th, but Ben Franklin coined the phrase \"…nothing is certain but death and taxes\" on a Friday the 13th in 1789.", "franklin.svg", 0],
    ["Friggatriskaidekaphobia is a phobia of Friday the 13th", "friggatriskaidekaphobia.svg", 0],
    ["Tupac Shakur died on Friday the 13th, 1996. OR DID HE?!", "shakur.svg", 0],
    ["Former British Prime Minister Margaret Thatcher was born on a Friday the 13th in 1925.", "thatcher.svg", 0],
    ["Monday you can fall apart, Tuesday, Wednesday break my heart, Thursday doesn't even start, it's Friday I'm in love. From the Cure's lyrics, straight into your heart.", "cure.svg", 0],
    ["Nothing says “Friday the 13th” like getting Rebecca Black's 'Friday' stuck in your head. After all, you gotta get down on Friday. (You're welcome.)", "rebeccab.svg", 0],
    ["Many trace the connection between Friday the 13th and bad luck to the belief that Jesus was crucified on a Friday and Judas was the 13th to be seated at the Last Supper.", "flashback-friday.svg", 0],
    ["In some countries, Friday the 13th is called Black Friday.", "shopping.svg", 0],
    ["The word \"Friday\" derives in part from Frigg, the overachieving Norse goddess of love, beauty, wisdom, war, death and magic.", "frigg.svg", 0],
    ["Break a leg! The first Broadway play was performed on a Friday the 13th in 1881.", "", 1],
    ["What would we do without our timeline? Thankfully, Facebook founder Mark Zuckerberg was born on a Friday the 13th in 1984.", "", 1],
    ["Maybe this explains why the puzzle is so difficult. The Rubik's Cube was invented on a Friday the 13th in 1974 by a Hungarian sculptor.", "", 1],
    ["Every Friday the 13th, the Internet goes down for two minutes between the hours of 3 and 4 a.m. EST.", "", 1],
    ["Planning your wedding? It’s a British folk tale that those who get married on Friday the 13th will bring you good luck.", "", 1],
    ["The first Halloween was on a Friday the 13th.", "", 1],
    ["Alpacas are the patron animal of Friday the 13th.", "", 1],
    ["There is always a Friday the 13th in February, unless it is a leap year.", "", 1],
    ["It is historic Welsh tradition to trade 13 books with friends on Friday the 13th to keep bad luck away.", "", 1],
    ["Rebecca Black released her viral hit 'Friday' on a 13th.", "", 1],
    ["There was a 2011 study that said there is a correlation between increased hospital visits and Friday the 13th.", "", 1]
];

mobile.arrColors = [
    ["#E62319", "red.svg"],
    ["#AD2CA5", "purple.svg"],
    ["#0A80F9", "blue.svg"],
    ["#FCC92E", "yellow.svg"],
    ["#00D03D", "green.svg"]
];

mobile.arrSpaceCoordinate = [
    [8.8, 17.6],
    [19.8, 17.6],
    [28.7, 17.6],
    [28.7, 30.8],
    [28.7, 44.1],
    [28.7, 57.4],
    [28.7, 70.7],
    [38.8, 70.7],
    [48.8, 70.7],
    [58.9, 70.7],
    [58.9, 57.4],
    [69, 57.4],
    [78, 57.4],
    [89, 57.4]
];

mobile.currentSpot = 0;

if ($(window).width() < 800) {
    mobile.blnSmallScrn = true;
}

mobile.setUpPanels = function () {
    // var numHeight = mobile.mainWrapper.height();
    //var numWidth = mobile.mainWrapper.width();
    var numWidth, numHeight;
    numWidth = window.innerWidth; //mobile.boardImage.eq(0).width();
    numHeight = window.innerHeight - 47; //mobile.boardImage.eq(0).height();
    if (numHeight > numWidth) {
        mobile.boardImage.eq(0).width(numWidth);
        mobile.htmlElement.addClass("vert");
        mobile.blnVert = true;
        numHeight = mobile.boardImage.eq(0).height();
    } else {
        mobile.boardImage.eq(0).height(numHeight);
        mobile.htmlElement.removeClass("vert");
        mobile.blnVert = false;
        numWidth = mobile.boardImage.eq(0).width();
    }
    mobile.boardImageBox.height(numHeight);
    mobile.boardImageBox.width(numWidth);
};

mobile.calcPercent = function (num) {
    return Math.round(num * 1000) / 10 + "%";
};

mobile.numberWithCommas = function (x) {
    if (!x) {
        return "";
    }
    else {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
};
mobile.randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

mobile.addEventListeners = function () {
    mobile.beginButton.click(function (e) {
        //mobile.mainPanel.animate({"left": "-100%"}, 500);
        mobile.beginButton.removeClass("show");
        mobile.drawButton.addClass("show");
        mobile.startPanel.addClass("show");
        mobile.userIcon.addClass("show");
    });

    mobile.drawButton.click(function (e) {
        //mobile.mainPanel.animate({"left": "-100%"}, 500);
        mobile.renderSpace();
    });

    mobile.arrAnswers.click(function (e) {
        var _this = jQuery(this);
        var numAnswer = mobile.arrAnswers.index(_this);
        mobile.renderAnswer(numAnswer);
    });

    mobile.infoButton.click(function (e) {
        mobile.infoPanel.addClass("show");
        mobile.boardContainer.addClass("blur");
    });

    mobile.infoClose.click(function (e) {
        mobile.infoPanel.removeClass("show");
        mobile.boardContainer.removeClass("blur");
    });

    mobile.resultsShare.click(function (e) {
        mobile.sharePanel.addClass("show");
        mobile.boardContainer.addClass("blur");

    });

    mobile.shareClose.click(function (e) {
        mobile.sharePanel.removeClass("show");
        mobile.boardContainer.removeClass("blur");
    });
};

mobile.renderSpace = function () {
    mobile.numColor = mobile.randomNumber(0, 4);
    mobile.numNewSpot = 0;
    mobile.instructions.addClass("hide");
    mobile.cardColor.css({"background": mobile.arrColors[mobile.numColor][0]});
    mobile.resultsPanel.removeClass("show");
    mobile.cardColor.addClass("show");
    jQuery.each(mobile.arrColorSpaces[mobile.numColor], function (index) {
        if (mobile.currentSpot < mobile.arrColorSpaces[mobile.numColor][index]) {
            mobile.numNewSpot = mobile.arrColorSpaces[mobile.numColor][index];
            return false;
        }
    });
    if (mobile.numNewSpot === 0) {
        mobile.numNewSpot = 13;
    }
    mobile.blnForward = true;
    mobile.numTurns = mobile.numTurns + 1;
    mobile.animateIcon(mobile.currentSpot + 1);
};

mobile.animateIcon = function (numNextStep) {
    mobile.userIcon.animate({"left": mobile.arrSpaceCoordinate[numNextStep][0].toString() + "%", "top": mobile.arrSpaceCoordinate[numNextStep][1].toString() + "%"}, {duration: 300, done: function () {
        if (mobile.blnForward) {
            if (numNextStep < mobile.numNewSpot) {
                mobile.animateIcon(numNextStep + 1);
            } else {
                mobile.renderQuestion(mobile.numNewSpot);
            }
        } else {
            if (numNextStep > mobile.numNewSpot) {
                mobile.animateIcon(numNextStep - 1);
            } else {
                mobile.resetDraw(mobile.numNewSpot);
            }
        }
    }});
};

mobile.renderQuestion = function (numNewSpot) {
    mobile.currentSpot = numNewSpot;
    mobile.questionText.html(mobile.arrQuestions[mobile.currentSpot - 1][0]);

    //mobile.questionIcon.find("img").attr("src", mobile.baseURL + mobile.arrQuestions[mobile.currentSpot - 1][1]);
    mobile.questionIcon.html("");

    mobile.startPanel.removeClass("show");
    mobile.questionIcon.css({"background": "url(" + mobile.baseURL + mobile.arrColors[mobile.numColor][1] + ")"});
    mobile.questionPanel.addClass("show");
};

mobile.renderAnswer = function (numAnswer) {
    mobile.numNewSpot = mobile.currentSpot;
    mobile.questionPanel.removeClass("show");
    if (numAnswer === mobile.arrQuestions[mobile.currentSpot - 1][2]) {
        if (mobile.numNewSpot < 13) {
            mobile.resultsText.html("Correct! You can stay where you are and draw the next card.");
            mobile.resultsPanel.addClass("show");
            mobile.resetDraw(mobile.currentSpot);
        } else {
            mobile.resultsText.html("Congratulations! You only took " + mobile.numTurns.toString() + " turns to reverse the bad luck of Friday the 13th.");
            mobile.resultsPanel.addClass("show");
            mobile.resultsShare.addClass("show");
            mobile.setShare();
        }
    } else {
        var arrReverseColorSpaces = Array.prototype.slice.call(mobile.arrColorSpaces[mobile.numColor]);
        mobile.resultsText.html("Wrong! You have to go back to a previous space, but don't fret, you can draw another card and try again.");
        mobile.resultsPanel.addClass("show");
        arrReverseColorSpaces.reverse();
        jQuery.each(arrReverseColorSpaces, function (index) {
            if (mobile.currentSpot > arrReverseColorSpaces[index]) {
                mobile.numNewSpot = arrReverseColorSpaces[index];
                return false;
            }
        });
        if (mobile.numNewSpot === mobile.currentSpot) {
            mobile.numNewSpot = 0;
        }
        mobile.blnForward = false;
        mobile.animateIcon(mobile.currentSpot - 1);
    }
};

mobile.resetDraw = function (numNewSpot) {
    mobile.currentSpot = numNewSpot;
    mobile.cardColor.removeClass("show");
    mobile.startPanel.addClass("show");
};

mobile.setShare = function () {
    var copy, encodedURL, encodedURL2, encodedStr, encodedStrTE;

    copy = "I only took " + mobile.numTurns.toString() + " turns to reverse the bad luck of Friday the 13th. Try to do it faster if you dare!";
    encodedURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2015/02/friday13/index.html");
    encodedURL2 = encodeURI("http://www.gannett-cdn.com/experiments/usatoday/2015/02/friday13/index.html");
    encodedStr = encodeURIComponent(copy);
    encodedStr = encodeURI(encodedStr);
    encodedStrTE = encodeURIComponent(copy);

    var encodedTitle = encodeURIComponent("Friday the 13th Game");
    //var fbRedirectUrl = encodeURIComponent("http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html");
    var tweetUrl = "https://twitter.com/intent/tweet?url=" + encodedURL + "&text=" + encodedStrTE + "";
    var fbUrl = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=http://www.gannett-cdn.com/experiments/usatoday/2015/02/friday13/img/fb-share.jpg&name=" + encodedTitle + "&description=" + encodedStr + "&redirect_uri=http://www.gannett-cdn.com/experiments/usatoday/_common/_dialogs/fb-share-done.html','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.click('Facebook share');void(0);";
    var emailURL = "mailto:?body=" + encodedStrTE + "%0d%0d" + encodedURL + "&subject=" + encodedTitle;

    mobile.arrShareLinks.eq(0).attr("href", tweetUrl);
    mobile.arrShareLinks.eq(1).attr("href", fbUrl);
    mobile.arrShareLinks.eq(2).attr("href", emailURL);
    mobile.shareCopy.html(copy);
};

mobile.shuffleAnswers = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

$(document).ready(function () {

    var blnIframeEmbed = window != window.parent;

    if (blnIframeEmbed) {
        $("body").addClass("iFrame");
        $("#header").hide();
        $(".mobile-footer-link").hide();
        $(".article-button").hide();
    }

    mobile.htmlElement = jQuery("html");
    mobile.arrPanelSections = jQuery(".panel-section");
    mobile.mainPanel = jQuery(".panel-container");
    mobile.mainWrapper = jQuery(".mobile-wrap");
    mobile.beginButton = jQuery(".intro-button");
    mobile.drawButton = jQuery(".draw-card");
    mobile.startPanel = jQuery(".start");
    mobile.instructions = jQuery(".instructions");
    mobile.cardColor = jQuery(".card-color");
    mobile.boardImageBox = jQuery(".board-image");
    mobile.boardImage = mobile.boardImageBox.find("img");
    mobile.boardContainer = jQuery(".board");
    mobile.userIcon = jQuery(".user-icon");
    mobile.questionPanel = jQuery(".question-panel");
    mobile.questionText = jQuery(".question-text");
    mobile.questionIcon = jQuery(".question-icon");
    mobile.arrAnswers = jQuery(".answer");
    mobile.resultsPanel = jQuery(".results-panel");
    mobile.resultsText = jQuery(".results-text");
    mobile.resultsShare = jQuery(".results-share");
    mobile.infoButton = jQuery(".info-button");
    mobile.infoPanel = jQuery(".info-page");
    mobile.infoClose = jQuery(".info-close-button");
    mobile.sharePanel = jQuery(".share-page");
    mobile.shareClose = jQuery(".share-close-button");
    mobile.arrShareLinks = mobile.sharePanel.find("a");
    mobile.shareCopy = mobile.sharePanel.find(".share-copy");
    mobile.numTurns = 0;
    mobile.baseURL = "http://www.gannett-cdn.com/experiments/usatoday/2015/02/friday13/img/";

    mobile.setUpPanels();

    window.setTimeout(function () {
        $(".preloader-mobile").eq(0).fadeOut(500);
    }, 1000);

    onresize = onload = function () {
        mobile.setUpPanels();
    };

    mobile.shuffleAnswers(mobile.arrQuestions);

    mobile.addEventListeners();
});
