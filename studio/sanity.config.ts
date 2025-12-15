import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { Logo } from './components/Logo'

export default defineConfig({
    name: 'default',
    title: 'Doctor Ramdoun CMS',

    projectId: 'trq2tw1r',
    dataset: 'production',

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },

    studio: {
        components: {
            logo: Logo
        }
    }
})
