// Generated by CoffeeScript 1.8.0
var extend, flatten, last, repeat, syntaxErrorToString, _ref, _ref1;

exports.starts = function(string, literal, start) {
  return literal === string.substr(start, literal.length);
};

exports.ends = function(string, literal, back) {
  var len;
  len = literal.length;
  return literal === string.substr(string.length - len - (back || 0), len);
};

exports.repeat = repeat = function(str, n) {
  var res;
  res = '';
  while (n > 0) {
    if (n & 1) {
      res += str;
    }
    n >>>= 1;
    str += str;
  }
  return res;
};

exports.compact = function(array) {
  var item, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = array.length; _i < _len; _i++) {
    item = array[_i];
    if (item) {
      _results.push(item);
    }
  }
  return _results;
};

exports.count = function(string, substr) {
  var num, pos;
  num = pos = 0;
  if (!substr.length) {
    return 1 / 0;
  }
  while (pos = 1 + string.indexOf(substr, pos)) {
    num++;
  }
  return num;
};

exports.merge = function(options, overrides) {
  return extend(extend({}, options), overrides);
};

extend = exports.extend = function(object, properties) {
  var key, val;
  for (key in properties) {
    val = properties[key];
    object[key] = val;
  }
  return object;
};

exports.flatten = flatten = function(array) {
  var element, flattened, _i, _len;
  flattened = [];
  for (_i = 0, _len = array.length; _i < _len; _i++) {
    element = array[_i];
    if (element instanceof Array) {
      flattened = flattened.concat(flatten(element));
    } else {
      flattened.push(element);
    }
  }
  return flattened;
};

exports.del = function(obj, key) {
  var val;
  val = obj[key];
  delete obj[key];
  return val;
};

exports.last = last = function(array, back) {
  return array[array.length - (back || 0) - 1];
};

exports.some = (_ref = Array.prototype.some) != null ? _ref : function(fn) {
  var e, _i, _len;
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    e = this[_i];
    if (fn(e)) {
      return true;
    }
  }
  return false;
};

exports.find = (_ref1 = Array.prototype.find) != null ? _ref1 : function(fn) {
  var e, _i, _len;
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    e = this[_i];
    if (fn(e)) {
      return e;
    }
  }
};

exports.throwSyntaxError = function(message, location) {
  var error;
  error = new SyntaxError(message);
  error.location = location;
  error.toString = syntaxErrorToString;
  error.stack = error.toString();
  throw error;
};

exports.updateSyntaxError = function(error, code, filename) {
  if (error.toString === syntaxErrorToString) {
    error.code || (error.code = code);
    error.filename || (error.filename = filename);
    error.stack = error.toString();
  }
  return error;
};

syntaxErrorToString = function() {
  var codeLine, colorize, colorsEnabled, end, filename, first_column, first_line, last_column, last_line, marker, start, _ref2, _ref3;
  if (!(this.code && this.location)) {
    return Error.prototype.toString.call(this);
  }
  _ref2 = this.location, first_line = _ref2.first_line, first_column = _ref2.first_column, last_line = _ref2.last_line, last_column = _ref2.last_column;
  if (last_line == null) {
    last_line = first_line;
  }
  if (last_column == null) {
    last_column = first_column;
  }
  filename = this.filename || '[stdin]';
  codeLine = this.code.split('\n')[first_line];
  start = first_column;
  end = first_line === last_line ? last_column + 1 : codeLine.length;
  marker = repeat(' ', start) + repeat('^', end - start);
  if (typeof process !== "undefined" && process !== null) {
    colorsEnabled = process.stdout.isTTY && !process.env.NODE_DISABLE_COLORS;
  }
  if ((_ref3 = this.colorful) != null ? _ref3 : colorsEnabled) {
    colorize = function(str) {
      return "\x1B[1;31m" + str + "\x1B[0m";
    };
    codeLine = codeLine.slice(0, start) + colorize(codeLine.slice(start, end)) + codeLine.slice(end);
    marker = colorize(marker);
  }
  return "" + filename + ":" + (first_line + 1) + ":" + (first_column + 1) + ": error: " + this.message + "\n" + codeLine + "\n" + marker;
};

exports.nameWhitespaceCharacter = function(string) {
  switch (string) {
    case ' ':
      return 'space';
    case '\n':
      return 'newline';
    case '\r':
      return 'carriage return';
    case '\t':
      return 'tab';
    default:
      return string;
  }
};
