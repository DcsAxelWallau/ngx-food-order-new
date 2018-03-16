interface NodeModule {
  hot: any;
}

interface System {
  import(request: string): Promise<any>;
}
var System: System;

interface Window {
  temp: any;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'is-primitive' {
  const value: any;
  export default value;
}

declare module 'hash-it' {
  const value: any;
  export default value;
}
