export default (name, bool) => {
  if (bool) {
    return () =>
      import (`@/components${name}.vue`)
  } else {
    () =>
    import (`@/components/pages${name}.vue`)
  }
}
