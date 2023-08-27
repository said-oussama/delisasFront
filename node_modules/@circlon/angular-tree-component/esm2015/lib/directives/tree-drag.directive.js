import { Directive, ElementRef, HostListener, Input, NgZone, Renderer2 } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
const DRAG_OVER_CLASS = 'is-dragging-over';
export class TreeDragDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQVcsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxNQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztBQUszQyxNQUFNLE9BQU8saUJBQWlCO0lBSzVCLFlBQW9CLEVBQWMsRUFBVSxRQUFtQixFQUFVLGtCQUFzQyxFQUFVLE1BQWM7UUFBbkgsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNySSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLEVBQUUsR0FBZ0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDakMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLEVBQUUsR0FBZ0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRXNDLFdBQVcsQ0FBQyxFQUFFO1FBQ25ELDBDQUEwQztRQUMxQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsRUFBRTtRQUNQLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUV3QixTQUFTO1FBQ2hDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDNUM7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7Ozs7WUFQMkMsVUFBVTtZQUEwQyxTQUFTO1lBQ2hHLGtCQUFrQjtZQURrRCxNQUFNOzs7NkJBU2hGLEtBQUssU0FBQyxVQUFVOzhCQUNoQixLQUFLOzBCQXVCTCxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQWVwQyxZQUFZLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRG9DaGVjaywgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xyXG5cclxuY29uc3QgRFJBR19PVkVSX0NMQVNTID0gJ2lzLWRyYWdnaW5nLW92ZXInO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbdHJlZURyYWddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZURyYWdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgndHJlZURyYWcnKSBkcmFnZ2VkRWxlbWVudDtcclxuICBASW5wdXQoKSB0cmVlRHJhZ0VuYWJsZWQ7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBkcmFnRXZlbnRIYW5kbGVyOiAoZXY6IERyYWdFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHRyZWVEcmFnZ2VkRWxlbWVudDogVHJlZURyYWdnZWRFbGVtZW50LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XHJcbiAgICB0aGlzLmRyYWdFdmVudEhhbmRsZXIgPSB0aGlzLm9uRHJhZy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIHRoaXMuZHJhZ0V2ZW50SGFuZGxlcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdnYWJsZScsIHRoaXMudHJlZURyYWdFbmFibGVkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGxldCBlbDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnJywgdGhpcy5kcmFnRXZlbnRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pIG9uRHJhZ1N0YXJ0KGV2KSB7XHJcbiAgICAvLyBzZXR0aW5nIHRoZSBkYXRhIGlzIHJlcXVpcmVkIGJ5IGZpcmVmb3hcclxuICAgIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgZXYudGFyZ2V0LmlkKTtcclxuICAgIHRoaXMudHJlZURyYWdnZWRFbGVtZW50LnNldCh0aGlzLmRyYWdnZWRFbGVtZW50KTtcclxuICAgIGlmICh0aGlzLmRyYWdnZWRFbGVtZW50Lm1vdXNlQWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuZHJhZ2dlZEVsZW1lbnQubW91c2VBY3Rpb24oJ2RyYWdTdGFydCcsIGV2KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRHJhZyhldikge1xyXG4gICAgaWYgKHRoaXMuZHJhZ2dlZEVsZW1lbnQubW91c2VBY3Rpb24pIHtcclxuICAgICAgdGhpcy5kcmFnZ2VkRWxlbWVudC5tb3VzZUFjdGlvbignZHJhZycsIGV2KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnKSBvbkRyYWdFbmQoKSB7XHJcbiAgICBpZiAodGhpcy5kcmFnZ2VkRWxlbWVudC5tb3VzZUFjdGlvbikge1xyXG4gICAgICB0aGlzLmRyYWdnZWRFbGVtZW50Lm1vdXNlQWN0aW9uKCdkcmFnRW5kJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5zZXQobnVsbCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==