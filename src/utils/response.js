export const SuccessResponse = (
  res,
  {
    code = 200,
    message = "Success",
    data = null,
  } = {}
) => {
  return res.status(code).json({
    code,
    message,
    data,
  });
};

export const ErrorResponse = (
  res,
  {
    code = 500,
    message = "Internal Server Error",
    errors = null,
  } = {}
) => {
  return res.status(code).json({
    code,
    message,
    errors,
  });
};