import css from './Header.module.css';
import Link from 'next/link';
import TagsMenu from '@/components/TagsMenu/TagsMenu';
import { fetchNotes } from '@/lib/api';


export default async function Header() {
    
    const notesResponse = await fetchNotes({
        search: '',
        page: 1,
        perPage: 12,
        tag: undefined,
    });
    const allTags = notesResponse.notes.map((note) => note.tag);
    const noteTags = allTags.filter((tag, index, allTags) => allTags.indexOf(tag) === index);
    const tags = ['All notes', ... noteTags];
    
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home">
                NoteHub
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <TagsMenu tags={tags} />
                    </li>
                </ul>
            </nav>
        </header>
    );
}