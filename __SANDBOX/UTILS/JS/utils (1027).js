"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImportPrefix = getImportPrefix;
exports.getLocalIdent = getLocalIdent;
exports.dashesCamelCase = dashesCamelCase;
exports.getFilter = getFilter;
exports.placholderRegExps = void 0;

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
const placholderRegExps = {
  importItemG: /___CSS_LOADER_IMPORT___([0-9]+)___/g,
  importItem: /___CSS_LOADER_IMPORT___([0-9]+)___/
};
exports.placholderRegExps = placholderRegExps;

function getImportPrefix(loaderContext, importLoaders) {
  if (importLoaders === false) {
    return '';
  }

  const numberImportedLoaders = parseInt(importLoaders, 10) || 0;
  const loadersRequest = loaderContext.loaders.slice(loaderContext.loaderIndex, loaderContext.loaderIndex + 1 + numberImportedLoaders).map(x => x.request).join('!');
  return `-!${loadersRequest}!`;
}

function dashesCamelCase(str) {
  return str.replace(/-+(\w)/g, (match, firstLetter) => firstLetter.toUpperCase());
}

function getLocalIdent(loaderContext, localIdentName, localName, options) {
  if (!options.context) {
    // eslint-disable-next-line no-param-reassign
    options.context = loaderContext.rootContext;
  }

  const request = _path.default.relative(options.context, loaderContext.resourcePath).replace(/\\/g, '/'); // eslint-disable-next-line no-param-reassign


  options.content = `${options.hashPrefix + request}+${localName}`; // eslint-disable-next-line no-param-reassign

  localIdentName = localIdentName.replace(/\[local\]/gi, localName);

  const hash = _loaderUtils.default.interpolateName(loaderContext, localIdentName, options);

  return hash.replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-').replace(/^((-?[0-9])|--)/, '_$1');
}

function getFilter(filter, resourcePath, defaultFilter = null) {
  return content => {
    if (defaultFilter && !defaultFilter(content)) {
      return false;
    }

    if (typeof filter === 'function') {
      return !filter(content, resourcePath);
    }

    return true;
  };
}