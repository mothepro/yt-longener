declare function assert(expression: unknown, message?: string): asserts expression;
declare function assertNotNull<T>(expression: T, message?: string): NonNullable<T>;
