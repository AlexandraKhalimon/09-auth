'use client'

import { useRouter } from 'next/navigation';
import css from './page.module.css';
import { useState } from 'react';
import { registerUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';


export default function SignUp() {
    const router = useRouter();
    const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (formData: FormData) => {
        try {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const response = await registerUser({ email, password });

            if (response) {
                setUser(response);
                router.push('/profile');
            } else {
                setError('Invalid email or password');
            }
        }
        catch (error) {
            setError(`Sorry, there is some error: ${error}`);
        }
    }
    
    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} action={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Register
                    </button>
                </div>
                {error &&
                    <p className={css.error}>{error}</p>
                }
            </form>
        </main>
    );
}