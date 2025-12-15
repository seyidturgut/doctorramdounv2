/// <reference types="vite/client" />
import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    useCdn: true,
    apiVersion: '2023-12-15',
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}

export async function getPosts() {
    return client.fetch(`*[_type == "medicalInsight"] | order(publishedAt desc)`)
}

export async function getPostBySlug(slug: string) {
    return client.fetch(`*[_type == "medicalInsight" && slug.current == $slug][0]`, { slug })
}

export function toPlainText(blocks: any[] = []) {
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            return block.children.map((child: any) => child.text).join('')
        })
        .join('\n\n')
}
