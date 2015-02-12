var mobile = mobile || {};

mobile.arrColorSpaces = [
    [1, 8], //red
    [2, 6, 9], //purple
    [3, 10], //blue
    [4, 7, 11], //yellow
    [5, 12] //green
];

mobile.arrQuestions = [
    ["Host a polka party! The accordion was patented on Friday the 13th in 1854, and music would never be the same", "", true],
    ["Take a selfie in the City of Angels. The classic Hollywood sign was unveiled on the \"unlucky\" day in 1923", "", true],
    ["Take it all off! It was on a Friday the 13th that the first nudist colony was founded in the United Kingdom. Might we suggest a (naked) happy dance?", "", false],
    ["Three words: Classic movie marathon! Don't get vertigo when looking at the birds from your rear window facing north by northwest. Instead, celebrate Alfred Hitchcock, who was born on a Friday the 13th in 1899.", "", false],
    ["Happy hour. Need we say more?", "", true],
    ["Celebrate the Friday the 13th birth of twin tycoons Mary-Kate and Ashley Olsen by streaming a \"Full House\" marathon on Amazon Prime.", "", false],
    ["Leather jacket? Check. Black eyeliner? Done. Forget to blow-dry your hair and jump on that crazy train with an ultimate '70s heavy metal party. Black Sabbath's first album dropped in the U.K. on a Friday the 13th in 1970.", "", true],
    ["The best way to get out of your Friday the 13th doldrums? Prank a bunch of people. For the biggest impact, don a hockey mask and tap into the fears cultivated by the \"Friday the 13th\" slasher movies. Just please don't actually slash anyone.", "", true],
    ["Get your finances in order. On a Friday the 13th in 1789, the always-optimistic Ben Franklin coined, \"…Nothing is certain but death and taxes.\"", "", false],
    ["Say the word \"Friggatriskaidekaphobia\" 10 times in a row. It's the official name for a phobia of Friday the 13th — which, after these tips, you'll never have again!", "", true],
    ["Devote your day to Wikipedia-ing conspiracy theories. Tupac Shakur died on a Friday the 13th in 1996. OR DID HE?!", "", false],
    ["Drink some Earl Grey and watch \"The Iron Lady\" starring the wondrous Meryl Streep. She plays Britain's former prime minister Margaret Thatcher, who was born on a Friday the 13th in 1925.", "", false],
    ["\"Monday you can fall apart, Tuesday, Wednesday break my heart, Thursday doesn't even start, it's Friday, I'm in love.\" From the Cure's lyrics, straight into your heart. Jam out this Friday.", "", true],
    ["Troll all your friends by sending them the YouTube link to viral earworm \"Friday\" by Rebecca Black. After all, you gotta get down on Friday. (We're sorry/You're welcome.)", "", true],
    ["Job swap? Pull a \"Freaky Friday\" moment and go to the workplace of your closest friend. Works best if you are Mary-Kate or Ashley Olsen.", "", false],
    ["The endless mozzarella stick promotion at T.G.I. Friday's may be over, but that doesn't mean you can't indulge in some fried cheese. Actually, just go ahead and rename Fridays Fried-days.", "", false],
    ["Reminisce on all your past weekend antics while blasting \"Last Friday Night.\" Katy Perry's chandelier-smashing, credit card-maxing lyrics will certainly put your poor decisions into perspective.", "", true],
    ["#TBT may be a Thursday thing, but what about #FBF (Flashback Friday)? It's up to you to get in on the trend.", "", false],
    ["Fire up that old VCR (just kidding, search it on the Internet) and become familiar with the always-hysterical Ice Cube-Chris Tucker \"Friday\" stoner comedy movies from the '90s.", "", true],
    ["In some countries, Friday the 13th is called Black Friday. That's something we can get behind. Forgo day-after-Thanksgiving sales and make Friday the 13th your very own splurge day.", "", true],
    ["T-G-I-Friday? More like T-G-I-Frigg. Throw this knowledge on your friends and sound smart and worldly: the word \"Friday\" derives in part from Frigg, the clearly overachieving Norse goddess of love, beauty, wisdom, war, death and magic.", "", false]
];

mobile.arrColors = ["#E62319", "#AD2CA5", "#0A80F9", "#FCC92E", "#00D03D"];

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

mobile.setUpPanels = function() {
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
    //mobile.mainPanel.height(numHeight);
    //jQuery.each(mobile.arrPanelSections, function(index){
        //mobile.arrPanelSections.eq(index).height(numHeight).width(numWidth).css({"left": (numWidth * index).toString() + "px"});
   // });
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
mobile.randomNumber = function (min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

mobile.addEventListeners = function() {
    mobile.beginButton.click(function(e){
        //mobile.mainPanel.animate({"left": "-100%"}, 500);
        mobile.beginButton.removeClass("show");
        mobile.drawButton.addClass("show");
        mobile.startPanel.addClass("show");
        mobile.userIcon.addClass("show");
    });

    mobile.drawButton.click(function(e){
        //mobile.mainPanel.animate({"left": "-100%"}, 500);
        mobile.renderSpace();
    });
};

mobile.renderSpace = function() {
    mobile.numColor = mobile.randomNumber(0, 4);
    mobile.numNewSpot = 0;
    mobile.instructions.addClass("hide");
    mobile.cardColor.css({"background": mobile.arrColors[mobile.numColor]});
    mobile.cardColor.addClass("show");
    jQuery.each(mobile.arrColorSpaces[mobile.numColor], function(index){
        if (mobile.currentSpot < mobile.arrColorSpaces[mobile.numColor][index]) {
            mobile.numNewSpot = mobile.arrColorSpaces[mobile.numColor][index];
            return false;
        }
    });
    if (mobile.numNewSpot === 0) {
        mobile.numNewSpot = 13;
    }
    mobile.blnForward = true;
    mobile.animateIcon(mobile.currentSpot + 1);
};

mobile.animateIcon = function(numNextStep) {
    mobile.userIcon.animate({"left": mobile.arrSpaceCoordinate[numNextStep][0].toString() + "%", "top": mobile.arrSpaceCoordinate[numNextStep][1].toString() + "%"}, {duration: 300, done: function() {
        if (mobile.blnForward) {
            if (numNextStep < mobile.numNewSpot) {
                mobile.animateIcon(numNextStep + 1);
            } else {
                mobile.renderQuestion(mobile.numNewSpot);
            }
        } else {
            if (numNextStep > mobile.numNewSpot) {
                mobile.animateIcon(numNextStep - 1);
            }
        }
    }});
};

mobile.renderQuestion = function(numNewSpot) {
    mobile.currentSpot = numNewSpot;
    mobile.questionText.html(mobile.arrQuestions[mobile.currentSpot - 1][0]);
    mobile.questionIcon.html(mobile.arrQuestions[mobile.currentSpot - 1][1]);
    mobile.startPanel.removeClass("show");
    mobile.questionPanel.addClass("show");
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
    mobile.userIcon = jQuery(".user-icon");
    mobile.questionPanel = jQuery(".question-panel");
    mobile.questionText = jQuery(".question-text");
    mobile.questionIcon = jQuery(".question-icon");

    mobile.setUpPanels();

    window.setTimeout(function () {
        $(".preloader-mobile").eq(0).fadeOut(500);
    }, 1000);

	onresize=onload=function(){
		mobile.setUpPanels();
	};

    mobile.addEventListeners();
});

/*
(function () {

    var searchApp = angular.module('dataSearch', [])
        .config([
            '$compileProvider',
            function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
            }
        ]);
    searchApp.controller('SearchController', function ($http, $scope, $filter) {

        $scope.companies = [];
        $scope.stateOptions = [
            {state: "Select a State to begin"},
            {state: "AR"},
            {state: "AZ"},
            {state: "CA"},
            {state: "FL"},
            {state: "GA"},
            {state: "ID"},
            {state: "IL"},
            {state: "MA"},
            {state: "MI"},
            {state: "MN"},
            {state: "NC"},
            {state: "NY"},
            {state: "RI"},
            {state: "VA"},
            {state: "VT"},
            {state: "WA"},
            {state: "WI"},
            {state: "WV"}
        ];
        $scope.stateItem = {
            states: $scope.stateOptions[0]
        };

        this.loadStateData = function () {
            mobile.panelWrap.eq(0).hide();
            mobile.mainHead.addClass("top");
            mobile.searchTable.addClass("search");
            mobile.background.addClass("dark");
            if (mobile.stateMenu.eq(0).children("option:selected").index() > 0) {
                mobile.chatterBox.html(mobile.arrStateText[mobile.stateMenu.eq(0).children("option:selected").index() - 1]);
                $http.get("js/data/" + mobile.stateMenu.eq(0).children("option:selected").text().toLowerCase() + ".json").then(function (data) {
                    mobile.data = data.data;
                    $scope.data = data.data;
                });
            } else {
                mobile.chatterBox.html("Use the search section above to find your school.");
            }
            mobile.chatterBox.show();
        };

        this.checkMenu = function () {
            if (mobile.stateMenu.val() != "0") {
                return true;
            } else {
                return false;
            }
        };

        this.blur = function () {
            $scope.filterTerm = "";
        };

        this.setFocus = function (focusItem) {
            Analytics.click("School selected");
            mobile.currentFocus = focusItem;
            mobile.setPanelInfo(focusItem);
            $scope.isFormOpen = false;


            //set the filter term to be the full company name of the company selected
            // $scope.filterTerm = company.name;
            $scope.filterTerm = "";


            jQuery(window).on("resetSearch", function () {
                $scope.filterTerm = "";

                mobile.searchCont.find("input").val("");
            });
            $scope.setShare(focusItem);

        };


        this.clear = function () {
            $scope.filterTerm = "";
            mobile.setPanelInfo(null);
        };

        this.mobileSearch = function () {
            Analytics.click("Typed in search box");
            mobile.panelWrap.eq(0).hide();

            $scope.filteredArray = $filter("filter")($scope.data, $scope.filterTerm, false);
            if ($scope.filteredArray.length > 400) {
                $scope.filteredArray.length = 0;
            }
            if ($scope.filteredArray.length === 0) {
                mobile.chatterBox.show();
            } else {
                mobile.chatterBox.hide();
            }

            if ($scope.filterTerm !== "") {
                mobile.currentFocus = null;
                $scope.isFormOpen = true;
            }
            else {
                $scope.isFormOpen = false;
                mobile.chatterBox.show();
            }
        };

        $scope.showShare = function () {
            $(".panel-inner-wrap").addClass("blur");
            $(".share-page").addClass("show");
        };

        $scope.hideShare = function () {
            $(".panel-inner-wrap").removeClass("blur");
            $(".share-page").removeClass("show");
        };

        $scope.showInfo = function () {
            $(".panel-inner-wrap").addClass("blur");
            $(".info-page").addClass("show");
        };

        $scope.hideInfo = function () {
            $(".panel-inner-wrap").removeClass("blur");
            $(".info-page").removeClass("show");
        };

        $scope.setShare = function (schoolObj) {
            var copy,
                encodedURL,
                encodedURL2,
                encodedStr,
                encodedStrTE;

            var encodedBaseURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/");

            if (schoolObj) {
                copy = "My school, " + schoolObj.Name + " in " + schoolObj.City + ", " + schoolObj.State + ",  has a complete vaccination rate of " + (Math.round(schoolObj.Complete * 10000) / 100).toString() + ". Look up your school.";
                encodedURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedURL2 = encodeURI("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedStr = encodeURIComponent(copy);
                encodedStr = encodeURI(encodedStr);
                encodedStrTE = encodeURIComponent(copy);
            }

            else {
                copy = "How vaccinated are your local schools? Look up their rates @USATODAY";
                encodedURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedURL2 = encodeURI("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedStr = encodeURIComponent(copy);
                encodedStr = encodeURI(encodedStr);
                encodedStrTE = encodeURIComponent(copy);
            }

            var encodedTitle = encodeURIComponent("School Vaccination Rate");
            var fbRedirectUrl = encodeURIComponent("http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html");

            var tweetUrl = "https://twitter.com/intent/tweet?url=" + encodedURL + "&text=" + encodedStrTE + "";

            var fbUrl = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/img/fb-share.jpg&name=" + encodedTitle + "&description=" + encodedStr + "&redirect_uri=http://www.gannett-cdn.com/experiments/usatoday/_common/_dialogs/fb-share-done.html','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.click('Facebook share');void(0);";


            var emailURL = "mailto:?body=" + encodedStrTE + "%0d%0d" + encodedURL + "&subject=" + encodedTitle;

            $scope.share = {
                copy: copy,
                tweetUrl: tweetUrl,
                fbUrl: fbUrl,
                emailURL: emailURL
            };
        };
        $scope.setShare(null);
    });


})();
*/

