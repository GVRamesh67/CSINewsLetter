w3.includeHTML();
var app = angular.module("csiApp", ['ngAnimate']);
app.controller('csiCtrl', function ($scope, $filter, $http, $location, $anchorScroll) {
    $scope.boolHead = true;
    $scope.boolEditerNote = true;
    $scope.boolChapterAct = true;
    $scope.boolFutureAct = true;
    $scope.boolHotTrends = true;
    $scope.boolTechPaper = true;
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
    $scope.getEditorNote();
    $scope.getChapterAct();
    $scope.getTechnologyLinks();
    $scope.getFutureAct();
});