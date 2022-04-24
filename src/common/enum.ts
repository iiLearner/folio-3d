export type EnumType<E> = E[keyof E];

export type EnumOf<E> = {
  [K in keyof E]: {
    readonly value: E[K];
    isEqual: (v: unknown) => boolean;
    toString: () => E[K];
  };
} & { ensureEnum(e: unknown): EnumType<E> };

export function EnumBuilder<E extends Record<string, string>>(
  obj: E
): EnumOf<E> {
  let enumResult = {} as EnumOf<E>;
  for (const k in obj) {
    enumResult[k] = Object.freeze({
      value: obj[k],
      isEqual: (v: unknown) => v === obj[k],
      toString: () => "" + obj[k],
    }) as any;
  }
  enumResult.ensureEnum = (e: unknown) => {
    for (const k in obj) {
      if (obj[k] === e) return obj[k];
    }
    throw new Error("Invalid ENUM value " + e);
  };
  return enumResult;
}
