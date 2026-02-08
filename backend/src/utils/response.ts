export const successResponse = (data: any) => {
  return { data };
};

export const errorResponse = (code: string, message: string, details?: any) => {
  return {
    error: {
      code,
      message,
      details,
      timestamp: new Date().toISOString()
    }
  };
};
