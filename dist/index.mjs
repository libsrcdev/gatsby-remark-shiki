function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
// src/index.ts
import { codeToHtml, createHighlighter } from "shiki";
import { EXIT, visit } from "unist-util-visit";
function index_default(_0, _1) {
    return _async_to_generator(function(param, options) {
        var markdownAST, highlighter, inferLang, highlightCode;
        function findNextHighlightSnippetTask() {
            return _async_to_generator(function() {
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            visit(markdownAST, "code", function(node) {
                                highlightCode = function highlightCode() {
                                    return _async_to_generator(function() {
                                        var lang, inferredLang, wasInferred, transformers;
                                        return _ts_generator(this, function(_state) {
                                            switch(_state.label){
                                                case 0:
                                                    node.type = "html";
                                                    node.children = [];
                                                    lang = node.lang;
                                                    wasInferred = false;
                                                    if (!!lang) return [
                                                        3,
                                                        2
                                                    ];
                                                    return [
                                                        4,
                                                        function() {
                                                            return _async_to_generator(function() {
                                                                return _ts_generator(this, function(_state) {
                                                                    switch(_state.label){
                                                                        case 0:
                                                                            if (!(typeof inferLang === "function")) return [
                                                                                3,
                                                                                2
                                                                            ];
                                                                            return [
                                                                                4,
                                                                                inferLang(node.value)
                                                                            ];
                                                                        case 1:
                                                                            return [
                                                                                2,
                                                                                _state.sent()
                                                                            ];
                                                                        case 2:
                                                                            if (typeof inferLang === "string") {
                                                                                return [
                                                                                    2,
                                                                                    inferLang
                                                                                ];
                                                                            }
                                                                            return [
                                                                                2,
                                                                                void 0
                                                                            ];
                                                                    }
                                                                });
                                                            })();
                                                        }()
                                                    ];
                                                case 1:
                                                    inferredLang = _state.sent();
                                                    if (inferredLang) {
                                                        lang = inferredLang;
                                                        wasInferred = true;
                                                    } else {
                                                        node.value = '<pre class="shiki-unknown"><code>'.concat(node.value, "</code></pre>");
                                                        return [
                                                            2
                                                        ];
                                                    }
                                                    _state.label = 2;
                                                case 2:
                                                    transformers = _to_consumable_array(options.codeToHtmlOptions.transformers || []);
                                                    if (wasInferred) {
                                                        transformers.push({
                                                            pre: function pre(node2) {
                                                                this.addClassToHast(node2, "shiki-lang-was-inferred");
                                                                node2.properties["shiki-lang-was-inferred"] = "1";
                                                            }
                                                        });
                                                    }
                                                    if (!highlighter) return [
                                                        3,
                                                        3
                                                    ];
                                                    node.value = highlighter === null || highlighter === void 0 ? void 0 : highlighter.codeToHtml(node.value, _object_spread_props(_object_spread({}, options.codeToHtmlOptions), {
                                                        lang: lang,
                                                        transformers: transformers
                                                    }));
                                                    return [
                                                        3,
                                                        5
                                                    ];
                                                case 3:
                                                    return [
                                                        4,
                                                        codeToHtml(node.value, _object_spread_props(_object_spread({}, options.codeToHtmlOptions), {
                                                            lang: lang,
                                                            transformers: transformers
                                                        }))
                                                    ];
                                                case 4:
                                                    node.value = _state.sent();
                                                    _state.label = 5;
                                                case 5:
                                                    return [
                                                        2
                                                    ];
                                            }
                                        });
                                    })();
                                };
                                return [
                                    EXIT
                                ];
                            });
                            if (!highlightCode) return [
                                3,
                                3
                            ];
                            return [
                                4,
                                highlightCode()
                            ];
                        case 1:
                            _state.sent();
                            highlightCode = null;
                            return [
                                4,
                                findNextHighlightSnippetTask()
                            ];
                        case 2:
                            _state.sent();
                            _state.label = 3;
                        case 3:
                            return [
                                2
                            ];
                    }
                });
            })();
        }
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    markdownAST = param.markdownAST;
                    highlighter = void 0;
                    inferLang = options.inferLang;
                    if (!options.highlighterOptions) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        createHighlighter(options.highlighterOptions)
                    ];
                case 1:
                    highlighter = _state.sent();
                    _state.label = 2;
                case 2:
                    highlightCode = null;
                    return [
                        4,
                        findNextHighlightSnippetTask()
                    ];
                case 3:
                    _state.sent();
                    return [
                        2,
                        markdownAST
                    ];
            }
        });
    }).apply(this, arguments);
}
export { index_default as default };
