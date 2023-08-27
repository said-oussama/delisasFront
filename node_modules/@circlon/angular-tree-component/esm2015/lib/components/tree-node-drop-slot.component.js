import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export class TreeNodeDropSlot {
    onDrop($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex }
        });
    }
    allowDrop(element, $event) {
        return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex }, $event);
    }
}
TreeNodeDropSlot.decorators = [
    { type: Component, args: [{
                selector: 'TreeNodeDropSlot, tree-node-drop-slot',
                encapsulation: ViewEncapsulation.None,
                template: `
    <div
      class="node-drop-slot"
      (treeDrop)="onDrop($event)"
      [treeAllowDrop]="allowDrop.bind(this)"
      [allowDragoverStyling]="true">
    </div>
  `
            },] }
];
TreeNodeDropSlot.propDecorators = {
    node: [{ type: Input }],
    dropIndex: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFlckQsTUFBTSxPQUFPLGdCQUFnQjtJQUkzQixNQUFNLENBQUMsTUFBTTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQzFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTztZQUNwQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtTQUNqRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEcsQ0FBQzs7O1lBMUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFFckMsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7YUFDRjs7O21CQUVFLEtBQUs7d0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1RyZWVOb2RlRHJvcFNsb3QsIHRyZWUtbm9kZS1kcm9wLXNsb3QnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgc3R5bGVzOiBbXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzcz1cIm5vZGUtZHJvcC1zbG90XCJcclxuICAgICAgKHRyZWVEcm9wKT1cIm9uRHJvcCgkZXZlbnQpXCJcclxuICAgICAgW3RyZWVBbGxvd0Ryb3BdPVwiYWxsb3dEcm9wLmJpbmQodGhpcylcIlxyXG4gICAgICBbYWxsb3dEcmFnb3ZlclN0eWxpbmddPVwidHJ1ZVwiPlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVEcm9wU2xvdCB7XHJcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XHJcbiAgQElucHV0KCkgZHJvcEluZGV4OiBudW1iZXI7XHJcblxyXG4gIG9uRHJvcCgkZXZlbnQpIHtcclxuICAgIHRoaXMubm9kZS5tb3VzZUFjdGlvbignZHJvcCcsICRldmVudC5ldmVudCwge1xyXG4gICAgICBmcm9tOiAkZXZlbnQuZWxlbWVudCxcclxuICAgICAgdG86IHsgcGFyZW50OiB0aGlzLm5vZGUsIGluZGV4OiB0aGlzLmRyb3BJbmRleCB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFsbG93RHJvcChlbGVtZW50LCAkZXZlbnQpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGUub3B0aW9ucy5hbGxvd0Ryb3AoZWxlbWVudCwgeyBwYXJlbnQ6IHRoaXMubm9kZSwgaW5kZXg6IHRoaXMuZHJvcEluZGV4IH0sICRldmVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==