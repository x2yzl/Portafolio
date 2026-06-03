export default {
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Descripción', type: 'text' },
    { name: 'image', title: 'Imagen', type: 'image' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'url', title: 'URL', type: 'url' },
    { name: 'github', title: 'GitHub', type: 'url' },
    { name: 'order', title: 'Orden', type: 'number' },
  ],
};
