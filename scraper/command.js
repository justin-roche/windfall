export default class Command {
  constructor(_config) {
    let config = _.cloneDeep(_config);
    if (config.readFields) {
      this.configureReadFields(config);
    }
    _.map(config, (value, key) => {
      this[key] = value;
    });
  }

  configureReadFields(config) {
    config.results = [];
    config.elements = [];
    config.readFields = _.map(config.readFields, (value, key) => {
      if (typeof value === 'object') {
        return { name: key, type: value.type, target: value.target };
      }
      return { name: key, type: 'text', target: value };
    });
    return config;
  }
}
