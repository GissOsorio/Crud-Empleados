export interface IEmpleado {
    id: string,
    nombre: string,
    cargo: string,
    departamento: string,
    title: string
}

export const UserColumns = [
    {
      key: 'isSelected',
      type: 'isSelected',
      label: '',
    },
    {
      key: 'id',
      type: 'text',
      label: '',
    },
    {
      key: 'nombre',
      type: 'text',
      label: 'Nombre',
    },
    {
      key: 'cargo',
      type: 'text',
      label: 'Cargo',
    },
    {
      key: 'departamento',
      type: 'text',
      label: 'Departamento',
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
];