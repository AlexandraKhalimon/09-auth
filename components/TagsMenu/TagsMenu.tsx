'use client'

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

interface TagsMenuProps {
    tags: string[];
}

export default function TagsMenu({tags}: TagsMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

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