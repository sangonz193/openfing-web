export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ReplaceKeyWithType<T extends object, K extends keyof T, U> = {
	[V in K]: U;
};

export type RecursiveRequired<T> = object extends T
	? {
			[K in keyof T]-?: RecursiveRequired<T[K]>;
	  }
	: T;
