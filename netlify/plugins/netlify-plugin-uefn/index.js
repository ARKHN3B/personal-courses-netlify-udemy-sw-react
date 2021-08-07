module.exports = {
  onPreBuild: ({inputs, utils}) => {
    try {
      console.info("Starting the \"uefn\" plugin process ")
      const prefix = inputs.prefix || process.env.NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_PREFIX;

      if (!prefix) {
        return utils.status.show({summary: "No variables defined in the \"prefix\" input. Skip the process."});
      }

      const hasDef = inputs.def || process.env.NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_DEF;

      // Stop the process if there is no def input without breaking the build
      if (!hasDef) {
        return utils.status.show({summary: "No variables defined in the \"def\" input. Skip the process."});
      }

      // Build definitions
      const definitions = buildGlobalDefinitions(inputs.def);

      // Set the process env object
      for (const definition of definitions) {
        // Use old concat to provide a support to old Node versions
        const key        = `${prefix}_${definition}`;
        process.env[key] = process.env[definition];
      }

      console.debug(process.env);

      utils.status.show({summary: "The environment variables have been added successfully!"});
    }
    catch (error) {
      utils.build.failPlugin("The plugin failed. Please check your configuration. Stack trace:", {error});
    }
  }
};


/**
 * Builds an array of definitions from the definitions defined in Netlify UI and in the netlify.toml file.
 * @param tomlDef
 * @return {*[]}
 */
function buildGlobalDefinitions(tomlDef) {
  // Get definitions sets in the Netlify UI
  const uiDef         = parseUIDefinitions();
  const parsedTomlDef = Array.isArray(tomlDef) ? tomlDef : splitDefinitions(tomlDef);

  // Important! The definitions sets in the TOML file override those sets in the Netlify UI
  return [...uiDef, ...parsedTomlDef];
}


/**
 * Parse definitions sets in the Netlify user interface
 * @return {*[]}
 */
function parseUIDefinitions() {
  console.info("Parse UI definitions if exists");
  const {NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_DEF: uiDef} = process.env;

  if (!uiDef) {
    console.info("No def has been defined through the Netlify UI");
    return [];
  }

  // If the string is an array
  const isArrayLike = /\[/.test(uiDef);

  return isArrayLike ? JSON.parse(uiDef) : splitDefinitions(uiDef);
}


/**
 * Convert a string of definitions into an array of definitions
 * @param {string} rawDef - Definitions in string format
 * @example
 * // returns ["VAR_1", "VAR_2", "VAR_3"]
 * splitDefinitions("VAR_1, VAR_2, VAR_3")
 * @return {string[]}
 */
function splitDefinitions(rawDef) {
  return rawDef.split(/\s*[;|,|\s]\s*/);
}
