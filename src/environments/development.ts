import { DevToolsExtension } from '@angular-redux/store';
import { HttpErrorResponse } from '@angular/common/http';
import isPrimitive from 'is-primitive';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';

import { Environment } from './default-environment.class';

const logger = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
  timestamp: true,
});

const isImmutable = (value: any) => {
  // HttpErrorResponse is a circular structure, redux-immutable-state-invariant chokes and dies on those
  return isPrimitive(value) || value instanceof HttpErrorResponse;
};

const immutableStateInvariantSettings: any = {
  ignore: ['error', '_persist'],
  isImmutable,
};

export default class DevelopmentEnvironment extends Environment {
  public apiUrl = '//localhost:3001';
  public throwOnSchemaError = false;
  public pageTitle = 'DCS Food Order (development)';
  public base = '/';

  constructor(devTools?: DevToolsExtension) {
    super();
    if (devTools) {
      this.additionalEnhancers = [...this.additionalEnhancers, devTools.enhancer()];
    }

    this.additionalMiddleware = [
      ...this.additionalMiddleware,
      logger,
      immutableStateInvariantMiddleware(immutableStateInvariantSettings),
    ];
  }
}
