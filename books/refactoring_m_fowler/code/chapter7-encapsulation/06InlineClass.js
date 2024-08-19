function test(title, callback){
 console.group(title);
 callback();
 console.groupEnd(title);
}

// Starter
(() => {
 
 class TrackingInformation {
  
  constructor(data) {
   this._shippingCompany = data.shippingCompany;
   this._trackingNumber = data.trackingNumber;
  }

  get shippingCompany() {
   return this._shippingCompany;
  }

  set shippingCompany(arg) {
   this._shippingCompany = arg;
  }

  get trackingNumber() {
   return this._trackingNumber; 
  }

  set trackingNumber(arg) {
   this._trackingNumber = arg;
  }

  get display() {
   return `${this.shippingCompany} : ${this.trackingNumber}`
  }
 }


 class Shipment {
  constructor(trackingInformation) {
   this._trackingInformation = trackingInformation;
  }

  get trackingInfo() {
   return this._trackingInformation.display;
  }

  get trackingInformation() {
   return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
   this._trackingInformation = aTrackingInformation;
  }
 }

 test("classes work as expected", () => {
   const request = { vendor: "ABC ltd" };
   const aShipment = new Shipment(new TrackingInformation({ shippingCompany: "ABC", trackingNumber: 22 }));
   aShipment.trackingInformation.shippingCompany = request.vendor;
   if (aShipment.trackingInformation.shippingCompany === "ABC ltd") {
    console.log("PASS");
   } else {
    console.log("FAIL");
    console.log(aShipment.trackingInformation.shippingCompany);
   }
 }); 

})();

// Refactored
(() => {

 class Shipment {
  constructor(trackingInformation) {
   this._shippingCompany = trackingInformation.shippingCompany;
   this._trackingNumber = trackingInformation.trackingNumber;
  }

  get trackingInfo() {
   return `${this.shippingCompany} : ${this.trackingNumber}`
  }

  get trackingNumber() {
   return this._trackingNumber; 
  }

  set trackingNumber(arg) {
   this._trackingNumber = arg;
  }
  
  get shippingCompany() {
   return this._shippingCompany;
  } 

  set shippingCompany(arg) {
   this._shippingCompany = arg;
  }

 }

 test("class works as expected", () => {
   const request = { vendor: "ABC ltd" };
   const aShipment = new Shipment({ shippingCompany: "ABC", trackingNumber: 22 });
   aShipment.shippingCompany = request.vendor;
   if (aShipment.shippingCompany === "ABC ltd") {
    console.log("PASS");
   } else {
    console.log("FAIL");
    console.log(aShipment.shippingCompany);
   }
 }); 

})();


