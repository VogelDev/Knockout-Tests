$(document).ready(function() {
  $.getJSON("./data/data.php", function(data) {
    var themes = ["blue", "orange", "OrangeRed", "Peru", "olive", "MediumVioletRed"]
    for (var i = 0; i < data.length; i++) {
      data[i].theme = themes[Math.floor(Math.random() * themes.length)];
			//data[i].ID = generateUUID();
    }
    //viewModel.people(data.people);
    viewModel.people(data);
  });
});

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

var ContactListModel = function() {
	var self = this;
  self.personToAdd = ko.observable("");
  self.people = ko.observableArray([]);
  self.selectedItems = ko.observableArray("");

  self.peopleToAdd = ko.observableArray("");
  self.peopleToRemove = ko.observableArray("");

  self.addContact = function() {

    var person = {
			ID:					generateUUID(),
      FIRST_NAME: $("#firstNameInput").val(),
      LAST_NAME: 	$("#lastNameInput").val(),
      TITLE: 			$("#titleInput").val(),
      PHONE: 			$("#phoneInput").val(),
      EMAIL: 			$("#emailInput").val(),
			theme:      "OrangeRed"
    }

		self.people.push(person);
		self.peopleToAdd.push(person);

		$("#firstNameInput").val(""),
		$("#lastNameInput").val(""),
		$("#titleInput").val(""),
		$("#phoneInput").val(""),
		$("#emailInput").val("")

  }

	self.saveAll = function(){

		if(self.peopleToAdd().length > 0){
			$.post("data/save.php", JSON.stringify(self.peopleToAdd()));
			self.peopleToAdd = ko.observableArray("");
		}

		if(self.peopleToRemove().length > 0){
			$.post("data/remove.php", JSON.stringify(self.peopleToRemove()));
			self.peopleToRemove = ko.observableArray("");
		}
	}

	self.remove = function(guid){
		if(guid){
			self.people.remove(function(person){
				return person.ID == guid;
			});
			self.peopleToAdd.remove(function(person){
				return person.ID == guid;
			});
			// if guid is numeric, we can assume it's already in the db
			if($.isNumeric(guid)){
				self.peopleToRemove.push(guid);
			}
		}
	}

}

var viewModel = new ContactListModel();

ko.applyBindings(viewModel);
