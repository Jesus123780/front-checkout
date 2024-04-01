import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Icon } from 'pkg-components'
import { getQueryCookieParam } from '../../../hooks'
import { useRouter } from 'next/router'
export const Header = () => {
    // HOOKS
    const router = useRouter()
    const { setCookie } = getQueryCookieParam()
    
    const [cleanedQuery, setCleanedQuery] = useState(false);

    // EFFECTS
    useEffect(() => {
        const queryParams = router.query;
        setCookie(queryParams as Record<string, string>);

        // Limpiar los parámetros de consulta después de ejecutar setCookie
        if (!cleanedQuery) {
            const cleanedUrl = window.location.pathname;
            router.replace(cleanedUrl);
            setCleanedQuery(true);
        }
    }, [router.query, setCookie, cleanedQuery])

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Icon icon='IconLogo' size={20} height={30} />
                </div>
                <div className={styles.nav}>

                </div>
            </div>
        </div>
    )
}
