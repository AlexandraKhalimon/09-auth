'use client'

import Image from 'next/image';
import css from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUser } from '@/lib/api/clientApi';

export default function EditPage() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);


    const handleSubmit = async (formData: FormData) => {
        const username = formData.get('username') as string;
        const response = await updateUser({ username });
        if (response) {
            setUser(response);
            router.push('/profile');
        }
    };
    
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image src={user?.avatar as string}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} action={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username: {user?.username}</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            name='username'
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={()=>router.push('/profile')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}