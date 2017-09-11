const requestWithCallback = require('request');
const request = require('../index')(requestWithCallback.get);
const chai = require('chai');

describe('Main test', () => {
    let httpRespParams;
    let bodyRespParams;
    it('should use the request module as a callback based function', (done) => {
        requestWithCallback.get('http://ip.jsontest.com/', (err, httpResponse, body) => {
            if (err) {
                return done(err);
            }
            httpRespParams = Object.keys(httpResponse);
            bodyRespParams = Object.keys(body);
            return done();
        });
    });
    it('should use the request module as a promise', async () => {
        const result = await request('http://ip.jsontest.com/');
        const httpRespKeys = Object.keys(result[0]);
        httpRespKeys.forEach((element, index) => {
            chai.expect(httpRespParams[index]).to.be.equal(element);
        });
        const bodyRespKeys = Object.keys(result[1]);
        bodyRespKeys.forEach((element, index) => {
            chai.expect(bodyRespParams[index]).to.be.equal(element);
        });
    });
});