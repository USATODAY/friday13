var mobile = mobile || {};

mobile.arrColorSpaces = [
    [0, 7], //red
    [1, 5, 8], //purple
    [2, 9], //blue
    [3, 6, 10], //yellow
    [4, 11] //green
];

mobile.arrQuestions = [
    ["Chad is Italian!", true],
    ["Lindsay is the Godmother!", true],
    ["Janet likes the spellng of her last name!", false],
    ["Jodi took a five-minute break!", false],
    ["Chad is Italian! 5", true],
    ["Chad is Italian! 6", false],
    ["Chad is Italian! 7", true],
    ["Chad is Italian! 8", true],
    ["Chad is Italian! 9", false],
    ["Chad is Italian! 10", true],
    ["Chad is Italian! 11", false],
    ["Chad is Italian! 12", false],
    ["Chad is Italian! 13", true]
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
    console.log(numHeight);
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
    });

    mobile.drawButton.click(function(e){
        //mobile.mainPanel.animate({"left": "-100%"}, 500);
        mobile.renderSpace();
    });
};

mobile.renderSpace = function() {
    mobile.numColor = mobile.randomNumber(0, 4);
    var numNewSpot = 0;
    mobile.instructions.addClass("hide");
    mobile.cardColor.css({"background": mobile.arrColors[mobile.numColor]});
    mobile.cardColor.addClass("show");
    jQuery.each(mobile.arrColorSpaces[mobile.numColor], function(index){
        if (mobile.currentSpot <= mobile.arrColorSpaces[mobile.numColor][index]) {
            numNewSpot = mobile.arrColorSpaces[mobile.numColor][index];
            return false;
        }
    });
    if (numNewSpot === 0) {
        numNewSpot = 13;
    }
    console.log(numNewSpot);
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

