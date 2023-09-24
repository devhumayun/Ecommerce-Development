export const slugify = (title) => {
    // Convert the text to lowercase
    let slug = title.toLowerCase();
  
    // Replace spaces with hyphens using regex
    slug = slug.replace(/\s+/g, '-');
  
    // Remove special characters using regex
    slug = slug.replace(/[^a-z0-9\-]/g, '');
  
    // Remove consecutive hyphens using regex
    slug = slug.replace(/--+/g, '-');
  
    // Remove leading and trailing hyphens using regex
    slug = slug.replace(/^-+|-+$/g, '');
  
    return slug;
}
