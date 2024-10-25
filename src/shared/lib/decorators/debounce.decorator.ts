export function debounce(time: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let timer!: any;
    descriptor.value = function (...args: any[]): any {
      clearTimeout(timer);
      timer = setTimeout(() => {
        originalMethod.apply(this, args);
      }, time);
    };

    return descriptor;
  };
}
