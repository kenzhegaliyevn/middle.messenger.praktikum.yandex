import HTTPTransport from './HTTPTransport';
import { expect } from 'chai';

global.XMLHttpRequest = require('xhr2');

describe('HTTPTransport', () => {
  const base = 'http://httpbin.org/';
  const REST = new HTTPTransport(base);

  it('Should perform GET request', async () => {
    const result = await REST.get('/get');
    expect(result.statusText).equals('OK');
  });
  it('Should perform POST request', async () => {
    const result = await REST.post('/post');
    expect(result.statusText).equals('OK');
  });
  it('Should perform PUT request', async () => {
    const result = await REST.put('/put');
    expect(result.statusText).equals('OK');
  });
  it('Should perform DELETE request', async () => {
    const result = await REST.delete('/delete');
    expect(result.statusText).equals('OK');
  });

});