module.exports = {
  onPreBuild: (...args) => {
    console.debug({
      args,
      env: process.env
    })
  }
}
