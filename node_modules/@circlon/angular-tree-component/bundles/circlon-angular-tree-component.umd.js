(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('mobx')) :
    typeof define === 'function' && define.amd ? define('@circlon/angular-tree-component', ['exports', '@angular/core', '@angular/common', 'mobx'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.circlon = global.circlon || {}, global.circlon['angular-tree-component'] = {}), global.ng.core, global.ng.common, global.mobx));
}(this, (function (exports, i0, common, mobx) { 'use strict';

    var TreeMobxAutorunDirective = /** @class */ (function () {
        function TreeMobxAutorunDirective(templateRef, viewContainer) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.templateBindings = {};
        }
        TreeMobxAutorunDirective.prototype.ngOnInit = function () {
            this.view = this.viewContainer.createEmbeddedView(this.templateRef);
            if (this.dispose) {
                this.dispose();
            }
            if (this.shouldDetach()) {
                this.view.detach();
            }
            this.autoDetect(this.view);
        };
        TreeMobxAutorunDirective.prototype.shouldDetach = function () {
            return this.treeMobxAutorun && this.treeMobxAutorun.detach;
        };
        TreeMobxAutorunDirective.prototype.autoDetect = function (view) {
            this.dispose = mobx.autorun(function () { return view.detectChanges(); });
        };
        TreeMobxAutorunDirective.prototype.ngOnDestroy = function () {
            if (this.dispose) {
                this.dispose();
            }
        };
        return TreeMobxAutorunDirective;
    }());
    TreeMobxAutorunDirective.decorators = [
        { type: i0.Directive, args: [{ selector: '[treeMobxAutorun]' },] }
    ];
    /** @nocollapse */
    TreeMobxAutorunDirective.ctorParameters = function () { return [
        { type: i0.TemplateRef },
        { type: i0.ViewContainerRef }
    ]; };
    TreeMobxAutorunDirective.propDecorators = {
        treeMobxAutorun: [{ type: i0.Input }]
    };

    var KEYS = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ENTER: 13,
        SPACE: 32,
        CONTEXT_MENU: 32
    };

    var _36;
    var ɵ0 = function (tree, node, $event) { return node && node.toggleActivated(); }, ɵ1 = function (tree, node, $event) { return node && node.toggleActivated(true); }, ɵ2 = function (tree, node, $event) { return node && node.toggleSelected(); }, ɵ3 = function (tree, node, $event) { return node.setIsActive(true); }, ɵ4 = function (tree, node, $event) { return node.setIsActive(false); }, ɵ5 = function (tree, node, $event) { return node.setIsSelected(true); }, ɵ6 = function (tree, node, $event) { return node.setIsSelected(false); }, ɵ7 = function (tree, node, $event) { return node.focus(); }, ɵ8 = function (tree, node, $event) { return node.hasChildren && node.toggleExpanded(); }, ɵ9 = function (tree, node, $event) { return node.expand(); }, ɵ10 = function (tree, node, $event) { return node.collapse(); }, ɵ11 = function (tree, node, $event) { return tree.focusDrillDown(); }, ɵ12 = function (tree, node, $event) { return tree.focusDrillUp(); }, ɵ13 = function (tree, node, $event) { return tree.focusNextNode(); }, ɵ14 = function (tree, node, $event) { return tree.focusPreviousNode(); }, ɵ15 = function (tree, node, $event, _36) {
        var from = _36.from, to = _36.to;
        // default action assumes from = node, to = {parent, index}
        if ($event.ctrlKey) {
            tree.copyNode(from, to);
        }
        else {
            tree.moveNode(from, to);
        }
    };
    var TREE_ACTIONS = {
        TOGGLE_ACTIVE: ɵ0,
        TOGGLE_ACTIVE_MULTI: ɵ1,
        TOGGLE_SELECTED: ɵ2,
        ACTIVATE: ɵ3,
        DEACTIVATE: ɵ4,
        SELECT: ɵ5,
        DESELECT: ɵ6,
        FOCUS: ɵ7,
        TOGGLE_EXPANDED: ɵ8,
        EXPAND: ɵ9,
        COLLAPSE: ɵ10,
        DRILL_DOWN: ɵ11,
        DRILL_UP: ɵ12,
        NEXT_NODE: ɵ13,
        PREVIOUS_NODE: ɵ14,
        MOVE_NODE: ɵ15
    };
    var defaultActionMapping = {
        mouse: {
            click: TREE_ACTIONS.TOGGLE_ACTIVE,
            dblClick: null,
            contextMenu: null,
            expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
            checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
            drop: TREE_ACTIONS.MOVE_NODE
        },
        keys: (_36 = {},
            _36[KEYS.RIGHT] = TREE_ACTIONS.DRILL_DOWN,
            _36[KEYS.LEFT] = TREE_ACTIONS.DRILL_UP,
            _36[KEYS.DOWN] = TREE_ACTIONS.NEXT_NODE,
            _36[KEYS.UP] = TREE_ACTIONS.PREVIOUS_NODE,
            _36[KEYS.SPACE] = TREE_ACTIONS.TOGGLE_ACTIVE,
            _36[KEYS.ENTER] = TREE_ACTIONS.TOGGLE_ACTIVE,
            _36)
    };
    var TreeOptions = /** @class */ (function () {
        function TreeOptions(options) {
            var _36;
            if (options === void 0) { options = {}; }
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35;
            this.options = options;
            this.actionMapping = {
                mouse: {
                    click: (_d = (_c = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.actionMapping) === null || _b === void 0 ? void 0 : _b.mouse) === null || _c === void 0 ? void 0 : _c.click) !== null && _d !== void 0 ? _d : defaultActionMapping.mouse.click,
                    dblClick: (_h = (_g = (_f = (_e = this.options) === null || _e === void 0 ? void 0 : _e.actionMapping) === null || _f === void 0 ? void 0 : _f.mouse) === null || _g === void 0 ? void 0 : _g.dblClick) !== null && _h !== void 0 ? _h : defaultActionMapping.mouse.dblClick,
                    contextMenu: (_m = (_l = (_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.actionMapping) === null || _k === void 0 ? void 0 : _k.mouse) === null || _l === void 0 ? void 0 : _l.contextMenu) !== null && _m !== void 0 ? _m : defaultActionMapping.mouse.contextMenu,
                    expanderClick: (_r = (_q = (_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.actionMapping) === null || _p === void 0 ? void 0 : _p.mouse) === null || _q === void 0 ? void 0 : _q.expanderClick) !== null && _r !== void 0 ? _r : defaultActionMapping.mouse.expanderClick,
                    checkboxClick: (_v = (_u = (_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.actionMapping) === null || _t === void 0 ? void 0 : _t.mouse) === null || _u === void 0 ? void 0 : _u.checkboxClick) !== null && _v !== void 0 ? _v : defaultActionMapping.mouse.checkboxClick,
                    drop: (_z = (_y = (_x = (_w = this.options) === null || _w === void 0 ? void 0 : _w.actionMapping) === null || _x === void 0 ? void 0 : _x.mouse) === null || _y === void 0 ? void 0 : _y.drop) !== null && _z !== void 0 ? _z : defaultActionMapping.mouse.drop,
                    dragStart: (_3 = (_2 = (_1 = (_0 = this.options) === null || _0 === void 0 ? void 0 : _0.actionMapping) === null || _1 === void 0 ? void 0 : _1.mouse) === null || _2 === void 0 ? void 0 : _2.dragStart) !== null && _3 !== void 0 ? _3 : undefined,
                    drag: (_7 = (_6 = (_5 = (_4 = this.options) === null || _4 === void 0 ? void 0 : _4.actionMapping) === null || _5 === void 0 ? void 0 : _5.mouse) === null || _6 === void 0 ? void 0 : _6.drag) !== null && _7 !== void 0 ? _7 : undefined,
                    dragEnd: (_11 = (_10 = (_9 = (_8 = this.options) === null || _8 === void 0 ? void 0 : _8.actionMapping) === null || _9 === void 0 ? void 0 : _9.mouse) === null || _10 === void 0 ? void 0 : _10.dragEnd) !== null && _11 !== void 0 ? _11 : undefined,
                    dragOver: (_15 = (_14 = (_13 = (_12 = this.options) === null || _12 === void 0 ? void 0 : _12.actionMapping) === null || _13 === void 0 ? void 0 : _13.mouse) === null || _14 === void 0 ? void 0 : _14.dragOver) !== null && _15 !== void 0 ? _15 : undefined,
                    dragLeave: (_19 = (_18 = (_17 = (_16 = this.options) === null || _16 === void 0 ? void 0 : _16.actionMapping) === null || _17 === void 0 ? void 0 : _17.mouse) === null || _18 === void 0 ? void 0 : _18.dragLeave) !== null && _19 !== void 0 ? _19 : undefined,
                    dragEnter: (_23 = (_22 = (_21 = (_20 = this.options) === null || _20 === void 0 ? void 0 : _20.actionMapping) === null || _21 === void 0 ? void 0 : _21.mouse) === null || _22 === void 0 ? void 0 : _22.dragEnter) !== null && _23 !== void 0 ? _23 : undefined,
                    mouseOver: (_27 = (_26 = (_25 = (_24 = this.options) === null || _24 === void 0 ? void 0 : _24.actionMapping) === null || _25 === void 0 ? void 0 : _25.mouse) === null || _26 === void 0 ? void 0 : _26.mouseOver) !== null && _27 !== void 0 ? _27 : undefined,
                    mouseOut: (_31 = (_30 = (_29 = (_28 = this.options) === null || _28 === void 0 ? void 0 : _28.actionMapping) === null || _29 === void 0 ? void 0 : _29.mouse) === null || _30 === void 0 ? void 0 : _30.mouseOut) !== null && _31 !== void 0 ? _31 : undefined,
                },
                keys: (_36 = {},
                    _36[KEYS.RIGHT] = TREE_ACTIONS.DRILL_DOWN,
                    _36[KEYS.LEFT] = TREE_ACTIONS.DRILL_UP,
                    _36[KEYS.DOWN] = TREE_ACTIONS.NEXT_NODE,
                    _36[KEYS.UP] = TREE_ACTIONS.PREVIOUS_NODE,
                    _36[KEYS.SPACE] = TREE_ACTIONS.TOGGLE_ACTIVE,
                    _36[KEYS.ENTER] = TREE_ACTIONS.TOGGLE_ACTIVE,
                    _36)
            };
            if ((_33 = (_32 = this.options) === null || _32 === void 0 ? void 0 : _32.actionMapping) === null || _33 === void 0 ? void 0 : _33.keys) {
                this.actionMapping.keys = Object.assign(Object.assign({}, this.actionMapping.keys), this.options.actionMapping.keys);
            }
            if (options.rtl) {
                this.actionMapping.keys[KEYS.RIGHT] = ((_34 = options.actionMapping) === null || _34 === void 0 ? void 0 : _34.keys[KEYS.RIGHT]) || TREE_ACTIONS.DRILL_UP;
                this.actionMapping.keys[KEYS.LEFT] = ((_35 = options.actionMapping) === null || _35 === void 0 ? void 0 : _35.keys[KEYS.LEFT]) || TREE_ACTIONS.DRILL_DOWN;
            }
        }
        Object.defineProperty(TreeOptions.prototype, "hasChildrenField", {
            get: function () { return this.options.hasChildrenField || 'hasChildren'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "childrenField", {
            get: function () { return this.options.childrenField || 'children'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "displayField", {
            get: function () { return this.options.displayField || 'name'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "idField", {
            get: function () { return this.options.idField || 'id'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "isExpandedField", {
            get: function () { return this.options.isExpandedField || 'isExpanded'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "getChildren", {
            get: function () { return this.options.getChildren; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "levelPadding", {
            get: function () { return this.options.levelPadding || 0; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "useVirtualScroll", {
            get: function () { return this.options.useVirtualScroll; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "animateExpand", {
            get: function () { return this.options.animateExpand; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "animateSpeed", {
            get: function () { return this.options.animateSpeed || 1; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "animateAcceleration", {
            get: function () { return this.options.animateAcceleration || 1.2; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "scrollOnActivate", {
            get: function () { return this.options.scrollOnActivate === undefined ? true : this.options.scrollOnActivate; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "rtl", {
            get: function () { return !!this.options.rtl; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "rootId", {
            get: function () { return this.options.rootId; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "useCheckbox", {
            get: function () { return this.options.useCheckbox; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "useTriState", {
            get: function () { return this.options.useTriState === undefined ? true : this.options.useTriState; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "scrollContainer", {
            get: function () { return this.options.scrollContainer; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeOptions.prototype, "allowDragoverStyling", {
            get: function () { return this.options.allowDragoverStyling === undefined ? true : this.options.allowDragoverStyling; },
            enumerable: false,
            configurable: true
        });
        TreeOptions.prototype.getNodeClone = function (node) {
            if (this.options.getNodeClone) {
                return this.options.getNodeClone(node);
            }
            // remove id from clone
            // keeping ie11 compatibility
            var nodeClone = Object.assign({}, node.data);
            if (nodeClone.id) {
                delete nodeClone.id;
            }
            return nodeClone;
        };
        TreeOptions.prototype.allowDrop = function (element, to, $event) {
            if (this.options.allowDrop instanceof Function) {
                return this.options.allowDrop(element, to, $event);
            }
            else {
                return this.options.allowDrop === undefined ? true : this.options.allowDrop;
            }
        };
        TreeOptions.prototype.allowDrag = function (node) {
            if (this.options.allowDrag instanceof Function) {
                return this.options.allowDrag(node);
            }
            else {
                return this.options.allowDrag;
            }
        };
        TreeOptions.prototype.nodeClass = function (node) {
            return this.options.nodeClass ? this.options.nodeClass(node) : '';
        };
        TreeOptions.prototype.nodeHeight = function (node) {
            if (node.data.virtual) {
                return 0;
            }
            var nodeHeight = this.options.nodeHeight || 22;
            if (typeof nodeHeight === 'function') {
                nodeHeight = nodeHeight(node);
            }
            // account for drop slots:
            return nodeHeight + (node.index === 0 ? 2 : 1) * this.dropSlotHeight;
        };
        Object.defineProperty(TreeOptions.prototype, "dropSlotHeight", {
            get: function () {
                return typeof this.options.dropSlotHeight === 'number' ? this.options.dropSlotHeight : 2;
            },
            enumerable: false,
            configurable: true
        });
        return TreeOptions;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
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
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
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
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var TREE_EVENTS = {
        toggleExpanded: 'toggleExpanded',
        activate: 'activate',
        deactivate: 'deactivate',
        nodeActivate: 'nodeActivate',
        nodeDeactivate: 'nodeDeactivate',
        select: 'select',
        deselect: 'deselect',
        focus: 'focus',
        blur: 'blur',
        initialized: 'initialized',
        updateData: 'updateData',
        moveNode: 'moveNode',
        copyNode: 'copyNode',
        event: 'event',
        loadNodeChildren: 'loadNodeChildren',
        changeFilter: 'changeFilter',
        stateChange: 'stateChange'
    };

    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var TreeNode = /** @class */ (function () {
        function TreeNode(data, parent, treeModel, index) {
            var _this = this;
            this.data = data;
            this.parent = parent;
            this.treeModel = treeModel;
            this.position = 0;
            this.allowDrop = function (element, $event) {
                return _this.options.allowDrop(element, { parent: _this, index: 0 }, $event);
            };
            this.allowDragoverStyling = function () {
                return _this.options.allowDragoverStyling;
            };
            if (this.id === undefined || this.id === null) {
                this.id = uuid();
            } // Make sure there's a unique id without overriding existing ids to work with immutable data structures
            this.index = index;
            if (this.getField('children')) {
                this._initChildren();
            }
            this.autoLoadChildren();
        }
        Object.defineProperty(TreeNode.prototype, "isHidden", {
            get: function () { return this.treeModel.isHidden(this); },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeNode.prototype, "isExpanded", {
            get: function () { return this.treeModel.isExpanded(this); },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeNode.prototype, "isActive", {
            get: function () { return this.treeModel.isActive(this); },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeNode.prototype, "isFocused", {
            get: function () { return this.treeModel.isNodeFocused(this); },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeNode.prototype, "isSelected", {
            get: function () {
                if (this.isSelectable()) {
                    return this.treeModel.isSelected(this);
                }
                else {
                    return this.children.some(function (node) { return node.isSelected; });
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeNode.prototype, "isAllSelected", {
            get: function () {
                if (this.isSelectable()) {
                    return this.treeModel.isSelected(this);
                }
                else {
                    return this.children.every(function (node) { return node.isAllSelected; });
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeNode.prototype, "isPartiallySelected", {
            get: function () {
                return this.isSelected && !this.isAllSelected;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "level", {
            get: function () {
                return this.parent ? this.parent.level + 1 : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "path", {
            get: function () {
                return this.parent ? __spread(this.parent.path, [this.id]) : [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "elementRef", {
            get: function () {
                throw "Element Ref is no longer supported since introducing virtual scroll\n\n      You may use a template to obtain a reference to the element";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "originalNode", {
            get: function () { return this._originalNode; },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeNode.prototype, "hasChildren", {
            // helper get functions:
            get: function () {
                return !!(this.getField('hasChildren') || (this.children && this.children.length > 0));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "isCollapsed", {
            get: function () { return !this.isExpanded; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "isLeaf", {
            get: function () { return !this.hasChildren; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "isRoot", {
            get: function () { return this.parent.data.virtual; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "realParent", {
            get: function () { return this.isRoot ? null : this.parent; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "options", {
            // proxy functions:
            get: function () { return this.treeModel.options; },
            enumerable: false,
            configurable: true
        });
        TreeNode.prototype.fireEvent = function (event) { this.treeModel.fireEvent(event); };
        Object.defineProperty(TreeNode.prototype, "displayField", {
            // field accessors:
            get: function () {
                return this.getField('display');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNode.prototype, "id", {
            get: function () {
                return this.getField('id');
            },
            set: function (value) {
                this.setField('id', value);
            },
            enumerable: false,
            configurable: true
        });
        TreeNode.prototype.getField = function (key) {
            return this.data[this.options[key + "Field"]];
        };
        TreeNode.prototype.setField = function (key, value) {
            this.data[this.options[key + "Field"]] = value;
        };
        // traversing:
        TreeNode.prototype._findAdjacentSibling = function (steps, skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var siblings = this._getParentsChildren(skipHidden);
            var index = siblings.indexOf(this);
            return siblings.length > index + steps ? siblings[index + steps] : null;
        };
        TreeNode.prototype.findNextSibling = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            return this._findAdjacentSibling(+1, skipHidden);
        };
        TreeNode.prototype.findPreviousSibling = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            return this._findAdjacentSibling(-1, skipHidden);
        };
        TreeNode.prototype.getVisibleChildren = function () {
            return this.visibleChildren;
        };
        Object.defineProperty(TreeNode.prototype, "visibleChildren", {
            get: function () {
                return (this.children || []).filter(function (node) { return !node.isHidden; });
            },
            enumerable: false,
            configurable: true
        });
        TreeNode.prototype.getFirstChild = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var children = skipHidden ? this.visibleChildren : this.children;
            return children != null && children.length ? children[0] : null;
        };
        TreeNode.prototype.getLastChild = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var children = skipHidden ? this.visibleChildren : this.children;
            return children != null && children.length ? children[children.length - 1] : null;
        };
        TreeNode.prototype.findNextNode = function (goInside, skipHidden) {
            if (goInside === void 0) { goInside = true; }
            if (skipHidden === void 0) { skipHidden = false; }
            return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
                this.findNextSibling(skipHidden) ||
                this.parent && this.parent.findNextNode(false, skipHidden);
        };
        TreeNode.prototype.findPreviousNode = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var previousSibling = this.findPreviousSibling(skipHidden);
            if (!previousSibling) {
                return this.realParent;
            }
            return previousSibling._getLastOpenDescendant(skipHidden);
        };
        TreeNode.prototype._getLastOpenDescendant = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var lastChild = this.getLastChild(skipHidden);
            return (this.isCollapsed || !lastChild)
                ? this
                : lastChild._getLastOpenDescendant(skipHidden);
        };
        TreeNode.prototype._getParentsChildren = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var children = this.parent &&
                (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
            return children || [];
        };
        TreeNode.prototype.getIndexInParent = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            return this._getParentsChildren(skipHidden).indexOf(this);
        };
        TreeNode.prototype.isDescendantOf = function (node) {
            if (this === node)
                return true;
            else
                return this.parent && this.parent.isDescendantOf(node);
        };
        TreeNode.prototype.getNodePadding = function () {
            return this.options.levelPadding * (this.level - 1) + 'px';
        };
        TreeNode.prototype.getClass = function () {
            return [this.options.nodeClass(this), "tree-node-level-" + this.level].join(' ');
        };
        TreeNode.prototype.onDrop = function ($event) {
            this.mouseAction('drop', $event.event, {
                from: $event.element,
                to: { parent: this, index: 0, dropOnNode: true }
            });
        };
        TreeNode.prototype.allowDrag = function () {
            return this.options.allowDrag(this);
        };
        // helper methods:
        TreeNode.prototype.loadNodeChildren = function () {
            var _this = this;
            if (!this.options.getChildren) {
                return Promise.resolve(); // Not getChildren method - for using redux
            }
            return Promise.resolve(this.options.getChildren(this))
                .then(function (children) {
                if (children) {
                    _this.setField('children', children);
                    _this._initChildren();
                    if (_this.options.useTriState && _this.treeModel.isSelected(_this)) {
                        _this.setIsSelected(true);
                    }
                    _this.children.forEach(function (child) {
                        if (child.getField('isExpanded') && child.hasChildren) {
                            child.expand();
                        }
                    });
                }
            }).then(function () {
                _this.fireEvent({
                    eventName: TREE_EVENTS.loadNodeChildren,
                    node: _this
                });
            });
        };
        TreeNode.prototype.expand = function () {
            if (!this.isExpanded) {
                this.toggleExpanded();
            }
            return this;
        };
        TreeNode.prototype.collapse = function () {
            if (this.isExpanded) {
                this.toggleExpanded();
            }
            return this;
        };
        TreeNode.prototype.doForAll = function (fn) {
            var _this = this;
            Promise.resolve(fn(this)).then(function () {
                if (_this.children) {
                    _this.children.forEach(function (child) { return child.doForAll(fn); });
                }
            });
        };
        TreeNode.prototype.expandAll = function () {
            this.doForAll(function (node) { return node.expand(); });
        };
        TreeNode.prototype.collapseAll = function () {
            this.doForAll(function (node) { return node.collapse(); });
        };
        TreeNode.prototype.ensureVisible = function () {
            if (this.realParent) {
                this.realParent.expand();
                this.realParent.ensureVisible();
            }
            return this;
        };
        TreeNode.prototype.toggleExpanded = function () {
            this.setIsExpanded(!this.isExpanded);
            return this;
        };
        TreeNode.prototype.setIsExpanded = function (value) {
            if (this.hasChildren) {
                this.treeModel.setExpandedNode(this, value);
            }
            return this;
        };
        ;
        TreeNode.prototype.autoLoadChildren = function () {
            var _this = this;
            this.handler =
                mobx.reaction(function () { return _this.isExpanded; }, function (isExpanded) {
                    if (!_this.children && _this.hasChildren && isExpanded) {
                        _this.loadNodeChildren();
                    }
                }, { fireImmediately: true });
        };
        TreeNode.prototype.dispose = function () {
            if (this.children) {
                this.children.forEach(function (child) { return child.dispose(); });
            }
            if (this.handler) {
                this.handler();
            }
            this.parent = null;
            this.children = null;
        };
        TreeNode.prototype.setIsActive = function (value, multi) {
            if (multi === void 0) { multi = false; }
            this.treeModel.setActiveNode(this, value, multi);
            if (value) {
                this.focus(this.options.scrollOnActivate);
            }
            return this;
        };
        TreeNode.prototype.isSelectable = function () {
            return this.isLeaf || !this.children || !this.options.useTriState;
        };
        TreeNode.prototype.setIsSelected = function (value) {
            if (this.isSelectable()) {
                this.treeModel.setSelectedNode(this, value);
            }
            else {
                this.visibleChildren.forEach(function (child) { return child.setIsSelected(value); });
            }
            return this;
        };
        TreeNode.prototype.toggleSelected = function () {
            this.setIsSelected(!this.isSelected);
            return this;
        };
        TreeNode.prototype.toggleActivated = function (multi) {
            if (multi === void 0) { multi = false; }
            this.setIsActive(!this.isActive, multi);
            return this;
        };
        TreeNode.prototype.setActiveAndVisible = function (multi) {
            if (multi === void 0) { multi = false; }
            this.setIsActive(true, multi)
                .ensureVisible();
            setTimeout(this.scrollIntoView.bind(this));
            return this;
        };
        TreeNode.prototype.scrollIntoView = function (force) {
            if (force === void 0) { force = false; }
            this.treeModel.virtualScroll.scrollIntoView(this, force);
        };
        TreeNode.prototype.focus = function (scroll) {
            if (scroll === void 0) { scroll = true; }
            var previousNode = this.treeModel.getFocusedNode();
            this.treeModel.setFocusedNode(this);
            if (scroll) {
                this.scrollIntoView();
            }
            if (previousNode) {
                this.fireEvent({ eventName: TREE_EVENTS.blur, node: previousNode });
            }
            this.fireEvent({ eventName: TREE_EVENTS.focus, node: this });
            return this;
        };
        TreeNode.prototype.blur = function () {
            var previousNode = this.treeModel.getFocusedNode();
            this.treeModel.setFocusedNode(null);
            if (previousNode) {
                this.fireEvent({ eventName: TREE_EVENTS.blur, node: this });
            }
            return this;
        };
        TreeNode.prototype.setIsHidden = function (value) {
            this.treeModel.setIsHidden(this, value);
        };
        TreeNode.prototype.hide = function () {
            this.setIsHidden(true);
        };
        TreeNode.prototype.show = function () {
            this.setIsHidden(false);
        };
        TreeNode.prototype.mouseAction = function (actionName, $event, data) {
            if (data === void 0) { data = null; }
            this.treeModel.setFocus(true);
            var actionMapping = this.options.actionMapping.mouse;
            var mouseAction = actionMapping[actionName];
            if (mouseAction) {
                mouseAction(this.treeModel, this, $event, data);
            }
        };
        TreeNode.prototype.getSelfHeight = function () {
            return this.options.nodeHeight(this);
        };
        TreeNode.prototype._initChildren = function () {
            var _this = this;
            this.children = this.getField('children')
                .map(function (c, index) { return new TreeNode(c, _this, _this.treeModel, index); });
        };
        return TreeNode;
    }());
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "isHidden", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "isExpanded", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "isActive", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "isFocused", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "isSelected", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "isAllSelected", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "isPartiallySelected", null);
    __decorate$1([
        mobx.observable,
        __metadata$1("design:type", Array)
    ], TreeNode.prototype, "children", void 0);
    __decorate$1([
        mobx.observable,
        __metadata$1("design:type", Number)
    ], TreeNode.prototype, "index", void 0);
    __decorate$1([
        mobx.observable,
        __metadata$1("design:type", Object)
    ], TreeNode.prototype, "position", void 0);
    __decorate$1([
        mobx.observable,
        __metadata$1("design:type", Number)
    ], TreeNode.prototype, "height", void 0);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Number),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "level", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Array),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "path", null);
    __decorate$1([
        mobx.computed,
        __metadata$1("design:type", Object),
        __metadata$1("design:paramtypes", [])
    ], TreeNode.prototype, "visibleChildren", null);
    __decorate$1([
        mobx.action,
        __metadata$1("design:type", Function),
        __metadata$1("design:paramtypes", [Object]),
        __metadata$1("design:returntype", void 0)
    ], TreeNode.prototype, "setIsSelected", null);
    __decorate$1([
        mobx.action,
        __metadata$1("design:type", Function),
        __metadata$1("design:paramtypes", []),
        __metadata$1("design:returntype", void 0)
    ], TreeNode.prototype, "_initChildren", null);
    function uuid() {
        return Math.floor(Math.random() * 10000000000000);
    }

    var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var TreeModel = /** @class */ (function () {
        function TreeModel() {
            this.options = new TreeOptions();
            this.eventNames = Object.keys(TREE_EVENTS);
            this.expandedNodeIds = {};
            this.selectedLeafNodeIds = {};
            this.activeNodeIds = {};
            this.hiddenNodeIds = {};
            this.focusedNodeId = null;
            this.firstUpdate = true;
            this.subscriptions = [];
        }
        // events
        TreeModel.prototype.fireEvent = function (event) {
            event.treeModel = this;
            this.events[event.eventName].emit(event);
            this.events.event.emit(event);
        };
        TreeModel.prototype.subscribe = function (eventName, fn) {
            var subscription = this.events[eventName].subscribe(fn);
            this.subscriptions.push(subscription);
        };
        // getters
        TreeModel.prototype.getFocusedNode = function () {
            return this.focusedNode;
        };
        TreeModel.prototype.getActiveNode = function () {
            return this.activeNodes[0];
        };
        TreeModel.prototype.getActiveNodes = function () {
            return this.activeNodes;
        };
        TreeModel.prototype.getVisibleRoots = function () {
            return this.virtualRoot.visibleChildren;
        };
        TreeModel.prototype.getFirstRoot = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var root = skipHidden ? this.getVisibleRoots() : this.roots;
            return root != null && root.length ? root[0] : null;
        };
        TreeModel.prototype.getLastRoot = function (skipHidden) {
            if (skipHidden === void 0) { skipHidden = false; }
            var root = skipHidden ? this.getVisibleRoots() : this.roots;
            return root != null && root.length ? root[root.length - 1] : null;
        };
        Object.defineProperty(TreeModel.prototype, "isFocused", {
            get: function () {
                return TreeModel.focusedTree === this;
            },
            enumerable: false,
            configurable: true
        });
        TreeModel.prototype.isNodeFocused = function (node) {
            return this.focusedNode === node;
        };
        TreeModel.prototype.isEmptyTree = function () {
            return this.roots && this.roots.length === 0;
        };
        Object.defineProperty(TreeModel.prototype, "focusedNode", {
            get: function () {
                return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeModel.prototype, "expandedNodes", {
            get: function () {
                var _this = this;
                var nodes = Object.keys(this.expandedNodeIds)
                    .filter(function (id) { return _this.expandedNodeIds[id]; })
                    .map(function (id) { return _this.getNodeById(id); });
                return nodes.filter(Boolean);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeModel.prototype, "activeNodes", {
            get: function () {
                var _this = this;
                var nodes = Object.keys(this.activeNodeIds)
                    .filter(function (id) { return _this.activeNodeIds[id]; })
                    .map(function (id) { return _this.getNodeById(id); });
                return nodes.filter(Boolean);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeModel.prototype, "hiddenNodes", {
            get: function () {
                var _this = this;
                var nodes = Object.keys(this.hiddenNodeIds)
                    .filter(function (id) { return _this.hiddenNodeIds[id]; })
                    .map(function (id) { return _this.getNodeById(id); });
                return nodes.filter(Boolean);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeModel.prototype, "selectedLeafNodes", {
            get: function () {
                var _this = this;
                var nodes = Object.keys(this.selectedLeafNodeIds)
                    .filter(function (id) { return _this.selectedLeafNodeIds[id]; })
                    .map(function (id) { return _this.getNodeById(id); });
                return nodes.filter(Boolean);
            },
            enumerable: false,
            configurable: true
        });
        // locating nodes
        TreeModel.prototype.getNodeByPath = function (path, startNode) {
            if (startNode === void 0) { startNode = null; }
            if (!path)
                return null;
            startNode = startNode || this.virtualRoot;
            if (path.length === 0)
                return startNode;
            if (!startNode.children)
                return null;
            var childId = path.shift();
            var childNode = startNode.children.find(function (c) { return c.id === childId; });
            if (!childNode)
                return null;
            return this.getNodeByPath(path, childNode);
        };
        TreeModel.prototype.getNodeById = function (id) {
            var idStr = id.toString();
            return this.getNodeBy(function (node) { return node.id.toString() === idStr; });
        };
        TreeModel.prototype.getNodeBy = function (predicate, startNode) {
            var e_1, _a;
            if (startNode === void 0) { startNode = null; }
            startNode = startNode || this.virtualRoot;
            if (!startNode.children)
                return null;
            var found = startNode.children.find(predicate);
            if (found) { // found in children
                return found;
            }
            else { // look in children's children
                try {
                    for (var _b = __values(startNode.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        var foundInChildren = this.getNodeBy(predicate, child);
                        if (foundInChildren)
                            return foundInChildren;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        TreeModel.prototype.isExpanded = function (node) {
            return this.expandedNodeIds[node.id];
        };
        TreeModel.prototype.isHidden = function (node) {
            return this.hiddenNodeIds[node.id];
        };
        TreeModel.prototype.isActive = function (node) {
            return this.activeNodeIds[node.id];
        };
        TreeModel.prototype.isSelected = function (node) {
            return this.selectedLeafNodeIds[node.id];
        };
        TreeModel.prototype.ngOnDestroy = function () {
            this.dispose();
            this.unsubscribeAll();
        };
        TreeModel.prototype.dispose = function () {
            // Dispose reactions of the replaced nodes
            if (this.virtualRoot) {
                this.virtualRoot.dispose();
            }
        };
        TreeModel.prototype.unsubscribeAll = function () {
            this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
            this.subscriptions = [];
        };
        // actions
        TreeModel.prototype.setData = function (_a) {
            var nodes = _a.nodes, _b = _a.options, options = _b === void 0 ? null : _b, _c = _a.events, events = _c === void 0 ? null : _c;
            if (options) {
                this.options = new TreeOptions(options);
            }
            if (events) {
                this.events = events;
            }
            if (nodes) {
                this.nodes = nodes;
            }
            this.update();
        };
        TreeModel.prototype.update = function () {
            var _a;
            // Rebuild tree:
            var virtualRootConfig = (_a = {
                    id: this.options.rootId,
                    virtual: true
                },
                _a[this.options.childrenField] = this.nodes,
                _a);
            this.dispose();
            this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);
            this.roots = this.virtualRoot.children;
            // Fire event:
            if (this.firstUpdate) {
                if (this.roots) {
                    this.firstUpdate = false;
                    this._calculateExpandedNodes();
                }
            }
            else {
                this.fireEvent({ eventName: TREE_EVENTS.updateData });
            }
        };
        TreeModel.prototype.setFocusedNode = function (node) {
            this.focusedNodeId = node ? node.id : null;
        };
        TreeModel.prototype.setFocus = function (value) {
            TreeModel.focusedTree = value ? this : null;
        };
        TreeModel.prototype.doForAll = function (fn) {
            this.roots.forEach(function (root) { return root.doForAll(fn); });
        };
        TreeModel.prototype.focusNextNode = function () {
            var previousNode = this.getFocusedNode();
            var nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
            if (nextNode)
                nextNode.focus();
        };
        TreeModel.prototype.focusPreviousNode = function () {
            var previousNode = this.getFocusedNode();
            var nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
            if (nextNode)
                nextNode.focus();
        };
        TreeModel.prototype.focusDrillDown = function () {
            var previousNode = this.getFocusedNode();
            if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
                previousNode.toggleExpanded();
            }
            else {
                var nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
                if (nextNode)
                    nextNode.focus();
            }
        };
        TreeModel.prototype.focusDrillUp = function () {
            var previousNode = this.getFocusedNode();
            if (!previousNode)
                return;
            if (previousNode.isExpanded) {
                previousNode.toggleExpanded();
            }
            else {
                var nextNode = previousNode.realParent;
                if (nextNode)
                    nextNode.focus();
            }
        };
        TreeModel.prototype.setActiveNode = function (node, value, multi) {
            if (multi === void 0) { multi = false; }
            if (multi) {
                this._setActiveNodeMulti(node, value);
            }
            else {
                this._setActiveNodeSingle(node, value);
            }
            if (value) {
                node.focus(this.options.scrollOnActivate);
                this.fireEvent({ eventName: TREE_EVENTS.activate, node: node });
                this.fireEvent({ eventName: TREE_EVENTS.nodeActivate, node: node }); // For IE11
            }
            else {
                this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: node });
                this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: node }); // For IE11
            }
        };
        TreeModel.prototype.setSelectedNode = function (node, value) {
            var _a;
            this.selectedLeafNodeIds = Object.assign({}, this.selectedLeafNodeIds, (_a = {}, _a[node.id] = value, _a));
            if (value) {
                node.focus();
                this.fireEvent({ eventName: TREE_EVENTS.select, node: node });
            }
            else {
                this.fireEvent({ eventName: TREE_EVENTS.deselect, node: node });
            }
        };
        TreeModel.prototype.setExpandedNode = function (node, value) {
            var _a;
            this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, (_a = {}, _a[node.id] = value, _a));
            this.fireEvent({ eventName: TREE_EVENTS.toggleExpanded, node: node, isExpanded: value });
        };
        TreeModel.prototype.expandAll = function () {
            this.roots.forEach(function (root) { return root.expandAll(); });
        };
        TreeModel.prototype.collapseAll = function () {
            this.roots.forEach(function (root) { return root.collapseAll(); });
        };
        TreeModel.prototype.setIsHidden = function (node, value) {
            var _a;
            this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, (_a = {}, _a[node.id] = value, _a));
        };
        TreeModel.prototype.setHiddenNodeIds = function (nodeIds) {
            this.hiddenNodeIds = nodeIds.reduce(function (hiddenNodeIds, id) {
                var _a;
                return Object.assign(hiddenNodeIds, (_a = {},
                    _a[id] = true,
                    _a));
            }, {});
        };
        TreeModel.prototype.performKeyAction = function (node, $event) {
            var keyAction = this.options.actionMapping.keys[$event.keyCode];
            if (keyAction) {
                $event.preventDefault();
                keyAction(this, node, $event);
                return true;
            }
            else {
                return false;
            }
        };
        TreeModel.prototype.filterNodes = function (filter, autoShow) {
            var _this = this;
            if (autoShow === void 0) { autoShow = true; }
            var filterFn;
            if (!filter) {
                return this.clearFilter();
            }
            // support function and string filter
            if (filter && typeof filter.valueOf() === 'string') {
                filterFn = function (node) { return node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1; };
            }
            else if (filter && typeof filter === 'function') {
                filterFn = filter;
            }
            else {
                console.error('Don\'t know what to do with filter', filter);
                console.error('Should be either a string or function');
                return;
            }
            var ids = {};
            this.roots.forEach(function (node) { return _this._filterNode(ids, node, filterFn, autoShow); });
            this.hiddenNodeIds = ids;
            this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
        };
        TreeModel.prototype.clearFilter = function () {
            this.hiddenNodeIds = {};
            this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
        };
        TreeModel.prototype.moveNode = function (node, to) {
            var fromIndex = node.getIndexInParent();
            var fromParent = node.parent;
            if (!this.canMoveNode(node, to, fromIndex))
                return;
            var fromChildren = fromParent.getField('children');
            // If node doesn't have children - create children array
            if (!to.parent.getField('children')) {
                to.parent.setField('children', []);
            }
            var toChildren = to.parent.getField('children');
            var originalNode = fromChildren.splice(fromIndex, 1)[0];
            // Compensate for index if already removed from parent:
            var toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
            toChildren.splice(toIndex, 0, originalNode);
            fromParent.treeModel.update();
            if (to.parent.treeModel !== fromParent.treeModel) {
                to.parent.treeModel.update();
            }
            this.fireEvent({
                eventName: TREE_EVENTS.moveNode,
                node: originalNode,
                to: { parent: to.parent.data, index: toIndex },
                from: { parent: fromParent.data, index: fromIndex }
            });
        };
        TreeModel.prototype.copyNode = function (node, to) {
            var fromIndex = node.getIndexInParent();
            if (!this.canMoveNode(node, to, fromIndex))
                return;
            // If node doesn't have children - create children array
            if (!to.parent.getField('children')) {
                to.parent.setField('children', []);
            }
            var toChildren = to.parent.getField('children');
            var nodeCopy = this.options.getNodeClone(node);
            toChildren.splice(to.index, 0, nodeCopy);
            node.treeModel.update();
            if (to.parent.treeModel !== node.treeModel) {
                to.parent.treeModel.update();
            }
            this.fireEvent({ eventName: TREE_EVENTS.copyNode, node: nodeCopy, to: { parent: to.parent.data, index: to.index } });
        };
        TreeModel.prototype.getState = function () {
            return {
                expandedNodeIds: this.expandedNodeIds,
                selectedLeafNodeIds: this.selectedLeafNodeIds,
                activeNodeIds: this.activeNodeIds,
                hiddenNodeIds: this.hiddenNodeIds,
                focusedNodeId: this.focusedNodeId
            };
        };
        TreeModel.prototype.setState = function (state) {
            if (!state)
                return;
            Object.assign(this, {
                expandedNodeIds: state.expandedNodeIds || {},
                selectedLeafNodeIds: state.selectedLeafNodeIds || {},
                activeNodeIds: state.activeNodeIds || {},
                hiddenNodeIds: state.hiddenNodeIds || {},
                focusedNodeId: state.focusedNodeId
            });
        };
        TreeModel.prototype.subscribeToState = function (fn) {
            var _this = this;
            mobx.autorun(function () { return fn(_this.getState()); });
        };
        TreeModel.prototype.canMoveNode = function (node, to, fromIndex) {
            if (fromIndex === void 0) { fromIndex = undefined; }
            var fromNodeIndex = fromIndex || node.getIndexInParent();
            // same node:
            if (node.parent === to.parent && fromIndex === to.index) {
                return false;
            }
            return !to.parent.isDescendantOf(node);
        };
        TreeModel.prototype.calculateExpandedNodes = function () {
            this._calculateExpandedNodes();
        };
        // private methods
        TreeModel.prototype._filterNode = function (ids, node, filterFn, autoShow) {
            var _this = this;
            // if node passes function then it's visible
            var isVisible = filterFn(node);
            if (node.children) {
                // if one of node's children passes filter then this node is also visible
                node.children.forEach(function (child) {
                    if (_this._filterNode(ids, child, filterFn, autoShow)) {
                        isVisible = true;
                    }
                });
            }
            // mark node as hidden
            if (!isVisible) {
                ids[node.id] = true;
            }
            // auto expand parents to make sure the filtered nodes are visible
            if (autoShow && isVisible) {
                node.ensureVisible();
            }
            return isVisible;
        };
        TreeModel.prototype._calculateExpandedNodes = function (startNode) {
            var _a;
            var _this = this;
            if (startNode === void 0) { startNode = null; }
            startNode = startNode || this.virtualRoot;
            if (startNode.data[this.options.isExpandedField]) {
                this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, (_a = {}, _a[startNode.id] = true, _a));
            }
            if (startNode.children) {
                startNode.children.forEach(function (child) { return _this._calculateExpandedNodes(child); });
            }
        };
        TreeModel.prototype._setActiveNodeSingle = function (node, value) {
            var _a;
            var _this = this;
            // Deactivate all other nodes:
            this.activeNodes
                .filter(function (activeNode) { return activeNode !== node; })
                .forEach(function (activeNode) {
                _this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: activeNode });
                _this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: activeNode }); // For IE11
            });
            if (value) {
                this.activeNodeIds = (_a = {}, _a[node.id] = true, _a);
            }
            else {
                this.activeNodeIds = {};
            }
        };
        TreeModel.prototype._setActiveNodeMulti = function (node, value) {
            var _a;
            this.activeNodeIds = Object.assign({}, this.activeNodeIds, (_a = {}, _a[node.id] = value, _a));
        };
        return TreeModel;
    }());
    TreeModel.focusedTree = null;
    TreeModel.decorators = [
        { type: i0.Injectable }
    ];
    __decorate$2([
        mobx.observable,
        __metadata$2("design:type", Array)
    ], TreeModel.prototype, "roots", void 0);
    __decorate$2([
        mobx.observable,
        __metadata$2("design:type", Object)
    ], TreeModel.prototype, "expandedNodeIds", void 0);
    __decorate$2([
        mobx.observable,
        __metadata$2("design:type", Object)
    ], TreeModel.prototype, "selectedLeafNodeIds", void 0);
    __decorate$2([
        mobx.observable,
        __metadata$2("design:type", Object)
    ], TreeModel.prototype, "activeNodeIds", void 0);
    __decorate$2([
        mobx.observable,
        __metadata$2("design:type", Object)
    ], TreeModel.prototype, "hiddenNodeIds", void 0);
    __decorate$2([
        mobx.observable,
        __metadata$2("design:type", Object)
    ], TreeModel.prototype, "focusedNodeId", void 0);
    __decorate$2([
        mobx.observable,
        __metadata$2("design:type", TreeNode)
    ], TreeModel.prototype, "virtualRoot", void 0);
    __decorate$2([
        mobx.computed,
        __metadata$2("design:type", Object),
        __metadata$2("design:paramtypes", [])
    ], TreeModel.prototype, "focusedNode", null);
    __decorate$2([
        mobx.computed,
        __metadata$2("design:type", Object),
        __metadata$2("design:paramtypes", [])
    ], TreeModel.prototype, "expandedNodes", null);
    __decorate$2([
        mobx.computed,
        __metadata$2("design:type", Object),
        __metadata$2("design:paramtypes", [])
    ], TreeModel.prototype, "activeNodes", null);
    __decorate$2([
        mobx.computed,
        __metadata$2("design:type", Object),
        __metadata$2("design:paramtypes", [])
    ], TreeModel.prototype, "hiddenNodes", null);
    __decorate$2([
        mobx.computed,
        __metadata$2("design:type", Object),
        __metadata$2("design:paramtypes", [])
    ], TreeModel.prototype, "selectedLeafNodes", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setData", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "update", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setFocusedNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setFocus", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "doForAll", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "focusNextNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "focusPreviousNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "focusDrillDown", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "focusDrillUp", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object, Object, Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setActiveNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object, Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setSelectedNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object, Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setExpandedNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "expandAll", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "collapseAll", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object, Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setIsHidden", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setHiddenNodeIds", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object, Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "filterNodes", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", []),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "clearFilter", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object, Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "moveNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object, Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "copyNode", null);
    __decorate$2([
        mobx.action,
        __metadata$2("design:type", Function),
        __metadata$2("design:paramtypes", [Object]),
        __metadata$2("design:returntype", void 0)
    ], TreeModel.prototype, "setState", null);

    var TreeDraggedElement = /** @class */ (function () {
        function TreeDraggedElement() {
            this._draggedElement = null;
        }
        TreeDraggedElement.prototype.set = function (draggedElement) {
            this._draggedElement = draggedElement;
        };
        TreeDraggedElement.prototype.get = function () {
            return this._draggedElement;
        };
        TreeDraggedElement.prototype.isDragging = function () {
            return !!this.get();
        };
        return TreeDraggedElement;
    }());
    /** @nocollapse */ TreeDraggedElement.ɵprov = i0.ɵɵdefineInjectable({ factory: function TreeDraggedElement_Factory() { return new TreeDraggedElement(); }, token: TreeDraggedElement, providedIn: "root" });
    TreeDraggedElement.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
    var Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
    var TreeVirtualScroll = /** @class */ (function () {
        function TreeVirtualScroll(treeModel) {
            var _this = this;
            this.treeModel = treeModel;
            this.yBlocks = 0;
            this.x = 0;
            this.viewportHeight = null;
            this.viewport = null;
            treeModel.virtualScroll = this;
            this._dispose = [mobx.autorun(function () { return _this.fixScroll(); })];
        }
        Object.defineProperty(TreeVirtualScroll.prototype, "y", {
            get: function () {
                return this.yBlocks * Y_EPSILON;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeVirtualScroll.prototype, "totalHeight", {
            get: function () {
                return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
            },
            enumerable: false,
            configurable: true
        });
        TreeVirtualScroll.prototype.fireEvent = function (event) {
            this.treeModel.fireEvent(event);
        };
        TreeVirtualScroll.prototype.init = function () {
            var _this = this;
            var fn = this.recalcPositions.bind(this);
            fn();
            this._dispose = __spread(this._dispose, [
                mobx.reaction(function () { return _this.treeModel.roots; }, fn),
                mobx.reaction(function () { return _this.treeModel.expandedNodeIds; }, fn),
                mobx.reaction(function () { return _this.treeModel.hiddenNodeIds; }, fn)
            ]);
            this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
        };
        TreeVirtualScroll.prototype.isEnabled = function () {
            return this.treeModel.options.useVirtualScroll;
        };
        TreeVirtualScroll.prototype._setYBlocks = function (value) {
            this.yBlocks = value;
        };
        TreeVirtualScroll.prototype.recalcPositions = function () {
            this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
        };
        TreeVirtualScroll.prototype._getPositionAfter = function (nodes, startPos) {
            var _this = this;
            var position = startPos;
            nodes.forEach(function (node) {
                node.position = position;
                position = _this._getPositionAfterNode(node, position);
            });
            return position;
        };
        TreeVirtualScroll.prototype._getPositionAfterNode = function (node, startPos) {
            var position = node.getSelfHeight() + startPos;
            if (node.children && node.isExpanded) { // TBD: consider loading component as well
                position = this._getPositionAfter(node.visibleChildren, position);
            }
            node.height = position - startPos;
            return position;
        };
        TreeVirtualScroll.prototype.clear = function () {
            this._dispose.forEach(function (d) { return d(); });
        };
        TreeVirtualScroll.prototype.setViewport = function (viewport) {
            Object.assign(this, {
                viewport: viewport,
                x: viewport.scrollLeft,
                yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
                viewportHeight: viewport.getBoundingClientRect ? viewport.getBoundingClientRect().height : 0
            });
        };
        TreeVirtualScroll.prototype.scrollIntoView = function (node, force, scrollToMiddle) {
            if (scrollToMiddle === void 0) { scrollToMiddle = true; }
            if (node.options.scrollContainer) {
                var scrollContainer = node.options.scrollContainer;
                var scrollContainerHeight = scrollContainer.getBoundingClientRect().height;
                var scrollContainerTop = scrollContainer.getBoundingClientRect().top;
                var nodeTop = this.viewport.getBoundingClientRect().top + node.position - scrollContainerTop;
                if (force || // force scroll to node
                    nodeTop < scrollContainer.scrollTop || // node is above scroll container
                    nodeTop + node.getSelfHeight() > scrollContainer.scrollTop + scrollContainerHeight) { // node is below container
                    scrollContainer.scrollTop = scrollToMiddle ?
                        nodeTop - scrollContainerHeight / 2 : // scroll to middle
                        nodeTop; // scroll to start
                }
            }
            else {
                if (force || // force scroll to node
                    node.position < this.y || // node is above viewport
                    node.position + node.getSelfHeight() > this.y + this.viewportHeight) { // node is below viewport
                    if (this.viewport) {
                        this.viewport.scrollTop = scrollToMiddle ?
                            node.position - this.viewportHeight / 2 : // scroll to middle
                            node.position; // scroll to start
                        this._setYBlocks(Math.floor(this.viewport.scrollTop / Y_EPSILON));
                    }
                }
            }
        };
        TreeVirtualScroll.prototype.getViewportNodes = function (nodes) {
            var _this = this;
            if (!nodes)
                return [];
            var visibleNodes = nodes.filter(function (node) { return !node.isHidden; });
            if (!this.isEnabled())
                return visibleNodes;
            if (!this.viewportHeight || !visibleNodes.length)
                return [];
            // When loading children async this method is called before their height and position is calculated.
            // In that case firstIndex === 0 and lastIndex === visibleNodes.length - 1 (e.g. 1000),
            // which means that it loops through every visibleNodes item and push them into viewportNodes array.
            // We can prevent nodes from being pushed to the array and wait for the appropriate calculations to take place
            var lastVisibleNode = visibleNodes.slice(-1)[0];
            if (!lastVisibleNode.height && lastVisibleNode.position === 0)
                return [];
            // Search for first node in the viewport using binary search
            // Look for first node that starts after the beginning of the viewport (with buffer)
            // Or that ends after the beginning of the viewport
            var firstIndex = binarySearch(visibleNodes, function (node) {
                return (node.position + Y_OFFSET > _this.y) ||
                    (node.position + node.height > _this.y);
            });
            // Search for last node in the viewport using binary search
            // Look for first node that starts after the end of the viewport (with buffer)
            var lastIndex = binarySearch(visibleNodes, function (node) {
                return node.position - Y_OFFSET > _this.y + _this.viewportHeight;
            }, firstIndex);
            var viewportNodes = [];
            for (var i = firstIndex; i <= lastIndex; i++) {
                viewportNodes.push(visibleNodes[i]);
            }
            return viewportNodes;
        };
        TreeVirtualScroll.prototype.fixScroll = function () {
            var maxY = Math.max(0, this.totalHeight - this.viewportHeight);
            if (this.y < 0)
                this._setYBlocks(0);
            if (this.y > maxY)
                this._setYBlocks(maxY / Y_EPSILON);
        };
        return TreeVirtualScroll;
    }());
    TreeVirtualScroll.decorators = [
        { type: i0.Injectable }
    ];
    /** @nocollapse */
    TreeVirtualScroll.ctorParameters = function () { return [
        { type: TreeModel }
    ]; };
    __decorate$3([
        mobx.observable,
        __metadata$3("design:type", Object)
    ], TreeVirtualScroll.prototype, "yBlocks", void 0);
    __decorate$3([
        mobx.observable,
        __metadata$3("design:type", Object)
    ], TreeVirtualScroll.prototype, "x", void 0);
    __decorate$3([
        mobx.observable,
        __metadata$3("design:type", Object)
    ], TreeVirtualScroll.prototype, "viewportHeight", void 0);
    __decorate$3([
        mobx.computed,
        __metadata$3("design:type", Object),
        __metadata$3("design:paramtypes", [])
    ], TreeVirtualScroll.prototype, "y", null);
    __decorate$3([
        mobx.computed,
        __metadata$3("design:type", Object),
        __metadata$3("design:paramtypes", [])
    ], TreeVirtualScroll.prototype, "totalHeight", null);
    __decorate$3([
        mobx.action,
        __metadata$3("design:type", Function),
        __metadata$3("design:paramtypes", [Object]),
        __metadata$3("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "_setYBlocks", null);
    __decorate$3([
        mobx.action,
        __metadata$3("design:type", Function),
        __metadata$3("design:paramtypes", []),
        __metadata$3("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "recalcPositions", null);
    __decorate$3([
        mobx.action,
        __metadata$3("design:type", Function),
        __metadata$3("design:paramtypes", [Object]),
        __metadata$3("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "setViewport", null);
    __decorate$3([
        mobx.action,
        __metadata$3("design:type", Function),
        __metadata$3("design:paramtypes", [Object, Object, Object]),
        __metadata$3("design:returntype", void 0)
    ], TreeVirtualScroll.prototype, "scrollIntoView", null);
    function binarySearch(nodes, condition, firstIndex) {
        if (firstIndex === void 0) { firstIndex = 0; }
        var index = firstIndex;
        var toIndex = nodes.length - 1;
        while (index !== toIndex) {
            var midIndex = Math.floor((index + toIndex) / 2);
            if (condition(nodes[midIndex])) {
                toIndex = midIndex;
            }
            else {
                if (index === midIndex)
                    index = toIndex;
                else
                    index = midIndex;
            }
        }
        return index;
    }

    var LoadingComponent = /** @class */ (function () {
        function LoadingComponent() {
        }
        return LoadingComponent;
    }());
    LoadingComponent.decorators = [
        { type: i0.Component, args: [{
                    encapsulation: i0.ViewEncapsulation.None,
                    selector: 'tree-loading-component',
                    template: "\n    <span *ngIf=\"!template\">loading...</span>\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: node }\">\n    </ng-container>\n  "
                },] }
    ];
    LoadingComponent.propDecorators = {
        template: [{ type: i0.Input }],
        node: [{ type: i0.Input }]
    };

    var TreeComponent = /** @class */ (function () {
        function TreeComponent(treeModel, treeDraggedElement) {
            var _this = this;
            this.treeModel = treeModel;
            this.treeDraggedElement = treeDraggedElement;
            treeModel.eventNames.forEach(function (name) { return _this[name] = new i0.EventEmitter(); });
            treeModel.subscribeToState(function (state) { return _this.stateChange.emit(state); });
        }
        Object.defineProperty(TreeComponent.prototype, "nodes", {
            // Will be handled in ngOnChanges
            set: function (nodes) {
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeComponent.prototype, "options", {
            set: function (options) {
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TreeComponent.prototype, "focused", {
            set: function (value) {
                this.treeModel.setFocus(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeComponent.prototype, "state", {
            set: function (state) {
                this.treeModel.setState(state);
            },
            enumerable: false,
            configurable: true
        });
        TreeComponent.prototype.onKeydown = function ($event) {
            if (!this.treeModel.isFocused)
                return;
            if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase()))
                return;
            var focusedNode = this.treeModel.getFocusedNode();
            this.treeModel.performKeyAction(focusedNode, $event);
        };
        TreeComponent.prototype.onMousedown = function ($event) {
            function isOutsideClick(startElement, nodeName) {
                return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement.parentElement, nodeName);
            }
            if (isOutsideClick($event.target, 'tree-root')) {
                this.treeModel.setFocus(false);
            }
        };
        TreeComponent.prototype.ngOnChanges = function (changes) {
            if (changes.options || changes.nodes) {
                this.treeModel.setData({
                    options: changes.options && changes.options.currentValue,
                    nodes: changes.nodes && changes.nodes.currentValue,
                    events: this.pick(this, this.treeModel.eventNames)
                });
            }
        };
        TreeComponent.prototype.sizeChanged = function () {
            this.viewportComponent.setViewport();
        };
        TreeComponent.prototype.pick = function (object, keys) {
            return keys.reduce(function (obj, key) {
                if (object && object.hasOwnProperty(key)) {
                    obj[key] = object[key];
                }
                return obj;
            }, {});
        };
        return TreeComponent;
    }());
    TreeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'Tree, tree-root',
                    providers: [TreeModel],
                    template: "\n      <tree-viewport #viewport>\n          <div\n                  class=\"angular-tree-component\"\n                  [class.node-dragging]=\"treeDraggedElement.isDragging()\"\n                  [class.angular-tree-component-rtl]=\"treeModel.options.rtl\">\n              <tree-node-collection\n                      *ngIf=\"treeModel.roots\"\n                      [nodes]=\"treeModel.roots\"\n                      [treeModel]=\"treeModel\"\n                      [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeWrapperTemplate: treeNodeWrapperTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n              </tree-node-collection>\n              <tree-node-drop-slot\n                      class=\"empty-tree-drop-slot\"\n                      *ngIf=\"treeModel.isEmptyTree()\"\n                      [dropIndex]=\"0\"\n                      [node]=\"treeModel.virtualRoot\">\n              </tree-node-drop-slot>\n          </div>\n      </tree-viewport>\n  "
                },] }
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: TreeModel },
        { type: TreeDraggedElement }
    ]; };
    TreeComponent.propDecorators = {
        loadingTemplate: [{ type: i0.ContentChild, args: ['loadingTemplate', { static: false },] }],
        treeNodeTemplate: [{ type: i0.ContentChild, args: ['treeNodeTemplate', { static: false },] }],
        treeNodeWrapperTemplate: [{ type: i0.ContentChild, args: ['treeNodeWrapperTemplate', { static: false },] }],
        treeNodeFullTemplate: [{ type: i0.ContentChild, args: ['treeNodeFullTemplate', { static: false },] }],
        viewportComponent: [{ type: i0.ViewChild, args: ['viewport', { static: false },] }],
        nodes: [{ type: i0.Input }],
        options: [{ type: i0.Input }],
        focused: [{ type: i0.Input }],
        state: [{ type: i0.Input }],
        toggleExpanded: [{ type: i0.Output }],
        activate: [{ type: i0.Output }],
        deactivate: [{ type: i0.Output }],
        nodeActivate: [{ type: i0.Output }],
        nodeDeactivate: [{ type: i0.Output }],
        select: [{ type: i0.Output }],
        deselect: [{ type: i0.Output }],
        focus: [{ type: i0.Output }],
        blur: [{ type: i0.Output }],
        updateData: [{ type: i0.Output }],
        initialized: [{ type: i0.Output }],
        moveNode: [{ type: i0.Output }],
        copyNode: [{ type: i0.Output }],
        loadNodeChildren: [{ type: i0.Output }],
        changeFilter: [{ type: i0.Output }],
        event: [{ type: i0.Output }],
        stateChange: [{ type: i0.Output }],
        onKeydown: [{ type: i0.HostListener, args: ['body: keydown', ['$event'],] }],
        onMousedown: [{ type: i0.HostListener, args: ['body: mousedown', ['$event'],] }]
    };

    var TreeNodeComponent = /** @class */ (function () {
        function TreeNodeComponent() {
        }
        return TreeNodeComponent;
    }());
    TreeNodeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'TreeNode, tree-node',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <ng-container *treeMobxAutorun=\"{ dontDetach: true }\">\n      <div\n        *ngIf=\"!templates.treeNodeFullTemplate\"\n        [class]=\"node.getClass()\"\n        [class.tree-node]=\"true\"\n        [class.tree-node-expanded]=\"node.isExpanded && node.hasChildren\"\n        [class.tree-node-collapsed]=\"node.isCollapsed && node.hasChildren\"\n        [class.tree-node-leaf]=\"node.isLeaf\"\n        [class.tree-node-active]=\"node.isActive\"\n        [class.tree-node-focused]=\"node.isFocused\"\n      >\n        <tree-node-drop-slot\n          *ngIf=\"index === 0\"\n          [dropIndex]=\"node.index\"\n          [node]=\"node.parent\"\n        ></tree-node-drop-slot>\n\n        <tree-node-wrapper\n          [node]=\"node\"\n          [index]=\"index\"\n          [templates]=\"templates\"\n        ></tree-node-wrapper>\n\n        <tree-node-children\n          [node]=\"node\"\n          [templates]=\"templates\"\n        ></tree-node-children>\n        <tree-node-drop-slot\n          [dropIndex]=\"node.index + 1\"\n          [node]=\"node.parent\"\n        ></tree-node-drop-slot>\n      </div>\n      <ng-container\n        [ngTemplateOutlet]=\"templates.treeNodeFullTemplate\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: node,\n          node: node,\n          index: index,\n          templates: templates\n        }\"\n      >\n      </ng-container>\n    </ng-container>\n  "
                },] }
    ];
    TreeNodeComponent.propDecorators = {
        node: [{ type: i0.Input }],
        index: [{ type: i0.Input }],
        templates: [{ type: i0.Input }]
    };

    var TreeNodeContent = /** @class */ (function () {
        function TreeNodeContent() {
        }
        return TreeNodeContent;
    }());
    TreeNodeContent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tree-node-content',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n  <span *ngIf=\"!template\">{{ node.displayField }}</span>\n  <ng-container\n    [ngTemplateOutlet]=\"template\"\n    [ngTemplateOutletContext]=\"{ $implicit: node, node: node, index: index }\">\n  </ng-container>"
                },] }
    ];
    TreeNodeContent.propDecorators = {
        node: [{ type: i0.Input }],
        index: [{ type: i0.Input }],
        template: [{ type: i0.Input }]
    };

    var TreeNodeDropSlot = /** @class */ (function () {
        function TreeNodeDropSlot() {
        }
        TreeNodeDropSlot.prototype.onDrop = function ($event) {
            this.node.mouseAction('drop', $event.event, {
                from: $event.element,
                to: { parent: this.node, index: this.dropIndex }
            });
        };
        TreeNodeDropSlot.prototype.allowDrop = function (element, $event) {
            return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex }, $event);
        };
        return TreeNodeDropSlot;
    }());
    TreeNodeDropSlot.decorators = [
        { type: i0.Component, args: [{
                    selector: 'TreeNodeDropSlot, tree-node-drop-slot',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <div\n      class=\"node-drop-slot\"\n      (treeDrop)=\"onDrop($event)\"\n      [treeAllowDrop]=\"allowDrop.bind(this)\"\n      [allowDragoverStyling]=\"true\">\n    </div>\n  "
                },] }
    ];
    TreeNodeDropSlot.propDecorators = {
        node: [{ type: i0.Input }],
        dropIndex: [{ type: i0.Input }]
    };

    var TreeNodeExpanderComponent = /** @class */ (function () {
        function TreeNodeExpanderComponent() {
        }
        return TreeNodeExpanderComponent;
    }());
    TreeNodeExpanderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tree-node-expander',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <ng-container *treeMobxAutorun=\"{ dontDetach: true }\">\n      <span\n        *ngIf=\"node.hasChildren\"\n        [class.toggle-children-wrapper-expanded]=\"node.isExpanded\"\n        [class.toggle-children-wrapper-collapsed]=\"node.isCollapsed\"\n        class=\"toggle-children-wrapper\"\n        (click)=\"node.mouseAction('expanderClick', $event)\"\n      >\n        <span class=\"toggle-children\"></span>\n      </span>\n      <span *ngIf=\"!node.hasChildren\" class=\"toggle-children-placeholder\">\n      </span>\n    </ng-container>\n  "
                },] }
    ];
    TreeNodeExpanderComponent.propDecorators = {
        node: [{ type: i0.Input }]
    };

    var TreeNodeChildrenComponent = /** @class */ (function () {
        function TreeNodeChildrenComponent() {
        }
        return TreeNodeChildrenComponent;
    }());
    TreeNodeChildrenComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tree-node-children',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <ng-container *treeMobxAutorun=\"{ dontDetach: true }\">\n      <div\n        [class.tree-children]=\"true\"\n        [class.tree-children-no-padding]=\"node.options.levelPadding\"\n        *treeAnimateOpen=\"\n          node.isExpanded;\n          speed: node.options.animateSpeed;\n          acceleration: node.options.animateAcceleration;\n          enabled: node.options.animateExpand\n        \"\n      >\n        <tree-node-collection\n          *ngIf=\"node.children\"\n          [nodes]=\"node.children\"\n          [templates]=\"templates\"\n          [treeModel]=\"node.treeModel\"\n        >\n        </tree-node-collection>\n        <tree-loading-component\n          [style.padding-left]=\"node.getNodePadding()\"\n          class=\"tree-node-loading\"\n          *ngIf=\"!node.children\"\n          [template]=\"templates.loadingTemplate\"\n          [node]=\"node\"\n        ></tree-loading-component>\n      </div>\n    </ng-container>\n  "
                },] }
    ];
    TreeNodeChildrenComponent.propDecorators = {
        node: [{ type: i0.Input }],
        templates: [{ type: i0.Input }]
    };

    // Re-export mobx operators to be able to use inside components with AOT:
    function actionInternal() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return mobx.action.apply(void 0, __spread(args));
    }
    var action = Object.assign(actionInternal, mobx.action);
    function computedInternal() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return mobx.computed.apply(void 0, __spread(args));
    }
    var computed = Object.assign(computedInternal, mobx.computed);
    function observableInternal() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return mobx.observable.apply(void 0, __spread(args));
    }
    var observable = Object.assign(observableInternal, mobx.observable);

    var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var TreeNodeCollectionComponent = /** @class */ (function () {
        function TreeNodeCollectionComponent() {
            this._dispose = [];
        }
        Object.defineProperty(TreeNodeCollectionComponent.prototype, "nodes", {
            get: function () {
                return this._nodes;
            },
            set: function (nodes) {
                this.setNodes(nodes);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeNodeCollectionComponent.prototype, "marginTop", {
            get: function () {
                var firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
                var relativePosition = firstNode && firstNode.parent
                    ? firstNode.position -
                        firstNode.parent.position -
                        firstNode.parent.getSelfHeight()
                    : 0;
                return relativePosition + "px";
            },
            enumerable: false,
            configurable: true
        });
        TreeNodeCollectionComponent.prototype.setNodes = function (nodes) {
            this._nodes = nodes;
        };
        TreeNodeCollectionComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.virtualScroll = this.treeModel.virtualScroll;
            this._dispose = [
                // return node indexes so we can compare structurally,
                mobx.reaction(function () {
                    return _this.virtualScroll
                        .getViewportNodes(_this.nodes)
                        .map(function (n) { return n.index; });
                }, function (nodeIndexes) {
                    _this.viewportNodes = nodeIndexes.map(function (i) { return _this.nodes[i]; });
                }, { compareStructural: true, fireImmediately: true }),
                mobx.reaction(function () { return _this.nodes; }, function (nodes) {
                    _this.viewportNodes = _this.virtualScroll.getViewportNodes(nodes);
                })
            ];
        };
        TreeNodeCollectionComponent.prototype.ngOnDestroy = function () {
            this._dispose.forEach(function (d) { return d(); });
        };
        TreeNodeCollectionComponent.prototype.trackNode = function (index, node) {
            return node.id;
        };
        return TreeNodeCollectionComponent;
    }());
    TreeNodeCollectionComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tree-node-collection',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <ng-container *treeMobxAutorun=\"{ dontDetach: true }\">\n      <div [style.margin-top]=\"marginTop\">\n        <tree-node\n          *ngFor=\"let node of viewportNodes; let i = index; trackBy: trackNode\"\n          [node]=\"node\"\n          [index]=\"i\"\n          [templates]=\"templates\"\n        >\n        </tree-node>\n      </div>\n    </ng-container>\n  "
                },] }
    ];
    TreeNodeCollectionComponent.propDecorators = {
        nodes: [{ type: i0.Input }],
        treeModel: [{ type: i0.Input }],
        templates: [{ type: i0.Input }]
    };
    __decorate$4([
        observable,
        __metadata$4("design:type", Object)
    ], TreeNodeCollectionComponent.prototype, "_nodes", void 0);
    __decorate$4([
        observable,
        __metadata$4("design:type", Array)
    ], TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
    __decorate$4([
        computed,
        __metadata$4("design:type", String),
        __metadata$4("design:paramtypes", [])
    ], TreeNodeCollectionComponent.prototype, "marginTop", null);
    __decorate$4([
        action,
        __metadata$4("design:type", Function),
        __metadata$4("design:paramtypes", [Object]),
        __metadata$4("design:returntype", void 0)
    ], TreeNodeCollectionComponent.prototype, "setNodes", null);

    var TreeNodeWrapperComponent = /** @class */ (function () {
        function TreeNodeWrapperComponent() {
        }
        return TreeNodeWrapperComponent;
    }());
    TreeNodeWrapperComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tree-node-wrapper',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n      <div *ngIf=\"!templates.treeNodeWrapperTemplate\" class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\">\n          <tree-node-checkbox *ngIf=\"node.options.useCheckbox\" [node]=\"node\"></tree-node-checkbox>\n          <tree-node-expander [node]=\"node\"></tree-node-expander>\n          <div class=\"node-content-wrapper\"\n               [class.node-content-wrapper-active]=\"node.isActive\"\n               [class.node-content-wrapper-focused]=\"node.isFocused\"\n               (click)=\"node.mouseAction('click', $event)\"\n               (dblclick)=\"node.mouseAction('dblClick', $event)\"\n               (mouseover)=\"node.mouseAction('mouseOver', $event)\"\n               (mouseout)=\"node.mouseAction('mouseOut', $event)\"\n               (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n               (treeDrop)=\"node.onDrop($event)\"\n               (treeDropDragOver)=\"node.mouseAction('dragOver', $event)\"\n               (treeDropDragLeave)=\"node.mouseAction('dragLeave', $event)\"\n               (treeDropDragEnter)=\"node.mouseAction('dragEnter', $event)\"\n               [treeAllowDrop]=\"node.allowDrop\"\n               [allowDragoverStyling]=\"node.allowDragoverStyling()\"\n               [treeDrag]=\"node\"\n               [treeDragEnabled]=\"node.allowDrag()\">\n\n              <tree-node-content [node]=\"node\" [index]=\"index\" [template]=\"templates.treeNodeTemplate\">\n              </tree-node-content>\n          </div>\n      </div>\n      <ng-container\n              [ngTemplateOutlet]=\"templates.treeNodeWrapperTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: node, node: node, index: index, templates: templates }\">\n      </ng-container>\n  "
                },] }
    ];
    TreeNodeWrapperComponent.propDecorators = {
        node: [{ type: i0.Input }],
        index: [{ type: i0.Input }],
        templates: [{ type: i0.Input }]
    };

    var TreeViewportComponent = /** @class */ (function () {
        function TreeViewportComponent(elementRef, virtualScroll) {
            var _this = this;
            this.elementRef = elementRef;
            this.virtualScroll = virtualScroll;
            this.setViewport = this.throttle(function () {
                _this.virtualScroll.setViewport(_this.elementRef.nativeElement);
            }, 17);
            this.scrollEventHandler = this.setViewport.bind(this);
        }
        TreeViewportComponent.prototype.ngOnInit = function () {
            this.virtualScroll.init();
        };
        TreeViewportComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.setViewport();
                _this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
            });
            var el = this.elementRef.nativeElement;
            el.addEventListener('scroll', this.scrollEventHandler);
        };
        TreeViewportComponent.prototype.ngOnDestroy = function () {
            this.virtualScroll.clear();
            var el = this.elementRef.nativeElement;
            el.removeEventListener('scroll', this.scrollEventHandler);
        };
        TreeViewportComponent.prototype.getTotalHeight = function () {
            return ((this.virtualScroll.isEnabled() &&
                this.virtualScroll.totalHeight + 'px') ||
                'auto');
        };
        TreeViewportComponent.prototype.throttle = function (func, timeFrame) {
            var lastTime = 0;
            return function () {
                var now = Date.now();
                if (now - lastTime >= timeFrame) {
                    func();
                    lastTime = now;
                }
            };
        };
        return TreeViewportComponent;
    }());
    TreeViewportComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tree-viewport',
                    providers: [TreeVirtualScroll],
                    template: "\n    <ng-container *treeMobxAutorun=\"{ dontDetach: true }\">\n      <div [style.height]=\"getTotalHeight()\">\n        <ng-content></ng-content>\n      </div>\n    </ng-container>\n  "
                },] }
    ];
    /** @nocollapse */
    TreeViewportComponent.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: TreeVirtualScroll }
    ]; };

    var TreeNodeCheckboxComponent = /** @class */ (function () {
        function TreeNodeCheckboxComponent() {
        }
        return TreeNodeCheckboxComponent;
    }());
    TreeNodeCheckboxComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'tree-node-checkbox',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <ng-container *treeMobxAutorun=\"{ dontDetach: true }\">\n      <input\n        class=\"tree-node-checkbox\"\n        type=\"checkbox\"\n        (click)=\"node.mouseAction('checkboxClick', $event)\"\n        [checked]=\"node.isSelected\"\n        [indeterminate]=\"node.isPartiallySelected\"\n      />\n    </ng-container>\n  "
                },] }
    ];
    TreeNodeCheckboxComponent.propDecorators = {
        node: [{ type: i0.Input }]
    };

    var DRAG_OVER_CLASS = 'is-dragging-over';
    var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
    var TreeDropDirective = /** @class */ (function () {
        function TreeDropDirective(el, renderer, treeDraggedElement, ngZone) {
            this.el = el;
            this.renderer = renderer;
            this.treeDraggedElement = treeDraggedElement;
            this.ngZone = ngZone;
            this.allowDragoverStyling = true;
            this.onDropCallback = new i0.EventEmitter();
            this.onDragOverCallback = new i0.EventEmitter();
            this.onDragLeaveCallback = new i0.EventEmitter();
            this.onDragEnterCallback = new i0.EventEmitter();
            this._allowDrop = function (element, $event) { return true; };
            this.dragOverEventHandler = this.onDragOver.bind(this);
            this.dragEnterEventHandler = this.onDragEnter.bind(this);
            this.dragLeaveEventHandler = this.onDragLeave.bind(this);
        }
        Object.defineProperty(TreeDropDirective.prototype, "treeAllowDrop", {
            set: function (allowDrop) {
                if (allowDrop instanceof Function) {
                    this._allowDrop = allowDrop;
                }
                else
                    this._allowDrop = function (element, $event) { return allowDrop; };
            },
            enumerable: false,
            configurable: true
        });
        TreeDropDirective.prototype.allowDrop = function ($event) {
            return this._allowDrop(this.treeDraggedElement.get(), $event);
        };
        TreeDropDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            var el = this.el.nativeElement;
            this.ngZone.runOutsideAngular(function () {
                el.addEventListener('dragover', _this.dragOverEventHandler);
                el.addEventListener('dragenter', _this.dragEnterEventHandler);
                el.addEventListener('dragleave', _this.dragLeaveEventHandler);
            });
        };
        TreeDropDirective.prototype.ngOnDestroy = function () {
            var el = this.el.nativeElement;
            el.removeEventListener('dragover', this.dragOverEventHandler);
            el.removeEventListener('dragenter', this.dragEnterEventHandler);
            el.removeEventListener('dragleave', this.dragLeaveEventHandler);
        };
        TreeDropDirective.prototype.onDragOver = function ($event) {
            if (!this.allowDrop($event)) {
                if (this.allowDragoverStyling) {
                    return this.addDisabledClass();
                }
                return;
            }
            this.onDragOverCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
            $event.preventDefault();
            if (this.allowDragoverStyling) {
                this.addClass();
            }
        };
        TreeDropDirective.prototype.onDragEnter = function ($event) {
            if (!this.allowDrop($event))
                return;
            $event.preventDefault();
            this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        };
        TreeDropDirective.prototype.onDragLeave = function ($event) {
            if (!this.allowDrop($event)) {
                if (this.allowDragoverStyling) {
                    return this.removeDisabledClass();
                }
                return;
            }
            this.onDragLeaveCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
            if (this.allowDragoverStyling) {
                this.removeClass();
            }
        };
        TreeDropDirective.prototype.onDrop = function ($event) {
            if (!this.allowDrop($event))
                return;
            $event.preventDefault();
            this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
            if (this.allowDragoverStyling) {
                this.removeClass();
            }
            this.treeDraggedElement.set(null);
        };
        TreeDropDirective.prototype.addClass = function () {
            this.renderer.addClass(this.el.nativeElement, DRAG_OVER_CLASS);
        };
        TreeDropDirective.prototype.removeClass = function () {
            this.renderer.removeClass(this.el.nativeElement, DRAG_OVER_CLASS);
        };
        TreeDropDirective.prototype.addDisabledClass = function () {
            this.renderer.addClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
        };
        TreeDropDirective.prototype.removeDisabledClass = function () {
            this.renderer.removeClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
        };
        return TreeDropDirective;
    }());
    TreeDropDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[treeDrop]'
                },] }
    ];
    /** @nocollapse */
    TreeDropDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: TreeDraggedElement },
        { type: i0.NgZone }
    ]; };
    TreeDropDirective.propDecorators = {
        allowDragoverStyling: [{ type: i0.Input }],
        onDropCallback: [{ type: i0.Output, args: ['treeDrop',] }],
        onDragOverCallback: [{ type: i0.Output, args: ['treeDropDragOver',] }],
        onDragLeaveCallback: [{ type: i0.Output, args: ['treeDropDragLeave',] }],
        onDragEnterCallback: [{ type: i0.Output, args: ['treeDropDragEnter',] }],
        treeAllowDrop: [{ type: i0.Input }],
        onDrop: [{ type: i0.HostListener, args: ['drop', ['$event'],] }]
    };

    var DRAG_OVER_CLASS$1 = 'is-dragging-over';
    var TreeDragDirective = /** @class */ (function () {
        function TreeDragDirective(el, renderer, treeDraggedElement, ngZone) {
            this.el = el;
            this.renderer = renderer;
            this.treeDraggedElement = treeDraggedElement;
            this.ngZone = ngZone;
            this.dragEventHandler = this.onDrag.bind(this);
        }
        TreeDragDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            var el = this.el.nativeElement;
            this.ngZone.runOutsideAngular(function () {
                el.addEventListener('drag', _this.dragEventHandler);
            });
        };
        TreeDragDirective.prototype.ngDoCheck = function () {
            this.renderer.setAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
        };
        TreeDragDirective.prototype.ngOnDestroy = function () {
            var el = this.el.nativeElement;
            el.removeEventListener('drag', this.dragEventHandler);
        };
        TreeDragDirective.prototype.onDragStart = function (ev) {
            // setting the data is required by firefox
            ev.dataTransfer.setData('text', ev.target.id);
            this.treeDraggedElement.set(this.draggedElement);
            if (this.draggedElement.mouseAction) {
                this.draggedElement.mouseAction('dragStart', ev);
            }
        };
        TreeDragDirective.prototype.onDrag = function (ev) {
            if (this.draggedElement.mouseAction) {
                this.draggedElement.mouseAction('drag', ev);
            }
        };
        TreeDragDirective.prototype.onDragEnd = function () {
            if (this.draggedElement.mouseAction) {
                this.draggedElement.mouseAction('dragEnd');
            }
            this.treeDraggedElement.set(null);
        };
        return TreeDragDirective;
    }());
    TreeDragDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[treeDrag]'
                },] }
    ];
    /** @nocollapse */
    TreeDragDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: TreeDraggedElement },
        { type: i0.NgZone }
    ]; };
    TreeDragDirective.propDecorators = {
        draggedElement: [{ type: i0.Input, args: ['treeDrag',] }],
        treeDragEnabled: [{ type: i0.Input }],
        onDragStart: [{ type: i0.HostListener, args: ['dragstart', ['$event'],] }],
        onDragEnd: [{ type: i0.HostListener, args: ['dragend',] }]
    };

    var EASE_ACCELERATION = 1.005;
    var TreeAnimateOpenDirective = /** @class */ (function () {
        function TreeAnimateOpenDirective(renderer, templateRef, viewContainerRef) {
            this.renderer = renderer;
            this.templateRef = templateRef;
            this.viewContainerRef = viewContainerRef;
        }
        Object.defineProperty(TreeAnimateOpenDirective.prototype, "isOpen", {
            set: function (value) {
                if (value) {
                    this._show();
                    if (this.isEnabled && this._isOpen === false) {
                        this._animateOpen();
                    }
                }
                else {
                    this.isEnabled ? this._animateClose() : this._hide();
                }
                this._isOpen = !!value;
            },
            enumerable: false,
            configurable: true
        });
        ;
        TreeAnimateOpenDirective.prototype._show = function () {
            if (this.innerElement)
                return;
            // create child view
            this.innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
        };
        TreeAnimateOpenDirective.prototype._hide = function () {
            this.viewContainerRef.clear();
            this.innerElement = null;
        };
        TreeAnimateOpenDirective.prototype._animateOpen = function () {
            var _this = this;
            var delta = this.animateSpeed;
            var ease = this.animateAcceleration;
            var maxHeight = 0;
            // set height to 0
            this.renderer.setStyle(this.innerElement, 'max-height', "0");
            // increase maxHeight until height doesn't change
            setTimeout(function () {
                var i = setInterval(function () {
                    if (!_this._isOpen || !_this.innerElement)
                        return clearInterval(i);
                    maxHeight += delta;
                    var roundedMaxHeight = Math.round(maxHeight);
                    _this.renderer.setStyle(_this.innerElement, 'max-height', roundedMaxHeight + "px");
                    var height = _this.innerElement.getBoundingClientRect ? _this.innerElement.getBoundingClientRect().height : 0; // TBD use renderer
                    delta *= ease;
                    ease *= EASE_ACCELERATION;
                    if (height < roundedMaxHeight) {
                        // Make maxHeight auto because animation finished and container might change height later on
                        _this.renderer.setStyle(_this.innerElement, 'max-height', null);
                        clearInterval(i);
                    }
                }, 17);
            });
        };
        TreeAnimateOpenDirective.prototype._animateClose = function () {
            var _this = this;
            if (!this.innerElement)
                return;
            var delta = this.animateSpeed;
            var ease = this.animateAcceleration;
            var height = this.innerElement.getBoundingClientRect().height; // TBD use renderer
            // slowly decrease maxHeight to 0, starting from current height
            var i = setInterval(function () {
                if (_this._isOpen || !_this.innerElement)
                    return clearInterval(i);
                height -= delta;
                _this.renderer.setStyle(_this.innerElement, 'max-height', height + "px");
                delta *= ease;
                ease *= EASE_ACCELERATION;
                if (height <= 0) {
                    // after animation complete - remove child element
                    _this.viewContainerRef.clear();
                    _this.innerElement = null;
                    clearInterval(i);
                }
            }, 17);
        };
        return TreeAnimateOpenDirective;
    }());
    TreeAnimateOpenDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[treeAnimateOpen]'
                },] }
    ];
    /** @nocollapse */
    TreeAnimateOpenDirective.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.TemplateRef },
        { type: i0.ViewContainerRef }
    ]; };
    TreeAnimateOpenDirective.propDecorators = {
        animateSpeed: [{ type: i0.Input, args: ['treeAnimateOpenSpeed',] }],
        animateAcceleration: [{ type: i0.Input, args: ['treeAnimateOpenAcceleration',] }],
        isEnabled: [{ type: i0.Input, args: ['treeAnimateOpenEnabled',] }],
        isOpen: [{ type: i0.Input, args: ['treeAnimateOpen',] }]
    };

    var TreeModule = /** @class */ (function () {
        function TreeModule() {
        }
        return TreeModule;
    }());
    TreeModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        TreeComponent,
                        TreeNodeComponent,
                        TreeNodeContent,
                        LoadingComponent,
                        TreeDropDirective,
                        TreeDragDirective,
                        TreeNodeExpanderComponent,
                        TreeNodeChildrenComponent,
                        TreeNodeDropSlot,
                        TreeNodeCollectionComponent,
                        TreeViewportComponent,
                        TreeNodeWrapperComponent,
                        TreeNodeCheckboxComponent,
                        TreeAnimateOpenDirective,
                        TreeMobxAutorunDirective
                    ],
                    exports: [
                        TreeComponent,
                        TreeNodeComponent,
                        TreeNodeContent,
                        LoadingComponent,
                        TreeDropDirective,
                        TreeDragDirective,
                        TreeNodeExpanderComponent,
                        TreeNodeChildrenComponent,
                        TreeNodeDropSlot,
                        TreeNodeCollectionComponent,
                        TreeViewportComponent,
                        TreeNodeWrapperComponent,
                        TreeNodeCheckboxComponent,
                        TreeAnimateOpenDirective,
                        TreeMobxAutorunDirective
                    ],
                    imports: [common.CommonModule],
                    providers: []
                },] }
    ];

    /*
     * Public API Surface of angular-tree-component
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.KEYS = KEYS;
    exports.LoadingComponent = LoadingComponent;
    exports.TREE_ACTIONS = TREE_ACTIONS;
    exports.TreeAnimateOpenDirective = TreeAnimateOpenDirective;
    exports.TreeComponent = TreeComponent;
    exports.TreeDragDirective = TreeDragDirective;
    exports.TreeDraggedElement = TreeDraggedElement;
    exports.TreeDropDirective = TreeDropDirective;
    exports.TreeModel = TreeModel;
    exports.TreeModule = TreeModule;
    exports.TreeNode = TreeNode;
    exports.TreeNodeCheckboxComponent = TreeNodeCheckboxComponent;
    exports.TreeNodeChildrenComponent = TreeNodeChildrenComponent;
    exports.TreeNodeCollectionComponent = TreeNodeCollectionComponent;
    exports.TreeNodeComponent = TreeNodeComponent;
    exports.TreeNodeContent = TreeNodeContent;
    exports.TreeNodeDropSlot = TreeNodeDropSlot;
    exports.TreeNodeExpanderComponent = TreeNodeExpanderComponent;
    exports.TreeNodeWrapperComponent = TreeNodeWrapperComponent;
    exports.TreeViewportComponent = TreeViewportComponent;
    exports.TreeVirtualScroll = TreeVirtualScroll;
    exports.ɵa = actionInternal;
    exports.ɵb = action;
    exports.ɵc = computed;
    exports.ɵd = observable;
    exports.ɵe = TreeMobxAutorunDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=circlon-angular-tree-component.umd.js.map
