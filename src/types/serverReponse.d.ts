export interface ServerResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[] | null;
  statusCode: number;
  timestamp: string;
}
