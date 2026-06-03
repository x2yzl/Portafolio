export default {
  name: 'skill',
  title: 'Habilidad',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nombre', type: 'string', validation: Rule => Rule.required() },
    { name: 'icon', title: 'Icono', type: 'image' },
    { name: 'category', title: 'Categoría', type: 'string', options: { list: ['frontend', 'backend', 'devops'] } },
    { name: 'order', title: 'Orden', type: 'number' },
  ],
};
