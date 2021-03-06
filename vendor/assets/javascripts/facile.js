// Generated by CoffeeScript 1.3.1
(function() {
  var bindArray, bindAttributeObject, bindData, bindNestedObject, bindObject, bindOrRemove, bindValue, combineClasses, find;

  find = function($el, key) {
    var $result;
    $result = $el.find('#' + key);
    if ($result.length === 0) {
      $result = $el.find('.' + key);
    }
    return $result;
  };

  combineClasses = function(existingClasses, newClasses) {
    if (existingClasses) {
      if (newClasses.length > 0) {
        return "" + existingClasses + " " + newClasses;
      } else {
        return existingClasses;
      }
    } else {
      return newClasses;
    }
  };

  window.facile = function(template, data) {
    var $template, key, value;
    $template = $('<div />').append($(template));
    for (key in data) {
      value = data[key];
      bindOrRemove($template, key, value);
    }
    return $template.html();
  };

  bindOrRemove = function($template, key, value) {
    var $el;
    if (value != null) {
      return bindData($template, key, value);
    } else {
      $el = find($template, key);
      return $el.remove();
    }
  };

  bindData = function($template, key, value) {
    var $target;
    if (value.constructor === Array) {
      return bindArray($template, key, value);
    } else if (value.constructor === Object) {
      $target = find($template, key);
      return bindObject($target, key, value);
    } else {
      return bindValue($template, key, value);
    }
  };

  bindArray = function($template, key, value) {
    var $child, $clone, $nested, $root, arrayValue, newHtml, _i, _len, _results;
    $root = find($template, key);
    if ($root.length === 0) {
      return;
    }
    $nested = find($root, key);
    if ($nested.length > 0) {
      $root = $nested;
    }
    if ($root.is('table')) {
      $root = $root.find('tbody');
    }
    $child = $root.children().remove();
    _results = [];
    for (_i = 0, _len = value.length; _i < _len; _i++) {
      arrayValue = value[_i];
      $clone = $child.clone();
      if (arrayValue.constructor === Object) {
        newHtml = facile($clone, arrayValue);
        _results.push($root.append(newHtml));
      } else {
        $clone.html(arrayValue);
        _results.push($root.before($clone));
      }
    }
    return _results;
  };

  bindObject = function($template, key, value) {
    if (value.content != null) {
      return bindAttributeObject($template, key, value);
    } else {
      return bindNestedObject($template, key, value);
    }
  };

  bindValue = function($template, key, value) {
    var $el, attr, _ref;
    if (key.indexOf('@') !== -1) {
      _ref = key.split('@'), key = _ref[0], attr = _ref[1];
      $el = find($template, key);
      if ($el.prop('tagName') === 'SELECT') {
        return $el.find("option[value=" + value + "]").attr('selected', 'selected');
      } else {
        return $el.attr(attr, value);
      }
    } else {
      $el = find($template, key);
      if ($el.length > 0) {
        if ($el.prop('tagName') === 'INPUT') {
          return $el.attr('value', '' + value);
        } else {
          return $el.html('' + value);
        }
      }
    }
  };

  bindNestedObject = function($template, key, value) {
    var attr, attrValue, _results;
    _results = [];
    for (attr in value) {
      attrValue = value[attr];
      _results.push(bindOrRemove($template, attr, attrValue));
    }
    return _results;
  };

  bindAttributeObject = function($template, key, value) {
    var attr, attrValue, _results;
    $template.html(value.content);
    _results = [];
    for (attr in value) {
      attrValue = value[attr];
      if (attr !== 'content') {
        if (attr === 'class') {
          _results.push($template.attr('class', combineClasses($template.attr('class'), attrValue)));
        } else {
          _results.push($template.attr(attr, attrValue));
        }
      }
    }
    return _results;
  };

}).call(this);

