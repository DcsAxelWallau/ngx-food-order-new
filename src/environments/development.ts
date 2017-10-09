import { Middleware } from 'redux';
import {
  IEnvironment,
  loggerMiddleware,
  DefaultEnvironment
} from '@dcs/ngx-utils';

export default class DevelopmentEnvironment extends DefaultEnvironment
  implements IEnvironment {
  public apiUrl = 'http://jsonplaceholder.typicode.com';
  public throwOnSchemaError = false;
  public pageTitle = 'DCS Angular Starter (development)';
  public base = '/';

  public additionalMiddleware: Middleware[] = [loggerMiddleware];
}
