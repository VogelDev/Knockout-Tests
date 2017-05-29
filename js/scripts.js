$(document).ready(function() {
	$.getJSON("./data/data.php", function(data) {
		var themes = ["blue", "orange", "OrangeRed", "Peru", "olive", "MediumVioletRed"]
		for (var i = 0; i < data.length; i++) {
			data[i].theme = themes[Math.floor(Math.random() * themes.length)];
		}
		//viewModel.people(data.people);
		viewModel.people(data);
	});
});

var ContactListModel = function() {
  this.personToAdd = ko.observable("");
  this.people = ko.observableArray([]);
  this.selectedItems = ko.observableArray("");

  this.addPerson = function() {
    if (this.personToAdd() !== "") {
      this.people.push(this.personToAdd());
    }
    this.personToAdd("");
  }
}

var viewModel = new ContactListModel();

ko.applyBindings(viewModel);
