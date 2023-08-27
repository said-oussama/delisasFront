import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export class TreeNodeExpanderComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1leHBhbmRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBc0JyRCxNQUFNLE9BQU8seUJBQXlCOzs7WUFwQnJDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFFckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztHQWNUO2FBQ0Y7OzttQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndHJlZS1ub2RlLWV4cGFuZGVyJyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIHN0eWxlczogW10sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250YWluZXIgKnRyZWVNb2J4QXV0b3J1bj1cInsgZG9udERldGFjaDogdHJ1ZSB9XCI+XHJcbiAgICAgIDxzcGFuXHJcbiAgICAgICAgKm5nSWY9XCJub2RlLmhhc0NoaWxkcmVuXCJcclxuICAgICAgICBbY2xhc3MudG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXItZXhwYW5kZWRdPVwibm9kZS5pc0V4cGFuZGVkXCJcclxuICAgICAgICBbY2xhc3MudG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXItY29sbGFwc2VkXT1cIm5vZGUuaXNDb2xsYXBzZWRcIlxyXG4gICAgICAgIGNsYXNzPVwidG9nZ2xlLWNoaWxkcmVuLXdyYXBwZXJcIlxyXG4gICAgICAgIChjbGljayk9XCJub2RlLm1vdXNlQWN0aW9uKCdleHBhbmRlckNsaWNrJywgJGV2ZW50KVwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvZ2dsZS1jaGlsZHJlblwiPjwvc3Bhbj5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cIiFub2RlLmhhc0NoaWxkcmVuXCIgY2xhc3M9XCJ0b2dnbGUtY2hpbGRyZW4tcGxhY2Vob2xkZXJcIj5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XHJcbn1cclxuIl19