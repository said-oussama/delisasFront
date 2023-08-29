import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { autorun } from 'mobx';
export class TreeMobxAutorunDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tb2J4LWF1dG9ydW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL21vYngtYW5ndWxhci90cmVlLW1vYngtYXV0b3J1bi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUdYLEtBQUssRUFFTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE1BQU0sT0FBTyx3QkFBd0I7SUFNbkMsWUFDWSxXQUE2QixFQUM3QixhQUErQjtRQUQvQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBUGpDLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztJQVE3QixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztJQUM3RCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQTBCO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7OztZQXJDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7Ozs7WUFSMUMsV0FBVztZQURYLGdCQUFnQjs7OzhCQWNmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgRW1iZWRkZWRWaWV3UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGF1dG9ydW4gfSBmcm9tICdtb2J4JztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0cmVlTW9ieEF1dG9ydW5dJyB9KVxyXG5leHBvcnQgY2xhc3MgVHJlZU1vYnhBdXRvcnVuRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZUJpbmRpbmdzID0ge307XHJcbiAgcHJvdGVjdGVkIGRpc3Bvc2U6IGFueTtcclxuICBwcm90ZWN0ZWQgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XHJcbiAgQElucHV0KCkgdHJlZU1vYnhBdXRvcnVuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcclxuICAgIHByb3RlY3RlZCB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudmlldyA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZVJlZik7XHJcblxyXG4gICAgaWYgKHRoaXMuZGlzcG9zZSkge1xyXG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zaG91bGREZXRhY2goKSkge1xyXG4gICAgICB0aGlzLnZpZXcuZGV0YWNoKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9EZXRlY3QodGhpcy52aWV3KTtcclxuICB9XHJcblxyXG4gIHNob3VsZERldGFjaCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyZWVNb2J4QXV0b3J1biAmJiB0aGlzLnRyZWVNb2J4QXV0b3J1bi5kZXRhY2g7XHJcbiAgfVxyXG5cclxuICBhdXRvRGV0ZWN0KHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+KSB7XHJcbiAgICB0aGlzLmRpc3Bvc2UgPSBhdXRvcnVuKCgpID0+IHZpZXcuZGV0ZWN0Q2hhbmdlcygpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuZGlzcG9zZSkge1xyXG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19