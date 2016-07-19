///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap }        from 'angular2/platform/browser'
import { HTTP_PROVIDERS }   from 'angular2/http';
import 'rxjs/Rx';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { TodoApp }          from './todo.component'

bootstrap(TodoApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS
]);
