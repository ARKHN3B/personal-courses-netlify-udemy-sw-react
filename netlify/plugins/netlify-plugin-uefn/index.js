module.exports = {
  onPreBuild: ({ inputs }) => {
    const {prefix, def} = inputs;

    if (!def && !def.length) {
      throw Error("No def");
    }

    const definitions = Array.isArray(def) ? def : def.split(/\s*[;|,|\s]\s*/);

    for (const definition of definitions) {
      // Use old concat to provide a support to old Node versions
      const key = prefix ? (prefix + "_" + definition) : definition;
      const value = process.env[definition];
      process.env[key] = value;
    }

    console.debug({ inputs, definitions, env: process.env });
  }
}
