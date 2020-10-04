const readPackage = (pkgArg) => {
  const pkg = { ...pkgArg }

  if (pkg.name === '@types/styled-components') {
    delete pkg.dependencies['@types/react-native']
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
