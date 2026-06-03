export default {
  name: 'experience',
  title: 'Experiencia',
  type: 'document',
  fields: [
    { name: 'role', title: 'Rol', type: 'string', validation: Rule => Rule.required() },
    { name: 'company', title: 'Empresa', type: 'string' },
    { name: 'date', title: 'Fecha', type: 'string' },
    { name: 'description', title: 'Descripción', type: 'text' },
    { name: 'order', title: 'Orden', type: 'number' },
  ],
};
