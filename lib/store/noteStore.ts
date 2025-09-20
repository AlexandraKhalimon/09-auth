import { NewNote } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface DraftStore {
  draft: NewNote,
  setDraft: (note: NewNote) => void,
  clearDraft: () => void,
};

export const useNoteDraftStore = create<DraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'new-note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);