//auto-bind package or arrow functions can also be used instead
export default function bindClassMethods<C extends Record<string, any>>(obj: C) {
    const fnKeys: Array<keyof C> = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    /*or 
    const propertyNames = Object.getOwnPropertyNames(Controller.prototype);
    const propertyNames = Reflect.ownKeys(Reflect.getPrototypeOf(this))
    const propertyNames = Reflect.ownKeys(Controller.prototype)
    */
    fnKeys.forEach((key) => {
        if (typeof obj[key] === "function" && key !== "constructor") {
            // prevent controller context value (i.e. this) from being lost when used as callback
            obj[key] = obj[key].bind(obj);
        }
    });
}
