import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: globals.node },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  pluginJs.configs.recommended,
];
