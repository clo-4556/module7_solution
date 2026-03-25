(function () {
  
 
  angular.module('ShoppingListCheckOff', [])
 
  .service('ShoppingListCheckOffService', function () {
    var service = this;
 
    // Kale's inventory — Everything a Tarnished can purchase from Kale
    // please note: in the game, Arrows and Bolts are infinite items, used quantity 
    // of 999 to represent infinite quantity
    service.toBuyItems = [
      { name: 'Throwing Dagger', quantity: 999, pricePerItem: 40},
      { name: 'Telescope', quantity: 1, pricePerItem: 500},
      { name: 'Furlcalling Finger Remedy', quantity: 5, pricePerItem: 1000},
      { name: 'Cracked Pot', quantity: 3, pricePerItem: 300},
      { name: 'Crafting Kit', quantity: 1, pricePerItem: 300},
      { name: "Nomadic Warrior's Cookbook [1]", quantity: 1, pricePerItem: 500},
      { name: "Nomadic Warrior's Cookbook [2]", quantity: 1, pricePerItem: 500},
      { name: "Missionary's Cookbook [1]", quantity: 1,  pricePerItem: 1000},
      { name: 'Arrow', quantity: 999, pricePerItem: 20},
      { name: 'Bolt', quantity: 999, pricePerItem: 40},
      { name: 'Torch', quantity: 1, pricePerItem: 200},
      { name: 'Large Leather Shield', quantity: 1,  pricePerItem: 600},
      { name: 'Chain Coif', quantity: 1, pricePerItem: 1000},
      { name: 'Chain Armor', quantity: 1, pricePerItem: 1500},
      { name: 'Chain Gauntlets', quantity: 1, pricePerItem: 1000},
      { name: 'Chain Leggings', quantity: 1, pricePerItem: 1000},    
    ];
 
    service.boughtItems = [];
 
    /// Moves the given item selected from toBuyItems to boughtItems.
    service.buyItem = function (item) {
      var index = service.toBuyItems.indexOf(item);
      if (index !== -1) {
        service.toBuyItems.splice(index, 1);
        service.boughtItems.push(item);
      }
    };
  })
 
  // This is the ToBuyController
  // Bridges the service's toBuyItems array and buyItem method to the template.
  .controller('ToBuyController', ToBuyController);
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.toBuyItems;
    toBuy.buyItem = function (item) {
      ShoppingListCheckOffService.buyItem(item);
    };
  }
 
  // This is the AlreadyBoughtController 
  // Bridges the service's boughtItems array to the template.
  angular.module('ShoppingListCheckOff').controller('AlreadyBoughtController', AlreadyBoughtController);
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.boughtItems;
  }
 

  // Why use $ when you can use $$$? Kale charges a premium Angular dollar, Tarnished.
  // please note: $$$1 equals 1 Rune
  angular.module('ShoppingListCheckOff').filter('runeConversion', function () {
    return function (amount) {
      return '$$$' + parseFloat(amount).toFixed(2);
    };
  });
 
})();