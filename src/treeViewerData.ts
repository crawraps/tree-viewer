// Define types for tree viewer
export type Item = {
  label: string
  icon: string
  type: 'file' | 'folder' | 'object'
  children: Item[] | []
}

export type TreeViewerData = {
  search: string
  items: Item[] | []
}

// Create icon id's
export const Icons = {
  file: require('./assets/images/icons/file.svg'),
  folder: require('./assets/images/icons/folder.svg'),
  object: require('./assets/images/icons/object.svg'),
}

// Define initial viewer data
export const InitialData: TreeViewerData = {
  search: '',
  items: [
    {
      label: 'Derby Shoe.gltf',
      icon: Icons.file,
      type: 'file',
      children: [
        {
          label: 'Derby_Shoe_To_What',
          icon: Icons.object,
          type: 'object',
          children: [
            {
              label: 'folder',
              icon: Icons.folder,
              type: 'folder',
              children: [
                {
                  label: 'Derby_T_H_integer',
                  icon: Icons.object,
                  type: 'object',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          label: 'Show_To_Parents',
          icon: Icons.folder,
          type: 'folder',
          children: [
            {
              label: 'Ordinary_Object',
              icon: Icons.object,
              type: 'object',
              children: [],
            },
          ],
        },
      ],
    },
  ],
}
