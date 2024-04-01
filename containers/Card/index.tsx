import React, { useState } from 'react';
import { Divider, FlipCard, PatternFormat, Row, getGlobalStyle } from 'pkg-components';
import { validatedNumberCard } from './helpers';
import { BackCard } from './BackCard';
import { FrontCard } from './FrontCard';
import styles from './styles.module.css'

interface CardProps {
    disabled: boolean;
    value?: string;
    cvv?: string;
    iconType?: string;
    dueDate?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Card: React.FC<CardProps> = ({
    disabled,
    value,
    cvv,
    dueDate,
    iconType = 'IconVisa',
    onChange,
}) => {
    const isValidNumber = validatedNumberCard(value ?? '')
    const [flipped, setFlipped] = useState(false)
    const propsCad = {
        backChild: <BackCard cvv={cvv}  />,
        disabled: !isValidNumber,
        flipped,
        frontChild: <FrontCard 
        dueDate={dueDate}
        iconType={iconType}
        value={value}
        onClick={() => {
            return setFlipped(!flipped)
        }} />,
    }
    return (
        <>
            <FlipCard {...propsCad} />
            <Divider marginBottom={getGlobalStyle('--spacing-5xl')} />
            <div className={styles.wrapper_card}>
                {/* Input para el número de la tarjeta */}
                <PatternFormat
                    format="#### #### #### ####"
                    value={value}
                    placeholder='0000 0000 0000 0000'
                    type="text"
                    name='value'
                    disabled={disabled}
                    className={styles.input}
                    onChange={onChange}
                />
                {/* Input para el CVV */}
                <Row>
                    <PatternFormat
                        format="###"
                        name='cvv'
                        value={cvv}
                        placeholder='000'
                        type="text"
                        disabled={disabled}
                        className={styles.input}
                        onFocus={() => {
                            setFlipped(true)
                        }}
                        onBlur={() => {
                            setFlipped(false)
                        }}
                        onChange={onChange}

                    />
                    {/* Input para la fecha de vencimiento */}
                    <PatternFormat
                        format="##/##"
                        value={dueDate}
                        placeholder='MM/AA'
                        name='dueDate'
                        type="text"
                        disabled={disabled}
                        className={styles.input}
                        onChange={onChange}

                    />
                </Row>
            </div>
        </>
    );
};
