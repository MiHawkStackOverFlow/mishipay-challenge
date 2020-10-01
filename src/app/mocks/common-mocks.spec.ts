interface StringMap<TValue> {
    [key: string]: TValue;
}

export function SetPrivate(objInstance: StringMap<any>, propertyName: string, value: any): void {
    if (typeof(propertyName) === 'string' && propertyName.length > 0) {
      const props = propertyName.split('.');
      if (props.length === 1) {
        return objInstance[props[0]] = value;
      }
  
      props.reduce((accum: { value: any }, prop: string, index: number) => {
        if (index === props.length - 1) {
          accum.value[prop] = value;
          return accum;
        }
        accum.value = accum.value[prop];
        return accum;
      }, { value: objInstance });
  
      return value;
    }
  
    return objInstance[propertyName] = value;
  }
  
  export function GetPrivate<T>(objInstance: StringMap<any>, propertyName: string): T {
    if (typeof(propertyName) === 'string' && propertyName.length > 0) {
      const props = propertyName.split('.');
      const res = props.reduce((accum: { value: any }, prop: string, index: number) => {
        accum.value = objInstance[prop];
        return accum;
      }, { value: objInstance });
  
      return res.value;
    }
  
    return objInstance[propertyName];
  }
  
  export function ExecPrivate<T>(objInstance: StringMap<any>, methodName: string, args: any[] = []): T {
    if (args && args.length > 0) {
      return objInstance[methodName](...args);
    }
    return objInstance[methodName]();
  }