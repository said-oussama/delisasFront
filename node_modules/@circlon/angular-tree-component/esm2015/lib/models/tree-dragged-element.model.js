import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TreeDraggedElement {
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
/** @nocollapse */ TreeDraggedElement.ɵprov = i0.ɵɵdefineInjectable({ factory: function TreeDraggedElement_Factory() { return new TreeDraggedElement(); }, token: TreeDraggedElement, providedIn: "root" });
TreeDraggedElement.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFIL0I7UUFJRSxvQkFBZSxHQUFRLElBQUksQ0FBQztLQWE3QjtJQVhDLEdBQUcsQ0FBQyxjQUFtQjtRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsR0FBRztRQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O1lBaEJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVEcmFnZ2VkRWxlbWVudCB7XHJcbiAgX2RyYWdnZWRFbGVtZW50OiBhbnkgPSBudWxsO1xyXG5cclxuICBzZXQoZHJhZ2dlZEVsZW1lbnQ6IGFueSkge1xyXG4gICAgdGhpcy5fZHJhZ2dlZEVsZW1lbnQgPSBkcmFnZ2VkRWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldCgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnZWRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgaXNEcmFnZ2luZygpIHtcclxuICAgIHJldHVybiAhIXRoaXMuZ2V0KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==