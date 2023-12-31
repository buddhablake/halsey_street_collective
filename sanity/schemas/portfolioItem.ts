import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'portfolioItem',
    title: 'Portfolio Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'gallery',
            type: 'object',
            title: 'Gallery',
            fields: [
                {
                    name: 'images',
                    type: 'array',
                    title: 'Images',
                    of: [
                        {
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            options: {
                                hotspot: true,
                            },
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative text',
                                },
                            ],
                        },
                    ],
                    options: {
                        layout: 'grid',
                    },
                },
                {
                    name: 'display',
                    type: 'string',
                    title: 'Display as',
                    description: 'How should we display these images?',
                    options: {
                        list: [
                            { title: 'Stacked on top of eachother', value: 'stacked' },
                            { title: 'In-line', value: 'inline' },
                            { title: 'Carousel', value: 'carousel' },
                        ],
                        layout: 'radio', // <-- defaults to 'dropdown'
                    },
                },
                {
                    name: 'zoom',
                    type: 'boolean',
                    title: 'Zoom enabled',
                    description: 'Should we enable zooming of images?',
                },
            ],
            preview: {
                select: {
                    images: 'images',
                    image: 'images.0',
                },
                prepare(selection) {
                    const { images, image } = selection;

                    return {
                        title: `Gallery block of ${Object.keys(images).length} images`,
                        subtitle: `Alt text: ${image.alt}`,
                        media: image,
                    };
                },
            }
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
