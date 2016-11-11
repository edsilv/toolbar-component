// declare var Redux: any;

// var assign = require('es6-object-assign').assign;
// import Reducer = Redux.Reducer;
var Redux = require('redux');
require('virtual-dom/h');
var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');


namespace IIIFComponents {
    export class ToolbarComponent extends _Components.BaseComponent {

        public options: IToolbarComponentOptions;
        private _$toolbar: JQuery;
        private _buttons: any[];

        constructor(options: IToolbarComponentOptions) {
            super(options);

            this._init();
            this._resize();
        }

        public test(): void {
            this._emit(ToolbarComponent.Events.TEST, [1, 2, 'three']);
        }

        protected _init(): boolean {
            var success: boolean = super._init();

            if (!success){
                console.error("Component failed to initialise");
            }
            this._buttons = this.options.buttons;
            console.log(GROW);
            // 1: Create a function that declares what the DOM should look like
            function render(state)  {
                return h('div', {
                    style: {
                        textAlign: 'center',
                        lineHeight: (100 + state.count) + 'px',
                        border: '1px solid ' + state.color,
                        width: (100 + state.count) + 'px',
                        height: (100 + state.count) + 'px'
                    }
                }, [String(state.count)]);
            }

            // Initialise the state and doc
            const initialState = { count: 0, color: 'red' };      // We need some app data. Here we just store a count.

            var tree = render(initialState);               // We need an initial tree
            var rootNode = createElement(tree);     // Create an initial root DOM node ...
            document.body.appendChild(rootNode);    // ... and it should be in the document


            function count(state = 0, action) {
              switch (action.type) {
                case GROW:
                  return Object.assign({}, state, {
                    count: action.count++
                  })
                case RESET:
                  return Object.assign({}, state, {
                    count: 0
                  })
                default:
                  return state
              }
            }

            function color(state = 'red', action) {
              switch (action.type) {
                case CHANGE_COLOR:
                  return Object.assign({}, state, {
                    color: action.color
                  })
                default:
                  return state
              }
            }

            function app(state = initialState, action) {
                return {
                  count: count(state.count, action),
                  color: color(state.color, action)
                }
            }

            let store = Redux.createStore(app)

            return success;
        }

        protected _getDefaultOptions(): IToolbarComponentOptions {
            return <IToolbarComponentOptions>{
                orientation: "vertical",
                buttons: ["easy"],
                hidden: false
            }
        }

        protected _resize(): void {

        }
    }
}

namespace IIIFComponents.ToolbarComponent {
    export class Events {
        static TEST: string = 'test';
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.ToolbarComponent = IIIFComponents.ToolbarComponent;
    }
})(window);
