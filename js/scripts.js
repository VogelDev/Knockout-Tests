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
	var self = this;
  this.personToAdd = ko.observable("");
  this.people = ko.observableArray([]);
  this.selectedItems = ko.observableArray("");

  this.peopleToAdd = ko.observableArray("");
  this.peopleToRemove = ko.observableArray("");

  this.addContact = function() {

    var person = {
			ID:					self.people().length + 1,
      FIRST_NAME: $("#firstNameInput").val(),
      LAST_NAME: 	$("#lastNameInput").val(),
      TITLE: 			$("#titleInput").val(),
      PHONE: 			$("#phoneInput").val(),
      EMAIL: 			$("#emailInput").val(),
			theme:      "OrangeRed"
    }

		this.people.push(person);

		$("#firstNameInput").val(""),
		$("#lastNameInput").val(""),
		$("#titleInput").val(""),
		$("#phoneInput").val(""),
		$("#emailInput").val("")

  }

	this.saveAll = function(){
		$.post("data/save.php", person);
	}

}

var viewModel = new ContactListModel();

ko.applyBindings(viewModel);
