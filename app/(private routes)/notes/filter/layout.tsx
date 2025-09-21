import css from './NotesLayout.module.css'

interface NotesLayout {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

const NotesLayout = ({ children, sidebar }: NotesLayout) => {
    return (
        <section className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
        </section>
    );
};

export default NotesLayout;