import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';


interface NotesParams {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: NotesParams): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug[0] === 'All' ? undefined : slug[0];

    return {
        title: tag,
        description: `Page: ${tag}`,
        openGraph: {
            title: `Page: ${tag}`,
            description: `Page of ${tag} notes`,
            url: `https://08-zustand-notehub.vercel.app/notes/filter/${tag}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: tag,
                },
            ],
            type: "article",
        }
    };
};

export default async function NotesByTag({ params }: NotesParams) {
    const { slug } = await params;
    const tag = slug[0] === 'All' ? undefined : slug[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', { search: "", page: 1, perPage: 12, tag }],
        queryFn: () => fetchNotes({ search: "", page: 1, perPage: 12, tag })
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={ tag } />
        </HydrationBoundary>
    );
};