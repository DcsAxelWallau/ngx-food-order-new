import { DevToolsExtension } from '@angular-redux/store';
import { HttpErrorResponse } from '@angular/common/http';
import isPrimitive from 'is-primitive';
import { AnyAction } from 'redux';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import { Environment } from './default-environment.class';

const actionTransformer = (action: AnyAction) => {
  if (action.type === 'BATCHING_REDUCER.BATCH') {
    action.payload.type = action.payload.map((next: any) => next.type).join(' => ');
    return action.payload;
  }

  return action;
};

const level = 'info';

const logger: any = {};

for (const method in console) {
  if (typeof (console as any)[method] === 'function') {
    logger[method] = (console as any)[method].bind(console);
  }
}

logger[level] = function levelFn(...args: any[]) {
  const lastArg = args.pop();

  if (Array.isArray(lastArg)) {
    return lastArg.forEach(item => {
      console[level].apply(console, [...args, item]);
    });
  }

  console[level].apply(console, arguments);
};

const loggerMiddleware = createLogger({
  level,
  actionTransformer,
  logger,
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
      loggerMiddleware,
      immutableStateInvariantMiddleware(immutableStateInvariantSettings),
    ];
  }
}
