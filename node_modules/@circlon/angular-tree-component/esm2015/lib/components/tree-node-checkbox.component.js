import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export class TreeNodeCheckboxComponent {
}
TreeNodeCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-checkbox',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <input
        class="tree-node-checkbox"
        type="checkbox"
        (click)="node.mouseAction('checkboxClick', $event)"
        [checked]="node.isSelected"
        [indeterminate]="node.isPartiallySelected"
      />
    </ng-container>
  `
            },] }
];
TreeNodeCheckboxComponent.propDecorators = {
    node: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoZWNrYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBa0JyRCxNQUFNLE9BQU8seUJBQXlCOzs7WUFoQnJDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFFckMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7YUFDRjs7O21CQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY2hlY2tib3gnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgc3R5bGVzOiBbXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgY2xhc3M9XCJ0cmVlLW5vZGUtY2hlY2tib3hcIlxyXG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm5vZGUubW91c2VBY3Rpb24oJ2NoZWNrYm94Q2xpY2snLCAkZXZlbnQpXCJcclxuICAgICAgICBbY2hlY2tlZF09XCJub2RlLmlzU2VsZWN0ZWRcIlxyXG4gICAgICAgIFtpbmRldGVybWluYXRlXT1cIm5vZGUuaXNQYXJ0aWFsbHlTZWxlY3RlZFwiXHJcbiAgICAgIC8+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcclxufVxyXG4iXX0=