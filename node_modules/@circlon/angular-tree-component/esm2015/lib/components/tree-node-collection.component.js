var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { reaction } from 'mobx';
import { observable, computed, action } from '../mobx-angular/mobx-proxy';
import { TreeModel } from '../models/tree.model';
export class TreeNodeCollectionComponent {
    constructor() {
        this._dispose = [];
    }
    get nodes() {
        return this._nodes;
    }
    set nodes(nodes) {
        this.setNodes(nodes);
    }
    get marginTop() {
        const firstNode = this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
        const relativePosition = firstNode && firstNode.parent
            ? firstNode.position -
                firstNode.parent.position -
                firstNode.parent.getSelfHeight()
            : 0;
        return `${relativePosition}px`;
    }
    setNodes(nodes) {
        this._nodes = nodes;
    }
    ngOnInit() {
        this.virtualScroll = this.treeModel.virtualScroll;
        this._dispose = [
            // return node indexes so we can compare structurally,
            reaction(() => {
                return this.virtualScroll
                    .getViewportNodes(this.nodes)
                    .map(n => n.index);
            }, nodeIndexes => {
                this.viewportNodes = nodeIndexes.map(i => this.nodes[i]);
            }, { compareStructural: true, fireImmediately: true }),
            reaction(() => this.nodes, nodes => {
                this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
            })
        ];
    }
    ngOnDestroy() {
        this._dispose.forEach(d => d());
    }
    trackNode(index, node) {
        return node.id;
    }
}
TreeNodeCollectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'tree-node-collection',
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        <tree-node
          *ngFor="let node of viewportNodes; let i = index; trackBy: trackNode"
          [node]="node"
          [index]="i"
          [templates]="templates"
        >
        </tree-node>
      </div>
    </ng-container>
  `
            },] }
];
TreeNodeCollectionComponent.propDecorators = {
    nodes: [{ type: Input }],
    treeModel: [{ type: Input }],
    templates: [{ type: Input }]
};
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeNodeCollectionComponent.prototype, "_nodes", void 0);
__decorate([
    observable,
    __metadata("design:type", Array)
], TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
__decorate([
    computed,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], TreeNodeCollectionComponent.prototype, "marginTop", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeNodeCollectionComponent.prototype, "setNodes", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci10cmVlLWNvbXBvbmVudC9zcmMvbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLGlCQUFpQixFQUdsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQW1CakQsTUFBTSxPQUFPLDJCQUEyQjtJQWpCeEM7UUErQ0UsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQXFDaEIsQ0FBQztJQWxFQyxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFVUyxJQUFJLFNBQVM7UUFDckIsTUFBTSxTQUFTLEdBQ2IsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sZ0JBQWdCLEdBQ3BCLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTTtZQUMzQixDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQ2xCLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUTtnQkFDekIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVSLE9BQU8sR0FBRyxnQkFBZ0IsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFJTyxRQUFRLENBQUMsS0FBSztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLHNEQUFzRDtZQUN0RCxRQUFRLENBQ04sR0FBRyxFQUFFO2dCQUNILE9BQU8sSUFBSSxDQUFDLGFBQWE7cUJBQ3RCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQzVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLEVBQ0QsV0FBVyxDQUFDLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUMsRUFDRCxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFTLENBQzFEO1lBQ0QsUUFBUSxDQUNOLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQ2hCLEtBQUssQ0FBQyxFQUFFO2dCQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNuQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDthQUNGOzs7b0JBRUUsS0FBSzt3QkFRTCxLQUFLO3dCQUlMLEtBQUs7O0FBRk07SUFBWCxVQUFVOzsyREFBUTtBQUlQO0lBQVgsVUFBVTs7a0VBQTJCO0FBRTVCO0lBQVQsUUFBUTs7OzREQVdSO0FBSU87SUFBUCxNQUFNOzs7OzJEQUVOIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyByZWFjdGlvbiB9IGZyb20gJ21vYngnO1xyXG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgYWN0aW9uIH0gZnJvbSAnLi4vbW9ieC1hbmd1bGFyL21vYngtcHJveHknO1xyXG5pbXBvcnQgeyBUcmVlVmlydHVhbFNjcm9sbCB9IGZyb20gJy4uL21vZGVscy90cmVlLXZpcnR1YWwtc2Nyb2xsLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcclxuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0cmVlLW5vZGUtY29sbGVjdGlvbicsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqdHJlZU1vYnhBdXRvcnVuPVwieyBkb250RGV0YWNoOiB0cnVlIH1cIj5cclxuICAgICAgPGRpdiBbc3R5bGUubWFyZ2luLXRvcF09XCJtYXJnaW5Ub3BcIj5cclxuICAgICAgICA8dHJlZS1ub2RlXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiB2aWV3cG9ydE5vZGVzOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiB0cmFja05vZGVcIlxyXG4gICAgICAgICAgW25vZGVdPVwibm9kZVwiXHJcbiAgICAgICAgICBbaW5kZXhdPVwiaVwiXHJcbiAgICAgICAgICBbdGVtcGxhdGVzXT1cInRlbXBsYXRlc1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvdHJlZS1ub2RlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ29sbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBub2RlcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9ub2RlcztcclxuICB9XHJcbiAgc2V0IG5vZGVzKG5vZGVzKSB7XHJcbiAgICB0aGlzLnNldE5vZGVzKG5vZGVzKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHRyZWVNb2RlbDogVHJlZU1vZGVsO1xyXG5cclxuICBAb2JzZXJ2YWJsZSBfbm9kZXM7XHJcbiAgcHJpdmF0ZSB2aXJ0dWFsU2Nyb2xsOiBUcmVlVmlydHVhbFNjcm9sbDsgLy8gQ2Fubm90IGluamVjdCB0aGlzLCBiZWNhdXNlIHdlIG1pZ2h0IGJlIGluc2lkZSB0cmVlTm9kZVRlbXBsYXRlRnVsbFxyXG4gIEBJbnB1dCgpIHRlbXBsYXRlcztcclxuXHJcbiAgQG9ic2VydmFibGUgdmlld3BvcnROb2RlczogVHJlZU5vZGVbXTtcclxuXHJcbiAgQGNvbXB1dGVkIGdldCBtYXJnaW5Ub3AoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGZpcnN0Tm9kZSA9XHJcbiAgICAgIHRoaXMudmlld3BvcnROb2RlcyAmJiB0aGlzLnZpZXdwb3J0Tm9kZXMubGVuZ3RoICYmIHRoaXMudmlld3BvcnROb2Rlc1swXTtcclxuICAgIGNvbnN0IHJlbGF0aXZlUG9zaXRpb24gPVxyXG4gICAgICBmaXJzdE5vZGUgJiYgZmlyc3ROb2RlLnBhcmVudFxyXG4gICAgICAgID8gZmlyc3ROb2RlLnBvc2l0aW9uIC1cclxuICAgICAgICAgIGZpcnN0Tm9kZS5wYXJlbnQucG9zaXRpb24gLVxyXG4gICAgICAgICAgZmlyc3ROb2RlLnBhcmVudC5nZXRTZWxmSGVpZ2h0KClcclxuICAgICAgICA6IDA7XHJcblxyXG4gICAgcmV0dXJuIGAke3JlbGF0aXZlUG9zaXRpb259cHhgO1xyXG4gIH1cclxuXHJcbiAgX2Rpc3Bvc2UgPSBbXTtcclxuXHJcbiAgQGFjdGlvbiBzZXROb2Rlcyhub2Rlcykge1xyXG4gICAgdGhpcy5fbm9kZXMgPSBub2RlcztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsID0gdGhpcy50cmVlTW9kZWwudmlydHVhbFNjcm9sbDtcclxuICAgIHRoaXMuX2Rpc3Bvc2UgPSBbXHJcbiAgICAgIC8vIHJldHVybiBub2RlIGluZGV4ZXMgc28gd2UgY2FuIGNvbXBhcmUgc3RydWN0dXJhbGx5LFxyXG4gICAgICByZWFjdGlvbihcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy52aXJ0dWFsU2Nyb2xsXHJcbiAgICAgICAgICAgIC5nZXRWaWV3cG9ydE5vZGVzKHRoaXMubm9kZXMpXHJcbiAgICAgICAgICAgIC5tYXAobiA9PiBuLmluZGV4KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vZGVJbmRleGVzID0+IHtcclxuICAgICAgICAgIHRoaXMudmlld3BvcnROb2RlcyA9IG5vZGVJbmRleGVzLm1hcChpID0+IHRoaXMubm9kZXNbaV0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBjb21wYXJlU3RydWN0dXJhbDogdHJ1ZSwgZmlyZUltbWVkaWF0ZWx5OiB0cnVlIH0gYXMgYW55XHJcbiAgICAgICksXHJcbiAgICAgIHJlYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRoaXMubm9kZXMsXHJcbiAgICAgICAgbm9kZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy52aWV3cG9ydE5vZGVzID0gdGhpcy52aXJ0dWFsU2Nyb2xsLmdldFZpZXdwb3J0Tm9kZXMobm9kZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZGlzcG9zZS5mb3JFYWNoKGQgPT4gZCgpKTtcclxuICB9XHJcblxyXG4gIHRyYWNrTm9kZShpbmRleCwgbm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUuaWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==