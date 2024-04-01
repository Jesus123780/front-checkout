import React from 'react'
import styles from './styles.module.css'
import { Icon, getGlobalStyle } from 'pkg-components'

interface FrontCardProps {
    value?: string
    dueDate?: string
    iconType?: string
    onClick: () => void
}

export const FrontCard: React.FC<FrontCardProps> = ({
    value = '',
    dueDate = '',
    iconType = '',
    onClick = () => { return {  } }
}) => {
    return (
        <div className={styles['card-front']}>
            <div className={styles['card-front__circle']} onClick={onClick}>
            </div>
            <div className={styles['card-front__rectangle']} />
            <h2 className={styles['card-front__title text']}>
                {iconType ? <Icon icon={iconType} size={60} /> : 'Nueva tarjeta'}
            </h2>
            <div className={styles['card-front__content-dots']}>
                {value !== '' ?
                    value :
                    Array.from({ length: 16 }, (_, index) => {
                        const spacesIn = (index + 1) % 4 === 0
                        return (
                            <div key={index}>
                                <div className={styles[`card-front__content-dots__dot ${spacesIn ? 'space' : ''}`]}>
                                    <Icon icon='IconMinus' width={20} color={spacesIn ? getGlobalStyle('--color-base-transparent') : getGlobalStyle('--color-icons-black')} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles['card-front__content__info']}>
                <h3 className={styles['card-front__name text']}>
                    Jesus Juvinao
                </h3>
                <h3 className={styles['card-front__due text']}>
                    {dueDate ? dueDate : 'MM/AA'}
                </h3>
            </div>
        </div>
    )
}
