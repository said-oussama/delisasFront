import { Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
const EASE_ACCELERATION = 1.005;
export class TreeAnimateOpenDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2RpcmVjdGl2ZXMvdHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0YsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFLaEMsTUFBTSxPQUFPLHdCQUF3QjtJQXNCbkMsWUFDVSxRQUFtQixFQUNuQixXQUE2QixFQUM3QixnQkFBa0M7UUFGbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUM1QyxDQUFDO0lBbkJELElBQ0ksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0RDtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBQUEsQ0FBQztJQVVNLEtBQUs7UUFDWCxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUU5QixvQkFBb0I7UUFDcEIsSUFB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Z0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtRQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7OztZQWhHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjthQUM5Qjs7OztZQU4wQixTQUFTO1lBQUUsV0FBVztZQUFFLGdCQUFnQjs7OzJCQVVoRSxLQUFLLFNBQUMsc0JBQXNCO2tDQUM1QixLQUFLLFNBQUMsNkJBQTZCO3dCQUNuQyxLQUFLLFNBQUMsd0JBQXdCO3FCQUU5QixLQUFLLFNBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgUmVuZGVyZXIyLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuY29uc3QgRUFTRV9BQ0NFTEVSQVRJT04gPSAxLjAwNTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3RyZWVBbmltYXRlT3Blbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUge1xyXG4gIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCd0cmVlQW5pbWF0ZU9wZW5TcGVlZCcpIGFuaW1hdGVTcGVlZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgndHJlZUFuaW1hdGVPcGVuQWNjZWxlcmF0aW9uJykgYW5pbWF0ZUFjY2VsZXJhdGlvbjogbnVtYmVyO1xyXG4gIEBJbnB1dCgndHJlZUFuaW1hdGVPcGVuRW5hYmxlZCcpIGlzRW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCd0cmVlQW5pbWF0ZU9wZW4nKVxyXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zaG93KCk7XHJcbiAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCAmJiB0aGlzLl9pc09wZW4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZU9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0VuYWJsZWQgPyB0aGlzLl9hbmltYXRlQ2xvc2UoKSA6IHRoaXMuX2hpZGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2lzT3BlbiA9ICEhdmFsdWU7XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBpbm5lckVsZW1lbnQ6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG93KCkge1xyXG4gICAgaWYgKHRoaXMuaW5uZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgLy8gY3JlYXRlIGNoaWxkIHZpZXdcclxuICAgIHRoaXMuaW5uZXJFbGVtZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKS5yb290Tm9kZXNbMF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oaWRlKCkge1xyXG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcbiAgICB0aGlzLmlubmVyRWxlbWVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hbmltYXRlT3BlbigpIHtcclxuICAgIGxldCBkZWx0YSA9IHRoaXMuYW5pbWF0ZVNwZWVkO1xyXG4gICAgbGV0IGVhc2UgPSB0aGlzLmFuaW1hdGVBY2NlbGVyYXRpb247XHJcbiAgICBsZXQgbWF4SGVpZ2h0ID0gMDtcclxuXHJcbiAgICAvLyBzZXQgaGVpZ2h0IHRvIDBcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbm5lckVsZW1lbnQsICdtYXgtaGVpZ2h0JywgYDBgKTtcclxuXHJcbiAgICAvLyBpbmNyZWFzZSBtYXhIZWlnaHQgdW50aWwgaGVpZ2h0IGRvZXNuJ3QgY2hhbmdlXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy8gQWxsb3cgaW5uZXIgZWxlbWVudCB0byBjcmVhdGUgaXRzIGNvbnRlbnRcclxuICAgICAgY29uc3QgaSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzT3BlbiB8fCAhdGhpcy5pbm5lckVsZW1lbnQpIHJldHVybiBjbGVhckludGVydmFsKGkpO1xyXG5cclxuICAgICAgICBtYXhIZWlnaHQgKz0gZGVsdGE7XHJcbiAgICAgICAgY29uc3Qgcm91bmRlZE1heEhlaWdodCA9IE1hdGgucm91bmQobWF4SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmlubmVyRWxlbWVudCwgJ21heC1oZWlnaHQnLCBgJHtyb3VuZGVkTWF4SGVpZ2h0fXB4YCk7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5pbm5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID8gdGhpcy5pbm5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogMDsgLy8gVEJEIHVzZSByZW5kZXJlclxyXG5cclxuICAgICAgICBkZWx0YSAqPSBlYXNlO1xyXG4gICAgICAgIGVhc2UgKj0gRUFTRV9BQ0NFTEVSQVRJT047XHJcbiAgICAgICAgaWYgKGhlaWdodCA8IHJvdW5kZWRNYXhIZWlnaHQpIHtcclxuICAgICAgICAgIC8vIE1ha2UgbWF4SGVpZ2h0IGF1dG8gYmVjYXVzZSBhbmltYXRpb24gZmluaXNoZWQgYW5kIGNvbnRhaW5lciBtaWdodCBjaGFuZ2UgaGVpZ2h0IGxhdGVyIG9uXHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5uZXJFbGVtZW50LCAnbWF4LWhlaWdodCcsIG51bGwpO1xyXG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDE3KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYW5pbWF0ZUNsb3NlKCkge1xyXG4gICAgaWYgKCF0aGlzLmlubmVyRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBkZWx0YSA9IHRoaXMuYW5pbWF0ZVNwZWVkO1xyXG4gICAgbGV0IGVhc2UgPSB0aGlzLmFuaW1hdGVBY2NlbGVyYXRpb247XHJcbiAgICBsZXQgaGVpZ2h0ID0gdGhpcy5pbm5lckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0OyAvLyBUQkQgdXNlIHJlbmRlcmVyXHJcblxyXG4gICAgLy8gc2xvd2x5IGRlY3JlYXNlIG1heEhlaWdodCB0byAwLCBzdGFydGluZyBmcm9tIGN1cnJlbnQgaGVpZ2h0XHJcbiAgICBjb25zdCBpID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5faXNPcGVuIHx8ICF0aGlzLmlubmVyRWxlbWVudCkgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaSk7XHJcblxyXG4gICAgICBoZWlnaHQgLT0gZGVsdGE7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5pbm5lckVsZW1lbnQsICdtYXgtaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XHJcbiAgICAgIGRlbHRhICo9IGVhc2U7XHJcbiAgICAgIGVhc2UgKj0gRUFTRV9BQ0NFTEVSQVRJT047XHJcblxyXG4gICAgICBpZiAoaGVpZ2h0IDw9IDApIHtcclxuICAgICAgICAvLyBhZnRlciBhbmltYXRpb24gY29tcGxldGUgLSByZW1vdmUgY2hpbGQgZWxlbWVudFxyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuaW5uZXJFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICBjbGVhckludGVydmFsKGkpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxNyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==