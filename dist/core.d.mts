export function assert(truthy: any, message: any): void;
export namespace assert {
    function ok(value: any, message: any): void;
    function equal(actual: any, expected: any, message: any): void;
    function deepEqual(actual: any, expected: any, message: any): void;
}
declare var runner: Readonly<{
    __proto__: any;
    it: (name: any, fn: any) => void;
    run: () => void;
}>;
export { runner as test };
