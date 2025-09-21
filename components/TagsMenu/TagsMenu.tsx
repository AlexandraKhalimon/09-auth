'use client'

import { useEffect, useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';

export default function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            const notesResponse = await fetchNotes({
                search: '',
                page: 1,
                perPage: 12,
                tag: undefined,
            });
            const allTags = notesResponse.notes.map((note) => note.tag);
            const noteTags = allTags.filter((tag, index, allTags) => allTags.indexOf(tag) === index);
            setTags(['All notes', ...noteTags]);
        };
        fetchTags();
    }, []);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {tags.map((tag, index) => (
                        <li className={css.menuItem} key={index}>
                            <Link href={`/notes/filter/${tag === 'All notes' ? 'All' : tag}`} className={css.menuLink} onClick={close}>
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}