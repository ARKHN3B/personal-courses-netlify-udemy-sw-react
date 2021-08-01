module.exports = {
  onPreBuild: ({ inputs }) => {
    console.debug({ inputs, env: process.env });
    process.env["REACT_APP_RHINOSHIELD"] = "Les meilleurs coques!";
  }
}
