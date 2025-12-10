interface FormatResponseOptions<T> {
  message: string;
  statusCode: number;
  access_token?: string;
  data?: T;
}

export function formatResponse<T = any>(options: FormatResponseOptions<T>) {
  return {
    message: options.message,
    statusCode: options.statusCode,
    ...(options.access_token && { access_token: options.access_token }),
    ...(options.data && { data: options.data }),
  };
}
