Package.describe({
  summary: "underscore.string repackaged for Meteor"
});

var fs = Npm.require('fs'),
	yaml;

// To the gods of meteor - please don't make me do this! :(
try {
	yaml = Npm.require('../../packages/yaml/yaml.js');
}
catch(e) {
	yaml = Npm.require(process.cwd() + "/.meteor/meteorite/packages/yaml/yaml.js");
}

Package.on_use(function (api, where) {
  where = where || ['client', 'server'];

  api.use('underscore', where);

  api.add_files('yaml.js', where);
});

Package.register_extension("yaml", function (bundle, source_path, serve_path, where) {
    var yaml_path = serve_path.split('.')[0].split('/').splice(1)
      , contents = fs.readFileSync(source_path)
      , loader = "YAML._import("+JSON.stringify(yaml_path)+", "+JSON.stringify(yaml.parse(contents.toString('utf8')))+");";
    contents = new Buffer(loader);
    serve_path = serve_path + '.js';

    bundle.add_resource({
      type: "js",
      path: serve_path,
      data: contents,
      where: where
    });
  }
);
