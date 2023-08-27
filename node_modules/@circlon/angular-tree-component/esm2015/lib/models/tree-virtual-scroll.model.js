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
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
const Y_OFFSET = 500; // Extra pixels outside the viewport, in each direction, to render nodes in
const Y_EPSILON = 150; // Minimum pixel change required to recalculate the rendered nodes
export class TreeVirtualScroll {
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
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "x", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "y", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "totalHeight", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "_setYBlocks", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "recalcPositions", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "setViewport", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDJFQUEyRTtBQUNqRyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxrRUFBa0U7QUFHekYsTUFBTSxPQUFPLGlCQUFpQjtJQWdCNUIsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWI1QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFXZCxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQVhTLElBQUksQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQUVTLElBQUksV0FBVztRQUN2QixPQUFPLElBQUks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U0FBUzs7QUFVSjtJQUFYLFVBQVU7O2tEQUFhO0FBQ1o7SUFBWCxVQUFVOzs0Q0FBTztBQUNOO0lBQVgsVUFBVTs7eURBQXVCO0FBR3hCO0lBQVQsUUFBUTs7OzBDQUVSO0FBRVM7SUFBVCxRQUFROzs7b0RBRVI7QUE0Qk87SUFBUCxNQUFNOzs7O29EQUVOO0FBRU87SUFBUCxNQUFNOzs7O3dEQUVOO0FBMkJPO0lBQVAsTUFBTTs7OztvREFPTjtBQUVPO0lBQVAsTUFBTTs7Ozt1REEyQk47QUFpREgsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQztJQUNwRCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUM7SUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFL0IsT0FBTyxLQUFLLEtBQUssT0FBTyxFQUFFO1FBQ3hCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFakQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsT0FBTyxHQUFHLFFBQVEsQ0FBQztTQUNwQjthQUNJO1lBQ0gsSUFBSSxLQUFLLEtBQUssUUFBUTtnQkFBRSxLQUFLLEdBQUcsT0FBTyxDQUFDOztnQkFDbkMsS0FBSyxHQUFHLFFBQVEsQ0FBQztTQUN2QjtLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgYWN0aW9uLCBhdXRvcnVuLCByZWFjdGlvbiB9IGZyb20gJ21vYngnO1xyXG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuL3RyZWUubW9kZWwnO1xyXG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xyXG5cclxuY29uc3QgWV9PRkZTRVQgPSA1MDA7IC8vIEV4dHJhIHBpeGVscyBvdXRzaWRlIHRoZSB2aWV3cG9ydCwgaW4gZWFjaCBkaXJlY3Rpb24sIHRvIHJlbmRlciBub2RlcyBpblxyXG5jb25zdCBZX0VQU0lMT04gPSAxNTA7IC8vIE1pbmltdW0gcGl4ZWwgY2hhbmdlIHJlcXVpcmVkIHRvIHJlY2FsY3VsYXRlIHRoZSByZW5kZXJlZCBub2Rlc1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVHJlZVZpcnR1YWxTY3JvbGwge1xyXG4gIHByaXZhdGUgX2Rpc3Bvc2U6IGFueTtcclxuXHJcbiAgQG9ic2VydmFibGUgeUJsb2NrcyA9IDA7XHJcbiAgQG9ic2VydmFibGUgeCA9IDA7XHJcbiAgQG9ic2VydmFibGUgdmlld3BvcnRIZWlnaHQgPSBudWxsO1xyXG4gIHZpZXdwb3J0ID0gbnVsbDtcclxuXHJcbiAgQGNvbXB1dGVkIGdldCB5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMueUJsb2NrcyAqIFlfRVBTSUxPTjtcclxuICB9XHJcblxyXG4gIEBjb21wdXRlZCBnZXQgdG90YWxIZWlnaHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QgPyB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsUm9vdC5oZWlnaHQgOiAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmVlTW9kZWw6IFRyZWVNb2RlbCkge1xyXG4gICAgdHJlZU1vZGVsLnZpcnR1YWxTY3JvbGwgPSB0aGlzO1xyXG4gICAgdGhpcy5fZGlzcG9zZSA9IFthdXRvcnVuKCgpID0+IHRoaXMuZml4U2Nyb2xsKCkpXTtcclxuICB9XHJcblxyXG4gIGZpcmVFdmVudChldmVudCkge1xyXG4gICAgdGhpcy50cmVlTW9kZWwuZmlyZUV2ZW50KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBjb25zdCBmbiA9IHRoaXMucmVjYWxjUG9zaXRpb25zLmJpbmQodGhpcyk7XHJcblxyXG4gICAgZm4oKTtcclxuICAgIHRoaXMuX2Rpc3Bvc2UgPSBbXHJcbiAgICAgIC4uLnRoaXMuX2Rpc3Bvc2UsXHJcbiAgICAgIHJlYWN0aW9uKCgpID0+IHRoaXMudHJlZU1vZGVsLnJvb3RzLCBmbiksXHJcbiAgICAgIHJlYWN0aW9uKCgpID0+IHRoaXMudHJlZU1vZGVsLmV4cGFuZGVkTm9kZUlkcywgZm4pLFxyXG4gICAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5oaWRkZW5Ob2RlSWRzLCBmbilcclxuICAgIF07XHJcbiAgICB0aGlzLnRyZWVNb2RlbC5zdWJzY3JpYmUoVFJFRV9FVkVOVFMubG9hZE5vZGVDaGlsZHJlbiwgZm4pO1xyXG4gIH1cclxuXHJcbiAgaXNFbmFibGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJlZU1vZGVsLm9wdGlvbnMudXNlVmlydHVhbFNjcm9sbDtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gcHJpdmF0ZSBfc2V0WUJsb2Nrcyh2YWx1ZSkge1xyXG4gICAgdGhpcy55QmxvY2tzID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHJlY2FsY1Bvc2l0aW9ucygpIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnZpcnR1YWxSb290LmhlaWdodCA9IHRoaXMuX2dldFBvc2l0aW9uQWZ0ZXIodGhpcy50cmVlTW9kZWwuZ2V0VmlzaWJsZVJvb3RzKCksIDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25BZnRlcihub2Rlcywgc3RhcnRQb3MpIHtcclxuICAgIGxldCBwb3NpdGlvbiA9IHN0YXJ0UG9zO1xyXG5cclxuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgbm9kZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICBwb3NpdGlvbiA9IHRoaXMuX2dldFBvc2l0aW9uQWZ0ZXJOb2RlKG5vZGUsIHBvc2l0aW9uKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25BZnRlck5vZGUobm9kZSwgc3RhcnRQb3MpIHtcclxuICAgIGxldCBwb3NpdGlvbiA9IG5vZGUuZ2V0U2VsZkhlaWdodCgpICsgc3RhcnRQb3M7XHJcblxyXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5pc0V4cGFuZGVkKSB7IC8vIFRCRDogY29uc2lkZXIgbG9hZGluZyBjb21wb25lbnQgYXMgd2VsbFxyXG4gICAgICBwb3NpdGlvbiA9IHRoaXMuX2dldFBvc2l0aW9uQWZ0ZXIobm9kZS52aXNpYmxlQ2hpbGRyZW4sIHBvc2l0aW9uKTtcclxuICAgIH1cclxuICAgIG5vZGUuaGVpZ2h0ID0gcG9zaXRpb24gLSBzdGFydFBvcztcclxuICAgIHJldHVybiBwb3NpdGlvbjtcclxuICB9XHJcblxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuX2Rpc3Bvc2UuZm9yRWFjaCgoZCkgPT4gZCgpKTtcclxuICB9XHJcblxyXG4gIEBhY3Rpb24gc2V0Vmlld3BvcnQodmlld3BvcnQpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xyXG4gICAgICB2aWV3cG9ydCxcclxuICAgICAgeDogdmlld3BvcnQuc2Nyb2xsTGVmdCxcclxuICAgICAgeUJsb2NrczogTWF0aC5yb3VuZCh2aWV3cG9ydC5zY3JvbGxUb3AgLyBZX0VQU0lMT04pLFxyXG4gICAgICB2aWV3cG9ydEhlaWdodDogdmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID8gdmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNjcm9sbEludG9WaWV3KG5vZGUsIGZvcmNlLCBzY3JvbGxUb01pZGRsZSA9IHRydWUpIHtcclxuICAgIGlmIChub2RlLm9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lciA9IG5vZGUub3B0aW9ucy5zY3JvbGxDb250YWluZXI7XHJcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckhlaWdodCA9IHNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lclRvcCA9IHNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgIGNvbnN0IG5vZGVUb3AgPSB0aGlzLnZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIG5vZGUucG9zaXRpb24gLSBzY3JvbGxDb250YWluZXJUb3A7XHJcblxyXG4gICAgICBpZiAoZm9yY2UgfHwgLy8gZm9yY2Ugc2Nyb2xsIHRvIG5vZGVcclxuICAgICAgICBub2RlVG9wIDwgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCB8fCAvLyBub2RlIGlzIGFib3ZlIHNjcm9sbCBjb250YWluZXJcclxuICAgICAgICBub2RlVG9wICsgbm9kZS5nZXRTZWxmSGVpZ2h0KCkgPiBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wICsgc2Nyb2xsQ29udGFpbmVySGVpZ2h0KSB7IC8vIG5vZGUgaXMgYmVsb3cgY29udGFpbmVyXHJcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCA9IHNjcm9sbFRvTWlkZGxlID9cclxuICAgICAgICAgIG5vZGVUb3AgLSBzY3JvbGxDb250YWluZXJIZWlnaHQgLyAyIDogLy8gc2Nyb2xsIHRvIG1pZGRsZVxyXG4gICAgICAgICAgbm9kZVRvcDsgLy8gc2Nyb2xsIHRvIHN0YXJ0XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChmb3JjZSB8fCAvLyBmb3JjZSBzY3JvbGwgdG8gbm9kZVxyXG4gICAgICAgIG5vZGUucG9zaXRpb24gPCB0aGlzLnkgfHwgLy8gbm9kZSBpcyBhYm92ZSB2aWV3cG9ydFxyXG4gICAgICAgIG5vZGUucG9zaXRpb24gKyBub2RlLmdldFNlbGZIZWlnaHQoKSA+IHRoaXMueSArIHRoaXMudmlld3BvcnRIZWlnaHQpIHsgLy8gbm9kZSBpcyBiZWxvdyB2aWV3cG9ydFxyXG4gICAgICAgIGlmICh0aGlzLnZpZXdwb3J0KSB7XHJcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbFRvcCA9IHNjcm9sbFRvTWlkZGxlID9cclxuICAgICAgICAgIG5vZGUucG9zaXRpb24gLSB0aGlzLnZpZXdwb3J0SGVpZ2h0IC8gMiA6IC8vIHNjcm9sbCB0byBtaWRkbGVcclxuICAgICAgICAgIG5vZGUucG9zaXRpb247IC8vIHNjcm9sbCB0byBzdGFydFxyXG5cclxuICAgICAgICAgIHRoaXMuX3NldFlCbG9ja3MoTWF0aC5mbG9vcih0aGlzLnZpZXdwb3J0LnNjcm9sbFRvcCAvIFlfRVBTSUxPTikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Vmlld3BvcnROb2Rlcyhub2Rlcykge1xyXG4gICAgaWYgKCFub2RlcykgcmV0dXJuIFtdO1xyXG5cclxuICAgIGNvbnN0IHZpc2libGVOb2RlcyA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4gIW5vZGUuaXNIaWRkZW4pO1xyXG5cclxuICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkgcmV0dXJuIHZpc2libGVOb2RlcztcclxuXHJcbiAgICBpZiAoIXRoaXMudmlld3BvcnRIZWlnaHQgfHwgIXZpc2libGVOb2Rlcy5sZW5ndGgpIHJldHVybiBbXTtcclxuXHJcbiAgICAvLyBXaGVuIGxvYWRpbmcgY2hpbGRyZW4gYXN5bmMgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGJlZm9yZSB0aGVpciBoZWlnaHQgYW5kIHBvc2l0aW9uIGlzIGNhbGN1bGF0ZWQuXHJcbiAgICAvLyBJbiB0aGF0IGNhc2UgZmlyc3RJbmRleCA9PT0gMCBhbmQgbGFzdEluZGV4ID09PSB2aXNpYmxlTm9kZXMubGVuZ3RoIC0gMSAoZS5nLiAxMDAwKSxcclxuICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgaXQgbG9vcHMgdGhyb3VnaCBldmVyeSB2aXNpYmxlTm9kZXMgaXRlbSBhbmQgcHVzaCB0aGVtIGludG8gdmlld3BvcnROb2RlcyBhcnJheS5cclxuICAgIC8vIFdlIGNhbiBwcmV2ZW50IG5vZGVzIGZyb20gYmVpbmcgcHVzaGVkIHRvIHRoZSBhcnJheSBhbmQgd2FpdCBmb3IgdGhlIGFwcHJvcHJpYXRlIGNhbGN1bGF0aW9ucyB0byB0YWtlIHBsYWNlXHJcbiAgICBjb25zdCBsYXN0VmlzaWJsZU5vZGUgPSB2aXNpYmxlTm9kZXMuc2xpY2UoLTEpWzBdXHJcbiAgICBpZiAoIWxhc3RWaXNpYmxlTm9kZS5oZWlnaHQgJiYgbGFzdFZpc2libGVOb2RlLnBvc2l0aW9uID09PSAwKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gU2VhcmNoIGZvciBmaXJzdCBub2RlIGluIHRoZSB2aWV3cG9ydCB1c2luZyBiaW5hcnkgc2VhcmNoXHJcbiAgICAvLyBMb29rIGZvciBmaXJzdCBub2RlIHRoYXQgc3RhcnRzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHZpZXdwb3J0ICh3aXRoIGJ1ZmZlcilcclxuICAgIC8vIE9yIHRoYXQgZW5kcyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSB2aWV3cG9ydFxyXG4gICAgY29uc3QgZmlyc3RJbmRleCA9IGJpbmFyeVNlYXJjaCh2aXNpYmxlTm9kZXMsIChub2RlKSA9PiB7XHJcbiAgICAgIHJldHVybiAobm9kZS5wb3NpdGlvbiArIFlfT0ZGU0VUID4gdGhpcy55KSB8fFxyXG4gICAgICAgICAgICAgKG5vZGUucG9zaXRpb24gKyBub2RlLmhlaWdodCA+IHRoaXMueSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTZWFyY2ggZm9yIGxhc3Qgbm9kZSBpbiB0aGUgdmlld3BvcnQgdXNpbmcgYmluYXJ5IHNlYXJjaFxyXG4gICAgLy8gTG9vayBmb3IgZmlyc3Qgbm9kZSB0aGF0IHN0YXJ0cyBhZnRlciB0aGUgZW5kIG9mIHRoZSB2aWV3cG9ydCAod2l0aCBidWZmZXIpXHJcbiAgICBjb25zdCBsYXN0SW5kZXggPSBiaW5hcnlTZWFyY2godmlzaWJsZU5vZGVzLCAobm9kZSkgPT4ge1xyXG4gICAgICByZXR1cm4gbm9kZS5wb3NpdGlvbiAtIFlfT0ZGU0VUID4gdGhpcy55ICsgdGhpcy52aWV3cG9ydEhlaWdodDtcclxuICAgIH0sIGZpcnN0SW5kZXgpO1xyXG5cclxuICAgIGNvbnN0IHZpZXdwb3J0Tm9kZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8PSBsYXN0SW5kZXg7IGkrKykge1xyXG4gICAgICB2aWV3cG9ydE5vZGVzLnB1c2godmlzaWJsZU5vZGVzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmlld3BvcnROb2RlcztcclxuICB9XHJcblxyXG4gIGZpeFNjcm9sbCgpIHtcclxuICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCgwLCB0aGlzLnRvdGFsSGVpZ2h0IC0gdGhpcy52aWV3cG9ydEhlaWdodCk7XHJcblxyXG4gICAgaWYgKHRoaXMueSA8IDApIHRoaXMuX3NldFlCbG9ja3MoMCk7XHJcbiAgICBpZiAodGhpcy55ID4gbWF4WSkgdGhpcy5fc2V0WUJsb2NrcyhtYXhZIC8gWV9FUFNJTE9OKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJpbmFyeVNlYXJjaChub2RlcywgY29uZGl0aW9uLCBmaXJzdEluZGV4ID0gMCkge1xyXG4gIGxldCBpbmRleCA9IGZpcnN0SW5kZXg7XHJcbiAgbGV0IHRvSW5kZXggPSBub2Rlcy5sZW5ndGggLSAxO1xyXG5cclxuICB3aGlsZSAoaW5kZXggIT09IHRvSW5kZXgpIHtcclxuICAgIGxldCBtaWRJbmRleCA9IE1hdGguZmxvb3IoKGluZGV4ICsgdG9JbmRleCkgLyAyKTtcclxuXHJcbiAgICBpZiAoY29uZGl0aW9uKG5vZGVzW21pZEluZGV4XSkpIHtcclxuICAgICAgdG9JbmRleCA9IG1pZEluZGV4O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gbWlkSW5kZXgpIGluZGV4ID0gdG9JbmRleDtcclxuICAgICAgZWxzZSBpbmRleCA9IG1pZEluZGV4O1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gaW5kZXg7XHJcbn1cclxuIl19