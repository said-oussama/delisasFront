import { Directive, TemplateRef, ViewContainerRef, Input, Injectable, ɵɵdefineInjectable, Component, ViewEncapsulation, ElementRef, EventEmitter, ContentChild, ViewChild, Output, HostListener, Renderer2, NgZone, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { autorun, reaction, computed as computed$1, observable as observable$1, action as action$1 } from 'mobx';

class TreeMobxAutorunDirective {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.templateBindings = {};
    }
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef);
        if (this.dispose) {
            this.dispose();
        }
        if (this.shouldDetach()) {
            this.view.detach();
        }
        this.autoDetect(this.view);
    }
    shouldDetach() {
        return this.treeMobxAutorun && this.treeMobxAutorun.detach;
    }
    autoDetect(view) {
        this.dispose = autorun(() => view.detectChanges());
    }
    ngOnDestroy() {
        if (this.dispose) {
            this.dispose();
        }
    }
}
TreeMobxAutorunDirective.decorators = [
    { type: Directive, args: [{ selector: '[treeMobxAutorun]' },] }
];
/** @nocollapse */
TreeMobxAutorunDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
TreeMobxAutorunDirective.propDecorators = {
    treeMobxAutorun: [{ type: Input }]
};

const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32,
    CONTEXT_MENU: 32
};

const ɵ0 = (tree, node, $event) => node && node.toggleActivated(), ɵ1 = (tree, node, $event) => node && node.toggleActivated(true), ɵ2 = (tree, node, $event) => node && node.toggleSelected(), ɵ3 = (tree, node, $event) => node.setIsActive(true), ɵ4 = (tree, node, $event) => node.setIsActive(false), ɵ5 = (tree, node, $event) => node.setIsSelected(true), ɵ6 = (tree, node, $event) => node.setIsSelected(false), ɵ7 = (tree, node, $event) => node.focus(), ɵ8 = (tree, node, $event) => node.hasChildren && node.toggleExpanded(), ɵ9 = (tree, node, $event) => node.expand(), ɵ10 = (tree, node, $event) => node.collapse(), ɵ11 = (tree, node, $event) => tree.focusDrillDown(), ɵ12 = (tree, node, $event) => tree.focusDrillUp(), ɵ13 = (tree, node, $event) => tree.focusNextNode(), ɵ14 = (tree, node, $event) => tree.focusPreviousNode(), ɵ15 = (tree, node, $event, { from, to }) => {
    // default action assumes from = node, to = {parent, index}
    if ($event.ctrlKey) {
        tree.copyNode(from, to);
    }
    else {
        tree.moveNode(from, to);
    }
};
const TREE_ACTIONS = {
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
const defaultActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_ACTIVE,
        dblClick: null,
        contextMenu: null,
        expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        checkboxClick: TREE_ACTIONS.TOGGLE_SELECTED,
        drop: TREE_ACTIONS.MOVE_NODE
    },
    keys: {
        [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
        [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
        [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
        [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
        [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
        [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
    }
};
class TreeOptions {
    constructor(options = {}) {
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
            keys: {
                [KEYS.RIGHT]: TREE_ACTIONS.DRILL_DOWN,
                [KEYS.LEFT]: TREE_ACTIONS.DRILL_UP,
                [KEYS.DOWN]: TREE_ACTIONS.NEXT_NODE,
                [KEYS.UP]: TREE_ACTIONS.PREVIOUS_NODE,
                [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_ACTIVE,
                [KEYS.ENTER]: TREE_ACTIONS.TOGGLE_ACTIVE
            }
        };
        if ((_33 = (_32 = this.options) === null || _32 === void 0 ? void 0 : _32.actionMapping) === null || _33 === void 0 ? void 0 : _33.keys) {
            this.actionMapping.keys = Object.assign(Object.assign({}, this.actionMapping.keys), this.options.actionMapping.keys);
        }
        if (options.rtl) {
            this.actionMapping.keys[KEYS.RIGHT] = ((_34 = options.actionMapping) === null || _34 === void 0 ? void 0 : _34.keys[KEYS.RIGHT]) || TREE_ACTIONS.DRILL_UP;
            this.actionMapping.keys[KEYS.LEFT] = ((_35 = options.actionMapping) === null || _35 === void 0 ? void 0 : _35.keys[KEYS.LEFT]) || TREE_ACTIONS.DRILL_DOWN;
        }
    }
    get hasChildrenField() { return this.options.hasChildrenField || 'hasChildren'; }
    get childrenField() { return this.options.childrenField || 'children'; }
    get displayField() { return this.options.displayField || 'name'; }
    get idField() { return this.options.idField || 'id'; }
    get isExpandedField() { return this.options.isExpandedField || 'isExpanded'; }
    get getChildren() { return this.options.getChildren; }
    get levelPadding() { return this.options.levelPadding || 0; }
    get useVirtualScroll() { return this.options.useVirtualScroll; }
    get animateExpand() { return this.options.animateExpand; }
    get animateSpeed() { return this.options.animateSpeed || 1; }
    get animateAcceleration() { return this.options.animateAcceleration || 1.2; }
    get scrollOnActivate() { return this.options.scrollOnActivate === undefined ? true : this.options.scrollOnActivate; }
    get rtl() { return !!this.options.rtl; }
    get rootId() { return this.options.rootId; }
    get useCheckbox() { return this.options.useCheckbox; }
    get useTriState() { return this.options.useTriState === undefined ? true : this.options.useTriState; }
    get scrollContainer() { return this.options.scrollContainer; }
    get allowDragoverStyling() { return this.options.allowDragoverStyling === undefined ? true : this.options.allowDragoverStyling; }
    getNodeClone(node) {
        if (this.options.getNodeClone) {
            return this.options.getNodeClone(node);
        }
        // remove id from clone
        // keeping ie11 compatibility
        const nodeClone = Object.assign({}, node.data);
        if (nodeClone.id) {
            delete nodeClone.id;
        }
        return nodeClone;
    }
    allowDrop(element, to, $event) {
        if (this.options.allowDrop instanceof Function) {
            return this.options.allowDrop(element, to, $event);
        }
        else {
            return this.options.allowDrop === undefined ? true : this.options.allowDrop;
        }
    }
    allowDrag(node) {
        if (this.options.allowDrag instanceof Function) {
            return this.options.allowDrag(node);
        }
        else {
            return this.options.allowDrag;
        }
    }
    nodeClass(node) {
        return this.options.nodeClass ? this.options.nodeClass(node) : '';
    }
    nodeHeight(node) {
        if (node.data.virtual) {
            return 0;
        }
        let nodeHeight = this.options.nodeHeight || 22;
        if (typeof nodeHeight === 'function') {
            nodeHeight = nodeHeight(node);
        }
        // account for drop slots:
        return nodeHeight + (node.index === 0 ? 2 : 1) * this.dropSlotHeight;
    }
    get dropSlotHeight() {
        return typeof this.options.dropSlotHeight === 'number' ? this.options.dropSlotHeight : 2;
    }
}

const TREE_EVENTS = {
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class TreeNode {
    constructor(data, parent, treeModel, index) {
        this.data = data;
        this.parent = parent;
        this.treeModel = treeModel;
        this.position = 0;
        this.allowDrop = (element, $event) => {
            return this.options.allowDrop(element, { parent: this, index: 0 }, $event);
        };
        this.allowDragoverStyling = () => {
            return this.options.allowDragoverStyling;
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
    get isHidden() { return this.treeModel.isHidden(this); }
    ;
    get isExpanded() { return this.treeModel.isExpanded(this); }
    ;
    get isActive() { return this.treeModel.isActive(this); }
    ;
    get isFocused() { return this.treeModel.isNodeFocused(this); }
    ;
    get isSelected() {
        if (this.isSelectable()) {
            return this.treeModel.isSelected(this);
        }
        else {
            return this.children.some((node) => node.isSelected);
        }
    }
    ;
    get isAllSelected() {
        if (this.isSelectable()) {
            return this.treeModel.isSelected(this);
        }
        else {
            return this.children.every((node) => node.isAllSelected);
        }
    }
    ;
    get isPartiallySelected() {
        return this.isSelected && !this.isAllSelected;
    }
    get level() {
        return this.parent ? this.parent.level + 1 : 0;
    }
    get path() {
        return this.parent ? [...this.parent.path, this.id] : [];
    }
    get elementRef() {
        throw `Element Ref is no longer supported since introducing virtual scroll\n
      You may use a template to obtain a reference to the element`;
    }
    get originalNode() { return this._originalNode; }
    ;
    // helper get functions:
    get hasChildren() {
        return !!(this.getField('hasChildren') || (this.children && this.children.length > 0));
    }
    get isCollapsed() { return !this.isExpanded; }
    get isLeaf() { return !this.hasChildren; }
    get isRoot() { return this.parent.data.virtual; }
    get realParent() { return this.isRoot ? null : this.parent; }
    // proxy functions:
    get options() { return this.treeModel.options; }
    fireEvent(event) { this.treeModel.fireEvent(event); }
    // field accessors:
    get displayField() {
        return this.getField('display');
    }
    get id() {
        return this.getField('id');
    }
    set id(value) {
        this.setField('id', value);
    }
    getField(key) {
        return this.data[this.options[`${key}Field`]];
    }
    setField(key, value) {
        this.data[this.options[`${key}Field`]] = value;
    }
    // traversing:
    _findAdjacentSibling(steps, skipHidden = false) {
        const siblings = this._getParentsChildren(skipHidden);
        const index = siblings.indexOf(this);
        return siblings.length > index + steps ? siblings[index + steps] : null;
    }
    findNextSibling(skipHidden = false) {
        return this._findAdjacentSibling(+1, skipHidden);
    }
    findPreviousSibling(skipHidden = false) {
        return this._findAdjacentSibling(-1, skipHidden);
    }
    getVisibleChildren() {
        return this.visibleChildren;
    }
    get visibleChildren() {
        return (this.children || []).filter((node) => !node.isHidden);
    }
    getFirstChild(skipHidden = false) {
        let children = skipHidden ? this.visibleChildren : this.children;
        return children != null && children.length ? children[0] : null;
    }
    getLastChild(skipHidden = false) {
        let children = skipHidden ? this.visibleChildren : this.children;
        return children != null && children.length ? children[children.length - 1] : null;
    }
    findNextNode(goInside = true, skipHidden = false) {
        return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
            this.findNextSibling(skipHidden) ||
            this.parent && this.parent.findNextNode(false, skipHidden);
    }
    findPreviousNode(skipHidden = false) {
        let previousSibling = this.findPreviousSibling(skipHidden);
        if (!previousSibling) {
            return this.realParent;
        }
        return previousSibling._getLastOpenDescendant(skipHidden);
    }
    _getLastOpenDescendant(skipHidden = false) {
        const lastChild = this.getLastChild(skipHidden);
        return (this.isCollapsed || !lastChild)
            ? this
            : lastChild._getLastOpenDescendant(skipHidden);
    }
    _getParentsChildren(skipHidden = false) {
        const children = this.parent &&
            (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
        return children || [];
    }
    getIndexInParent(skipHidden = false) {
        return this._getParentsChildren(skipHidden).indexOf(this);
    }
    isDescendantOf(node) {
        if (this === node)
            return true;
        else
            return this.parent && this.parent.isDescendantOf(node);
    }
    getNodePadding() {
        return this.options.levelPadding * (this.level - 1) + 'px';
    }
    getClass() {
        return [this.options.nodeClass(this), `tree-node-level-${this.level}`].join(' ');
    }
    onDrop($event) {
        this.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this, index: 0, dropOnNode: true }
        });
    }
    allowDrag() {
        return this.options.allowDrag(this);
    }
    // helper methods:
    loadNodeChildren() {
        if (!this.options.getChildren) {
            return Promise.resolve(); // Not getChildren method - for using redux
        }
        return Promise.resolve(this.options.getChildren(this))
            .then((children) => {
            if (children) {
                this.setField('children', children);
                this._initChildren();
                if (this.options.useTriState && this.treeModel.isSelected(this)) {
                    this.setIsSelected(true);
                }
                this.children.forEach((child) => {
                    if (child.getField('isExpanded') && child.hasChildren) {
                        child.expand();
                    }
                });
            }
        }).then(() => {
            this.fireEvent({
                eventName: TREE_EVENTS.loadNodeChildren,
                node: this
            });
        });
    }
    expand() {
        if (!this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    }
    collapse() {
        if (this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    }
    doForAll(fn) {
        Promise.resolve(fn(this)).then(() => {
            if (this.children) {
                this.children.forEach((child) => child.doForAll(fn));
            }
        });
    }
    expandAll() {
        this.doForAll((node) => node.expand());
    }
    collapseAll() {
        this.doForAll((node) => node.collapse());
    }
    ensureVisible() {
        if (this.realParent) {
            this.realParent.expand();
            this.realParent.ensureVisible();
        }
        return this;
    }
    toggleExpanded() {
        this.setIsExpanded(!this.isExpanded);
        return this;
    }
    setIsExpanded(value) {
        if (this.hasChildren) {
            this.treeModel.setExpandedNode(this, value);
        }
        return this;
    }
    ;
    autoLoadChildren() {
        this.handler =
            reaction(() => this.isExpanded, (isExpanded) => {
                if (!this.children && this.hasChildren && isExpanded) {
                    this.loadNodeChildren();
                }
            }, { fireImmediately: true });
    }
    dispose() {
        if (this.children) {
            this.children.forEach((child) => child.dispose());
        }
        if (this.handler) {
            this.handler();
        }
        this.parent = null;
        this.children = null;
    }
    setIsActive(value, multi = false) {
        this.treeModel.setActiveNode(this, value, multi);
        if (value) {
            this.focus(this.options.scrollOnActivate);
        }
        return this;
    }
    isSelectable() {
        return this.isLeaf || !this.children || !this.options.useTriState;
    }
    setIsSelected(value) {
        if (this.isSelectable()) {
            this.treeModel.setSelectedNode(this, value);
        }
        else {
            this.visibleChildren.forEach((child) => child.setIsSelected(value));
        }
        return this;
    }
    toggleSelected() {
        this.setIsSelected(!this.isSelected);
        return this;
    }
    toggleActivated(multi = false) {
        this.setIsActive(!this.isActive, multi);
        return this;
    }
    setActiveAndVisible(multi = false) {
        this.setIsActive(true, multi)
            .ensureVisible();
        setTimeout(this.scrollIntoView.bind(this));
        return this;
    }
    scrollIntoView(force = false) {
        this.treeModel.virtualScroll.scrollIntoView(this, force);
    }
    focus(scroll = true) {
        let previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(this);
        if (scroll) {
            this.scrollIntoView();
        }
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.blur, node: previousNode });
        }
        this.fireEvent({ eventName: TREE_EVENTS.focus, node: this });
        return this;
    }
    blur() {
        let previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(null);
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.blur, node: this });
        }
        return this;
    }
    setIsHidden(value) {
        this.treeModel.setIsHidden(this, value);
    }
    hide() {
        this.setIsHidden(true);
    }
    show() {
        this.setIsHidden(false);
    }
    mouseAction(actionName, $event, data = null) {
        this.treeModel.setFocus(true);
        const actionMapping = this.options.actionMapping.mouse;
        const mouseAction = actionMapping[actionName];
        if (mouseAction) {
            mouseAction(this.treeModel, this, $event, data);
        }
    }
    getSelfHeight() {
        return this.options.nodeHeight(this);
    }
    _initChildren() {
        this.children = this.getField('children')
            .map((c, index) => new TreeNode(c, this, this.treeModel, index));
    }
}
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isHidden", null);
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isExpanded", null);
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isActive", null);
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isFocused", null);
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isSelected", null);
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isAllSelected", null);
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isPartiallySelected", null);
__decorate([
    observable$1,
    __metadata("design:type", Array)
], TreeNode.prototype, "children", void 0);
__decorate([
    observable$1,
    __metadata("design:type", Number)
], TreeNode.prototype, "index", void 0);
__decorate([
    observable$1,
    __metadata("design:type", Object)
], TreeNode.prototype, "position", void 0);
__decorate([
    observable$1,
    __metadata("design:type", Number)
], TreeNode.prototype, "height", void 0);
__decorate([
    computed$1,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "level", null);
__decorate([
    computed$1,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "path", null);
__decorate([
    computed$1,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "visibleChildren", null);
__decorate([
    action$1,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeNode.prototype, "setIsSelected", null);
__decorate([
    action$1,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeNode.prototype, "_initChildren", null);
function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class TreeModel {
    constructor() {
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
    fireEvent(event) {
        event.treeModel = this;
        this.events[event.eventName].emit(event);
        this.events.event.emit(event);
    }
    subscribe(eventName, fn) {
        const subscription = this.events[eventName].subscribe(fn);
        this.subscriptions.push(subscription);
    }
    // getters
    getFocusedNode() {
        return this.focusedNode;
    }
    getActiveNode() {
        return this.activeNodes[0];
    }
    getActiveNodes() {
        return this.activeNodes;
    }
    getVisibleRoots() {
        return this.virtualRoot.visibleChildren;
    }
    getFirstRoot(skipHidden = false) {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return root != null && root.length ? root[0] : null;
    }
    getLastRoot(skipHidden = false) {
        const root = skipHidden ? this.getVisibleRoots() : this.roots;
        return root != null && root.length ? root[root.length - 1] : null;
    }
    get isFocused() {
        return TreeModel.focusedTree === this;
    }
    isNodeFocused(node) {
        return this.focusedNode === node;
    }
    isEmptyTree() {
        return this.roots && this.roots.length === 0;
    }
    get focusedNode() {
        return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
    }
    get expandedNodes() {
        const nodes = Object.keys(this.expandedNodeIds)
            .filter((id) => this.expandedNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get activeNodes() {
        const nodes = Object.keys(this.activeNodeIds)
            .filter((id) => this.activeNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get hiddenNodes() {
        const nodes = Object.keys(this.hiddenNodeIds)
            .filter((id) => this.hiddenNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    get selectedLeafNodes() {
        const nodes = Object.keys(this.selectedLeafNodeIds)
            .filter((id) => this.selectedLeafNodeIds[id])
            .map((id) => this.getNodeById(id));
        return nodes.filter(Boolean);
    }
    // locating nodes
    getNodeByPath(path, startNode = null) {
        if (!path)
            return null;
        startNode = startNode || this.virtualRoot;
        if (path.length === 0)
            return startNode;
        if (!startNode.children)
            return null;
        const childId = path.shift();
        const childNode = startNode.children.find(c => c.id === childId);
        if (!childNode)
            return null;
        return this.getNodeByPath(path, childNode);
    }
    getNodeById(id) {
        const idStr = id.toString();
        return this.getNodeBy((node) => node.id.toString() === idStr);
    }
    getNodeBy(predicate, startNode = null) {
        startNode = startNode || this.virtualRoot;
        if (!startNode.children)
            return null;
        const found = startNode.children.find(predicate);
        if (found) { // found in children
            return found;
        }
        else { // look in children's children
            for (let child of startNode.children) {
                const foundInChildren = this.getNodeBy(predicate, child);
                if (foundInChildren)
                    return foundInChildren;
            }
        }
    }
    isExpanded(node) {
        return this.expandedNodeIds[node.id];
    }
    isHidden(node) {
        return this.hiddenNodeIds[node.id];
    }
    isActive(node) {
        return this.activeNodeIds[node.id];
    }
    isSelected(node) {
        return this.selectedLeafNodeIds[node.id];
    }
    ngOnDestroy() {
        this.dispose();
        this.unsubscribeAll();
    }
    dispose() {
        // Dispose reactions of the replaced nodes
        if (this.virtualRoot) {
            this.virtualRoot.dispose();
        }
    }
    unsubscribeAll() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
    // actions
    setData({ nodes, options = null, events = null }) {
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
    }
    update() {
        // Rebuild tree:
        let virtualRootConfig = {
            id: this.options.rootId,
            virtual: true,
            [this.options.childrenField]: this.nodes
        };
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
    }
    setFocusedNode(node) {
        this.focusedNodeId = node ? node.id : null;
    }
    setFocus(value) {
        TreeModel.focusedTree = value ? this : null;
    }
    doForAll(fn) {
        this.roots.forEach((root) => root.doForAll(fn));
    }
    focusNextNode() {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
        if (nextNode)
            nextNode.focus();
    }
    focusPreviousNode() {
        let previousNode = this.getFocusedNode();
        let nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
        if (nextNode)
            nextNode.focus();
    }
    focusDrillDown() {
        let previousNode = this.getFocusedNode();
        if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
            previousNode.toggleExpanded();
        }
        else {
            let nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
            if (nextNode)
                nextNode.focus();
        }
    }
    focusDrillUp() {
        let previousNode = this.getFocusedNode();
        if (!previousNode)
            return;
        if (previousNode.isExpanded) {
            previousNode.toggleExpanded();
        }
        else {
            let nextNode = previousNode.realParent;
            if (nextNode)
                nextNode.focus();
        }
    }
    setActiveNode(node, value, multi = false) {
        if (multi) {
            this._setActiveNodeMulti(node, value);
        }
        else {
            this._setActiveNodeSingle(node, value);
        }
        if (value) {
            node.focus(this.options.scrollOnActivate);
            this.fireEvent({ eventName: TREE_EVENTS.activate, node });
            this.fireEvent({ eventName: TREE_EVENTS.nodeActivate, node }); // For IE11
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.deactivate, node });
            this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node }); // For IE11
        }
    }
    setSelectedNode(node, value) {
        this.selectedLeafNodeIds = Object.assign({}, this.selectedLeafNodeIds, { [node.id]: value });
        if (value) {
            node.focus();
            this.fireEvent({ eventName: TREE_EVENTS.select, node });
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.deselect, node });
        }
    }
    setExpandedNode(node, value) {
        this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [node.id]: value });
        this.fireEvent({ eventName: TREE_EVENTS.toggleExpanded, node, isExpanded: value });
    }
    expandAll() {
        this.roots.forEach((root) => root.expandAll());
    }
    collapseAll() {
        this.roots.forEach((root) => root.collapseAll());
    }
    setIsHidden(node, value) {
        this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, { [node.id]: value });
    }
    setHiddenNodeIds(nodeIds) {
        this.hiddenNodeIds = nodeIds.reduce((hiddenNodeIds, id) => Object.assign(hiddenNodeIds, {
            [id]: true
        }), {});
    }
    performKeyAction(node, $event) {
        const keyAction = this.options.actionMapping.keys[$event.keyCode];
        if (keyAction) {
            $event.preventDefault();
            keyAction(this, node, $event);
            return true;
        }
        else {
            return false;
        }
    }
    filterNodes(filter, autoShow = true) {
        let filterFn;
        if (!filter) {
            return this.clearFilter();
        }
        // support function and string filter
        if (filter && typeof filter.valueOf() === 'string') {
            filterFn = (node) => node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        }
        else if (filter && typeof filter === 'function') {
            filterFn = filter;
        }
        else {
            console.error('Don\'t know what to do with filter', filter);
            console.error('Should be either a string or function');
            return;
        }
        const ids = {};
        this.roots.forEach((node) => this._filterNode(ids, node, filterFn, autoShow));
        this.hiddenNodeIds = ids;
        this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
    }
    clearFilter() {
        this.hiddenNodeIds = {};
        this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
    }
    moveNode(node, to) {
        const fromIndex = node.getIndexInParent();
        const fromParent = node.parent;
        if (!this.canMoveNode(node, to, fromIndex))
            return;
        const fromChildren = fromParent.getField('children');
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        const toChildren = to.parent.getField('children');
        const originalNode = fromChildren.splice(fromIndex, 1)[0];
        // Compensate for index if already removed from parent:
        let toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
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
    }
    copyNode(node, to) {
        const fromIndex = node.getIndexInParent();
        if (!this.canMoveNode(node, to, fromIndex))
            return;
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        const toChildren = to.parent.getField('children');
        const nodeCopy = this.options.getNodeClone(node);
        toChildren.splice(to.index, 0, nodeCopy);
        node.treeModel.update();
        if (to.parent.treeModel !== node.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({ eventName: TREE_EVENTS.copyNode, node: nodeCopy, to: { parent: to.parent.data, index: to.index } });
    }
    getState() {
        return {
            expandedNodeIds: this.expandedNodeIds,
            selectedLeafNodeIds: this.selectedLeafNodeIds,
            activeNodeIds: this.activeNodeIds,
            hiddenNodeIds: this.hiddenNodeIds,
            focusedNodeId: this.focusedNodeId
        };
    }
    setState(state) {
        if (!state)
            return;
        Object.assign(this, {
            expandedNodeIds: state.expandedNodeIds || {},
            selectedLeafNodeIds: state.selectedLeafNodeIds || {},
            activeNodeIds: state.activeNodeIds || {},
            hiddenNodeIds: state.hiddenNodeIds || {},
            focusedNodeId: state.focusedNodeId
        });
    }
    subscribeToState(fn) {
        autorun(() => fn(this.getState()));
    }
    canMoveNode(node, to, fromIndex = undefined) {
        const fromNodeIndex = fromIndex || node.getIndexInParent();
        // same node:
        if (node.parent === to.parent && fromIndex === to.index) {
            return false;
        }
        return !to.parent.isDescendantOf(node);
    }
    calculateExpandedNodes() {
        this._calculateExpandedNodes();
    }
    // private methods
    _filterNode(ids, node, filterFn, autoShow) {
        // if node passes function then it's visible
        let isVisible = filterFn(node);
        if (node.children) {
            // if one of node's children passes filter then this node is also visible
            node.children.forEach((child) => {
                if (this._filterNode(ids, child, filterFn, autoShow)) {
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
    }
    _calculateExpandedNodes(startNode = null) {
        startNode = startNode || this.virtualRoot;
        if (startNode.data[this.options.isExpandedField]) {
            this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [startNode.id]: true });
        }
        if (startNode.children) {
            startNode.children.forEach((child) => this._calculateExpandedNodes(child));
        }
    }
    _setActiveNodeSingle(node, value) {
        // Deactivate all other nodes:
        this.activeNodes
            .filter((activeNode) => activeNode !== node)
            .forEach((activeNode) => {
            this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: activeNode });
            this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: activeNode }); // For IE11
        });
        if (value) {
            this.activeNodeIds = { [node.id]: true };
        }
        else {
            this.activeNodeIds = {};
        }
    }
    _setActiveNodeMulti(node, value) {
        this.activeNodeIds = Object.assign({}, this.activeNodeIds, { [node.id]: value });
    }
}
TreeModel.focusedTree = null;
TreeModel.decorators = [
    { type: Injectable }
];
__decorate$1([
    observable$1,
    __metadata$1("design:type", Array)
], TreeModel.prototype, "roots", void 0);
__decorate$1([
    observable$1,
    __metadata$1("design:type", Object)
], TreeModel.prototype, "expandedNodeIds", void 0);
__decorate$1([
    observable$1,
    __metadata$1("design:type", Object)
], TreeModel.prototype, "selectedLeafNodeIds", void 0);
__decorate$1([
    observable$1,
    __metadata$1("design:type", Object)
], TreeModel.prototype, "activeNodeIds", void 0);
__decorate$1([
    observable$1,
    __metadata$1("design:type", Object)
], TreeModel.prototype, "hiddenNodeIds", void 0);
__decorate$1([
    observable$1,
    __metadata$1("design:type", Object)
], TreeModel.prototype, "focusedNodeId", void 0);
__decorate$1([
    observable$1,
    __metadata$1("design:type", TreeNode)
], TreeModel.prototype, "virtualRoot", void 0);
__decorate$1([
    computed$1,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeModel.prototype, "focusedNode", null);
__decorate$1([
    computed$1,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeModel.prototype, "expandedNodes", null);
__decorate$1([
    computed$1,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeModel.prototype, "activeNodes", null);
__decorate$1([
    computed$1,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeModel.prototype, "hiddenNodes", null);
__decorate$1([
    computed$1,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeModel.prototype, "selectedLeafNodes", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setData", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "update", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setFocusedNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setFocus", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "doForAll", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "focusNextNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "focusPreviousNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "focusDrillDown", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "focusDrillUp", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object, Object, Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setActiveNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object, Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setSelectedNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object, Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setExpandedNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "expandAll", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "collapseAll", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object, Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setIsHidden", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setHiddenNodeIds", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object, Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "filterNodes", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", []),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "clearFilter", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object, Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "moveNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object, Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "copyNode", null);
__decorate$1([
    action$1,
    __metadata$1("design:type", Function),
    __metadata$1("design:paramtypes", [Object]),
    __metadata$1("design:returntype", void 0)
], TreeModel.prototype, "setState", null);

class TreeDraggedElement {
    constructor() {
        this._draggedElement = null;
    }
    set(draggedElement) {
        this._draggedElement = draggedElement;
    }
    get() {
        return this._draggedElement;
    }
    isDragging() {
        return !!this.get();
    }
}
/** @nocollapse */ TreeDraggedElement.ɵprov = ɵɵdefineInjectable({ factory: function TreeDraggedElement_Factory() { return new TreeDraggedElement(); }, token: TreeDraggedElement, providedIn: "root" });
TreeDraggedElement.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
class TreeVirtualScroll {
    constructor(treeModel) {
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = [autorun(() => this.fixScroll())];
    }
    get y() {
        return this.yBlocks * Y_EPSILON;
    }
    get totalHeight() {
        return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
    }
    fireEvent(event) {
        this.treeModel.fireEvent(event);
    }
    init() {
        const fn = this.recalcPositions.bind(this);
        fn();
        this._dispose = [
            ...this._dispose,
            reaction(() => this.treeModel.roots, fn),
            reaction(() => this.treeModel.expandedNodeIds, fn),
            reaction(() => this.treeModel.hiddenNodeIds, fn)
        ];
        this.treeModel.subscribe(TREE_EVENTS.loadNodeChildren, fn);
    }
    isEnabled() {
        return this.treeModel.options.useVirtualScroll;
    }
    _setYBlocks(value) {
        this.yBlocks = value;
    }
    recalcPositions() {
        this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
    }
    _getPositionAfter(nodes, startPos) {
        let position = startPos;
        nodes.forEach((node) => {
            node.position = position;
            position = this._getPositionAfterNode(node, position);
        });
        return position;
    }
    _getPositionAfterNode(node, startPos) {
        let position = node.getSelfHeight() + startPos;
        if (node.children && node.isExpanded) { // TBD: consider loading component as well
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return position;
    }
    clear() {
        this._dispose.forEach((d) => d());
    }
    setViewport(viewport) {
        Object.assign(this, {
            viewport,
            x: viewport.scrollLeft,
            yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
            viewportHeight: viewport.getBoundingClientRect ? viewport.getBoundingClientRect().height : 0
        });
    }
    scrollIntoView(node, force, scrollToMiddle = true) {
        if (node.options.scrollContainer) {
            const scrollContainer = node.options.scrollContainer;
            const scrollContainerHeight = scrollContainer.getBoundingClientRect().height;
            const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
            const nodeTop = this.viewport.getBoundingClientRect().top + node.position - scrollContainerTop;
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
    }
    getViewportNodes(nodes) {
        if (!nodes)
            return [];
        const visibleNodes = nodes.filter((node) => !node.isHidden);
        if (!this.isEnabled())
            return visibleNodes;
        if (!this.viewportHeight || !visibleNodes.length)
            return [];
        // When loading children async this method is called before their height and position is calculated.
        // In that case firstIndex === 0 and lastIndex === visibleNodes.length - 1 (e.g. 1000),
        // which means that it loops through every visibleNodes item and push them into viewportNodes array.
        // We can prevent nodes from being pushed to the array and wait for the appropriate calculations to take place
        const lastVisibleNode = visibleNodes.slice(-1)[0];
        if (!lastVisibleNode.height && lastVisibleNode.position === 0)
            return [];
        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        const firstIndex = binarySearch(visibleNodes, (node) => {
            return (node.position + Y_OFFSET > this.y) ||
                (node.position + node.height > this.y);
        });
        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        const lastIndex = binarySearch(visibleNodes, (node) => {
            return node.position - Y_OFFSET > this.y + this.viewportHeight;
        }, firstIndex);
        const viewportNodes = [];
        for (let i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push(visibleNodes[i]);
        }
        return viewportNodes;
    }
    fixScroll() {
        const maxY = Math.max(0, this.totalHeight - this.viewportHeight);
        if (this.y < 0)
            this._setYBlocks(0);
        if (this.y > maxY)
            this._setYBlocks(maxY / Y_EPSILON);
    }
}
TreeVirtualScroll.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TreeVirtualScroll.ctorParameters = () => [
    { type: TreeModel }
];
__decorate$2([
    observable$1,
    __metadata$2("design:type", Object)
], TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate$2([
    observable$1,
    __metadata$2("design:type", Object)
], TreeVirtualScroll.prototype, "x", void 0);
__decorate$2([
    observable$1,
    __metadata$2("design:type", Object)
], TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate$2([
    computed$1,
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [])
], TreeVirtualScroll.prototype, "y", null);
__decorate$2([
    computed$1,
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [])
], TreeVirtualScroll.prototype, "totalHeight", null);
__decorate$2([
    action$1,
    __metadata$2("design:type", Function),
    __metadata$2("design:paramtypes", [Object]),
    __metadata$2("design:returntype", void 0)
], TreeVirtualScroll.prototype, "_setYBlocks", null);
__decorate$2([
    action$1,
    __metadata$2("design:type", Function),
    __metadata$2("design:paramtypes", []),
    __metadata$2("design:returntype", void 0)
], TreeVirtualScroll.prototype, "recalcPositions", null);
__decorate$2([
    action$1,
    __metadata$2("design:type", Function),
    __metadata$2("design:paramtypes", [Object]),
    __metadata$2("design:returntype", void 0)
], TreeVirtualScroll.prototype, "setViewport", null);
__decorate$2([
    action$1,
    __metadata$2("design:type", Function),
    __metadata$2("design:paramtypes", [Object, Object, Object]),
    __metadata$2("design:returntype", void 0)
], TreeVirtualScroll.prototype, "scrollIntoView", null);
function binarySearch(nodes, condition, firstIndex = 0) {
    let index = firstIndex;
    let toIndex = nodes.length - 1;
    while (index !== toIndex) {
        let midIndex = Math.floor((index + toIndex) / 2);
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

class LoadingComponent {
}
LoadingComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'tree-loading-component',
                template: `
    <span *ngIf="!template">loading...</span>
    <ng-container
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{ $implicit: node }">
    </ng-container>
  `
            },] }
];
LoadingComponent.propDecorators = {
    template: [{ type: Input }],
    node: [{ type: Input }]
};

class TreeViewportComponent {
    constructor(elementRef, virtualScroll) {
        this.elementRef = elementRef;
        this.virtualScroll = virtualScroll;
        this.setViewport = this.throttle(() => {
            this.virtualScroll.setViewport(this.elementRef.nativeElement);
        }, 17);
        this.scrollEventHandler = this.setViewport.bind(this);
    }
    ngOnInit() {
        this.virtualScroll.init();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.setViewport();
            this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
        });
        let el = this.elementRef.nativeElement;
        el.addEventListener('scroll', this.scrollEventHandler);
    }
    ngOnDestroy() {
        this.virtualScroll.clear();
        let el = this.elementRef.nativeElement;
        el.removeEventListener('scroll', this.scrollEventHandler);
    }
    getTotalHeight() {
        return ((this.virtualScroll.isEnabled() &&
            this.virtualScroll.totalHeight + 'px') ||
            'auto');
    }
    throttle(func, timeFrame) {
        let lastTime = 0;
        return function () {
            let now = Date.now();
            if (now - lastTime >= timeFrame) {
                func();
                lastTime = now;
            }
        };
    }
}
TreeViewportComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-viewport',
                providers: [TreeVirtualScroll],
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.height]="getTotalHeight()">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `
            },] }
];
/** @nocollapse */
TreeViewportComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: TreeVirtualScroll }
];

class TreeComponent {
    constructor(treeModel, treeDraggedElement) {
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
        treeModel.subscribeToState((state) => this.stateChange.emit(state));
    }
    // Will be handled in ngOnChanges
    set nodes(nodes) {
    }
    ;
    set options(options) {
    }
    ;
    set focused(value) {
        this.treeModel.setFocus(value);
    }
    set state(state) {
        this.treeModel.setState(state);
    }
    onKeydown($event) {
        if (!this.treeModel.isFocused)
            return;
        if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase()))
            return;
        const focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    }
    onMousedown($event) {
        function isOutsideClick(startElement, nodeName) {
            return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement.parentElement, nodeName);
        }
        if (isOutsideClick($event.target, 'tree-root')) {
            this.treeModel.setFocus(false);
        }
    }
    ngOnChanges(changes) {
        if (changes.options || changes.nodes) {
            this.treeModel.setData({
                options: changes.options && changes.options.currentValue,
                nodes: changes.nodes && changes.nodes.currentValue,
                events: this.pick(this, this.treeModel.eventNames)
            });
        }
    }
    sizeChanged() {
        this.viewportComponent.setViewport();
    }
    pick(object, keys) {
        return keys.reduce((obj, key) => {
            if (object && object.hasOwnProperty(key)) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
    }
}
TreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'Tree, tree-root',
                providers: [TreeModel],
                template: `
      <tree-viewport #viewport>
          <div
                  class="angular-tree-component"
                  [class.node-dragging]="treeDraggedElement.isDragging()"
                  [class.angular-tree-component-rtl]="treeModel.options.rtl">
              <tree-node-collection
                      *ngIf="treeModel.roots"
                      [nodes]="treeModel.roots"
                      [treeModel]="treeModel"
                      [templates]="{
            loadingTemplate: loadingTemplate,
            treeNodeTemplate: treeNodeTemplate,
            treeNodeWrapperTemplate: treeNodeWrapperTemplate,
            treeNodeFullTemplate: treeNodeFullTemplate
          }">
              </tree-node-collection>
              <tree-node-drop-slot
                      class="empty-tree-drop-slot"
                      *ngIf="treeModel.isEmptyTree()"
                      [dropIndex]="0"
                      [node]="treeModel.virtualRoot">
              </tree-node-drop-slot>
          </div>
      </tree-viewport>
  `
            },] }
];
/** @nocollapse */
TreeComponent.ctorParameters = () => [
    { type: TreeModel },
    { type: TreeDraggedElement }
];
TreeComponent.propDecorators = {
    loadingTemplate: [{ type: ContentChild, args: ['loadingTemplate', { static: false },] }],
    treeNodeTemplate: [{ type: ContentChild, args: ['treeNodeTemplate', { static: false },] }],
    treeNodeWrapperTemplate: [{ type: ContentChild, args: ['treeNodeWrapperTemplate', { static: false },] }],
    treeNodeFullTemplate: [{ type: ContentChild, args: ['treeNodeFullTemplate', { static: false },] }],
    viewportComponent: [{ type: ViewChild, args: ['viewport', { static: false },] }],
    nodes: [{ type: Input }],
    options: [{ type: Input }],
    focused: [{ type: Input }],
    state: [{ type: Input }],
    toggleExpanded: [{ type: Output }],
    activate: [{ type: Output }],
    deactivate: [{ type: Output }],
    nodeActivate: [{ type: Output }],
    nodeDeactivate: [{ type: Output }],
    select: [{ type: Output }],
    deselect: [{ type: Output }],
    focus: [{ type: Output }],
    blur: [{ type: Output }],
    updateData: [{ type: Output }],
    initialized: [{ type: Output }],
    moveNode: [{ type: Output }],
    copyNode: [{ type: Output }],
    loadNodeChildren: [{ type: Output }],
    changeFilter: [{ type: Output }],
    event: [{ type: Output }],
    stateChange: [{ type: Output }],
    onKeydown: [{ type: HostListener, args: ['body: keydown', ['$event'],] }],
    onMousedown: [{ type: HostListener, args: ['body: mousedown', ['$event'],] }]
};

class TreeNodeComponent {
}
TreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'TreeNode, tree-node',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        *ngIf="!templates.treeNodeFullTemplate"
        [class]="node.getClass()"
        [class.tree-node]="true"
        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
        [class.tree-node-leaf]="node.isLeaf"
        [class.tree-node-active]="node.isActive"
        [class.tree-node-focused]="node.isFocused"
      >
        <tree-node-drop-slot
          *ngIf="index === 0"
          [dropIndex]="node.index"
          [node]="node.parent"
        ></tree-node-drop-slot>

        <tree-node-wrapper
          [node]="node"
          [index]="index"
          [templates]="templates"
        ></tree-node-wrapper>

        <tree-node-children
          [node]="node"
          [templates]="templates"
        ></tree-node-children>
        <tree-node-drop-slot
          [dropIndex]="node.index + 1"
          [node]="node.parent"
        ></tree-node-drop-slot>
      </div>
      <ng-container
        [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngTemplateOutletContext]="{
          $implicit: node,
          node: node,
          index: index,
          templates: templates
        }"
      >
      </ng-container>
    </ng-container>
  `
            },] }
];
TreeNodeComponent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    templates: [{ type: Input }]
};

class TreeNodeContent {
}
TreeNodeContent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-content',
                encapsulation: ViewEncapsulation.None,
                template: `
  <span *ngIf="!template">{{ node.displayField }}</span>
  <ng-container
    [ngTemplateOutlet]="template"
    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }">
  </ng-container>`
            },] }
];
TreeNodeContent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    template: [{ type: Input }]
};

class TreeNodeDropSlot {
    onDrop($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex }
        });
    }
    allowDrop(element, $event) {
        return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex }, $event);
    }
}
TreeNodeDropSlot.decorators = [
    { type: Component, args: [{
                selector: 'TreeNodeDropSlot, tree-node-drop-slot',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div
      class="node-drop-slot"
      (treeDrop)="onDrop($event)"
      [treeAllowDrop]="allowDrop.bind(this)"
      [allowDragoverStyling]="true">
    </div>
  `
            },] }
];
TreeNodeDropSlot.propDecorators = {
    node: [{ type: Input }],
    dropIndex: [{ type: Input }]
};

class TreeNodeExpanderComponent {
}
TreeNodeExpanderComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-expander',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <span
        *ngIf="node.hasChildren"
        [class.toggle-children-wrapper-expanded]="node.isExpanded"
        [class.toggle-children-wrapper-collapsed]="node.isCollapsed"
        class="toggle-children-wrapper"
        (click)="node.mouseAction('expanderClick', $event)"
      >
        <span class="toggle-children"></span>
      </span>
      <span *ngIf="!node.hasChildren" class="toggle-children-placeholder">
      </span>
    </ng-container>
  `
            },] }
];
TreeNodeExpanderComponent.propDecorators = {
    node: [{ type: Input }]
};

class TreeNodeChildrenComponent {
}
TreeNodeChildrenComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-children',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        [class.tree-children]="true"
        [class.tree-children-no-padding]="node.options.levelPadding"
        *treeAnimateOpen="
          node.isExpanded;
          speed: node.options.animateSpeed;
          acceleration: node.options.animateAcceleration;
          enabled: node.options.animateExpand
        "
      >
        <tree-node-collection
          *ngIf="node.children"
          [nodes]="node.children"
          [templates]="templates"
          [treeModel]="node.treeModel"
        >
        </tree-node-collection>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
          [node]="node"
        ></tree-loading-component>
      </div>
    </ng-container>
  `
            },] }
];
TreeNodeChildrenComponent.propDecorators = {
    node: [{ type: Input }],
    templates: [{ type: Input }]
};

// Re-export mobx operators to be able to use inside components with AOT:
function actionInternal(...args) {
    return action$1(...args);
}
const action = Object.assign(actionInternal, action$1);
function computedInternal(...args) {
    return computed$1(...args);
}
const computed = Object.assign(computedInternal, computed$1);
function observableInternal(...args) {
    return observable$1(...args);
}
const observable = Object.assign(observableInternal, observable$1);

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class TreeNodeCollectionComponent {
    constructor() {
        this._dispose = [];
    }
    get nodes() {
        return this._nodes;
    }
    set nodes(nodes) {
        this.setNodes(nodes);
    }
    get marginTop() {
        const firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
        const relativePosition = firstNode && firstNode.parent
            ? firstNode.position -
                firstNode.parent.position -
                firstNode.parent.getSelfHeight()
            : 0;
        return `${relativePosition}px`;
    }
    setNodes(nodes) {
        this._nodes = nodes;
    }
    ngOnInit() {
        this.virtualScroll = this.treeModel.virtualScroll;
        this._dispose = [
            // return node indexes so we can compare structurally,
            reaction(() => {
                return this.virtualScroll
                    .getViewportNodes(this.nodes)
                    .map(n => n.index);
            }, nodeIndexes => {
                this.viewportNodes = nodeIndexes.map(i => this.nodes[i]);
            }, { compareStructural: true, fireImmediately: true }),
            reaction(() => this.nodes, nodes => {
                this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
            })
        ];
    }
    ngOnDestroy() {
        this._dispose.forEach(d => d());
    }
    trackNode(index, node) {
        return node.id;
    }
}
TreeNodeCollectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-collection',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `
            },] }
];
TreeNodeCollectionComponent.propDecorators = {
    nodes: [{ type: Input }],
    treeModel: [{ type: Input }],
    templates: [{ type: Input }]
};
__decorate$3([
    observable,
    __metadata$3("design:type", Object)
], TreeNodeCollectionComponent.prototype, "_nodes", void 0);
__decorate$3([
    observable,
    __metadata$3("design:type", Array)
], TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
__decorate$3([
    computed,
    __metadata$3("design:type", String),
    __metadata$3("design:paramtypes", [])
], TreeNodeCollectionComponent.prototype, "marginTop", null);
__decorate$3([
    action,
    __metadata$3("design:type", Function),
    __metadata$3("design:paramtypes", [Object]),
    __metadata$3("design:returntype", void 0)
], TreeNodeCollectionComponent.prototype, "setNodes", null);

class TreeNodeWrapperComponent {
}
TreeNodeWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-wrapper',
                encapsulation: ViewEncapsulation.None,
                template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (click)="node.mouseAction('click', $event)"
               (dblclick)="node.mouseAction('dblClick', $event)"
               (mouseover)="node.mouseAction('mouseOver', $event)"
               (mouseout)="node.mouseAction('mouseOut', $event)"
               (contextmenu)="node.mouseAction('contextMenu', $event)"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  `
            },] }
];
TreeNodeWrapperComponent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    templates: [{ type: Input }]
};

class TreeNodeCheckboxComponent {
}
TreeNodeCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-checkbox',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <input
        class="tree-node-checkbox"
        type="checkbox"
        (click)="node.mouseAction('checkboxClick', $event)"
        [checked]="node.isSelected"
        [indeterminate]="node.isPartiallySelected"
      />
    </ng-container>
  `
            },] }
];
TreeNodeCheckboxComponent.propDecorators = {
    node: [{ type: Input }]
};

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
class TreeDropDirective {
    constructor(el, renderer, treeDraggedElement, ngZone) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.ngZone = ngZone;
        this.allowDragoverStyling = true;
        this.onDropCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragLeaveCallback = new EventEmitter();
        this.onDragEnterCallback = new EventEmitter();
        this._allowDrop = (element, $event) => true;
        this.dragOverEventHandler = this.onDragOver.bind(this);
        this.dragEnterEventHandler = this.onDragEnter.bind(this);
        this.dragLeaveEventHandler = this.onDragLeave.bind(this);
    }
    set treeAllowDrop(allowDrop) {
        if (allowDrop instanceof Function) {
            this._allowDrop = allowDrop;
        }
        else
            this._allowDrop = (element, $event) => allowDrop;
    }
    allowDrop($event) {
        return this._allowDrop(this.treeDraggedElement.get(), $event);
    }
    ngAfterViewInit() {
        let el = this.el.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            el.addEventListener('dragover', this.dragOverEventHandler);
            el.addEventListener('dragenter', this.dragEnterEventHandler);
            el.addEventListener('dragleave', this.dragLeaveEventHandler);
        });
    }
    ngOnDestroy() {
        let el = this.el.nativeElement;
        el.removeEventListener('dragover', this.dragOverEventHandler);
        el.removeEventListener('dragenter', this.dragEnterEventHandler);
        el.removeEventListener('dragleave', this.dragLeaveEventHandler);
    }
    onDragOver($event) {
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
    }
    onDragEnter($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDragEnterCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
    }
    onDragLeave($event) {
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
    }
    onDrop($event) {
        if (!this.allowDrop($event))
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        if (this.allowDragoverStyling) {
            this.removeClass();
        }
        this.treeDraggedElement.set(null);
    }
    addClass() {
        this.renderer.addClass(this.el.nativeElement, DRAG_OVER_CLASS);
    }
    removeClass() {
        this.renderer.removeClass(this.el.nativeElement, DRAG_OVER_CLASS);
    }
    addDisabledClass() {
        this.renderer.addClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
    }
    removeDisabledClass() {
        this.renderer.removeClass(this.el.nativeElement, DRAG_DISABLED_CLASS);
    }
}
TreeDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[treeDrop]'
            },] }
];
/** @nocollapse */
TreeDropDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: TreeDraggedElement },
    { type: NgZone }
];
TreeDropDirective.propDecorators = {
    allowDragoverStyling: [{ type: Input }],
    onDropCallback: [{ type: Output, args: ['treeDrop',] }],
    onDragOverCallback: [{ type: Output, args: ['treeDropDragOver',] }],
    onDragLeaveCallback: [{ type: Output, args: ['treeDropDragLeave',] }],
    onDragEnterCallback: [{ type: Output, args: ['treeDropDragEnter',] }],
    treeAllowDrop: [{ type: Input }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};

const DRAG_OVER_CLASS$1 = 'is-dragging-over';
class TreeDragDirective {
    constructor(el, renderer, treeDraggedElement, ngZone) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.ngZone = ngZone;
        this.dragEventHandler = this.onDrag.bind(this);
    }
    ngAfterViewInit() {
        let el = this.el.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            el.addEventListener('drag', this.dragEventHandler);
        });
    }
    ngDoCheck() {
        this.renderer.setAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
    }
    ngOnDestroy() {
        let el = this.el.nativeElement;
        el.removeEventListener('drag', this.dragEventHandler);
    }
    onDragStart(ev) {
        // setting the data is required by firefox
        ev.dataTransfer.setData('text', ev.target.id);
        this.treeDraggedElement.set(this.draggedElement);
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('dragStart', ev);
        }
    }
    onDrag(ev) {
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('drag', ev);
        }
    }
    onDragEnd() {
        if (this.draggedElement.mouseAction) {
            this.draggedElement.mouseAction('dragEnd');
        }
        this.treeDraggedElement.set(null);
    }
}
TreeDragDirective.decorators = [
    { type: Directive, args: [{
                selector: '[treeDrag]'
            },] }
];
/** @nocollapse */
TreeDragDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: TreeDraggedElement },
    { type: NgZone }
];
TreeDragDirective.propDecorators = {
    draggedElement: [{ type: Input, args: ['treeDrag',] }],
    treeDragEnabled: [{ type: Input }],
    onDragStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    onDragEnd: [{ type: HostListener, args: ['dragend',] }]
};

const EASE_ACCELERATION = 1.005;
class TreeAnimateOpenDirective {
    constructor(renderer, templateRef, viewContainerRef) {
        this.renderer = renderer;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }
    set isOpen(value) {
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
    }
    ;
    _show() {
        if (this.innerElement)
            return;
        // create child view
        this.innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
    }
    _hide() {
        this.viewContainerRef.clear();
        this.innerElement = null;
    }
    _animateOpen() {
        let delta = this.animateSpeed;
        let ease = this.animateAcceleration;
        let maxHeight = 0;
        // set height to 0
        this.renderer.setStyle(this.innerElement, 'max-height', `0`);
        // increase maxHeight until height doesn't change
        setTimeout(() => {
            const i = setInterval(() => {
                if (!this._isOpen || !this.innerElement)
                    return clearInterval(i);
                maxHeight += delta;
                const roundedMaxHeight = Math.round(maxHeight);
                this.renderer.setStyle(this.innerElement, 'max-height', `${roundedMaxHeight}px`);
                const height = this.innerElement.getBoundingClientRect ? this.innerElement.getBoundingClientRect().height : 0; // TBD use renderer
                delta *= ease;
                ease *= EASE_ACCELERATION;
                if (height < roundedMaxHeight) {
                    // Make maxHeight auto because animation finished and container might change height later on
                    this.renderer.setStyle(this.innerElement, 'max-height', null);
                    clearInterval(i);
                }
            }, 17);
        });
    }
    _animateClose() {
        if (!this.innerElement)
            return;
        let delta = this.animateSpeed;
        let ease = this.animateAcceleration;
        let height = this.innerElement.getBoundingClientRect().height; // TBD use renderer
        // slowly decrease maxHeight to 0, starting from current height
        const i = setInterval(() => {
            if (this._isOpen || !this.innerElement)
                return clearInterval(i);
            height -= delta;
            this.renderer.setStyle(this.innerElement, 'max-height', `${height}px`);
            delta *= ease;
            ease *= EASE_ACCELERATION;
            if (height <= 0) {
                // after animation complete - remove child element
                this.viewContainerRef.clear();
                this.innerElement = null;
                clearInterval(i);
            }
        }, 17);
    }
}
TreeAnimateOpenDirective.decorators = [
    { type: Directive, args: [{
                selector: '[treeAnimateOpen]'
            },] }
];
/** @nocollapse */
TreeAnimateOpenDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
TreeAnimateOpenDirective.propDecorators = {
    animateSpeed: [{ type: Input, args: ['treeAnimateOpenSpeed',] }],
    animateAcceleration: [{ type: Input, args: ['treeAnimateOpenAcceleration',] }],
    isEnabled: [{ type: Input, args: ['treeAnimateOpenEnabled',] }],
    isOpen: [{ type: Input, args: ['treeAnimateOpen',] }]
};

class TreeModule {
}
TreeModule.decorators = [
    { type: NgModule, args: [{
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
                imports: [CommonModule],
                providers: []
            },] }
];

/*
 * Public API Surface of angular-tree-component
 */

/**
 * Generated bundle index. Do not edit.
 */

export { KEYS, LoadingComponent, TREE_ACTIONS, TreeAnimateOpenDirective, TreeComponent, TreeDragDirective, TreeDraggedElement, TreeDropDirective, TreeModel, TreeModule, TreeNode, TreeNodeCheckboxComponent, TreeNodeChildrenComponent, TreeNodeCollectionComponent, TreeNodeComponent, TreeNodeContent, TreeNodeDropSlot, TreeNodeExpanderComponent, TreeNodeWrapperComponent, TreeViewportComponent, TreeVirtualScroll, actionInternal as ɵa, action as ɵb, computed as ɵc, observable as ɵd, TreeMobxAutorunDirective as ɵe };
//# sourceMappingURL=circlon-angular-tree-component.js.map
