import { IContainer, IRegistry } from '@aurelia/kernel';
import { AureliaOutclickCustomAttribute } from './aurelia-outclick';

const DefaultComponents: IRegistry[] = [
    AureliaOutclickCustomAttribute as unknown as IRegistry
];

export const AureliaOutclick = {
    register(container: IContainer): IContainer {
        container.register(
            ...DefaultComponents
        );

        return container;
    }
};