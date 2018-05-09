App.controller('BookCtrl', function($rootScope, $scope, $ionicModal, $stateParams, $filter, Ajax, REST) {
  if (typeof $stateParams.bookType !== 'undefined' && typeof $stateParams.bookId !== 'undefined') {
    var type = $stateParams.bookType;
    var id = $stateParams.bookId;
  } else {
    var id = '';
    var type = '';
  }

  var GetBook = function(type, id) {
    $scope.book = {};
    $scope.preivews = [];
    $scope.data_type = type;
    // Post data
    var data_post = {
      type: type,
      id: id
    }
    var data = $filter('ObjectToParams')(data_post);
    Ajax.get(REST.book, data, true).then(function(res) {
      if (res.data.result == 1 && res.data.data) {
		console.log(res.data);
        $scope.book = res.data.data;
        $scope.previews = res.data.data.files;
      }
    }, function(err) {
      console.log(err);
    });
  }

  GetBook(type, id);

  $ionicModal.fromTemplateUrl('templates/preview.html', {scope: $scope}).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.PhotoViewer = function(url) {
    if (typeof PhotoViewer !== 'undefined') {
      PhotoViewer.show(url);
    } else {
      $scope.OpenPreivew();
    }
  }

  $scope.OpenPreivew = function() {
    $scope.modal.show();
  }

  $scope.ClosePreivew = function() {
    $scope.modal.hide();
  }
});