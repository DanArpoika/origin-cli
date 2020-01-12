const toSlug = (title = '') => {
  return title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
}

module.exports = toSlug;
