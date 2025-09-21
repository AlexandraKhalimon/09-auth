import { nextServer } from './api';
import { NewNote, Note } from "@/types/note";
import { User } from '@/types/user';

interface FetchNotesResponse{
    notes: Note [];
    totalPages: number;
}

interface FetchNotesParams{
    search: string;
    page: number;
    perPage: number;
    tag?: string;
}

export const fetchNotes = async ({search, page, perPage = 12, tag}:FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await nextServer.get<FetchNotesResponse>('/notes', {
        params: {
            search,
            page,
            perPage,
            ...(tag && tag !== "All notes" ? {tag} : {}),
        }
    });
    return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
    const response = await nextServer.post<Note>('/notes', newNote);
    return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await nextServer.delete<Note>(`/notes/${noteId}`);
    return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
    const response = await nextServer.get<Note>(`/notes/${noteId}`);
    return response.data;
};



interface RegisterRequest {
    email: string;
    password: string;
}

export const registerUser = async (newUser: RegisterRequest): Promise<User> => {
    const response = await nextServer.post<User>('/auth/register', newUser);
    return response.data;
};


interface LoginRequest {
    email: string;
    password: string;
}

export const loginUser = async (data: LoginRequest): Promise<User> => {
    const response = await nextServer.post<User>('/auth/login', data);
    return response.data;
};


interface CheckSessionRequest {
    success: boolean;
}

export const checkSession = async (): Promise<boolean> => {
    const response = await nextServer.get<CheckSessionRequest>('/auth/session');
    return response.data.success;
};

export const getUser = async (): Promise<User> => {
    const response = await nextServer.get<User>('/users/me');
    return response.data;
};

export const logoutUser = async (): Promise<void> => {
    await nextServer.post('/auth/logout');
};


interface UpdateRequest {
    username: string;
}

export const updateUser = async (username: UpdateRequest): Promise<User> => {
    const response = await nextServer.patch<User>('/users/me', username);
    return response.data;
}