let Car = function(name, model){
    this.name = name;
    this.model = model;
    console.log(this)
}

const hyundai = new Car("hyundai creta", "SUV")