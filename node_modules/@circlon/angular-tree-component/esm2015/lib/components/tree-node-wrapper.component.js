import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export class TreeNodeWrapperComponent {
}
TreeNodeWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-wrapper',
                encapsulation: ViewEncapsulation.None,
                template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (click)="node.mouseAction('click', $event)"
               (dblclick)="node.mouseAction('dblClick', $event)"
               (mouseover)="node.mouseAction('mouseOver', $event)"
               (mouseout)="node.mouseAction('mouseOut', $event)"
               (contextmenu)="node.mouseAction('contextMenu', $event)"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  `
            },] }
];
TreeNodeWrapperComponent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    templates: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUcsS0FBSyxFQUFHLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQXNDckQsTUFBTSxPQUFPLHdCQUF3Qjs7O1lBcENwQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBRXJDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7YUFDRjs7O21CQUlFLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICwgSW5wdXQgLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtd3JhcHBlcicgLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUgLFxyXG4gIHN0eWxlczogW10gLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhdGVtcGxhdGVzLnRyZWVOb2RlV3JhcHBlclRlbXBsYXRlXCIgY2xhc3M9XCJub2RlLXdyYXBwZXJcIiBbc3R5bGUucGFkZGluZy1sZWZ0XT1cIm5vZGUuZ2V0Tm9kZVBhZGRpbmcoKVwiPlxyXG4gICAgICAgICAgPHRyZWUtbm9kZS1jaGVja2JveCAqbmdJZj1cIm5vZGUub3B0aW9ucy51c2VDaGVja2JveFwiIFtub2RlXT1cIm5vZGVcIj48L3RyZWUtbm9kZS1jaGVja2JveD5cclxuICAgICAgICAgIDx0cmVlLW5vZGUtZXhwYW5kZXIgW25vZGVdPVwibm9kZVwiPjwvdHJlZS1ub2RlLWV4cGFuZGVyPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5vZGUtY29udGVudC13cmFwcGVyXCJcclxuICAgICAgICAgICAgICAgW2NsYXNzLm5vZGUtY29udGVudC13cmFwcGVyLWFjdGl2ZV09XCJub2RlLmlzQWN0aXZlXCJcclxuICAgICAgICAgICAgICAgW2NsYXNzLm5vZGUtY29udGVudC13cmFwcGVyLWZvY3VzZWRdPVwibm9kZS5pc0ZvY3VzZWRcIlxyXG4gICAgICAgICAgICAgICAoY2xpY2spPVwibm9kZS5tb3VzZUFjdGlvbignY2xpY2snLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgKGRibGNsaWNrKT1cIm5vZGUubW91c2VBY3Rpb24oJ2RibENsaWNrJywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwibm9kZS5tb3VzZUFjdGlvbignbW91c2VPdmVyJywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgIChtb3VzZW91dCk9XCJub2RlLm1vdXNlQWN0aW9uKCdtb3VzZU91dCcsICRldmVudClcIlxyXG4gICAgICAgICAgICAgICAoY29udGV4dG1lbnUpPVwibm9kZS5tb3VzZUFjdGlvbignY29udGV4dE1lbnUnLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgKHRyZWVEcm9wKT1cIm5vZGUub25Ecm9wKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAodHJlZURyb3BEcmFnT3Zlcik9XCJub2RlLm1vdXNlQWN0aW9uKCdkcmFnT3ZlcicsICRldmVudClcIlxyXG4gICAgICAgICAgICAgICAodHJlZURyb3BEcmFnTGVhdmUpPVwibm9kZS5tb3VzZUFjdGlvbignZHJhZ0xlYXZlJywgJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICh0cmVlRHJvcERyYWdFbnRlcik9XCJub2RlLm1vdXNlQWN0aW9uKCdkcmFnRW50ZXInLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgW3RyZWVBbGxvd0Ryb3BdPVwibm9kZS5hbGxvd0Ryb3BcIlxyXG4gICAgICAgICAgICAgICBbYWxsb3dEcmFnb3ZlclN0eWxpbmddPVwibm9kZS5hbGxvd0RyYWdvdmVyU3R5bGluZygpXCJcclxuICAgICAgICAgICAgICAgW3RyZWVEcmFnXT1cIm5vZGVcIlxyXG4gICAgICAgICAgICAgICBbdHJlZURyYWdFbmFibGVkXT1cIm5vZGUuYWxsb3dEcmFnKClcIj5cclxuXHJcbiAgICAgICAgICAgICAgPHRyZWUtbm9kZS1jb250ZW50IFtub2RlXT1cIm5vZGVcIiBbaW5kZXhdPVwiaW5kZXhcIiBbdGVtcGxhdGVdPVwidGVtcGxhdGVzLnRyZWVOb2RlVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICA8L3RyZWUtbm9kZS1jb250ZW50PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVzLnRyZWVOb2RlV3JhcHBlclRlbXBsYXRlXCJcclxuICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUsIG5vZGU6IG5vZGUsIGluZGV4OiBpbmRleCwgdGVtcGxhdGVzOiB0ZW1wbGF0ZXMgfVwiPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50IHtcclxuXHJcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XHJcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcclxuICBASW5wdXQoKSB0ZW1wbGF0ZXM6IGFueTtcclxuXHJcbn1cclxuIl19