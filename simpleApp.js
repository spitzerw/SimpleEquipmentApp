document.addEventListener('DOMContentLoaded', function(event) {
	setupInitialEquipment();
	document.getElementById('saveButton').addEventListener('click', handleSave);
	document.getElementById('loadButton').addEventListener('click', handleLoad);
	handleSave();
});

function setupInitialEquipment() {
	for (var i = 0; i < equipmentTypes.length; i ++) {
		var equipmentSelect = document.getElementById(equipmentTypes[i] + 'Select');
		setupEquipmentSelect(equipmentSelect, equipmentTypes[i]);
		equipmentSelect.onchange = selectOnChange;
	}
}

function setupEquipmentSelect(element, type) {
	var equipment = getEquipmentByType(type);
	element.options[0] = new Option('None', 'None');
	for (var i = 0; i < equipment.length; i++) {
		var item = equipment[i];
		element.options[element.options.length] = new Option(item.name, item.name);
	}
}

function getEquipmentByType(type) {
	return equipmentList.filter(function(item) {
		return item.type === type;
	})
}

function selectOnChange(event) {
	var target = event.target;
	var itemElement = target.parentElement.getElementsByClassName('item')[0];
	itemElement.textContent = target.options[target.selectedIndex].value;
	updateCurrentEquipment();
}

function handleSave(event) {
	updateCurrentEquipment();
	var selectTemplate = document.getElementById('selectTemplate');
	var equipmentString = document.getElementById('currentEquipment').textContent
	selectTemplate.options[selectTemplate.length] = new Option(equipmentString, equipmentString);
	selectTemplate.value = equipmentString;
}

function handleLoad(event) {
	var selectTemplate = document.getElementById('selectTemplate');
	var equipment = JSON.parse(selectTemplate.options[selectTemplate.selectedIndex].value);
	for (type in equipment) {
		document.getElementById(type + 'Select').value = equipment[type];
		document.getElementById(type + 'Item').textContent = equipment[type];
	}
}

function getCurrentEquipment() {
	var equipment = {};
	for (var i = 0; i < equipmentTypes.length; i++) {
		equipment[equipmentTypes[i]] = document.getElementById(equipmentTypes[i] + 'Item').textContent;
	}
	return equipment;
}

function updateCurrentEquipment() {
	var equipment = getCurrentEquipment();
	document.getElementById('currentEquipment').textContent = JSON.stringify(equipment);
}