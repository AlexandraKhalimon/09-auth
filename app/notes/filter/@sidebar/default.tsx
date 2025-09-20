import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default async function SidebarNotes() {
    
    const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

    return (
        <ul className={css.menuList}>
            {tags.map((tag, index) => (
            <li className={css.menuItem} key={index}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                        {tag}
                    </Link>
                </li>
            ))}   
        </ul>
    );
}