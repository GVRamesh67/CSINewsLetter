w3.includeHTML();
var app = angular.module("csiApp", ['ngAnimate']);

app.service('anchorSmoothScroll', function () {
    // This scrolling function 

    this.scrollTo = function (eID) {

        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20)
            speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY)
                    leapY = stopY;
                timer++;
            }
            return;
        }
        for (var i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY)
                leapY = stopY;
            timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset)
                return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop)
                return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent !== document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }
            return y;
        }

    };

});
app.controller('csiCtrl', function ($scope, $http, $location, $anchorScroll, anchorSmoothScroll, $window) {
    $scope.boolMenu = false;
    $scope.boolContributors = false;
    $scope.boolHead = true;
    $scope.boolEditerNote = true;
    $scope.boolSecDesk = true;
    $scope.boolChapterAct = true;
    $scope.boolFutureAct = true;
    $scope.boolHotTrends = true;
    $scope.boolTechPaper1 = true;
    $scope.boolTechPaper2 = true;
    $scope.boolTechPaper3 = true;
    $scope.boolTechPaper4 = true;
    $scope.boolTechPaper5 = true;
    $scope.quizScore = 0;
    $scope.quizCntr = 0;
    $scope.currentQuestionNo = 0;
    $scope.getMenu = function () {
        var req = new Req('data/menu.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.menu = response.data;
                });
    };
    $scope.getEditorNote = function () {
        var req = new Req('data/editorNote.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.editorNote = response.data;
                });
    };
    $scope.getSecNote = function () {
        var req = new Req('data/secNote.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.secNote = response.data;
                });
    };
    $scope.getChapterAct = function () {
        var req = new Req('data/chapterActivities.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.chaptAct = response.data;
                });
    };
    $scope.getFutureAct = function () {
        var req = new Req('data/futureActivities.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.futureAct = response.data;
                });
    };
    $scope.getTechnologyLinks = function () {
        var req = new Req('data/technologyLinks.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.techLinks = response.data;
                });
    };
    $scope.getQuiz = function () {
        var req = new Req('data/quiz.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.quizQuestions = response.data;
                    for (var i = 0; i < $scope.quizQuestions.length; i++) {
                        $scope.quizQuestions[i].chosenAnswer = '';
                        $scope.quizQuestions[i].active = true;
                    }
                });
    };
    $scope.getContributors = function () {
        var req = new Req('data/contributors.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.contributors = response.data;
                });
    };
    $scope.getEditStaff = function () {
        var req = new Req('data/editorialStaff.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.editorialStaff = response.data;
                });
    };
    $scope.getProblem = function () {
        var req = new Req('data/problemCorner.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.problemCorner = response.data;
                });
    };

    $scope.checkAnswer = function (idx) {
        $scope.quizQuestions[idx].active = false;
        $scope.quizCntr = $scope.quizCntr + 1;
        if ($scope.quizQuestions[idx].chosenAnswer === $scope.quizQuestions[idx].answer) {
            $scope.quizScore = $scope.quizScore + 1;
            alert("Correct - " + $scope.quizScore);
        } else {
            alert("Wrong");
        }
        if ($scope.quizCntr === 12) {
            alert("Your total score: " + $scope.quizScore);
        } else {
            $scope.currentQuestionNo = $scope.currentQuestionNo + 1;
        }
    };
    $scope.scrollTo = function (anchor) {
        $location.hash(anchor);
        //$anchorScroll();
        anchorSmoothScroll.scrollTo(anchor);
        if (!(anchor === 'top')) {
            $scope.showGoToTop();
        }
    };
    $scope.showGoToTop = function () {
        var div = document.getElementById('ID_CONTAINER'); // need real DOM Node, not jQuery wrapper 
        var a = div.scrollTop;
        var b = div.scrollHeight - div.clientHeight;
        var c = a / b;
        if (c < 1) {
            $scope.boolScrollTop = false;
        } else {
            $scope.boolScrollTop = true;
        }
    };
    $scope.scrollToTop = function () {
        $scope.boolScrollTop = false;
        $scope.scrollTo('top');
    };
    $scope.getMenu();
    $scope.getEditorNote();
    $scope.getSecNote();
    $scope.getChapterAct();
    $scope.getTechnologyLinks();
    $scope.getFutureAct();
    $scope.getQuiz();
    $scope.getContributors();
    $scope.getEditStaff();
    $scope.getProblem();
});