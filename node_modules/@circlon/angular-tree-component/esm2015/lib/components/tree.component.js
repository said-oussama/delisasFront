import { Component, ContentChild, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeViewportComponent } from './tree-viewport.component';
export class TreeComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFHMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFpQ2xFLE1BQU0sT0FBTyxhQUFhO0lBMkN4QixZQUNTLFNBQW9CLEVBQ3BCLGtCQUFzQztRQUR0QyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFFN0MsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDeEUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUF2Q0QsaUNBQWlDO0lBQ2pDLElBQWEsS0FBSyxDQUFDLEtBQVk7SUFDL0IsQ0FBQztJQUFBLENBQUM7SUFFRixJQUFhLE9BQU8sQ0FBQyxPQUFxQjtJQUMxQyxDQUFDO0lBQUEsQ0FBQztJQUVGLElBQWEsT0FBTyxDQUFDLEtBQWM7UUFDakMsSUFBSSxD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LHNCQUFzQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQ0FDdEQsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0JBR3ZDLEtBQUs7c0JBR0wsS0FBSztzQkFHTCxLQUFLO29CQUlMLEtBQUs7NkJBSUwsTUFBTTt1QkFDTixNQUFNO3lCQUNOLE1BQU07MkJBQ04sTUFBTTs2QkFDTixNQUFNO3FCQUNOLE1BQU07dUJBQ04sTUFBTTtvQkFDTixNQUFNO21CQUNOLE1BQU07eUJBQ04sTUFBTTswQkFDTixNQUFNO3VCQUNOLE1BQU07dUJBQ04sTUFBTTsrQkFDTixNQUFNOzJCQUNOLE1BQU07b0JBQ04sTUFBTTswQkFDTixNQUFNO3dCQVVOLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBVXhDLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHsgSVRyZWVPcHRpb25zIH0gZnJvbSAnLi4vZGVmcy9hcGknO1xyXG5pbXBvcnQgeyBUcmVlVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtdmlld3BvcnQuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnVHJlZSwgdHJlZS1yb290JyxcclxuICBwcm92aWRlcnM6IFtUcmVlTW9kZWxdLFxyXG4gIHN0eWxlczogW10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgICAgPHRyZWUtdmlld3BvcnQgI3ZpZXdwb3J0PlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImFuZ3VsYXItdHJlZS1jb21wb25lbnRcIlxyXG4gICAgICAgICAgICAgICAgICBbY2xhc3Mubm9kZS1kcmFnZ2luZ109XCJ0cmVlRHJhZ2dlZEVsZW1lbnQuaXNEcmFnZ2luZygpXCJcclxuICAgICAgICAgICAgICAgICAgW2NsYXNzLmFuZ3VsYXItdHJlZS1jb21wb25lbnQtcnRsXT1cInRyZWVNb2RlbC5vcHRpb25zLnJ0bFwiPlxyXG4gICAgICAgICAgICAgIDx0cmVlLW5vZGUtY29sbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwucm9vdHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW25vZGVzXT1cInRyZWVNb2RlbC5yb290c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbdHJlZU1vZGVsXT1cInRyZWVNb2RlbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVzXT1cIntcclxuICAgICAgICAgICAgbG9hZGluZ1RlbXBsYXRlOiBsb2FkaW5nVGVtcGxhdGUsXHJcbiAgICAgICAgICAgIHRyZWVOb2RlVGVtcGxhdGU6IHRyZWVOb2RlVGVtcGxhdGUsXHJcbiAgICAgICAgICAgIHRyZWVOb2RlV3JhcHBlclRlbXBsYXRlOiB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZSxcclxuICAgICAgICAgICAgdHJlZU5vZGVGdWxsVGVtcGxhdGU6IHRyZWVOb2RlRnVsbFRlbXBsYXRlXHJcbiAgICAgICAgICB9XCI+XHJcbiAgICAgICAgICAgICAgPC90cmVlLW5vZGUtY29sbGVjdGlvbj5cclxuICAgICAgICAgICAgICA8dHJlZS1ub2RlLWRyb3Atc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJlbXB0eS10cmVlLWRyb3Atc2xvdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInRyZWVNb2RlbC5pc0VtcHR5VHJlZSgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFtkcm9wSW5kZXhdPVwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbbm9kZV09XCJ0cmVlTW9kZWwudmlydHVhbFJvb3RcIj5cclxuICAgICAgICAgICAgICA8L3RyZWUtbm9kZS1kcm9wLXNsb3Q+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC90cmVlLXZpZXdwb3J0PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIF9ub2RlczogYW55W107XHJcbiAgX29wdGlvbnM6IFRyZWVPcHRpb25zO1xyXG5cclxuICBAQ29udGVudENoaWxkKCdsb2FkaW5nVGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIEBDb250ZW50Q2hpbGQoJ3RyZWVOb2RlVGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmVlTm9kZVdyYXBwZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZUZ1bGxUZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAVmlld0NoaWxkKCd2aWV3cG9ydCcsIHsgc3RhdGljOiBmYWxzZSB9KSB2aWV3cG9ydENvbXBvbmVudDogVHJlZVZpZXdwb3J0Q29tcG9uZW50O1xyXG5cclxuICAvLyBXaWxsIGJlIGhhbmRsZWQgaW4gbmdPbkNoYW5nZXNcclxuICBASW5wdXQoKSBzZXQgbm9kZXMobm9kZXM6IGFueVtdKSB7XHJcbiAgfTtcclxuXHJcbiAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogSVRyZWVPcHRpb25zKSB7XHJcbiAgfTtcclxuXHJcbiAgQElucHV0KCkgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBzdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy50cmVlTW9kZWwuc2V0U3RhdGUoc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHRvZ2dsZUV4cGFuZGVkO1xyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTtcclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTtcclxuICBAT3V0cHV0KCkgbm9kZUFjdGl2YXRlO1xyXG4gIEBPdXRwdXQoKSBub2RlRGVhY3RpdmF0ZTtcclxuICBAT3V0cHV0KCkgc2VsZWN0O1xyXG4gIEBPdXRwdXQoKSBkZXNlbGVjdDtcclxuICBAT3V0cHV0KCkgZm9jdXM7XHJcbiAgQE91dHB1dCgpIGJsdXI7XHJcbiAgQE91dHB1dCgpIHVwZGF0ZURhdGE7XHJcbiAgQE91dHB1dCgpIGluaXRpYWxpemVkO1xyXG4gIEBPdXRwdXQoKSBtb3ZlTm9kZTtcclxuICBAT3V0cHV0KCkgY29weU5vZGU7XHJcbiAgQE91dHB1dCgpIGxvYWROb2RlQ2hpbGRyZW47XHJcbiAgQE91dHB1dCgpIGNoYW5nZUZpbHRlcjtcclxuICBAT3V0cHV0KCkgZXZlbnQ7XHJcbiAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyB0cmVlTW9kZWw6IFRyZWVNb2RlbCxcclxuICAgIHB1YmxpYyB0cmVlRHJhZ2dlZEVsZW1lbnQ6IFRyZWVEcmFnZ2VkRWxlbWVudCkge1xyXG5cclxuICAgIHRyZWVNb2RlbC5ldmVudE5hbWVzLmZvckVhY2goKG5hbWUpID0+IHRoaXNbbmFtZV0gPSBuZXcgRXZlbnRFbWl0dGVyKCkpO1xyXG4gICAgdHJlZU1vZGVsLnN1YnNjcmliZVRvU3RhdGUoKHN0YXRlKSA9PiB0aGlzLnN0YXRlQ2hhbmdlLmVtaXQoc3RhdGUpKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JvZHk6IGtleWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uS2V5ZG93bigkZXZlbnQpIHtcclxuICAgIGlmICghdGhpcy50cmVlTW9kZWwuaXNGb2N1c2VkKSByZXR1cm47XHJcbiAgICBpZiAoWydpbnB1dCcsICd0ZXh0YXJlYSddLmluY2x1ZGVzKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGZvY3VzZWROb2RlID0gdGhpcy50cmVlTW9kZWwuZ2V0Rm9jdXNlZE5vZGUoKTtcclxuXHJcbiAgICB0aGlzLnRyZWVNb2RlbC5wZXJmb3JtS2V5QWN0aW9uKGZvY3VzZWROb2RlLCAkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYm9keTogbW91c2Vkb3duJywgWyckZXZlbnQnXSlcclxuICBvbk1vdXNlZG93bigkZXZlbnQpIHtcclxuICAgIGZ1bmN0aW9uIGlzT3V0c2lkZUNsaWNrKHN0YXJ0RWxlbWVudDogRWxlbWVudCwgbm9kZU5hbWU6IHN0cmluZykge1xyXG4gICAgICByZXR1cm4gIXN0YXJ0RWxlbWVudCA/IHRydWUgOiBzdGFydEVsZW1lbnQubG9jYWxOYW1lID09PSBub2RlTmFtZSA/IGZhbHNlIDogaXNPdXRzaWRlQ2xpY2soc3RhcnRFbGVtZW50LnBhcmVudEVsZW1lbnQsIG5vZGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNPdXRzaWRlQ2xpY2soJGV2ZW50LnRhcmdldCwgJ3RyZWUtcm9vdCcpKSB7XHJcbiAgICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMgfHwgY2hhbmdlcy5ub2Rlcykge1xyXG4gICAgICB0aGlzLnRyZWVNb2RlbC5zZXREYXRhKHtcclxuICAgICAgICBvcHRpb25zOiBjaGFuZ2VzLm9wdGlvbnMgJiYgY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICBub2RlczogY2hhbmdlcy5ub2RlcyAmJiBjaGFuZ2VzLm5vZGVzLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICBldmVudHM6IHRoaXMucGljayh0aGlzLCB0aGlzLnRyZWVNb2RlbC5ldmVudE5hbWVzKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNpemVDaGFuZ2VkKCkge1xyXG4gICAgdGhpcy52aWV3cG9ydENvbXBvbmVudC5zZXRWaWV3cG9ydCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwaWNrKG9iamVjdCwga2V5cykge1xyXG4gICAgcmV0dXJuIGtleXMucmVkdWNlKChvYmosIGtleSkgPT4ge1xyXG4gICAgICBpZiAob2JqZWN0ICYmIG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgb2JqW2tleV0gPSBvYmplY3Rba2V5XTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSwge30pO1xyXG4gIH1cclxufVxyXG4iXX0=