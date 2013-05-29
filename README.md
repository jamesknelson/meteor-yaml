# YAML

This smart package lets you parse and generate YAML within a meteor app. It will also automatically load all .yaml files in your project, parse them into javascript objects, and make them available at `YAML.data`. 

It is based on [yaml.js](https://github.com/jeremyfa/yaml.js) by jeremyfa.

## Installation

```
mrt add yaml
```

## Usage

```javascript
YAML.parse(text);
```
Parses the YAML given by `text` and returns it as a javascript object.


```javascript
YAML.stringify(array, inline, spaces);
```
Attempts to return the given array as a yaml string. 

### Parameters:
- `inline`: The level where you switch to inline YAML
- `spaces`: The number of spaces used for indentation

