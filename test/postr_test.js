/*global describe,it*/
'use strict';
var assert = require('assert'),
    Postr = require('../lib/postr.js'),
    sinon = require('sinon')
;

describe('postr node module.', function() {
    it('must initialise', function() {

        var mockSchema = {}, p;
        mockSchema.post = sinon.spy();
        mockSchema.name = 'test';

        p = new Postr({
            schemas: [
                mockSchema
            ]
        });

        assert.equal(p.schemas.test, mockSchema);
    });

    it('must call post', function() {
        var mockSchema = {}, p;
        mockSchema.post = sinon.spy();
        mockSchema.name = 'test';

        p = new Postr({
            schemas: [
                mockSchema
            ]
        });

        p.post('test', 'ello');

        assert(mockSchema.post.called);
    });

    it('must call post on all', function() {
        var mockSchema = {},
            mockSchema2 = {},
            p
        ;

        mockSchema.post = sinon.spy();
        mockSchema2.post = sinon.spy();
        mockSchema.name = 'test';
        mockSchema2.name = 'test2';

        p = new Postr({
            schemas: [
                mockSchema,
                mockSchema2
            ]
        });

        p.post('all', 'ello');

        assert(mockSchema.post.called);
        assert(mockSchema2.post.called);
    });

    it('must error if schema not set', function() {
        var mockSchema = {},
            p
        ;

        mockSchema.post = sinon.spy();
        mockSchema.name = 'test';

        p = new Postr({
            schemas: [
                mockSchema
            ]
        });

        assert.throws(function() {
                p.post('unset', 'ello');
            },
            Error
        );

        assert(!mockSchema.post.called);
    });
});
