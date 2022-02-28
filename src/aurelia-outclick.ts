import { bindable, BindingMode, customAttribute, ICustomAttributeViewModel, INode } from '@aurelia/runtime-html';

@customAttribute('outclick')
export class AureliaOutclickCustomAttribute implements ICustomAttributeViewModel {
    constructor(@INode readonly element: HTMLElement) {

    }

    attached() {
        document.addEventListener('click', this.handleClick);
    }

    detached() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick = event => {
        // Click is outside of element
        if (!this.element.contains(event.target)) {
            this.element.dispatchEvent(new CustomEvent('outclick', { bubbles: true, cancelable: true }));
        }
    }
}