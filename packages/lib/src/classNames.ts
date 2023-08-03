export type ClassName = string | [string, boolean]

export default function classNames(...values: ClassName[]) {
  return values.reduce<string>((result, value) => {
    if (typeof value === 'string') {
      return `${result} ${value}`
    }

    const [name, show] = value

    if (show) {
      return `${result} ${name}`
    }

    return result
  }, '')
}
