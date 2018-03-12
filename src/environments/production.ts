import { Environment } from './default-environment.class';
import { IAutoUpdateSettings } from '../libs/ngx-utils';

export default class ProductionEnvironment extends Environment {
  public apiUrl = '//localhost:3001';
  public throwOnSchemaError = true;
  public autoUpdate: IAutoUpdateSettings = 'confirm';
  public updateMessage = 'Updates available, reload page now?';
  public pageTitle = 'DCS Angular Starter';
  public base = '/';

  // public additionalEnhancers: GenericStoreEnhancer[] = [];
}
