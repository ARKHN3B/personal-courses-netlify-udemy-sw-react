module.exports = {
  onPreBuild: ({ inputs }) => {
    console.debug({ inputs, env: process.env })
  }
}
