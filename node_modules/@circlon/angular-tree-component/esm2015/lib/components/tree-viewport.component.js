import { Component, ElementRef, } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';
export class TreeViewportComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvY29tcG9uZW50cy90cmVlLXZpZXdwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsR0FJWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFjbEQsTUFBTSxPQUFPLHFCQUFxQjtJQU9oQyxZQUNVLFVBQXNCLEVBQ3ZCLGFBQWdDO1FBRC9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdkIsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBUnpDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFRTCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxlQUFlO1FBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksRUFBRSxHQUFnQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNwRCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLEVBQUUsR0FBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDcEQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QyxNQUFNLENBQ1AsQ0FBQztJQUNKLENBQUM7SUFFTyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVM7UUFDOUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE9BQU87WUFDTCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxHQUFHLEdBQUcsUUFBUSxJQUFJLFNBQVMsRUFBRTtnQkFDL0IsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsUUFBUSxHQUFHLEdBQUcsQ0FBQzthQUNoQjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBRXpCLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUM5QixRQUFRLEVBQUU7Ozs7OztHQU1UO2FBQ0Y7Ozs7WUFuQkMsVUFBVTtZQUtILGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4uL21vZGVscy90cmVlLXZpcnR1YWwtc2Nyb2xsLm1vZGVsJztcclxuaW1wb3J0IHsgVFJFRV9FVkVOVFMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndHJlZS12aWV3cG9ydCcsXHJcbiAgc3R5bGVzOiBbXSxcclxuICBwcm92aWRlcnM6IFtUcmVlVmlydHVhbFNjcm9sbF0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XHJcbiAgICAgIDxkaXYgW3N0eWxlLmhlaWdodF09XCJnZXRUb3RhbEhlaWdodCgpXCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVWaWV3cG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBzZXRWaWV3cG9ydCA9IHRoaXMudGhyb3R0bGUoKCkgPT4ge1xyXG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLnNldFZpZXdwb3J0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcclxuICB9LCAxNyk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgc2Nyb2xsRXZlbnRIYW5kbGVyOiAoJGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgdmlydHVhbFNjcm9sbDogVHJlZVZpcnR1YWxTY3JvbGxcclxuICApIHtcclxuICAgIHRoaXMuc2Nyb2xsRXZlbnRIYW5kbGVyID0gdGhpcy5zZXRWaWV3cG9ydC5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnZpcnR1YWxTY3JvbGwuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0Vmlld3BvcnQoKTtcclxuICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMuaW5pdGlhbGl6ZWQgfSk7XHJcbiAgICB9KTtcclxuICAgIGxldCBlbDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsRXZlbnRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLmNsZWFyKCk7XHJcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEV2ZW50SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBnZXRUb3RhbEhlaWdodCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICh0aGlzLnZpcnR1YWxTY3JvbGwuaXNFbmFibGVkKCkgJiZcclxuICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGwudG90YWxIZWlnaHQgKyAncHgnKSB8fFxyXG4gICAgICAnYXV0bydcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRocm90dGxlKGZ1bmMsIHRpbWVGcmFtZSkge1xyXG4gICAgbGV0IGxhc3RUaW1lID0gMDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICBpZiAobm93IC0gbGFzdFRpbWUgPj0gdGltZUZyYW1lKSB7XHJcbiAgICAgICAgZnVuYygpO1xyXG4gICAgICAgIGxhc3RUaW1lID0gbm93O1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=