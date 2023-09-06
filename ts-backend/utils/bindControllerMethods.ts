//auto-bind package or arrow functions can also be used instead
export function bindControllerMethods<C extends Record<string, any>>(obj: C) {
    const fnKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    /*or 
    const propertyNames = Object.getOwnPropertyNames(AuthController.prototype);
    const propertyNames = Reflect.ownKeys(Reflect.getPrototypeOf(this))
    const propertyNames = Reflect.ownKeys(AuthController.prototype)
    */
    fnKeys.forEach((key) => {
        if (key !== "constructor" && typeof obj[key] === "function") {
            // prevent controller context value (i.e. this) from being lost when used as callback
            obj[key].bind(obj);
        }
    });
}
