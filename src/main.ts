import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {Router} from '@angular/router';

if (environment.production) {
  enableProdMode();
}

const props = {
  bootstrappedModule: null,
  routerRef: Router
};

document.getElementById('bootstrap-button')
  .addEventListener('click', () => {
    const el = window.document.createElement('app-root');
    window.document.getElementById('bootstrap-button').appendChild(el);

    platformBrowserDynamic().bootstrapModule(AppModule)
      .then(module => {
        props.bootstrappedModule = module;
      })
      .catch(err => console.error(err));
  });

document.getElementById('destroy-button')
  .addEventListener('click', () => {
    if (props.routerRef) {
      const routerRef = props.bootstrappedModule.injector.get(props.routerRef);
      routerRef.dispose();
    }
    props.bootstrappedModule.destroy();
    delete props.bootstrappedModule;
  });
