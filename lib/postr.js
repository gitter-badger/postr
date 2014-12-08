/*
 * 
 * extrovert.io
 *
 * Copyright (c) 2014 Samuel Trangmar-Keates
 * Licensed under the MIT license.
 */

'use strict';

(function() {
    var B = require('bluebird');

    function Postr(config) {
        var _this = this;
        _this.schemas = {};
        config.schemas.forEach(function(schema) {
            _this.schemas[schema.name] = schema;
        });
    }

    Postr.prototype.post = function(where, message) {
        var schemas = this.schemas;

        if(!schemas[where] && where !== 'all') {
            throw new Error('No schema set for `'+where+'`');
        }

        if(where === 'all') {
            return B.all(Object.keys(schemas).map(function(schema) {
                return schemas[schema].post(message);
            }));
        } else {
            return schemas[where].post(message);
        }
    };

    module.exports = Postr;
})();