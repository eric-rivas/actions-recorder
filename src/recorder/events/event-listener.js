import {from} from 'rxjs';
import { publish, mergeAll} from 'rxjs/operators';

import {ClickEventHandler, InputEventHandler, DragEventHandler,
  NavigateEventHandler, EnterKeyPressEventHandler} from './handlers';

export default class EventListener {
  constructor(options) {
    this._clickEventHandler = new ClickEventHandler(options);
    this._inputEventHandler = new InputEventHandler(options);
    this._dragEventHandler = new DragEventHandler(options);
    this._navigateEventHandler = new NavigateEventHandler();
    this._enterKeyPressEventHandler = new EnterKeyPressEventHandler(options);
    this._events = from([
      this._clickEventHandler.events,
      this._inputEventHandler.events,
      this._dragEventHandler.events,
      this._navigateEventHandler.events,
      this._enterKeyPressEventHandler.events
    ])
      .pipe(mergeAll(), publish());
    this._events.connect();
  }

  events() {
    return this._events;
  }
};
