export const isBrowser = () => typeof window !== 'undefined'

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
