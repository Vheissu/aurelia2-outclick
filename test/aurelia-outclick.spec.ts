import { Outclick } from '../src/aurelia-outclick';
import { BrowserPlatform } from '@aurelia/platform-browser';
import { createFixture, setPlatform } from '@aurelia/testing';

const platform = new BrowserPlatform(window);
setPlatform(platform);
BrowserPlatform.set(globalThis, platform);

describe('Aurelia Outclick', () => {
    test('should register click outside of button', async function() {
        const { appHost, startPromise, tearDown, testHost, component, ctx } = createFixture(
          `<template>
            <div id="container">
                <button id="button" outclick.bind="clickOutside">Click Me</button>
            </div>
          </template>`,
          class App {
              clickOutside(event) {
                return true;
              }
          },
          [ Outclick ]
        );
  
        await startPromise;

        jest.spyOn(component, 'clickOutside');

        const container = testHost.querySelector('#container') as HTMLDivElement;
        const button = container.querySelector('#button') as HTMLButtonElement;

        container.click();

        expect(component.clickOutside).toBeCalled();
  
        await tearDown();
    });

    test('should not register click on button', async function() {
        const { appHost, startPromise, tearDown, testHost, component, ctx } = createFixture(
          `<template>
            <div id="container">
                <button id="button" outclick.bind="clickOutside">Click Me</button>
            </div>
          </template>`,
          class App {
              clickOutside(event) {
                  return true;
              }
          },
          [ Outclick ]
        );
  
        await startPromise;

        const container = testHost.querySelector('#container') as HTMLDivElement;
        const button = container.querySelector('#button') as HTMLButtonElement;

        jest.spyOn(component, 'clickOutside');

        button.click();

        expect(component.clickOutside).not.toBeCalled();
  
        await tearDown();
    });
});