export default {
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nombre', type: 'string', validation: Rule => Rule.required() },
    { name: 'role', title: 'Rol', type: 'string' },
    { name: 'text', title: 'Texto', type: 'text', validation: Rule => Rule.required() },
    { name: 'avatar', title: 'Avatar', type: 'image' },
  ],
};
