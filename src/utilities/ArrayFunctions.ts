export module Array {
    // Modified version of https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array 
    export function Unique<T>(array : T[], uniqueField: (val: T) => number | string){
        let seen = {};
        return array.filter(function(item) {
            let key = uniqueField(item);
            return seen.hasOwnProperty(key) ? false : (seen[key] = true);
        })
    }
}