w3.includeHTML();
var app = angular.module("csiApp", ['ngAnimate']);
app.controller('csiCtrl', function ($scope, $filter, $http, $location, $anchorScroll) {
    $scope.boolHead = true;
    $scope.boolEditerNote = true;
    $scope.boolChapterAct = true;
    $scope.boolFutureAct = true;
    $scope.boolHotTrends = true;
    $scope.boolTechPaper1 = true;
    $scope.boolTechPaper2 = true;
    $scope.boolTechPaper3 = true;
    $scope.boolTechPaper4 = true;
    $scope.quizScore = 0;
    $scope.quizCntr = 0;
    $scope.currentQuestionNo = 0;
    $scope.getEditorNote = function () {
        var req = new Req('data/editorNote.json', 'GET');
        $http(req).then(
                function (response) {
                    $scope.editorNote = response.data;
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
    $scope.getEditorNote();
    $scope.getChapterAct();
    $scope.getTechnologyLinks();
    $scope.getFutureAct();
    $scope.getQuiz();
});