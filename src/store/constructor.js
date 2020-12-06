export default{
    state: {
        categoryTemplates:[
            {
                categoryId: 1,
                category: "Джинсовки",
                image: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/home1.jpg?alt=media&token=a945fa29-2a96-42a9-b699-2b10a41b71f3'
            },
            {
                categoryId: 2,
                category: 'Шопперы',
                image: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/home2.jpg?alt=media&token=17d33c63-4b36-43d2-9b56-2cc95afc23e7'
            },
            {
                categoryId: 3,
                category: 'Футболки',
                image: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/home2.jpg?alt=media&token=17d33c63-4b36-43d2-9b56-2cc95afc23e7'
            },
            {
                categoryId: 4,
                category: 'Кепки',
                image: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/home1.jpg?alt=media&token=a945fa29-2a96-42a9-b699-2b10a41b71f3'
            },
            {
                categoryId: 5,
                category: 'Толстовки',
                image: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/home2.jpg?alt=media&token=17d33c63-4b36-43d2-9b56-2cc95afc23e7'
            }
        ],
        categoryPatterns:[
            {
                categoryId: 3,
                patterns:[
                   {
                       name: 'Просто футболка',
                       options: [
                           {
                               color: 'Желтый',
                               additional: null,
                               hex: '#ffff00',
                               front: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-1.png?alt=media&token=2d860dbe-c390-4843-bc4d-afd91925e7b7',
                               back: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-2.png?alt=media&token=14264749-f71c-4d60-84db-2d66c8d33528',
                               sizes: [
                                   'XL',
                                   'XS',
                                   'S',
                                   'L'
                               ]
                           },
                           {
                               color: 'Зеленый',
                               additional: null,
                               hex: '#005800',
                               front: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-3.png?alt=media&token=4f779350-5c1a-4ada-b9b6-7776bf4ab02e',
                               back: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-4.png?alt=media&token=2245db8c-f766-41f3-9039-7eca581da033',
                               sizes: [
                                   'XL',
                                   'XS',
                               ]
                           },
                       ]
                   },
                   {
                        name: 'Двухцветная футболка',
                        options: [
                            {
                                color: 'Черно-белый',
                                additional: '#ffffff',
                                hex: '#000000',
                                front: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-1.png?alt=media&token=2d860dbe-c390-4843-bc4d-afd91925e7b7',
                                back: 'https://firebasestorage.googleapis.com/v0/b/nichoshn-8e955.appspot.com/o/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-6.png?alt=media&token=469d3d84-650c-4f84-b228-693292207f42',
                                sizes: [
                                    'XL',
                                    'XS',
                                    'S',
                                    'L'
                                ]
                            }
                        ]
                    },
                ]
            },

        ],
        configuration: {
            isConfigured: false,
        },
    },

    mutations: {
        SET_CATEGORY_TEMPLATES(state, payload){
            state.templatesCategories = payload
        },
    },
    getters:{
        getConfigurationState: (state) => state.configuration.isConfigured,
        getCategoryPatterns: (state) => state.categoryPatterns,
        getCategoryTemplates: (state) => state.categoryTemplates,
        getSizes: (state) => state.sizes,
    }
}

