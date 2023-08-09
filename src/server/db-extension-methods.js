const assert = require('assert').strict
const { Path } = require('./path')
const _ = require('lodash')
const lodashId = require('lodash-id')
const utils = require('./utils')
  
  function getElement(path) {
    path = utils.Path(path); // convert from String to Path if necessary
    const breadcrumbs = path.breadcrumbs();
    const pathStr = path.toString();
    let obj = this.getState();
    const n = breadcrumbs.length;
    for (var i = 0; i < n; i++) {
      const k = breadcrumbs[i];
      if (!k) {
        throw new Error(`Bad path ${pathStr}`);
      }
      if (_.isPlainObject(obj)) {
        obj = obj[k]; // lookup dictionary by key
      } else if (_.isArray(obj)) {
        const id = parseInt(k);
        obj = lodashId.getById(obj, id); // lookup array by id field
      } else {
        throw new Error(`Bad path ${pathStr}`);
      } 
      if (!obj) {
        const currentPath = "/" + breadcrumbs.slice(0, i + 1).join("/");
        throw new Error(`no element at ${currentPath}`);
      }
    }
    assert.ok(obj !== null && obj !== undefined);
    return obj;
  }
  
  function upsertObject(path, data) {
    path = new Path(path);
    if (path.isRoot()) {
      this.setState(data);
    } else {
      const depth = path.depth();
      const path_minus_one = path.truncate(depth - 1);
      const x = this.getElement(path_minus_one);
      if (_.isPlainObject(x)) {
        x[path.get(depth)] = data; // this is the crucial line that does the upsert
      } else if (_.isArray(x)) {
        throw new Error("Bad function call. This method is only supposed to be used to upsert an object not an array.");
      } else {
        throw new Error("runtime error. unexpected code path");
      }
    }
  }
  
  function deleteObject(path, data) {
    path = new Path(path);
    if (path.isRoot()) {
      this.setState(data);
    } else {
      const depth = path.depth();
      const path_minus_one = path.truncate(depth - 1);
      const x = this.getElement(path_minus_one);
      if (_.isPlainObject(x)) {
        delete x[path.get(depth)]; // this is the crucial line that does the delete
      } else if (_.isArray(x)) {
        throw new Error("Bad function call. This method is only supposed to be used to delete items in an object not an array.");
      } else {
        throw new Error("runtime error. unexpected code path");
      }
    }
  }
  
  function exists(path) {
    try {
      this.getElement(path);
      return true;
    } catch {
      return false;
    }
  }

module.exports = {
    getElement,
    upsertObject,
    deleteObject,
    exists  
}