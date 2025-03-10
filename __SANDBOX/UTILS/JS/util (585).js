"use strict";

exports.__esModule = true;
exports.has = has;
var _Object$prototype = Object.prototype,
    hasOwnProperty = _Object$prototype.hasOwnProperty,
    toString = _Object$prototype.toString;

// Checks if an object has a property.

function has(obj, propName) {
  return hasOwnProperty.call(obj, propName);
}

var isArray = exports.isArray = Array.isArray || function (obj) {
  return toString.call(obj) === "[object Array]";
};