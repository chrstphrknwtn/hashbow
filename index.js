var hslToHex = require('tie-dye/hslToHex');

function hashbow(input, saturation, lightness, hueRangeMin, hueRangeMax) {

  var inputAsString, sum, hue;
  saturation = saturation || 50;
  lightness = lightness || 50;
  hueRangeMin = (hueRangeMin < 360 && hueRangeMin > 0 ? hueRangeMin : 0) || 0;
  hueRangeMax = (hueRangeMax < 360 && hueRangeMax > 0 ? hueRangeMax : 360) || 360;

  var greyValues = [null, undefined, [], {}, '', new RegExp()];

  if (greyValues.indexOf(input) != -1) {
    return hslToHex(0, 0, lightness);
  }

  switch (input.constructor) {
    case Function:
    case RegExp:
      inputAsString = input.toString();
    break;
    case Object:
    case Array:
      inputAsString = JSON.stringify(input);
    break;
    case Number:
      sum = input;
    break;
    case Boolean:
      return hslToHex(input ? 120 : 0, saturation, lightness);
    break;
    case String:
    default:
      inputAsString = input;
  }

  if (sum === undefined) {
    sum = 0;
    inputAsString.split('').forEach(function (letter) {
      sum += letter.charCodeAt(0);
    });
  }

  sum = Math.abs(sum * sum);
  hue = (sum % (hueRangeMax - hueRangeMin)) + hueRangeMin;

  return hslToHex(hue, saturation, lightness);
}

module.exports = hashbow;
