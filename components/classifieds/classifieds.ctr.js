(function() {

"use strict";
angular.
	module("ngClassifieds")
	.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

			var vm = this;

			vm.categories;
                  vm.classified;
                  vm.classifieds;
                  vm.closeSidebar = closeSidebar;
                  vm.deleteClassified = deleteClassified;
                  vm.editing;
                  vm.editClassified = editClassified;
                  vm.openSidebar = openSidebar;
			vm.saveEdit = saveEdit;
			vm.saveClassified = saveClassified;
				
            	classifiedsFactory.getClassifieds().then(function(classifieds){
				vm.classifieds = classifieds.data;
				vm.categories = getCategories(vm.classifieds);	
			});

			var contact = {
				name: "Sindhu",
				phone: "(999) 999 - 9999",
				email: "abc@gmail.com"
			}


			function openSidebar() {
        		$mdSidenav('left').open();
     		      }	

      		function closeSidebar() {
      			$mdSidenav('left').close();
      		}	

      		function saveClassified (classified) {
      			if(classified) {
      				classified.contact = contact;
      				vm.classifieds.push(classified);
      				vm.classified = {};
      				closeSidebar();
      				showToast("Classified saved!" , 3000);
      			}
      		}

      		function editClassified (classified) {
      			vm.editing = true;
      			openSidebar();
      			vm.classified = classified;
      		}

      		function saveEdit() {
      			vm.editing = false;
      			vm.classified={};
      			closeSidebar();
      			showToast("Edit saved!" , 2000);
      		}

      		function deleteClassified(event, classified) {
      			var confirm = $mdDialog.confirm()
      			.title('Are you sure you want to delete' + classified.title + '?')
      			.ok('yes')
      			.cancel('No')
      			.targetEvent(event);
      			$mdDialog.show(confirm).then(function() {	
      				var index = vm.classifieds.indexOf(classified);
      				vm.classifieds.splice(index, 1);
      			}, function() {

      			});
      			}

      		function showToast(message, delay) {
      			$mdToast.show(
      					$mdToast.simple()
      					.content(message)
      					.position("top, right")
      					.hideDelay(delay)
      				)
      		}

      		function getCategories(classifieds){
      			var categories = [];
      			angular.forEach(classifieds, function(item){
      				angular.forEach(item.categories, function(category) {
      					categories.push(category);
      				});
      			});
      			return _.uniq(categories);
      		}
	});
})();