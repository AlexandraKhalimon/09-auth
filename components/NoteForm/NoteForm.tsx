'use client'

import { useId } from 'react';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';


export default function NoteForm() {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const router = useRouter();
    const close = () => router.push('/notes/filter/All');

    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft();
            close();
        }
    })

    const handleFormSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const tag = formData.get('tag') as string;
        
        mutate({ title, content, tag });
    };

    
    
    return (
        <form className={css.form} action={handleFormSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input id={`${fieldId}-title`} type="text" name="title" className={css.input} defaultValue={draft.title} onChange={handleChange} required minLength={3} maxLength={50} />
            </div>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    defaultValue={draft.content}
                    onChange={handleChange}
                    maxLength={500}
                />
            </div>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select id={`${fieldId}-tag`} name="tag" className={css.select} defaultValue={draft.tag} onChange={handleChange} required>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>
            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={close}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                >
                    Create note
                </button>
            </div>
        </form>
    );
}