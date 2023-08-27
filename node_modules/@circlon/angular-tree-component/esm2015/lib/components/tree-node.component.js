import { Component, Input, ViewEncapsulation, } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export class TreeNodeComponent {
}
TreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'TreeNode, tree-node',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        *ngIf="!templates.treeNodeFullTemplate"
        [class]="node.getClass()"
        [class.tree-node]="true"
        [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
        [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
        [class.tree-node-leaf]="node.isLeaf"
        [class.tree-node-active]="node.isActive"
        [class.tree-node-focused]="node.isFocused"
      >
        <tree-node-drop-slot
          *ngIf="index === 0"
          [dropIndex]="node.index"
          [node]="node.parent"
        ></tree-node-drop-slot>

        <tree-node-wrapper
          [node]="node"
          [index]="index"
          [templates]="templates"
        ></tree-node-wrapper>

        <tree-node-children
          [node]="node"
          [templates]="templates"
        ></tree-node-children>
        <tree-node-drop-slot
          [dropIndex]="node.index + 1"
          [node]="node.parent"
        ></tree-node-drop-slot>
      </div>
      <ng-container
        [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngTemplateOutletContext]="{
          $implicit: node,
          node: node,
          index: index,
          templates: templates
        }"
      >
      </ng-container>
    </ng-container>
  `
            },] }
];
TreeNodeComponent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    templates: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQW9EckQsTUFBTSxPQUFPLGlCQUFpQjs7O1lBbEQ3QixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBRXJDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q1Q7YUFDRjs7O21CQUVFLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1RyZWVOb2RlLCB0cmVlLW5vZGUnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgc3R5bGVzOiBbXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgICpuZ0lmPVwiIXRlbXBsYXRlcy50cmVlTm9kZUZ1bGxUZW1wbGF0ZVwiXHJcbiAgICAgICAgW2NsYXNzXT1cIm5vZGUuZ2V0Q2xhc3MoKVwiXHJcbiAgICAgICAgW2NsYXNzLnRyZWUtbm9kZV09XCJ0cnVlXCJcclxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWV4cGFuZGVkXT1cIm5vZGUuaXNFeHBhbmRlZCAmJiBub2RlLmhhc0NoaWxkcmVuXCJcclxuICAgICAgICBbY2xhc3MudHJlZS1ub2RlLWNvbGxhcHNlZF09XCJub2RlLmlzQ29sbGFwc2VkICYmIG5vZGUuaGFzQ2hpbGRyZW5cIlxyXG4gICAgICAgIFtjbGFzcy50cmVlLW5vZGUtbGVhZl09XCJub2RlLmlzTGVhZlwiXHJcbiAgICAgICAgW2NsYXNzLnRyZWUtbm9kZS1hY3RpdmVdPVwibm9kZS5pc0FjdGl2ZVwiXHJcbiAgICAgICAgW2NsYXNzLnRyZWUtbm9kZS1mb2N1c2VkXT1cIm5vZGUuaXNGb2N1c2VkXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx0cmVlLW5vZGUtZHJvcC1zbG90XHJcbiAgICAgICAgICAqbmdJZj1cImluZGV4ID09PSAwXCJcclxuICAgICAgICAgIFtkcm9wSW5kZXhdPVwibm9kZS5pbmRleFwiXHJcbiAgICAgICAgICBbbm9kZV09XCJub2RlLnBhcmVudFwiXHJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cclxuXHJcbiAgICAgICAgPHRyZWUtbm9kZS13cmFwcGVyXHJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcclxuICAgICAgICAgIFtpbmRleF09XCJpbmRleFwiXHJcbiAgICAgICAgICBbdGVtcGxhdGVzXT1cInRlbXBsYXRlc1wiXHJcbiAgICAgICAgPjwvdHJlZS1ub2RlLXdyYXBwZXI+XHJcblxyXG4gICAgICAgIDx0cmVlLW5vZGUtY2hpbGRyZW5cclxuICAgICAgICAgIFtub2RlXT1cIm5vZGVcIlxyXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxyXG4gICAgICAgID48L3RyZWUtbm9kZS1jaGlsZHJlbj5cclxuICAgICAgICA8dHJlZS1ub2RlLWRyb3Atc2xvdFxyXG4gICAgICAgICAgW2Ryb3BJbmRleF09XCJub2RlLmluZGV4ICsgMVwiXHJcbiAgICAgICAgICBbbm9kZV09XCJub2RlLnBhcmVudFwiXHJcbiAgICAgICAgPjwvdHJlZS1ub2RlLWRyb3Atc2xvdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZXMudHJlZU5vZGVGdWxsVGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XHJcbiAgICAgICAgICAkaW1wbGljaXQ6IG5vZGUsXHJcbiAgICAgICAgICBub2RlOiBub2RlLFxyXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgdGVtcGxhdGVzOiB0ZW1wbGF0ZXNcclxuICAgICAgICB9XCJcclxuICAgICAgPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcclxuICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHRlbXBsYXRlczogYW55O1xyXG59XHJcbiJdfQ==