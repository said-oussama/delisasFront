var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun } from 'mobx';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TREE_EVENTS } from '../constants/events';
export class TreeModel {
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
__decorate([
    observable,
    __metadata("design:type", Array)
], TreeModel.prototype, "roots", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "expandedNodeIds", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "selectedLeafNodeIds", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "activeNodeIds", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "hiddenNodeIds", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "focusedNodeId", void 0);
__decorate([
    observable,
    __metadata("design:type", TreeNode)
], TreeModel.prototype, "virtualRoot", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "focusedNode", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "expandedNodes", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "activeNodes", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "hiddenNodes", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "selectedLeafNodes", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setData", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "update", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setFocusedNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setFocus", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "doForAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusNextNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusPreviousNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusDrillDown", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusDrillUp", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setActiveNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setSelectedNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setExpandedNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "expandAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "collapseAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setIsHidden", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setHiddenNodeIds", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "filterNodes", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "clearFilter", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "moveNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "copyNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setState", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHbEQsTUFBTSxPQUFPLFNBQVM7SUFEdEI7UUFJRSxZQUFPLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFFekMsZUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFJMUIsb0JBQWUsR0FBcUIsRUFBRSxDQUFDO1FBQ3ZDLHdCQUFtQixHQUFxQixFQUFFLENBQUM7UUFDM0Msa0JBQWEsR0FBcUIsRUFBRSxDQUFDO1FBQ3JDLGtCQUFhLEdBQXFCLEVBQUUsQ0FBQztRQUNyQyxrQkFBYSxHQUFXLElBQUksQ0FBQztRQUdqQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQixrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFxZjdDLENBQUM7SUFuZkMsU0FBUztJQUNULFNBQVMsQ0FBQyxLQUFLO1FBQ2IsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENB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UCxNQUFNOzs7O3lDQWdDTjtBQUVPO0lBQVAsTUFBTTs7Ozt5Q0FxQk47QUFZTztJQUFQLE1BQU07Ozs7eUNBVU4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgYXV0b3J1biB9IGZyb20gJ21vYngnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuL3RyZWUtbm9kZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi90cmVlLW9wdGlvbnMubW9kZWwnO1xyXG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4vdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbCc7XHJcbmltcG9ydCB7IElUcmVlTW9kZWwsIElEVHlwZSwgSURUeXBlRGljdGlvbmFyeSB9IGZyb20gJy4uL2RlZnMvYXBpJztcclxuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRyZWVNb2RlbCBpbXBsZW1lbnRzIElUcmVlTW9kZWwsIE9uRGVzdHJveSB7XHJcbiAgc3RhdGljIGZvY3VzZWRUcmVlID0gbnVsbDtcclxuXHJcbiAgb3B0aW9uczogVHJlZU9wdGlvbnMgPSBuZXcgVHJlZU9wdGlvbnMoKTtcclxuICBub2RlczogYW55W107XHJcbiAgZXZlbnROYW1lcyA9IE9iamVjdC5rZXlzKFRSRUVfRVZFTlRTKTtcclxuICB2aXJ0dWFsU2Nyb2xsOiBUcmVlVmlydHVhbFNjcm9sbDtcclxuXHJcbiAgQG9ic2VydmFibGUgcm9vdHM6IFRyZWVOb2RlW107XHJcbiAgQG9ic2VydmFibGUgZXhwYW5kZWROb2RlSWRzOiBJRFR5cGVEaWN0aW9uYXJ5ID0ge307XHJcbiAgQG9ic2VydmFibGUgc2VsZWN0ZWRMZWFmTm9kZUlkczogSURUeXBlRGljdGlvbmFyeSA9IHt9O1xyXG4gIEBvYnNlcnZhYmxlIGFjdGl2ZU5vZGVJZHM6IElEVHlwZURpY3Rpb25hcnkgPSB7fTtcclxuICBAb2JzZXJ2YWJsZSBoaWRkZW5Ob2RlSWRzOiBJRFR5cGVEaWN0aW9uYXJ5ID0ge307XHJcbiAgQG9ic2VydmFibGUgZm9jdXNlZE5vZGVJZDogSURUeXBlID0gbnVsbDtcclxuICBAb2JzZXJ2YWJsZSB2aXJ0dWFsUm9vdDogVHJlZU5vZGU7XHJcblxyXG4gIHByaXZhdGUgZmlyc3RVcGRhdGUgPSB0cnVlO1xyXG4gIHByaXZhdGUgZXZlbnRzOiBhbnk7XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvLyBldmVudHNcclxuICBmaXJlRXZlbnQoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRyZWVNb2RlbCA9IHRoaXM7XHJcbiAgICB0aGlzLmV2ZW50c1tldmVudC5ldmVudE5hbWVdLmVtaXQoZXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudHMuZXZlbnQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmUoZXZlbnROYW1lLCBmbikge1xyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zdWJzY3JpYmUoZm4pO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBnZXR0ZXJzXHJcbiAgZ2V0Rm9jdXNlZE5vZGUoKTogVHJlZU5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9jdXNlZE5vZGU7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0QWN0aXZlTm9kZSgpOiBUcmVlTm9kZSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2Rlc1swXTtcclxuICB9XHJcblxyXG4gIGdldEFjdGl2ZU5vZGVzKCk6IFRyZWVOb2RlW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZXM7XHJcbiAgfVxyXG5cclxuICBnZXRWaXNpYmxlUm9vdHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aXJ0dWFsUm9vdC52aXNpYmxlQ2hpbGRyZW47XHJcbiAgfVxyXG5cclxuICBnZXRGaXJzdFJvb3Qoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCByb290ID0gc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzO1xyXG4gICAgcmV0dXJuIHJvb3QgIT0gbnVsbCAmJiByb290Lmxlbmd0aCA/IHJvb3RbMF0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdFJvb3Qoc2tpcEhpZGRlbiA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCByb290ID0gc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzO1xyXG4gICAgcmV0dXJuIHJvb3QgIT0gbnVsbCAmJiByb290Lmxlbmd0aCA/IHJvb3Rbcm9vdC5sZW5ndGggLSAxXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNGb2N1c2VkKCkge1xyXG4gICAgcmV0dXJuIFRyZWVNb2RlbC5mb2N1c2VkVHJlZSA9PT0gdGhpcztcclxuICB9XHJcblxyXG4gIGlzTm9kZUZvY3VzZWQobm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9jdXNlZE5vZGUgPT09IG5vZGU7XHJcbiAgfVxyXG5cclxuICBpc0VtcHR5VHJlZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnJvb3RzICYmIHRoaXMucm9vdHMubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBmb2N1c2VkTm9kZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmZvY3VzZWROb2RlSWQgPyB0aGlzLmdldE5vZGVCeUlkKHRoaXMuZm9jdXNlZE5vZGVJZCkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBleHBhbmRlZE5vZGVzKCkge1xyXG4gICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyh0aGlzLmV4cGFuZGVkTm9kZUlkcylcclxuICAgICAgLmZpbHRlcigoaWQpID0+IHRoaXMuZXhwYW5kZWROb2RlSWRzW2lkXSlcclxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZXMuZmlsdGVyKEJvb2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBhY3RpdmVOb2RlcygpIHtcclxuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5hY3RpdmVOb2RlSWRzKVxyXG4gICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5hY3RpdmVOb2RlSWRzW2lkXSlcclxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZXMuZmlsdGVyKEJvb2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgQGNvbXB1dGVkIGdldCBoaWRkZW5Ob2RlcygpIHtcclxuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5oaWRkZW5Ob2RlSWRzKVxyXG4gICAgICAgIC5maWx0ZXIoKGlkKSA9PiB0aGlzLmhpZGRlbk5vZGVJZHNbaWRdKVxyXG4gICAgICAgIC5tYXAoKGlkKSA9PiB0aGlzLmdldE5vZGVCeUlkKGlkKSk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGVzLmZpbHRlcihCb29sZWFuKTtcclxuICB9XHJcblxyXG4gIEBjb21wdXRlZCBnZXQgc2VsZWN0ZWRMZWFmTm9kZXMoKSB7XHJcbiAgICBjb25zdCBub2RlcyA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkcylcclxuICAgICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5zZWxlY3RlZExlYWZOb2RlSWRzW2lkXSlcclxuICAgICAgICAubWFwKChpZCkgPT4gdGhpcy5nZXROb2RlQnlJZChpZCkpO1xyXG5cclxuICAgIHJldHVybiBub2Rlcy5maWx0ZXIoQm9vbGVhbik7XHJcbiAgfVxyXG5cclxuICAvLyBsb2NhdGluZyBub2Rlc1xyXG4gIGdldE5vZGVCeVBhdGgocGF0aDogYW55W10sIHN0YXJ0Tm9kZT0gbnVsbCk6IFRyZWVOb2RlIHtcclxuICAgIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgc3RhcnROb2RlID0gc3RhcnROb2RlIHx8IHRoaXMudmlydHVhbFJvb3Q7XHJcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiBzdGFydE5vZGU7XHJcblxyXG4gICAgaWYgKCFzdGFydE5vZGUuY2hpbGRyZW4pIHJldHVybiBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkSWQgPSBwYXRoLnNoaWZ0KCk7XHJcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBzdGFydE5vZGUuY2hpbGRyZW4uZmluZChjID0+IGMuaWQgPT09IGNoaWxkSWQpO1xyXG5cclxuICAgIGlmICghY2hpbGROb2RlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXROb2RlQnlQYXRoKHBhdGgsIGNoaWxkTm9kZSk7XHJcbiAgfVxyXG5cclxuICBnZXROb2RlQnlJZChpZCkge1xyXG4gICAgY29uc3QgaWRTdHIgPSBpZC50b1N0cmluZygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmdldE5vZGVCeSgobm9kZSkgPT4gbm9kZS5pZC50b1N0cmluZygpID09PSBpZFN0cik7XHJcbiAgfVxyXG5cclxuICBnZXROb2RlQnkocHJlZGljYXRlLCBzdGFydE5vZGUgPSBudWxsKSB7XHJcbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcclxuXHJcbiAgICBpZiAoIXN0YXJ0Tm9kZS5jaGlsZHJlbikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgY29uc3QgZm91bmQgPSBzdGFydE5vZGUuY2hpbGRyZW4uZmluZChwcmVkaWNhdGUpO1xyXG5cclxuICAgIGlmIChmb3VuZCkgeyAvLyBmb3VuZCBpbiBjaGlsZHJlblxyXG4gICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9IGVsc2UgeyAvLyBsb29rIGluIGNoaWxkcmVuJ3MgY2hpbGRyZW5cclxuICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc3RhcnROb2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmRJbkNoaWxkcmVuID0gdGhpcy5nZXROb2RlQnkocHJlZGljYXRlLCBjaGlsZCk7XHJcbiAgICAgICAgaWYgKGZvdW5kSW5DaGlsZHJlbikgcmV0dXJuIGZvdW5kSW5DaGlsZHJlbjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNFeHBhbmRlZChub2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5leHBhbmRlZE5vZGVJZHNbbm9kZS5pZF07XHJcbiAgfVxyXG5cclxuICBpc0hpZGRlbihub2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5Ob2RlSWRzW25vZGUuaWRdO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUobm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlTm9kZUlkc1tub2RlLmlkXTtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQobm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRMZWFmTm9kZUlkc1tub2RlLmlkXTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gRGlzcG9zZSByZWFjdGlvbnMgb2YgdGhlIHJlcGxhY2VkIG5vZGVzXHJcbiAgICBpZiAodGhpcy52aXJ0dWFsUm9vdCkge1xyXG4gICAgICB0aGlzLnZpcnR1YWxSb290LmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlQWxsKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3Vic2NyaXB0aW9uID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLy8gYWN0aW9uc1xyXG4gIEBhY3Rpb24gc2V0RGF0YSh7IG5vZGVzLCBvcHRpb25zID0gbnVsbCwgZXZlbnRzID0gbnVsbCB9OiB7bm9kZXM6IGFueSwgb3B0aW9uczogYW55LCBldmVudHM6IGFueX0pIHtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBUcmVlT3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChldmVudHMpIHtcclxuICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XHJcbiAgICB9XHJcbiAgICBpZiAobm9kZXMpIHtcclxuICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHVwZGF0ZSgpIHtcclxuICAgIC8vIFJlYnVpbGQgdHJlZTpcclxuICAgIGxldCB2aXJ0dWFsUm9vdENvbmZpZyA9IHtcclxuICAgICAgaWQ6IHRoaXMub3B0aW9ucy5yb290SWQsXHJcbiAgICAgIHZpcnR1YWw6IHRydWUsXHJcbiAgICAgIFt0aGlzLm9wdGlvbnMuY2hpbGRyZW5GaWVsZF06IHRoaXMubm9kZXNcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kaXNwb3NlKCk7XHJcblxyXG4gICAgdGhpcy52aXJ0dWFsUm9vdCA9IG5ldyBUcmVlTm9kZSh2aXJ0dWFsUm9vdENvbmZpZywgbnVsbCwgdGhpcywgMCk7XHJcblxyXG4gICAgdGhpcy5yb290cyA9IHRoaXMudmlydHVhbFJvb3QuY2hpbGRyZW47XHJcblxyXG4gICAgLy8gRmlyZSBldmVudDpcclxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XHJcbiAgICAgIGlmICh0aGlzLnJvb3RzKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnVwZGF0ZURhdGEgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgQGFjdGlvbiBzZXRGb2N1c2VkTm9kZShub2RlKSB7XHJcbiAgICB0aGlzLmZvY3VzZWROb2RlSWQgPSBub2RlID8gbm9kZS5pZCA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldEZvY3VzKHZhbHVlKSB7XHJcbiAgICBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPSB2YWx1ZSA/IHRoaXMgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBkb0ZvckFsbChmbikge1xyXG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChyb290KSA9PiByb290LmRvRm9yQWxsKGZuKSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGZvY3VzTmV4dE5vZGUoKSB7XHJcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xyXG4gICAgbGV0IG5leHROb2RlID0gcHJldmlvdXNOb2RlID8gcHJldmlvdXNOb2RlLmZpbmROZXh0Tm9kZSh0cnVlLCB0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xyXG4gICAgaWYgKG5leHROb2RlKSBuZXh0Tm9kZS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBmb2N1c1ByZXZpb3VzTm9kZSgpIHtcclxuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XHJcbiAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZmluZFByZXZpb3VzTm9kZSh0cnVlKSA6IHRoaXMuZ2V0TGFzdFJvb3QodHJ1ZSk7XHJcbiAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGZvY3VzRHJpbGxEb3duKCkge1xyXG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcclxuICAgIGlmIChwcmV2aW91c05vZGUgJiYgcHJldmlvdXNOb2RlLmlzQ29sbGFwc2VkICYmIHByZXZpb3VzTm9kZS5oYXNDaGlsZHJlbikge1xyXG4gICAgICBwcmV2aW91c05vZGUudG9nZ2xlRXhwYW5kZWQoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZ2V0Rmlyc3RDaGlsZCh0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xyXG4gICAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGZvY3VzRHJpbGxVcCgpIHtcclxuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XHJcbiAgICBpZiAoIXByZXZpb3VzTm9kZSkgcmV0dXJuO1xyXG4gICAgaWYgKHByZXZpb3VzTm9kZS5pc0V4cGFuZGVkKSB7XHJcbiAgICAgIHByZXZpb3VzTm9kZS50b2dnbGVFeHBhbmRlZCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZS5yZWFsUGFyZW50O1xyXG4gICAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldEFjdGl2ZU5vZGUobm9kZSwgdmFsdWUsIG11bHRpID0gZmFsc2UpIHtcclxuICAgIGlmIChtdWx0aSkge1xyXG4gICAgICB0aGlzLl9zZXRBY3RpdmVOb2RlTXVsdGkobm9kZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NldEFjdGl2ZU5vZGVTaW5nbGUobm9kZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICBub2RlLmZvY3VzKHRoaXMub3B0aW9ucy5zY3JvbGxPbkFjdGl2YXRlKTtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmFjdGl2YXRlLCBub2RlIH0pO1xyXG4gICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubm9kZUFjdGl2YXRlLCBub2RlIH0pOyAvLyBGb3IgSUUxMVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLmRlYWN0aXZhdGUsIG5vZGUgfSk7XHJcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5ub2RlRGVhY3RpdmF0ZSwgbm9kZSB9KTsgLy8gRm9yIElFMTFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBhY3Rpb24gc2V0U2VsZWN0ZWROb2RlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHMsIHtbbm9kZS5pZF06IHZhbHVlfSk7XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIG5vZGUuZm9jdXMoKTtcclxuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnNlbGVjdCwgbm9kZSB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5kZXNlbGVjdCwgbm9kZSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBhY3Rpb24gc2V0RXhwYW5kZWROb2RlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xyXG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLnRvZ2dsZUV4cGFuZGVkLCBub2RlLCBpc0V4cGFuZGVkOiB2YWx1ZSB9KTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gZXhwYW5kQWxsKCkge1xyXG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChyb290KSA9PiByb290LmV4cGFuZEFsbCgpKTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gY29sbGFwc2VBbGwoKSB7XHJcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKHJvb3QpID0+IHJvb3QuY29sbGFwc2VBbGwoKSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldElzSGlkZGVuKG5vZGUsIHZhbHVlKSB7XHJcbiAgICB0aGlzLmhpZGRlbk5vZGVJZHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhpZGRlbk5vZGVJZHMsIHtbbm9kZS5pZF06IHZhbHVlfSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldEhpZGRlbk5vZGVJZHMobm9kZUlkcykge1xyXG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0gbm9kZUlkcy5yZWR1Y2UoKGhpZGRlbk5vZGVJZHMsIGlkKSA9PiBPYmplY3QuYXNzaWduKGhpZGRlbk5vZGVJZHMsIHtcclxuICAgICAgW2lkXTogdHJ1ZVxyXG4gICAgfSksIHt9KTtcclxuICB9XHJcblxyXG4gIHBlcmZvcm1LZXlBY3Rpb24obm9kZSwgJGV2ZW50KSB7XHJcbiAgICBjb25zdCBrZXlBY3Rpb24gPSB0aGlzLm9wdGlvbnMuYWN0aW9uTWFwcGluZy5rZXlzWyRldmVudC5rZXlDb2RlXTtcclxuICAgIGlmIChrZXlBY3Rpb24pIHtcclxuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGtleUFjdGlvbih0aGlzLCBub2RlLCAkZXZlbnQpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBhY3Rpb24gZmlsdGVyTm9kZXMoZmlsdGVyLCBhdXRvU2hvdyA9IHRydWUpIHtcclxuICAgIGxldCBmaWx0ZXJGbjtcclxuXHJcbiAgICBpZiAoIWZpbHRlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jbGVhckZpbHRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1cHBvcnQgZnVuY3Rpb24gYW5kIHN0cmluZyBmaWx0ZXJcclxuICAgIGlmIChmaWx0ZXIgJiYgdHlwZW9mIGZpbHRlci52YWx1ZU9mKCkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpbHRlckZuID0gKG5vZGUpID0+IG5vZGUuZGlzcGxheUZpZWxkLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmlsdGVyICYmIHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgIGZpbHRlckZuID0gZmlsdGVyO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RvblxcJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggZmlsdGVyJywgZmlsdGVyKTtcclxuICAgICAgY29uc29sZS5lcnJvcignU2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBmdW5jdGlvbicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWRzID0ge307XHJcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKG5vZGUpID0+IHRoaXMuX2ZpbHRlck5vZGUoaWRzLCBub2RlLCBmaWx0ZXJGbiwgYXV0b1Nob3cpKTtcclxuICAgIHRoaXMuaGlkZGVuTm9kZUlkcyA9IGlkcztcclxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jaGFuZ2VGaWx0ZXIgfSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIGNsZWFyRmlsdGVyKCkge1xyXG4gICAgdGhpcy5oaWRkZW5Ob2RlSWRzID0ge307XHJcbiAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuY2hhbmdlRmlsdGVyIH0pO1xyXG4gIH1cclxuXHJcbiAgQGFjdGlvbiBtb3ZlTm9kZShub2RlLCB0bykge1xyXG4gICAgY29uc3QgZnJvbUluZGV4ID0gbm9kZS5nZXRJbmRleEluUGFyZW50KCk7XHJcbiAgICBjb25zdCBmcm9tUGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNhbk1vdmVOb2RlKG5vZGUsIHRvLCBmcm9tSW5kZXgpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZnJvbUNoaWxkcmVuID0gZnJvbVBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcclxuXHJcbiAgICAvLyBJZiBub2RlIGRvZXNuJ3QgaGF2ZSBjaGlsZHJlbiAtIGNyZWF0ZSBjaGlsZHJlbiBhcnJheVxyXG4gICAgaWYgKCF0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJykpIHtcclxuICAgICAgdG8ucGFyZW50LnNldEZpZWxkKCdjaGlsZHJlbicsIFtdKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRvQ2hpbGRyZW4gPSB0by5wYXJlbnQuZ2V0RmllbGQoJ2NoaWxkcmVuJyk7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luYWxOb2RlID0gZnJvbUNoaWxkcmVuLnNwbGljZShmcm9tSW5kZXgsIDEpWzBdO1xyXG5cclxuICAgIC8vIENvbXBlbnNhdGUgZm9yIGluZGV4IGlmIGFscmVhZHkgcmVtb3ZlZCBmcm9tIHBhcmVudDpcclxuICAgIGxldCB0b0luZGV4ID0gKGZyb21QYXJlbnQgPT09IHRvLnBhcmVudCAmJiB0by5pbmRleCA+IGZyb21JbmRleCkgPyB0by5pbmRleCAtIDEgOiB0by5pbmRleDtcclxuXHJcbiAgICB0b0NoaWxkcmVuLnNwbGljZSh0b0luZGV4LCAwLCBvcmlnaW5hbE5vZGUpO1xyXG5cclxuICAgIGZyb21QYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xyXG4gICAgaWYgKHRvLnBhcmVudC50cmVlTW9kZWwgIT09IGZyb21QYXJlbnQudHJlZU1vZGVsKSB7XHJcbiAgICAgIHRvLnBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maXJlRXZlbnQoe1xyXG4gICAgICBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm1vdmVOb2RlLFxyXG4gICAgICBub2RlOiBvcmlnaW5hbE5vZGUsXHJcbiAgICAgIHRvOiB7IHBhcmVudDogdG8ucGFyZW50LmRhdGEsIGluZGV4OiB0b0luZGV4IH0sXHJcbiAgICAgIGZyb206IHsgcGFyZW50OiBmcm9tUGFyZW50LmRhdGEsIGluZGV4OiBmcm9tSW5kZXh9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gY29weU5vZGUobm9kZSwgdG8pIHtcclxuICAgIGNvbnN0IGZyb21JbmRleCA9IG5vZGUuZ2V0SW5kZXhJblBhcmVudCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5jYW5Nb3ZlTm9kZShub2RlLCB0bywgZnJvbUluZGV4KSkgcmV0dXJuO1xyXG5cclxuICAgIC8vIElmIG5vZGUgZG9lc24ndCBoYXZlIGNoaWxkcmVuIC0gY3JlYXRlIGNoaWxkcmVuIGFycmF5XHJcbiAgICBpZiAoIXRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xyXG4gICAgICB0by5wYXJlbnQuc2V0RmllbGQoJ2NoaWxkcmVuJywgW10pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdG9DaGlsZHJlbiA9IHRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcclxuXHJcbiAgICBjb25zdCBub2RlQ29weSA9IHRoaXMub3B0aW9ucy5nZXROb2RlQ2xvbmUobm9kZSk7XHJcblxyXG4gICAgdG9DaGlsZHJlbi5zcGxpY2UodG8uaW5kZXgsIDAsIG5vZGVDb3B5KTtcclxuXHJcbiAgICBub2RlLnRyZWVNb2RlbC51cGRhdGUoKTtcclxuICAgIGlmICh0by5wYXJlbnQudHJlZU1vZGVsICE9PSBub2RlLnRyZWVNb2RlbCkge1xyXG4gICAgICB0by5wYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5jb3B5Tm9kZSwgbm9kZTogbm9kZUNvcHksIHRvOiB7IHBhcmVudDogdG8ucGFyZW50LmRhdGEsIGluZGV4OiB0by5pbmRleCB9IH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBleHBhbmRlZE5vZGVJZHM6IHRoaXMuZXhwYW5kZWROb2RlSWRzLFxyXG4gICAgICBzZWxlY3RlZExlYWZOb2RlSWRzOiB0aGlzLnNlbGVjdGVkTGVhZk5vZGVJZHMsXHJcbiAgICAgIGFjdGl2ZU5vZGVJZHM6IHRoaXMuYWN0aXZlTm9kZUlkcyxcclxuICAgICAgaGlkZGVuTm9kZUlkczogdGhpcy5oaWRkZW5Ob2RlSWRzLFxyXG4gICAgICBmb2N1c2VkTm9kZUlkOiB0aGlzLmZvY3VzZWROb2RlSWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XHJcbiAgICBpZiAoIXN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XHJcbiAgICAgIGV4cGFuZGVkTm9kZUlkczogc3RhdGUuZXhwYW5kZWROb2RlSWRzIHx8IHt9LFxyXG4gICAgICBzZWxlY3RlZExlYWZOb2RlSWRzOiBzdGF0ZS5zZWxlY3RlZExlYWZOb2RlSWRzIHx8IHt9LFxyXG4gICAgICBhY3RpdmVOb2RlSWRzOiBzdGF0ZS5hY3RpdmVOb2RlSWRzIHx8IHt9LFxyXG4gICAgICBoaWRkZW5Ob2RlSWRzOiBzdGF0ZS5oaWRkZW5Ob2RlSWRzIHx8IHt9LFxyXG4gICAgICBmb2N1c2VkTm9kZUlkOiBzdGF0ZS5mb2N1c2VkTm9kZUlkXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1YnNjcmliZVRvU3RhdGUoZm4pIHtcclxuICAgIGF1dG9ydW4oKCkgPT4gZm4odGhpcy5nZXRTdGF0ZSgpKSk7XHJcbiAgfVxyXG5cclxuICBjYW5Nb3ZlTm9kZShub2RlLCB0bywgZnJvbUluZGV4ID0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zdCBmcm9tTm9kZUluZGV4ID0gZnJvbUluZGV4IHx8IG5vZGUuZ2V0SW5kZXhJblBhcmVudCgpO1xyXG5cclxuICAgIC8vIHNhbWUgbm9kZTpcclxuICAgIGlmIChub2RlLnBhcmVudCA9PT0gdG8ucGFyZW50ICYmIGZyb21JbmRleCA9PT0gdG8uaW5kZXgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhdG8ucGFyZW50LmlzRGVzY2VuZGFudE9mKG5vZGUpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpIHtcclxuICAgICAgdGhpcy5fY2FsY3VsYXRlRXhwYW5kZWROb2RlcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJpdmF0ZSBtZXRob2RzXHJcbiAgcHJpdmF0ZSBfZmlsdGVyTm9kZShpZHMsIG5vZGUsIGZpbHRlckZuLCBhdXRvU2hvdykge1xyXG4gICAgLy8gaWYgbm9kZSBwYXNzZXMgZnVuY3Rpb24gdGhlbiBpdCdzIHZpc2libGVcclxuICAgIGxldCBpc1Zpc2libGUgPSBmaWx0ZXJGbihub2RlKTtcclxuXHJcbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAvLyBpZiBvbmUgb2Ygbm9kZSdzIGNoaWxkcmVuIHBhc3NlcyBmaWx0ZXIgdGhlbiB0aGlzIG5vZGUgaXMgYWxzbyB2aXNpYmxlXHJcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5fZmlsdGVyTm9kZShpZHMsIGNoaWxkLCBmaWx0ZXJGbiwgYXV0b1Nob3cpKSB7XHJcbiAgICAgICAgICBpc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFyayBub2RlIGFzIGhpZGRlblxyXG4gICAgaWYgKCFpc1Zpc2libGUpIHtcclxuICAgICAgaWRzW25vZGUuaWRdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIGF1dG8gZXhwYW5kIHBhcmVudHMgdG8gbWFrZSBzdXJlIHRoZSBmaWx0ZXJlZCBub2RlcyBhcmUgdmlzaWJsZVxyXG4gICAgaWYgKGF1dG9TaG93ICYmIGlzVmlzaWJsZSkge1xyXG4gICAgICBub2RlLmVuc3VyZVZpc2libGUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc1Zpc2libGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKHN0YXJ0Tm9kZSA9IG51bGwpIHtcclxuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xyXG5cclxuICAgIGlmIChzdGFydE5vZGUuZGF0YVt0aGlzLm9wdGlvbnMuaXNFeHBhbmRlZEZpZWxkXSkge1xyXG4gICAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W3N0YXJ0Tm9kZS5pZF06IHRydWV9KTtcclxuICAgIH1cclxuICAgIGlmIChzdGFydE5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgc3RhcnROb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKGNoaWxkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRBY3RpdmVOb2RlU2luZ2xlKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAvLyBEZWFjdGl2YXRlIGFsbCBvdGhlciBub2RlczpcclxuICAgIHRoaXMuYWN0aXZlTm9kZXNcclxuICAgICAgLmZpbHRlcigoYWN0aXZlTm9kZSkgPT4gYWN0aXZlTm9kZSAhPT0gbm9kZSlcclxuICAgICAgLmZvckVhY2goKGFjdGl2ZU5vZGUpID0+IHtcclxuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuZGVhY3RpdmF0ZSwgbm9kZTogYWN0aXZlTm9kZSB9KTtcclxuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMubm9kZURlYWN0aXZhdGUsIG5vZGU6IGFjdGl2ZU5vZGUgfSk7IC8vIEZvciBJRTExXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZU5vZGVJZHMgPSB7W25vZGUuaWRdOiB0cnVlfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZU5vZGVJZHMgPSB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldEFjdGl2ZU5vZGVNdWx0aShub2RlLCB2YWx1ZSkge1xyXG4gICAgdGhpcy5hY3RpdmVOb2RlSWRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hY3RpdmVOb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19