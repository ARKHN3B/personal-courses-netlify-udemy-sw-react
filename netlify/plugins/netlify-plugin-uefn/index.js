module.exports = {
  onPreBuild: ({ inputs }) => {
    const {prefix, def} = inputs;

    if (!def && !def.length) return;

    const definitions = Array.isArray(def) ? def : def.split(/\s*[;|,|\s]\s*/);

    console.debug({ inputs, definitions, env: process.env });
    process.env["REACT_APP_RHINOSHIELD"] = "Les meilleurs coques!";
  }
}
