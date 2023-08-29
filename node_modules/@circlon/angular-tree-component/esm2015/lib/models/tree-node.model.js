var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { observable, computed, reaction, action } from 'mobx';
import { TREE_EVENTS } from '../constants/events';
export class TreeNode {
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
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isHidden", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isExpanded", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isActive", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isFocused", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isSelected", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isAllSelected", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isPartiallySelected", null);
__decorate([
    observable,
    __metadata("design:type", Array)
], TreeNode.prototype, "children", void 0);
__decorate([
    observable,
    __metadata("design:type", Number)
], TreeNode.prototype, "index", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeNode.prototype, "position", void 0);
__decorate([
    observable,
    __metadata("design:type", Number)
], TreeNode.prototype, "height", void 0);
__decorate([
    computed,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "level", null);
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "path", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "visibleChildren", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeNode.prototype, "setIsSelected", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeNode.prototype, "_initChildren", null);
function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL21vZGVscy90cmVlLW5vZGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFXLE1BQU0sRUFBcUIsTUFBTSxNQUFNLENBQUM7QUFJMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE1BQU0sT0FBTyxRQUFRO0lBMkNuQixZQUFtQixJQUFTLEVBQVMsTUFBZ0IsRUFBUyxTQUFvQixFQUFFLEtBQWE7UUFBOUUsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLFdBQU0sR0FBTixNQUFNLENBQVU7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBakJ0RSxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBdUp6QixjQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTyxFQUFFLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUE7UUFFRCx5QkFBb0IsR0FBRyxHQUFHLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1FBQzNDLENBQUMsQ0FBQTtRQTNJQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzdDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7U0FDbEIsQ0FBQyx1R0FBdUc7UUFDekcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENB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QUFVOzt1Q0FBZTtBQUNkO0lBQVgsVUFBVTs7MENBQWM7QUFDYjtJQUFYLFVBQVU7O3dDQUFnQjtBQUNqQjtJQUFULFFBQVE7OztxQ0FFUjtBQUNTO0lBQVQsUUFBUTs7O29DQUVSO0FBNEVTO0lBQVQsUUFBUTs7OytDQUVSO0FBcU1PO0lBQVAsTUFBTTs7Ozs2Q0FRTjtBQThFTztJQUFQLE1BQU07Ozs7NkNBR047QUFHSCxTQUFTLElBQUk7SUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgcmVhY3Rpb24sIGF1dG9ydW4sIGFjdGlvbiwgSVJlYWN0aW9uRGlzcG9zZXIgfSBmcm9tICdtb2J4JztcclxuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuL3RyZWUtb3B0aW9ucy5tb2RlbCc7XHJcbmltcG9ydCB7IElUcmVlTm9kZSB9IGZyb20gJy4uL2RlZnMvYXBpJztcclxuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZSBpbXBsZW1lbnRzIElUcmVlTm9kZSB7XHJcbiAgcHJpdmF0ZSBoYW5kbGVyOiBJUmVhY3Rpb25EaXNwb3NlcjtcclxuICBAY29tcHV0ZWQgZ2V0IGlzSGlkZGVuKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNIaWRkZW4odGhpcyk7IH07XHJcbiAgQGNvbXB1dGVkIGdldCBpc0V4cGFuZGVkKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNFeHBhbmRlZCh0aGlzKTsgfTtcclxuICBAY29tcHV0ZWQgZ2V0IGlzQWN0aXZlKCkgeyByZXR1cm4gdGhpcy50cmVlTW9kZWwuaXNBY3RpdmUodGhpcyk7IH07XHJcbiAgQGNvbXB1dGVkIGdldCBpc0ZvY3VzZWQoKSB7IHJldHVybiB0aGlzLnRyZWVNb2RlbC5pc05vZGVGb2N1c2VkKHRoaXMpOyB9O1xyXG4gIEBjb21wdXRlZCBnZXQgaXNTZWxlY3RlZCgpIHtcclxuICAgIGlmICh0aGlzLmlzU2VsZWN0YWJsZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLmlzU2VsZWN0ZWQodGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5zb21lKChub2RlOiBUcmVlTm9kZSkgPT4gbm9kZS5pc1NlbGVjdGVkKTtcclxuICAgIH1cclxuICB9O1xyXG4gIEBjb21wdXRlZCBnZXQgaXNBbGxTZWxlY3RlZCgpIHtcclxuICAgIGlmICh0aGlzLmlzU2VsZWN0YWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyZWVNb2RlbC5pc1NlbGVjdGVkKHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZXZlcnkoKG5vZGU6IFRyZWVOb2RlKSA9PiBub2RlLmlzQWxsU2VsZWN0ZWQpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgQGNvbXB1dGVkIGdldCBpc1BhcnRpYWxseVNlbGVjdGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RlZCAmJiAhdGhpcy5pc0FsbFNlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgQG9ic2VydmFibGUgY2hpbGRyZW46IFRyZWVOb2RlW107XHJcbiAgQG9ic2VydmFibGUgaW5kZXg6IG51bWJlcjtcclxuICBAb2JzZXJ2YWJsZSBwb3NpdGlvbiA9IDA7XHJcbiAgQG9ic2VydmFibGUgaGVpZ2h0OiBudW1iZXI7XHJcbiAgQGNvbXB1dGVkIGdldCBsZXZlbCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQubGV2ZWwgKyAxIDogMDtcclxuICB9XHJcbiAgQGNvbXB1dGVkIGdldCBwYXRoKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IFsuLi50aGlzLnBhcmVudC5wYXRoLCB0aGlzLmlkXSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVsZW1lbnRSZWYoKTogYW55IHtcclxuICAgIHRocm93IGBFbGVtZW50IFJlZiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIHNpbmNlIGludHJvZHVjaW5nIHZpcnR1YWwgc2Nyb2xsXFxuXHJcbiAgICAgIFlvdSBtYXkgdXNlIGEgdGVtcGxhdGUgdG8gb2J0YWluIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX29yaWdpbmFsTm9kZTogYW55O1xyXG4gIGdldCBvcmlnaW5hbE5vZGUoKSB7IHJldHVybiB0aGlzLl9vcmlnaW5hbE5vZGU7IH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhOiBhbnksIHB1YmxpYyBwYXJlbnQ6IFRyZWVOb2RlLCBwdWJsaWMgdHJlZU1vZGVsOiBUcmVlTW9kZWwsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmlkID09PSB1bmRlZmluZWQgfHwgdGhpcy5pZCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmlkID0gdXVpZCgpO1xyXG4gICAgfSAvLyBNYWtlIHN1cmUgdGhlcmUncyBhIHVuaXF1ZSBpZCB3aXRob3V0IG92ZXJyaWRpbmcgZXhpc3RpbmcgaWRzIHRvIHdvcmsgd2l0aCBpbW11dGFibGUgZGF0YSBzdHJ1Y3R1cmVzXHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgaWYgKHRoaXMuZ2V0RmllbGQoJ2NoaWxkcmVuJykpIHtcclxuICAgICAgdGhpcy5faW5pdENoaWxkcmVuKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9Mb2FkQ2hpbGRyZW4oKTtcclxuICB9XHJcblxyXG4gIC8vIGhlbHBlciBnZXQgZnVuY3Rpb25zOlxyXG4gIGdldCBoYXNDaGlsZHJlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhISh0aGlzLmdldEZpZWxkKCdoYXNDaGlsZHJlbicpIHx8ICh0aGlzLmNoaWxkcmVuICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkpO1xyXG4gIH1cclxuICBnZXQgaXNDb2xsYXBzZWQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5pc0V4cGFuZGVkOyB9XHJcbiAgZ2V0IGlzTGVhZigpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmhhc0NoaWxkcmVuOyB9XHJcbiAgZ2V0IGlzUm9vdCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFyZW50LmRhdGEudmlydHVhbDsgfVxyXG4gIGdldCByZWFsUGFyZW50KCk6IFRyZWVOb2RlIHsgcmV0dXJuIHRoaXMuaXNSb290ID8gbnVsbCA6IHRoaXMucGFyZW50OyB9XHJcblxyXG4gIC8vIHByb3h5IGZ1bmN0aW9uczpcclxuICBnZXQgb3B0aW9ucygpOiBUcmVlT3B0aW9ucyB7IHJldHVybiB0aGlzLnRyZWVNb2RlbC5vcHRpb25zOyB9XHJcbiAgZmlyZUV2ZW50KGV2ZW50KSB7IHRoaXMudHJlZU1vZGVsLmZpcmVFdmVudChldmVudCk7IH1cclxuXHJcbiAgLy8gZmllbGQgYWNjZXNzb3JzOlxyXG4gIGdldCBkaXNwbGF5RmllbGQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRGaWVsZCgnZGlzcGxheScpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RmllbGQoJ2lkJyk7XHJcbiAgfVxyXG5cclxuICBzZXQgaWQodmFsdWUpIHtcclxuICAgIHRoaXMuc2V0RmllbGQoJ2lkJywgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmllbGQoa2V5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhW3RoaXMub3B0aW9uc1tgJHtrZXl9RmllbGRgXV07XHJcbiAgfVxyXG5cclxuICBzZXRGaWVsZChrZXksIHZhbHVlKSB7XHJcbiAgICB0aGlzLmRhdGFbdGhpcy5vcHRpb25zW2Ake2tleX1GaWVsZGBdXSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLy8gdHJhdmVyc2luZzpcclxuICBfZmluZEFkamFjZW50U2libGluZyhzdGVwcywgc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMuX2dldFBhcmVudHNDaGlsZHJlbihza2lwSGlkZGVuKTtcclxuICAgIGNvbnN0IGluZGV4ID0gc2libGluZ3MuaW5kZXhPZih0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gc2libGluZ3MubGVuZ3RoID4gaW5kZXggKyBzdGVwcyA/IHNpYmxpbmdzW2luZGV4ICsgc3RlcHNdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGZpbmROZXh0U2libGluZyhza2lwSGlkZGVuID0gZmFsc2UpIHtcclxuICAgIHJldHVybiB0aGlzLl9maW5kQWRqYWNlbnRTaWJsaW5nKCsxLCBza2lwSGlkZGVuKTtcclxuICB9XHJcblxyXG4gIGZpbmRQcmV2aW91c1NpYmxpbmcoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmluZEFkamFjZW50U2libGluZygtMSwgc2tpcEhpZGRlbik7XHJcbiAgfVxyXG5cclxuICBnZXRWaXNpYmxlQ2hpbGRyZW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aXNpYmxlQ2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICBAY29tcHV0ZWQgZ2V0IHZpc2libGVDaGlsZHJlbigpIHtcclxuICAgIHJldHVybiAodGhpcy5jaGlsZHJlbiB8fCBbXSkuZmlsdGVyKChub2RlKSA9PiAhbm9kZS5pc0hpZGRlbik7XHJcbiAgfVxyXG5cclxuICBnZXRGaXJzdENoaWxkKHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgbGV0IGNoaWxkcmVuID0gc2tpcEhpZGRlbiA/IHRoaXMudmlzaWJsZUNoaWxkcmVuIDogdGhpcy5jaGlsZHJlbjtcclxuXHJcbiAgICByZXR1cm4gY2hpbGRyZW4gIT0gbnVsbCAmJiBjaGlsZHJlbi5sZW5ndGggPyBjaGlsZHJlblswXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBsZXQgY2hpbGRyZW4gPSBza2lwSGlkZGVuID8gdGhpcy52aXNpYmxlQ2hpbGRyZW4gOiB0aGlzLmNoaWxkcmVuO1xyXG5cclxuICAgIHJldHVybiBjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCA/IGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGZpbmROZXh0Tm9kZShnb0luc2lkZSA9IHRydWUsIHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIGdvSW5zaWRlICYmIHRoaXMuaXNFeHBhbmRlZCAmJiB0aGlzLmdldEZpcnN0Q2hpbGQoc2tpcEhpZGRlbikgfHxcclxuICAgICAgICAgICB0aGlzLmZpbmROZXh0U2libGluZyhza2lwSGlkZGVuKSB8fFxyXG4gICAgICAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmZpbmROZXh0Tm9kZShmYWxzZSwgc2tpcEhpZGRlbik7XHJcbiAgfVxyXG5cclxuICBmaW5kUHJldmlvdXNOb2RlKHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgbGV0IHByZXZpb3VzU2libGluZyA9IHRoaXMuZmluZFByZXZpb3VzU2libGluZyhza2lwSGlkZGVuKTtcclxuICAgIGlmICghcHJldmlvdXNTaWJsaW5nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlYWxQYXJlbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XHJcbiAgfVxyXG5cclxuICBfZ2V0TGFzdE9wZW5EZXNjZW5kYW50KHNraXBIaWRkZW4gPSBmYWxzZSkge1xyXG4gICAgY29uc3QgbGFzdENoaWxkID0gdGhpcy5nZXRMYXN0Q2hpbGQoc2tpcEhpZGRlbik7XHJcbiAgICByZXR1cm4gKHRoaXMuaXNDb2xsYXBzZWQgfHwgIWxhc3RDaGlsZClcclxuICAgICAgPyB0aGlzXHJcbiAgICAgIDogbGFzdENoaWxkLl9nZXRMYXN0T3BlbkRlc2NlbmRhbnQoc2tpcEhpZGRlbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbiA9IGZhbHNlKTogYW55W10ge1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnBhcmVudCAmJlxyXG4gICAgICAoc2tpcEhpZGRlbiA/IHRoaXMucGFyZW50LmdldFZpc2libGVDaGlsZHJlbigpIDogdGhpcy5wYXJlbnQuY2hpbGRyZW4pO1xyXG5cclxuICAgIHJldHVybiBjaGlsZHJlbiB8fCBbXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SW5kZXhJblBhcmVudChza2lwSGlkZGVuID0gZmFsc2UpIHtcclxuICAgIHJldHVybiB0aGlzLl9nZXRQYXJlbnRzQ2hpbGRyZW4oc2tpcEhpZGRlbikuaW5kZXhPZih0aGlzKTtcclxuICB9XHJcblxyXG4gIGlzRGVzY2VuZGFudE9mKG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICBpZiAodGhpcyA9PT0gbm9kZSkgcmV0dXJuIHRydWU7XHJcbiAgICBlbHNlIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5pc0Rlc2NlbmRhbnRPZihub2RlKTtcclxuICB9XHJcblxyXG4gIGdldE5vZGVQYWRkaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxldmVsUGFkZGluZyAqICh0aGlzLmxldmVsIC0gMSkgKyAncHgnO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2xhc3MoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBbdGhpcy5vcHRpb25zLm5vZGVDbGFzcyh0aGlzKSwgYHRyZWUtbm9kZS1sZXZlbC0keyB0aGlzLmxldmVsIH1gXS5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBvbkRyb3AoJGV2ZW50KSB7XHJcbiAgICB0aGlzLm1vdXNlQWN0aW9uKCdkcm9wJywgJGV2ZW50LmV2ZW50LCB7XHJcbiAgICAgIGZyb206ICRldmVudC5lbGVtZW50LFxyXG4gICAgICB0bzogeyBwYXJlbnQ6IHRoaXMsIGluZGV4OiAwLCBkcm9wT25Ob2RlOiB0cnVlIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWxsb3dEcm9wID0gKGVsZW1lbnQsICRldmVudD8pID0+IHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxsb3dEcm9wKGVsZW1lbnQsIHsgcGFyZW50OiB0aGlzLCBpbmRleDogMCB9LCAkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgYWxsb3dEcmFnb3ZlclN0eWxpbmcgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsbG93RHJhZ292ZXJTdHlsaW5nO1xyXG4gIH1cclxuXHJcbiAgYWxsb3dEcmFnKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hbGxvd0RyYWcodGhpcyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gaGVscGVyIG1ldGhvZHM6XHJcbiAgbG9hZE5vZGVDaGlsZHJlbigpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLmdldENoaWxkcmVuKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgLy8gTm90IGdldENoaWxkcmVuIG1ldGhvZCAtIGZvciB1c2luZyByZWR1eFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLm9wdGlvbnMuZ2V0Q2hpbGRyZW4odGhpcykpXHJcbiAgICAgIC50aGVuKChjaGlsZHJlbikgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZHJlbikge1xyXG4gICAgICAgICAgdGhpcy5zZXRGaWVsZCgnY2hpbGRyZW4nLCBjaGlsZHJlbik7XHJcbiAgICAgICAgICB0aGlzLl9pbml0Q2hpbGRyZW4oKTtcclxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudXNlVHJpU3RhdGUgJiYgdGhpcy50cmVlTW9kZWwuaXNTZWxlY3RlZCh0aGlzKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldElzU2VsZWN0ZWQodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5nZXRGaWVsZCgnaXNFeHBhbmRlZCcpICYmIGNoaWxkLmhhc0NoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgY2hpbGQuZXhwYW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9fSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoe1xyXG4gICAgICAgICAgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5sb2FkTm9kZUNoaWxkcmVuLFxyXG4gICAgICAgICAgbm9kZTogdGhpc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGV4cGFuZCgpIHtcclxuICAgIGlmICghdGhpcy5pc0V4cGFuZGVkKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlRXhwYW5kZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNvbGxhcHNlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNFeHBhbmRlZCkge1xyXG4gICAgICB0aGlzLnRvZ2dsZUV4cGFuZGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBkb0ZvckFsbChmbjogKG5vZGU6IElUcmVlTm9kZSkgPT4gYW55KSB7XHJcbiAgICBQcm9taXNlLnJlc29sdmUoZm4odGhpcykpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5jaGlsZHJlbikge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLmRvRm9yQWxsKGZuKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXhwYW5kQWxsKCkge1xyXG4gICAgdGhpcy5kb0ZvckFsbCgobm9kZSkgPT4gbm9kZS5leHBhbmQoKSk7XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZUFsbCgpIHtcclxuICAgIHRoaXMuZG9Gb3JBbGwoKG5vZGUpID0+IG5vZGUuY29sbGFwc2UoKSk7XHJcbiAgfVxyXG5cclxuICBlbnN1cmVWaXNpYmxlKCkge1xyXG4gICAgaWYgKHRoaXMucmVhbFBhcmVudCkge1xyXG4gICAgICB0aGlzLnJlYWxQYXJlbnQuZXhwYW5kKCk7XHJcbiAgICAgIHRoaXMucmVhbFBhcmVudC5lbnN1cmVWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVFeHBhbmRlZCgpIHtcclxuICAgIHRoaXMuc2V0SXNFeHBhbmRlZCghdGhpcy5pc0V4cGFuZGVkKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNldElzRXhwYW5kZWQodmFsdWUpIHtcclxuICAgIGlmICh0aGlzLmhhc0NoaWxkcmVuKSB7XHJcbiAgICAgIHRoaXMudHJlZU1vZGVsLnNldEV4cGFuZGVkTm9kZSh0aGlzLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgYXV0b0xvYWRDaGlsZHJlbigpIHtcclxuICAgIHRoaXMuaGFuZGxlciA9XHJcbiAgICAgIHJlYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRoaXMuaXNFeHBhbmRlZCxcclxuICAgICAgICAoaXNFeHBhbmRlZCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuICYmIHRoaXMuaGFzQ2hpbGRyZW4gJiYgaXNFeHBhbmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWROb2RlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgZmlyZUltbWVkaWF0ZWx5OiB0cnVlIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbikge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC5kaXNwb3NlKCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaGFuZGxlcikge1xyXG4gICAgICB0aGlzLmhhbmRsZXIoKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgc2V0SXNBY3RpdmUodmFsdWUsIG11bHRpID0gZmFsc2UpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnNldEFjdGl2ZU5vZGUodGhpcywgdmFsdWUsIG11bHRpKTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmZvY3VzKHRoaXMub3B0aW9ucy5zY3JvbGxPbkFjdGl2YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0YWJsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmlzTGVhZiB8fCAhdGhpcy5jaGlsZHJlbiB8fCAhdGhpcy5vcHRpb25zLnVzZVRyaVN0YXRlO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBzZXRJc1NlbGVjdGVkKHZhbHVlKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGFibGUoKSkge1xyXG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXRTZWxlY3RlZE5vZGUodGhpcywgdmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aXNpYmxlQ2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnNldElzU2VsZWN0ZWQodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5zZXRJc1NlbGVjdGVkKCF0aGlzLmlzU2VsZWN0ZWQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQWN0aXZhdGVkKG11bHRpID0gZmFsc2UpIHtcclxuICAgIHRoaXMuc2V0SXNBY3RpdmUoIXRoaXMuaXNBY3RpdmUsIG11bHRpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNldEFjdGl2ZUFuZFZpc2libGUobXVsdGkgPSBmYWxzZSkge1xyXG4gICAgdGhpcy5zZXRJc0FjdGl2ZSh0cnVlLCBtdWx0aSlcclxuICAgICAgLmVuc3VyZVZpc2libGUoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuc2Nyb2xsSW50b1ZpZXcuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxJbnRvVmlldyhmb3JjZSA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsU2Nyb2xsLnNjcm9sbEludG9WaWV3KHRoaXMsIGZvcmNlKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKHNjcm9sbCA9IHRydWUpIHtcclxuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLnRyZWVNb2RlbC5nZXRGb2N1c2VkTm9kZSgpO1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXNlZE5vZGUodGhpcyk7XHJcbiAgICBpZiAoc2Nyb2xsKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgIH1cclxuICAgIGlmIChwcmV2aW91c05vZGUpIHtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmJsdXIsIG5vZGU6IHByZXZpb3VzTm9kZSB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5mb2N1cywgbm9kZTogdGhpcyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGJsdXIoKSB7XHJcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy50cmVlTW9kZWwuZ2V0Rm9jdXNlZE5vZGUoKTtcclxuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzZWROb2RlKG51bGwpO1xyXG4gICAgaWYgKHByZXZpb3VzTm9kZSkge1xyXG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuYmx1ciwgbm9kZTogdGhpcyB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNldElzSGlkZGVuKHZhbHVlKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRJc0hpZGRlbih0aGlzLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy5zZXRJc0hpZGRlbih0cnVlKTtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICB0aGlzLnNldElzSGlkZGVuKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIG1vdXNlQWN0aW9uKGFjdGlvbk5hbWU6IHN0cmluZywgJGV2ZW50LCBkYXRhOiBhbnkgPSBudWxsKSB7XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zZXRGb2N1cyh0cnVlKTtcclxuXHJcbiAgICBjb25zdCBhY3Rpb25NYXBwaW5nID0gdGhpcy5vcHRpb25zLmFjdGlvbk1hcHBpbmcubW91c2U7XHJcbiAgICBjb25zdCBtb3VzZUFjdGlvbiA9IGFjdGlvbk1hcHBpbmdbYWN0aW9uTmFtZV07XHJcblxyXG4gICAgaWYgKG1vdXNlQWN0aW9uKSB7XHJcbiAgICAgIG1vdXNlQWN0aW9uKHRoaXMudHJlZU1vZGVsLCB0aGlzLCAkZXZlbnQsIGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U2VsZkhlaWdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubm9kZUhlaWdodCh0aGlzKTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gX2luaXRDaGlsZHJlbigpIHtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLmdldEZpZWxkKCdjaGlsZHJlbicpXHJcbiAgICAgIC5tYXAoKGMsIGluZGV4KSA9PiBuZXcgVHJlZU5vZGUoYywgdGhpcywgdGhpcy50cmVlTW9kZWwsIGluZGV4KSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1dWlkKCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwMDAwMCk7XHJcbn1cclxuIl19