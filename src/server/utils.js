const _ = require('lodash');
const _path = require('./path').Path;

function getPage(array, page, perPage) {
  const obj = {}
  const start = (page - 1) * perPage
  const end = page * perPage

  obj.items = array.slice(start, end)
  if (obj.items.length === 0) {
    return obj
  }

  if (page > 1) {
    obj.prev = page - 1
  }

  if (end < array.length) {
    obj.next = page + 1
  }

  if (obj.items.length !== array.length) {
    obj.current = page
    obj.first = 1
    obj.last = Math.ceil(array.length / perPage)
  }

  return obj
}

function truncate(x, d) {
  if (_.isPlainObject(x)) {
    if (d === 0) {
      return Object.keys(x).length;
    } else {
      var y = {};
      for (var k in x) {
        y[k] = truncate(x[k], d - 1);
      }
      return y;
    }
  } else if (_.isArray(x)) {
    if (d === 0) {
      return x.length;
    } else {
      var y = [];
      for (var v of x) {
        y.push(truncate(v, d - 1));
      }
      return y;
    }
  } else {
    return x;
  }
}

function Path(path) {
  if (path.constructor.name === 'String') {
    return new _path(path);
  } else if (path.constructor.name === 'Path') {
    return path;
  } else {
    throw new Error(`Invalid data type for path. Must be String or Path.`);
  }
}

module.exports = {
  getPage,
  truncate,
  Path
}
