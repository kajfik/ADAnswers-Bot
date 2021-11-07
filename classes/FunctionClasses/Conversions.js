"use strict";

class Conversions {
  static fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  static celsiusToFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
  }

  static feetToMeters(feet) {
    return feet * 0.3048;
  }

  static metersToFeet(meters) {
    return meters * 3.28084;
  }

  static milesToKilometers(miles) {
    return miles * 1.60934;
  }

  static kilometersToMiles(kilometers) {
    return kilometers / 1.60934;
  }

  static poundsToKilograms(pounds) {
    return pounds * 0.453592;
  }

  static kilogramsToPounds(kilograms) {
    return kilograms / 0.453592;
  }

  static gallonsToLiters(gallons) {
    return gallons * 3.78541;
  }

  static litersToGallons(liters) {
    return liters / 3.78541;
  }
}

const fairConversions = new Map([
  ["fahrenheitToCelsius", Conversions.fahrenheitToCelsius],
  ["celsiusToFahrenheit", Conversions.celsiusToFahrenheit],
]);

module.exports = { Conversions, fairConversions };