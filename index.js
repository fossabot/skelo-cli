#!/usr/bin/env node

const {generateSidebarsFile, buildSidebarsLayout, validateFilesAndShowDuplicatedLabels} = require('./lib/skelo-utils');
const fs = require('fs');
const path = require('path');
const {Command} = require('commander');

const SKELO_CONFIG_FILE = './skelo.config.json';

const DEFAULT_TEMPLATE_NAMES = {
  "templateNames": {
    "SIDEBARS_TEMPLATE": "sidebars",
    "TOPIC_TEMPLATE": "topic",
    "HEADING_TEMPLATE": "heading"
  }
}

const FALLBACK_PATTERNS = [
  '**/*.outline.yaml',
  '**/*.outline.yml',
  '__outlines__/**/*.yaml',
  '__outlines__/**/*.yml'
]

const {version, name, description} = require('./package.json');

/**
 * Reads a configuration file and returns a merged configuration
 * of defaultTemplateNames and the JSON content of the file.
 * If the file does not exist or there is an error reading/parsing
 * the content, it returns the defaultTemplateNames.
 * @param {string} configFile - The path to the configuration file.
 * @returns {Object} Merged configuration object.
 */
function getConfiguration(configFile) {
  try {
    if (fs.existsSync(configFile)) {
      const configContent = fs.readFileSync(configFile, 'utf8');
      return {...DEFAULT_TEMPLATE_NAMES, ...JSON.parse(configContent)};
    }
  } catch (err) {
      console.error("Error reading or parsing config file:", err);
      return DEFAULT_TEMPLATE_NAMES;
    }
  }

let program = new Command();

program
  .name(name)
  .description(description)
  .version(version)
  .configureHelp({
    sortSubcommands: true,
    sortOptions: true,
    showGlobalOptions: true,
    width: 100
  })

program
  .command('build', {isDefault: true})
  .alias('b')
  .description('Build Docusaurus documentation')

  .argument('[patterns...]', 'Glob patterns for outline files')

  .option('-v, --verbose', 'Verbose output')
  .option('-d, --docs <path>', 'Docusaurus documentation directory', 'docs')
  .option('-s, --sidebarsFilename <filePath>', 'Sidebars file name', 'sidebars.js')
  .option('--fallback-patterns <patterns...>', 'Fallback glob patterns for outline files', FALLBACK_PATTERNS)
  .option('--templates <path>', 'Templates directory', 'templates')
  .option('--templateExtension <ext>', 'Template file extension', '.hbs')
  .option('--schemaFilename <path>', 'Schema file', 'schemas/outline/v1/outline.schema.json')
  .option('-c, --config <path>', 'Path to the configuration file', SKELO_CONFIG_FILE) // Add config option
  .configureHelp({
    sortSubcommands: true,
    sortOptions: true,
    width: 100
  })

  .action((patterns, options) => {
    const configFilePath = path.resolve(options.config); // Resolve the provided config path
    const config = getConfiguration(configFilePath);    // Use the resolved path
    const combinedOptions = { ...config, ...options }; // Config overrides options
    const generatedSidebarsLayout = buildSidebarsLayout(patterns, combinedOptions);
    generateSidebarsFile(generatedSidebarsLayout, combinedOptions);
  })

program
  .command('validate')
  .alias('v')
  .description('Validate outline files')
  .argument('[patterns...]', 'Glob patterns for outline files')
  .option('-v, --verbose', 'Verbose output')
  .option('--fallback-patterns <patterns...>', 'Fallback glob patterns for outline files', FALLBACK_PATTERNS)
  .option('--schemaFilename <path>', 'Schema file', 'schemas/outline/v1/outline.schema.json')
  .option('-c, --config <path>', 'Path to the configuration file', SKELO_CONFIG_FILE) // Add config option
  .action((patterns, options) => {
    const configFilePath = path.resolve(options.config); // Resolve the provided config path
    const config = getConfiguration(configFilePath);    // Use the resolved path
    const combinedOptions = { ...config, ...options }; // Config overrides options
    validateFilesAndShowDuplicatedLabels(patterns, combinedOptions);
  })

  .configureHelp({
    sortSubcommands: true,
    sortOptions: true,
    width: 100
  })

// program.parse("node index.js validate  --verbose".split(" "))
// program.parse("node index.js -d test/website/docs -s test/website/sidebars.js --verbose".split(" "))
program.parse();
