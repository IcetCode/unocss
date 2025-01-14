export function searchUsageBoundary(line: string, index: number) {
  let start = index
  let end = index

  const regex = /[^\s>"'`;]/
  while (start && regex.test(line.charAt(start - 1))) --start
  while (end < line.length && regex.test(line.charAt(end))) ++end

  return {
    content: line.slice(start, end),
    start,
    end,
  }
}

export function searchAttrKey(content: string, cursor: number) {
  const text = content.substring(0, cursor)
  if (text.match(/(<\w+\s*)[^>]*$/) !== null)
    return text.match(/\S+(?=\s*=\s*["']?[^"']*$)/)?.[0]
}

export function cartesian<T>(arr: T[][]): T[][] {
  if (arr.length < 2)
    return arr
  return arr.reduce(
    (a, b) => {
      const ret: T[][] = []
      a.forEach((a) => {
        b.forEach((b) => {
          ret.push(a.concat([b]))
        })
      })
      return ret
    },
    [[]] as T[][],
  )
}
