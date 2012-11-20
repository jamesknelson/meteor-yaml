var root = this
  , YAML = {};

if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = YAML;
	} else {
		exports.YAML = YAML;
	}
} else {
	root['YAML'] = YAML;
}

// TODO: Test this
function merge(base, priority) {
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	for (var prop in priority) {
		if (hasOwnProperty.call(priority, prop)) {
			if (_.isUndefined(base[prop])) {
				base[prop] = priority[prop];
			}
			else if (_.isArray(base[prop]) && _.isArray(priority[prop])){
				base[prop] = _.reject(merge(base[prop], priority[prop]), function (item) { return _.isNull(item);});
			}
			else if (_.isObject(base[prop]) && _.isObject(priority[prop])){
				base[prop] = merge(base[prop], priority[prop]);
			} else {
				base[prop] = priority[prop];
			}
		}
	}
	return base;
};

YAML.data = {};
YAML._import = function(path, data) {
	// TODO: client/server paths should be filtered deeply,
	// not just at the surface.
	if ((Meteor.isClient && path[0] == 'client')
	 || (Meteor.isServer && path[0] == 'server')) {
		path = path.splice(1)
	}
	for (var i=path.length, key; key=path[--i];) {
		var temp = {};
		temp[key] = data;
		data = temp;
	}
	merge(YAML.data, data);
};

/**
 * Parses YAML into a JS representation.
 *
 * The parse method, when supplied with a YAML stream (string),
 * will do its best to convert YAML into a JS representation.
 *
 *	Usage:
 *	<code>
 *	 obj = yaml.parse(...);
 *	</code>
 *
 * @param string input string containing YAML
 *
 * @return array The YAML converted to a JS representation
 *
 * @throws YamlParseException If the YAML is not valid
 */
YAML.parse = function (input) {
	var yaml = new YamlParser();
	return yaml.parse(input);
};

/**
 * Dumps a JS representation to a YAML string.
 *
 * The dump method, when supplied with an array, will do its best
 * to convert the array into friendly YAML.
 *
 * @param array	 array JS representation
 * @param integer inline The level where you switch to inline YAML
 *
 * @return string A YAML string representing the original JS representation
*
* @api
*/
YAML.stringify = function(array, inline, spaces)
{
	if ( inline == null ) inline = 2;

	var yaml = new YamlDumper();
	if (spaces) {
	    yaml.numSpacesForIndentation = spaces;
	}

	return yaml.dump(array, inline);
}