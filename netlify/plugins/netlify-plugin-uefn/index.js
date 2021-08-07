module.exports = {
  onPreBuild: ({inputs, utils}) => {
    try {
      const prefix = inputs.prefix || process.env.NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_PREFIX;
      const def    = inputs.def && inputs.def.length ? inputs.def : process.env.NETLIFY_PLUGIN_USE_ENV_IN_RUNTIME_DEF;

      // Stop the process if there is no def input without breaking the build
      if (!def.length) {
        return utils.status.show({summary: "No variables defined in the \"def\" input. Skip the process."});
      }

      const definitions = Array.isArray(def) ? def : def.split(/\s*[;|,|\s]\s*/);

      for (const definition of definitions) {
        // Use old concat to provide a support to old Node versions
        const key        = prefix ? (prefix + "_" + definition) : definition;
        process.env[key] = process.env[definition];
      }

      utils.status.show({summary: "The environment variables have been added successfully!"});
    }
    catch (error) {
      utils.build.failPlugin("The plugin failed to add the environment variables present in the netlify.toml file. Please check your configuration. Stack trace:", {error});
    }
  }
};
