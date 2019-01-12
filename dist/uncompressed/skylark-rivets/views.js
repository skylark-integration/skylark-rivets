  define(["./rivets"],function(Rivets){
    Rivets.View = (function() {
      var  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    
      function View(els, models, options) {
        var k, option, v, _base, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5;
        this.els = els;
        this.models = models;
        if (options == null) {
          options = {};
        }
        this.update = __bind(this.update, this);
        this.publish = __bind(this.publish, this);
        this.sync = __bind(this.sync, this);
        this.unbind = __bind(this.unbind, this);
        this.bind = __bind(this.bind, this);
        this.select = __bind(this.select, this);
        this.traverse = __bind(this.traverse, this);
        this.build = __bind(this.build, this);
        this.buildBinding = __bind(this.buildBinding, this);
        this.bindingRegExp = __bind(this.bindingRegExp, this);
        this.options = __bind(this.options, this);
        if (!(this.els.jquery || this.els instanceof Array)) {
          this.els = [this.els];
        }
        _ref1 = Rivets.extensions;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          option = _ref1[_i];
          this[option] = {};
          if (options[option]) {
            _ref2 = options[option];
            for (k in _ref2) {
              v = _ref2[k];
              this[option][k] = v;
            }
          }
          _ref3 = Rivets["public"][option];
          for (k in _ref3) {
            v = _ref3[k];
            if ((_base = this[option])[k] == null) {
              _base[k] = v;
            }
          }
        }
        _ref4 = Rivets.options;
        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
          option = _ref4[_j];
          this[option] = (_ref5 = options[option]) != null ? _ref5 : Rivets["public"][option];
        }
        this.build();
      }

      View.prototype.options = function() {
        var option, options, _i, _len, _ref1;
        options = {};
        _ref1 = Rivets.extensions.concat(Rivets.options);
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          option = _ref1[_i];
          options[option] = this[option];
        }
        return options;
      };

      View.prototype.bindingRegExp = function() {
        return new RegExp("^" + this.prefix + "-");
      };

      View.prototype.buildBinding = function(binding, node, type, declaration) {
        var context, ctx, dependencies, keypath, options, pipe, pipes;
        options = {};
        pipes = (function() {
          var _i, _len, _ref1, _results;
          _ref1 = declaration.match(/((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g);
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            pipe = _ref1[_i];
            _results.push(pipe.trim());
          }
          return _results;
        })();
        context = (function() {
          var _i, _len, _ref1, _results;
          _ref1 = pipes.shift().split('<');
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            ctx = _ref1[_i];
            _results.push(ctx.trim());
          }
          return _results;
        })();
        keypath = context.shift();
        options.formatters = pipes;
        if (dependencies = context.shift()) {
          options.dependencies = dependencies.split(/\s+/);
        }
        return this.bindings.push(new Rivets[binding](this, node, type, keypath, options));
      };

      View.prototype.build = function() {
        var el, parse, _i, _len, _ref1;
        this.bindings = [];
        parse = (function(_this) {
          return function(node) {
            var block, childNode, delimiters, n, parser, text, token, tokens, _i, _j, _len, _len1, _ref1;
            if (node.nodeType === 3) {
              parser = Rivets.TextTemplateParser;
              if (delimiters = _this.templateDelimiters) {
                if ((tokens = parser.parse(node.data, delimiters)).length) {
                  if (!(tokens.length === 1 && tokens[0].type === parser.types.text)) {
                    for (_i = 0, _len = tokens.length; _i < _len; _i++) {
                      token = tokens[_i];
                      text = document.createTextNode(token.value);
                      node.parentNode.insertBefore(text, node);
                      if (token.type === 1) {
                        _this.buildBinding('TextBinding', text, null, token.value);
                      }
                    }
                    node.parentNode.removeChild(node);
                  }
                }
              }
            } else if (node.nodeType === 1) {
              block = _this.traverse(node);
            }
            if (!block) {
              _ref1 = (function() {
                var _k, _len1, _ref1, _results;
                _ref1 = node.childNodes;
                _results = [];
                for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
                  n = _ref1[_k];
                  _results.push(n);
                }
                return _results;
              })();
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                childNode = _ref1[_j];
                parse(childNode);
              }
            }
          };
        })(this);
        _ref1 = this.els;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          el = _ref1[_i];
          parse(el);
        }
        this.bindings.sort(function(a, b) {
          var _ref2, _ref3;
          return (((_ref2 = b.binder) != null ? _ref2.priority : void 0) || 0) - (((_ref3 = a.binder) != null ? _ref3.priority : void 0) || 0);
        });
      };

      View.prototype.traverse = function(node) {
        var attribute, attributes, binder, bindingRegExp, block, identifier, regexp, type, value, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
        bindingRegExp = this.bindingRegExp();
        block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
        _ref1 = node.attributes;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          attribute = _ref1[_i];
          if (bindingRegExp.test(attribute.name)) {
            type = attribute.name.replace(bindingRegExp, '');
            if (!(binder = this.binders[type])) {
              _ref2 = this.binders;
              for (identifier in _ref2) {
                value = _ref2[identifier];
                if (identifier !== '*' && identifier.indexOf('*') !== -1) {
                  regexp = new RegExp("^" + (identifier.replace(/\*/g, '.+')) + "$");
                  if (regexp.test(type)) {
                    binder = value;
                  }
                }
              }
            }
            binder || (binder = this.binders['*']);
            if (binder.block) {
              block = true;
              attributes = [attribute];
            }
          }
        }
        _ref3 = attributes || node.attributes;
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          attribute = _ref3[_j];
          if (bindingRegExp.test(attribute.name)) {
            type = attribute.name.replace(bindingRegExp, '');
            this.buildBinding('Binding', node, type, attribute.value);
          }
        }
        if (!block) {
          type = node.nodeName.toLowerCase();
          if (this.components[type] && !node._bound) {
            this.bindings.push(new Rivets.ComponentBinding(this, node, type));
            block = true;
          }
        }
        return block;
      };

      View.prototype.select = function(fn) {
        var binding, _i, _len, _ref1, _results;
        _ref1 = this.bindings;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binding = _ref1[_i];
          if (fn(binding)) {
            _results.push(binding);
          }
        }
        return _results;
      };

      View.prototype.bind = function() {
        var binding, _i, _len, _ref1;
        _ref1 = this.bindings;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binding = _ref1[_i];
          binding.bind();
        }
      };

      View.prototype.unbind = function() {
        var binding, _i, _len, _ref1;
        _ref1 = this.bindings;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binding = _ref1[_i];
          binding.unbind();
        }
      };

      View.prototype.sync = function() {
        var binding, _i, _len, _ref1;
        _ref1 = this.bindings;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binding = _ref1[_i];
          if (typeof binding.sync === "function") {
            binding.sync();
          }
        }
      };

      View.prototype.publish = function() {
        var binding, _i, _len, _ref1;
        _ref1 = this.select(function(b) {
          var _ref1;
          return (_ref1 = b.binder) != null ? _ref1.publishes : void 0;
        });
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binding = _ref1[_i];
          binding.publish();
        }
      };

      View.prototype.update = function(models) {
        var binding, key, model, _i, _len, _ref1;
        if (models == null) {
          models = {};
        }
        for (key in models) {
          model = models[key];
          this.models[key] = model;
        }
        _ref1 = this.bindings;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          binding = _ref1[_i];
          if (typeof binding.update === "function") {
            binding.update(models);
          }
        }
      };

      return View;

    })();

    return {
      View : Rivets.View
    };
  });

