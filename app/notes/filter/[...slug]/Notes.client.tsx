"use client"

import css from './page.module.css';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({tag}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchQuery, tag],
    queryFn: () => fetchNotes({ search: debouncedSearchQuery, page: currentPage, perPage: 12, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false
  })

  const totalPages = data?.totalPages || 0;

  const handleChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={ searchQuery } onSearch={handleChange}/>
        {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        <Link href={'/notes/action/create'} className={css.button}>Create note +</Link>
      </header>
      {data && data?.notes.length > 0 && <NoteList notes={data.notes}/>}
    </div>
  )
};