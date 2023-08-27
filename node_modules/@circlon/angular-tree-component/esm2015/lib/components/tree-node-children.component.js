import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export class TreeNodeChildrenComponent {
}
TreeNodeChildrenComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-children',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        [class.tree-children]="true"
        [class.tree-children-no-padding]="node.options.levelPadding"
        *treeAnimateOpen="
          node.isExpanded;
          speed: node.options.animateSpeed;
          acceleration: node.options.animateAcceleration;
          enabled: node.options.animateExpand
        "
      >
        <tree-node-collection
          *ngIf="node.children"
          [nodes]="node.children"
          [templates]="templates"
          [treeModel]="node.treeModel"
        >
        </tree-node-collection>
        <tree-loading-component
          [style.padding-left]="node.getNodePadding()"
          class="tree-node-loading"
          *ngIf="!node.children"
          [template]="templates.loadingTemplate"
          [node]="node"
        ></tree-loading-component>
      </div>
    </ng-container>
  `
            },] }
];
TreeNodeChildrenComponent.propDecorators = {
    node: [{ type: Input }],
    templates: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoaWxkcmVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItdHJlZS1jb21wb25lbnQvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGlsZHJlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBb0NyRCxNQUFNLE9BQU8seUJBQXlCOzs7WUFsQ3JDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFFckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO2FBQ0Y7OzttQkFFRSxLQUFLO3dCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY2hpbGRyZW4nLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgc3R5bGVzOiBbXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIFtjbGFzcy50cmVlLWNoaWxkcmVuXT1cInRydWVcIlxyXG4gICAgICAgIFtjbGFzcy50cmVlLWNoaWxkcmVuLW5vLXBhZGRpbmddPVwibm9kZS5vcHRpb25zLmxldmVsUGFkZGluZ1wiXHJcbiAgICAgICAgKnRyZWVBbmltYXRlT3Blbj1cIlxyXG4gICAgICAgICAgbm9kZS5pc0V4cGFuZGVkO1xyXG4gICAgICAgICAgc3BlZWQ6IG5vZGUub3B0aW9ucy5hbmltYXRlU3BlZWQ7XHJcbiAgICAgICAgICBhY2NlbGVyYXRpb246IG5vZGUub3B0aW9ucy5hbmltYXRlQWNjZWxlcmF0aW9uO1xyXG4gICAgICAgICAgZW5hYmxlZDogbm9kZS5vcHRpb25zLmFuaW1hdGVFeHBhbmRcclxuICAgICAgICBcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHRyZWUtbm9kZS1jb2xsZWN0aW9uXHJcbiAgICAgICAgICAqbmdJZj1cIm5vZGUuY2hpbGRyZW5cIlxyXG4gICAgICAgICAgW25vZGVzXT1cIm5vZGUuY2hpbGRyZW5cIlxyXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIlxyXG4gICAgICAgICAgW3RyZWVNb2RlbF09XCJub2RlLnRyZWVNb2RlbFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvdHJlZS1ub2RlLWNvbGxlY3Rpb24+XHJcbiAgICAgICAgPHRyZWUtbG9hZGluZy1jb21wb25lbnRcclxuICAgICAgICAgIFtzdHlsZS5wYWRkaW5nLWxlZnRdPVwibm9kZS5nZXROb2RlUGFkZGluZygpXCJcclxuICAgICAgICAgIGNsYXNzPVwidHJlZS1ub2RlLWxvYWRpbmdcIlxyXG4gICAgICAgICAgKm5nSWY9XCIhbm9kZS5jaGlsZHJlblwiXHJcbiAgICAgICAgICBbdGVtcGxhdGVdPVwidGVtcGxhdGVzLmxvYWRpbmdUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcclxuICAgICAgICA+PC90cmVlLWxvYWRpbmctY29tcG9uZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xyXG4gIEBJbnB1dCgpIHRlbXBsYXRlczogYW55O1xyXG59XHJcbiJdfQ==