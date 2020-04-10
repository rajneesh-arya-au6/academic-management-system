"use strict";

var Car = function Car(name, model) {
  this.name = name;
  this.model = model;
  console.log(this);
};

var hyundai = new Car("hyundai creta", "SUV");