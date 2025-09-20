'use client'

import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';



export default function NotePreviewClient() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) {
        return <p>Loading, please wait...</p>;
    }

    if (error || !note) {
        return <p>Something went wrong.</p>;
    }

    const handleClose = () => router.back();
    
    return (
        <Modal onClose={handleClose}>
            <button className={css.backBtn} onClick={handleClose}>Back</button>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                        <p className={css.tag}>{note.tag}</p>
                    </div>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{note.createdAt}</p>
                </div>
            </div>
        </Modal>
    );
}