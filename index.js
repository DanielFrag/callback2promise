/**
 * Convert a callback based function into a Promise, returning an error or an array of arguments that is pass to the callback
 * The parameters of function's callback must follow this order: first argument must be used for errors, followed by others arguments, and the last argument must be the callback
 * @param {function} callbackBasedFunction
 */
module.exports = function (callbackBasedFunction) {
    return function () {
        const args = [].slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push(function (error) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve([].slice.call(arguments, 1));
                }
            });
            callbackBasedFunction.apply(null, args);
        });
    }
}