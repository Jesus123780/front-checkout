import React from 'react'
import styles from './styles.module.css'

interface BackCardProps {
  cvv?: string
}

export const BackCard: React.FC<BackCardProps> = ({
  cvv
}) => {
  return (
    <div className={styles['card-reverse']}>
      <div className={styles['card-reverse__content-line']}>
      </div>
      <div className={styles['card-reverse__content__info']}>
        <h3 className={styles['card-reverse__due text']}>
          {cvv || '123'}
        </h3>
      </div>
    </div>
  )
}
