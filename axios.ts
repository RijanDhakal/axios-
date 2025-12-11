import { HttpError } from "./errorHandler";

interface config {
  headers: Record<string, string>;
  baseUrl?: string;
  timeout?: number;
}

interface FetchData<T = string> {
  fetchUrl: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  data?: T;
}

interface FnCallingParams<T = any> {
  url: string;
  payload?: T;
}

interface fetchResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
  error?: string;
}

interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
}

class Axios {
  config: config = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 1000,
  };
  constructor(config: config) {
    this.config = config;
  }

  private async handleTimeOut(fetchData: FetchData) {
    const controller = new AbortController();
    const timeOutId = setTimeout(() => {
      controller.abort();
    }, this.config.timeout);
    const options: RequestInit = {
      signal: controller.signal,
      method: fetchData.method,
      headers: this.config.headers,
    };
    if (fetchData.method !== "GET" || fetchData.data !== undefined) {
      options.body = JSON.stringify(fetchData.data);
    }
    let fetchApi;
    try {
      fetchApi = await fetch(fetchData.fetchUrl, options);
    } catch (error: unknown) {
      const err = error as Error;
      if (err.name === "AbortError") {
        throw new HttpError({
          error: "RequestTimeOut",
          message: "Failed to process request in time. Please try again.",
          statusCode: 408,
          path: fetchData.fetchUrl,
        });
      } else {
        throw err;
      }
    } finally {
      clearTimeout(timeOutId);
    }
    const JsonResponse: fetchResponse = await fetchApi.json();
    if (!fetchApi) {
      throw new Error("no fetch data found");
    }
    return JsonResponse;
  }

  async get<T = any>(url?: string): Promise<ApiResponse<T>> {
    if (!this.config.baseUrl) {
      throw new HttpError({
        error: "NotFoundError",
        message: "Base url not found",
        statusCode: 404,
      });
    }
    const fetchUrl = this.config.baseUrl + url;
    const fetchResponse = await this.handleTimeOut({
      fetchUrl: fetchUrl,
      method: "GET",
    });
    if (fetchResponse.statusCode !== 200) {
      throw new HttpError({
        message: fetchResponse.message,
        statusCode: fetchResponse.statusCode,
        path: fetchUrl,
        error: fetchResponse.error ?? "",
      });
    }
    return fetchResponse;
  }

  async post<T = any>({ url, payload }: FnCallingParams<any>) : Promise<ApiResponse<T>> {
    if (!this.config.baseUrl) {
      throw new HttpError({
        error: "NotFoundError",
        message: "Base url not found",
        statusCode: 404,
      });
    }
    const fetchUrl = this.config.baseUrl + url;
    const fetchResponse = await this.handleTimeOut({
      fetchUrl: fetchUrl,
      method: "POST",
      data: payload,
    });
    if (fetchResponse.statusCode !== 201) {
      throw new HttpError({
        message: fetchResponse.message,
        statusCode: fetchResponse.statusCode,
        path: fetchUrl,
        error: fetchResponse.error ?? "",
      });
    }
    return fetchResponse;
  }

  async patch<T = any>(params: FnCallingParams<any>): Promise<ApiResponse<T>> {
    if (!this.config.baseUrl) {
      throw new HttpError({
        error: "NotFoundError",
        message: "Base url not found",
        statusCode: 404,
      });
    }
    const fetchUrl = this.config.baseUrl + params.url;
    const fetchResponse = await this.handleTimeOut({
      fetchUrl: fetchUrl,
      method: "PATCH",
      data: params.payload,
    });
    if (fetchResponse.statusCode !== 200) {
      throw new HttpError({
        message: fetchResponse.message,
        statusCode: fetchResponse.statusCode,
        path: fetchUrl,
        error: fetchResponse.error ?? "",
      });
    }
    return fetchResponse;
  }

  async delete<T = any>(params: FnCallingParams<{ Id: number }>): Promise<ApiResponse<T>> {
    if (!this.config.baseUrl) {
      throw new HttpError({
        error: "NotFoundError",
        message: "Base url not found",
        statusCode: 404,
      });
    }
    if (!params.payload) {
      throw new HttpError({
        error: "NotFoundError",
        message: "Payload not found",
        statusCode: 404,
        path: this.config.baseUrl + params.url,
      });
    }
    const fetchUrl =
      this.config.baseUrl + params.url + "/" + Number(params.payload.Id);
    const fetchResponse = await this.handleTimeOut({
      fetchUrl: fetchUrl,
      method: "DELETE",
    });
    if (fetchResponse.statusCode !== 200) {
      throw new HttpError({
        message: fetchResponse.message,
        statusCode: fetchResponse.statusCode,
        path: fetchUrl,
        error: fetchResponse.error ?? "",
      });
    }
    return fetchResponse;
  }
}

function create(conf: config) {
  return new Axios(conf);
}

export default {
  create,
};
