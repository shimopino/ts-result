export type Branded<T, U extends string> = T & { __brand: U };
