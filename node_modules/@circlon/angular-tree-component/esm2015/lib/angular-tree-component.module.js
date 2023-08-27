import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeMobxAutorunDirective } from './mobx-angular/tree-mobx-autorun.directive';
import { TREE_ACTIONS } from './models/tree-options.model';
import { KEYS } from './constants/keys';
import { TreeModel } from './models/tree.model';
import { TreeNode } from './models/tree-node.model';
import { TreeDraggedElement } from './models/tree-dragged-element.model';
import { TreeVirtualScroll } from './models/tree-virtual-scroll.model';
import { LoadingComponent } from './components/loading.component';
import { TreeComponent } from './components/tree.component';
import { TreeNodeComponent } from './components/tree-node.component';
import { TreeNodeContent } from './components/tree-node-content.component';
import { TreeNodeDropSlot } from './components/tree-node-drop-slot.component';
import { TreeNodeExpanderComponent } from './components/tree-node-expander.component';
import { TreeNodeChildrenComponent } from './components/tree-node-children.component';
import { TreeNodeCollectionComponent } from './components/tree-node-collection.component';
import { TreeNodeWrapperComponent } from './components/tree-node-wrapper.component';
import { TreeViewportComponent } from './components/tree-viewport.component';
import { TreeNodeCheckboxComponent } from './components/tree-node-checkbox.component';
import { TreeDropDirective } from './directives/tree-drop.directive';
import { TreeDragDirective } from './directives/tree-drag.directive';
import { TreeAnimateOpenDirective } from './directives/tree-animate-open.directive';
export class TreeModule {
}
TreeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TreeComponent,
                    TreeNodeComponent,
                    TreeNodeContent,
                    LoadingComponent,
                    TreeDropDirective,
                    TreeDragDirective,
                    TreeNodeExpanderComponent,
                    TreeNodeChildrenComponent,
                    TreeNodeDropSlot,
                    TreeNodeCollectionComponent,
                    TreeViewportComponent,
                    TreeNodeWrapperComponent,
                    TreeNodeCheckboxComponent,
                    TreeAnimateOpenDirective,
                    TreeMobxAutorunDirective
                ],
                exports: [
                    TreeComponent,
                    TreeNodeComponent,
                    TreeNodeContent,
                    LoadingComponent,
                    TreeDropDirective,
                    TreeDragDirective,
                    TreeNodeExpanderComponent,
                    TreeNodeChildrenComponent,
                    TreeNodeDropSlot,
                    TreeNodeCollectionComponent,
                    TreeViewportComponent,
                    TreeNodeWrapperComponent,
                    TreeNodeCheckboxComponent,
                    TreeAnimateOpenDirective,
                    TreeMobxAutorunDirective
                ],
                imports: [CommonModule],
                providers: []
            },] }
];
export { TreeModel, TreeNode, TreeDraggedElement, TreeVirtualScroll, TREE_ACTIONS, KEYS, LoadingComponent, TreeAnimateOpenDirective, TreeComponent, TreeNodeComponent, TreeNodeWrapperComponent, TreeNodeContent, TreeDropDirective, TreeDragDirective, TreeNodeExpanderComponent, TreeNodeChildrenComponent, TreeNodeDropSlot, TreeNodeCollectionComponent, TreeViewportComponent, TreeNodeCheckboxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10cmVlLWNvbXBvbmVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXRyZWUtY29tcG9uZW50L3NyYy9saWIvYW5ndWxhci10cmVlLWNvbXBvbmVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFdEYsT0FBTyxFQUdMLFlBQVksRUFDYixNQUFNLDZCQUE2QixDQUFDO0FBT3JDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUF3Q3BGLE1BQU0sT0FBTyxVQUFVOzs7WUF0Q3RCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIseUJBQXlCO29CQUN6Qix5QkFBeUI7b0JBQ3pCLGdCQUFnQjtvQkFDaEIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLHdCQUF3QjtvQkFDeEIseUJBQXlCO29CQUN6Qix3QkFBd0I7b0JBQ3hCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLHlCQUF5QjtvQkFDekIseUJBQXlCO29CQUN6QixnQkFBZ0I7b0JBQ2hCLDJCQUEyQjtvQkFDM0IscUJBQXFCO29CQUNyQix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsd0JBQXdCO29CQUN4Qix3QkFBd0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLEVBQUU7YUFDZDs7QUFHRCxPQUFPLEVBQ0wsU0FBUyxFQUNULFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBRWpCLFlBQVksRUFDWixJQUFJLEVBS0osZ0JBQWdCLEVBQ2hCLHdCQUF3QixFQUN4QixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQix5QkFBeUIsRUFDekIseUJBQXlCLEVBQ3pCLGdCQUFnQixFQUNoQiwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUUxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVHJlZU1vYnhBdXRvcnVuRGlyZWN0aXZlIH0gZnJvbSAnLi9tb2J4LWFuZ3VsYXIvdHJlZS1tb2J4LWF1dG9ydW4uZGlyZWN0aXZlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSUFjdGlvbkhhbmRsZXIsXHJcbiAgSUFjdGlvbk1hcHBpbmcsXHJcbiAgVFJFRV9BQ1RJT05TXHJcbn0gZnJvbSAnLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcclxuaW1wb3J0IHtcclxuICBJQWxsb3dEcmFnRm4sXHJcbiAgSUFsbG93RHJvcEZuLFxyXG4gIElUcmVlT3B0aW9ucyxcclxuICBJVHJlZVN0YXRlXHJcbn0gZnJvbSAnLi9kZWZzL2FwaSc7XHJcbmltcG9ydCB7IEtFWVMgfSBmcm9tICcuL2NvbnN0YW50cy9rZXlzJztcclxuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xyXG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2FkaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRpbmcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtbm9kZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZU5vZGVEcm9wU2xvdCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWV4cGFuZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNoaWxkcmVuLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRyZWVOb2RlQ29sbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY29sbGVjdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZVdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHJlZS1ub2RlLXdyYXBwZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZVZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RyZWUtdmlld3BvcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZU5vZGVDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cmVlLW5vZGUtY2hlY2tib3guY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHJlZURyb3BEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1kcm9wLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRyZWVEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdHJlZS1hbmltYXRlLW9wZW4uZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBUcmVlQ29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVDb21wb25lbnQsXHJcbiAgICBUcmVlTm9kZUNvbnRlbnQsXHJcbiAgICBMb2FkaW5nQ29tcG9uZW50LFxyXG4gICAgVHJlZURyb3BEaXJlY3RpdmUsXHJcbiAgICBUcmVlRHJhZ0RpcmVjdGl2ZSxcclxuICAgIFRyZWVOb2RlRXhwYW5kZXJDb21wb25lbnQsXHJcbiAgICBUcmVlTm9kZUNoaWxkcmVuQ29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVEcm9wU2xvdCxcclxuICAgIFRyZWVOb2RlQ29sbGVjdGlvbkNvbXBvbmVudCxcclxuICAgIFRyZWVWaWV3cG9ydENvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlV3JhcHBlckNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlQ2hlY2tib3hDb21wb25lbnQsXHJcbiAgICBUcmVlQW5pbWF0ZU9wZW5EaXJlY3RpdmUsXHJcbiAgICBUcmVlTW9ieEF1dG9ydW5EaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRyZWVDb21wb25lbnQsXHJcbiAgICBUcmVlTm9kZUNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlQ29udGVudCxcclxuICAgIExvYWRpbmdDb21wb25lbnQsXHJcbiAgICBUcmVlRHJvcERpcmVjdGl2ZSxcclxuICAgIFRyZWVEcmFnRGlyZWN0aXZlLFxyXG4gICAgVHJlZU5vZGVFeHBhbmRlckNvbXBvbmVudCxcclxuICAgIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXHJcbiAgICBUcmVlTm9kZURyb3BTbG90LFxyXG4gICAgVHJlZU5vZGVDb2xsZWN0aW9uQ29tcG9uZW50LFxyXG4gICAgVHJlZVZpZXdwb3J0Q29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgVHJlZU5vZGVDaGVja2JveENvbXBvbmVudCxcclxuICAgIFRyZWVBbmltYXRlT3BlbkRpcmVjdGl2ZSxcclxuICAgIFRyZWVNb2J4QXV0b3J1bkRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJlZU1vZHVsZSB7fVxyXG5cclxuZXhwb3J0IHtcclxuICBUcmVlTW9kZWwsXHJcbiAgVHJlZU5vZGUsXHJcbiAgVHJlZURyYWdnZWRFbGVtZW50LFxyXG4gIFRyZWVWaXJ0dWFsU2Nyb2xsLFxyXG4gIElUcmVlT3B0aW9ucyxcclxuICBUUkVFX0FDVElPTlMsXHJcbiAgS0VZUyxcclxuICBJQWN0aW9uTWFwcGluZyxcclxuICBJQWN0aW9uSGFuZGxlcixcclxuICBJQWxsb3dEcm9wRm4sXHJcbiAgSUFsbG93RHJhZ0ZuLFxyXG4gIExvYWRpbmdDb21wb25lbnQsXHJcbiAgVHJlZUFuaW1hdGVPcGVuRGlyZWN0aXZlLFxyXG4gIFRyZWVDb21wb25lbnQsXHJcbiAgVHJlZU5vZGVDb21wb25lbnQsXHJcbiAgVHJlZU5vZGVXcmFwcGVyQ29tcG9uZW50LFxyXG4gIFRyZWVOb2RlQ29udGVudCxcclxuICBUcmVlRHJvcERpcmVjdGl2ZSxcclxuICBUcmVlRHJhZ0RpcmVjdGl2ZSxcclxuICBUcmVlTm9kZUV4cGFuZGVyQ29tcG9uZW50LFxyXG4gIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQsXHJcbiAgVHJlZU5vZGVEcm9wU2xvdCxcclxuICBUcmVlTm9kZUNvbGxlY3Rpb25Db21wb25lbnQsXHJcbiAgVHJlZVZpZXdwb3J0Q29tcG9uZW50LFxyXG4gIFRyZWVOb2RlQ2hlY2tib3hDb21wb25lbnQsXHJcbiAgSVRyZWVTdGF0ZVxyXG59O1xyXG4iXX0=