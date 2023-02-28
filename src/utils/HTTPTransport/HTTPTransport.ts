enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: Method;
  data?: any;
  headers?: any;
};

function queryStringify(data: Record<string, any>) {
  return Object.entries(data).map(([key, value]) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
}
export default class HTTPTransport {

  private _baseurl: string;

  constructor(baseurl: string) {
    this._baseurl = baseurl;
  }

  get(url: string, options?: Options): Promise<XMLHttpRequest> {
    if (options && options.data) {
      url += '?' + queryStringify(options.data);
      options.data = {};
    }
    return this.request(this._baseurl + url, { ...options, method: Method.GET });
  }

  post(url: string, options?: Options): Promise<XMLHttpRequest> {
    return this.request(this._baseurl + url, { ...options, method: Method.POST });
  }

  put(url: string, options?: Options): Promise<XMLHttpRequest> {
    return this.request(this._baseurl + url, { ...options, method: Method.PUT });
  }

  delete(url: string, options?: Options): Promise<XMLHttpRequest> {
    return this.request(this._baseurl + url, { ...options, method: Method.DELETE });
  }

  request(url: string, options: Options = { method: Method.GET }): Promise<XMLHttpRequest> {
    const { headers = { 'Content-Type': 'application/json' }, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method as string, url);
      xhr.withCredentials = true;

      let json = true;


      Object.keys(headers).forEach((key) => {
        if (key.toLowerCase() === 'content-type' && headers[key].toLowerCase() === 'multipart/form-data') {
          json = false;
        } else {
          xhr.setRequestHeader(key, headers[key]);
        }
      });

      xhr.onload = function () {
        const { status } = xhr;
        if (status === 200 || status === 201) {
          return resolve(xhr);
        }
        return reject(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {

        const d = json ? JSON.stringify(data) : data;
        xhr.send(d);
      }
    });
  }
}
