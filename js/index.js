var app = angular.module('papeApp', ['ngRoute']).factory('PaginationService', PaginationService).directive('autoComplete', function($timeout) {

  return function(scope, iElement, iAttrs) {
          iElement.bind("keypress", function(e){
            console.log(e.target)
              if(e){
                scope.showlist = true;
              }else{
                scope.showlist = false;
              }
          })
  };
})

app.filter('isArtGroup', function(){
  return function(values, groupId) {
    if(!groupId) {
      // initially don't filter
      return values;
    }
    // filter when we have a selected groupId
    return values.filter(function(value){
      return value.Brand === groupId;
    })
  }
})

var names =  [
  {
    "Name" : "Pluma Roja",
    "Price" : "8.00",
    "Description" : "Punto fino",
    "Brand" : "Bic",
    "Image" : "plrj.jpg"
  },
  {
    "Name" : "Pluma Azul",
    "Price" : "8.00",
    "Description" : "Punto fino",
    "Brand" : "Bic",
    "Image" : "plbl.jpg"
  },
  {
    "Name" : "Pluma Negra",
    "Price" : "8.00",
    "Description" : "Punto fino",
    "Brand" : "Bic",
    "Image" : "plng.jpg"
  },
  {
    "Name" : "Lapiz",
    "Price" : "8.00",
    "Description" : "Punto fino",
    "Brand" : "Dixon",
    "Image" : "plrj.jpg"
  },
  {
    "Name" : "Color Rojo",
    "Price" : "8.00",
    "Description" : "Punto fino",
    "Brand" : "Dixon",
    "Image" : "plbl.jpg"
  },
  {
    "Name" : "Resistols",
    "Price" : "8.00",
    "Description" : "Punto fino",
    "Brand" : "Dixon",
    "Image" : "plng.jpg"
  },
  {
    "Name" : "Tijeras",
    "Price" : "8.00",
    "Description" : "Punto fino",
    "Brand" : "Shelly",
    "Image" : "plrj.jpg"
  }
];

var promotionsItems = [
  {
    "Id" : "1",
    "Url" : "plng.jpg",
    "DateOn" : "Punto fino",
    "DateOff" : "01/01/2023",
  },
  {
    "Id" : "2",
    "Url" : "plng.jpg",
    "DateOn" : "Punto fino",
    "DateOff" : "01/01/2023",
  },
  {
    "Id" : "3",
    "Url" : "plng.jpg",
    "DateOn" : "Punto fino",
    "DateOff" : "01/01/2023",
  },
  {
    "Id" : "4",
    "Url" : "plng.jpg",
    "DateOn" : "Punto fino",
    "DateOff" : "01/01/2023",
  }
];

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl : "src/sites/home.html"
  })
  .when("/hyper", {
      templateUrl : "src/sites/hyper.html"
  })
});

app.controller('PaginationController', PaginationController);


function PaginationController(PaginationService, $scope) {

  $scope.muestra = false;
  $scope.selectedGroup = '';
  $scope.setGroup = function(group) {
  $scope.muestra = true;
  $scope.selectedGroup = group;
  }

  $scope.cleanFilter = function (){
    $scope.selectedGroup = '';
    $scope.muestra = false;

  }

  var vm = this;

  var records = names;

  vm.dummyItems = records; // dummy array of items to be paginated 
  console.log("aqui",vm.dummyItems)
  vm.pager = {};
  vm.setPage = setPage;

  initPager();

  function initPager() {
    // initially set to page 1
    vm.setPage(1);
  }

  function setPage(page) {
    if (page < 1 || page > vm.pager.totalPages) {
      return;
    }

    // get the pager object from service 
    vm.pager = PaginationService.GetPager(vm.dummyItems.length, page);

    // get current page of items 
    vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
  }
}

function PaginationService() {
  // service definition 
  var service = {};

  service.GetPager = GetPager;

  return service;

  // service implementation
  function GetPager(totalItems, currentPage, pageSize) {
    // default to page 1
    currentPage = currentPage || 1;

    // default page size will be 10
    pageSize = pageSize || 6;

    // calc total pages 
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
};

app.controller('pageLoadAppCtrl', ["$scope", "$location","$anchorScroll", function($scope, $location, $anchorScroll ) {
 
  $scope.scrollTo = function(id) {
    $location.hash(id);
    console.log($location.hash());
    $anchorScroll();
  };

  //Logic for loading in page
  var myVar;
        
  $scope.myFunction = function () {
    myVar = setTimeout($scope.init, 2000);
  }

  $scope.init = function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }

  //Logic for visualize elements in input text
  $scope.names = names;
  console.log($scope.names);
  $scope.showlist = false;

  $scope.clearList = function(){
    $scope.selected = null;
    $scope.showlist = false;
  }
  
  $scope.selectedItem = function($event, name){
    
    console.log(name)
    $scope.selected = name.Name;
    $scope.showlist = false;
  }

}]);

app.controller('loadPromotions', ["$scope", function($scope) {
  $scope.itemsPromo = promotionsItems;
  console.log($scope.itemsPromo);

  $scope.CurrentDate = new Date();
  console.log($scope.CurrentDate.getMonth());

}]);


window.addEventListener('scroll', function() {
  let elements = document.getElementsByClassName('scroll-content');
  let screenSize = window.innerHeight;

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      if (element.getBoundingClientRect().top < screenSize) {
          element.classList.add('visible');
      } else {
          element.classList.remove('visible');
      }

  }

  var topbutton = document.getElementById("topBtn");
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      topbutton.style.display = "block";
  } else {
      topbutton.style.display = "none";
  }
});

// Cuando se de click en el boton nos lleva al tope
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
}



