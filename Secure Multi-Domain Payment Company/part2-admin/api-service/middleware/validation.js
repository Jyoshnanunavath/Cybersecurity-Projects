// Demonstration input-validation helpers.
// Real systems should use a schema validation library (e.g. zod, joi);
// this is deliberately simple so the concept stays visible.

export function validatePagination(req, res, next) {
  const { page = "1", pageSize = "10" } = req.query;

  const pageNum = Number(page);
  const pageSizeNum = Number(pageSize);

  if (!Number.isInteger(pageNum) || pageNum < 1) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  if (!Number.isInteger(pageSizeNum) || pageSizeNum < 1 || pageSizeNum > 100) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  req.pagination = { page: pageNum, pageSize: pageSizeNum };
  next();
}

const ID_PATTERN = /^[A-Za-z0-9-]{3,32}$/;

export function validateIdParam(paramName) {
  return (req, res, next) => {
    const value = req.params[paramName];
    if (!value || !ID_PATTERN.test(value)) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }
    next();
  };
}

export function validateSearchQuery(req, res, next) {
  const { q } = req.query;
  if (q !== undefined && (typeof q !== "string" || q.length > 100)) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }
  next();
}
