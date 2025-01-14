export const groupBy = <T, K extends PropertyKey>(array: T[], fn: (item: T) => K) =>
  array.reduce((result, item) => {
    const key = fn(item)
    if (!result[key]) result[key] = [] as T[]
    result[key].push(item)
    return result
  }, {} as Record<K, T[]>)