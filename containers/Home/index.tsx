import React, { useEffect, useState } from 'react'
import {
    AwesomeModal,
    Column,
    Divider,
    Icon,
    InputHooks,
    RippleButton,
    Row,
    Text
} from 'pkg-components'
import { getGlobalStyle } from 'pkg-components/helpers'
import { paymentMethodCards } from './helpers'
import { Card } from '../Card'
import { useFormTools, getCardType } from 'npm-pkg-hook'
import styles from './styles.module.css'

export const Home = () => {
  const [cardType, setCardType] = useState<string>('VISA')
    const [values, setValues] = useState({
        cvv: '',
        dueDate: '',
        value: ''
    })
    const [open, setOpen] = useState(false)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const numberCard = values.value.split(' ').join('')
        if (numberCard.length >= 1) {
            const type = getCardType(numberCard)
            setCardType(type)
          }
    }, [values.value])

    const icon =  {
        VISA: 'IconVisa',
        MASTERCARD: 'IconMasterCard' 
    }

    return (
        <div className={styles['container-wrap']}>
            <AwesomeModal
                customHeight='800px'
                footer={false}
                height='800px'
                padding='20px'
                onCancel={() => {
                    setOpen(false)
                }}
                onConfirm={() => {
                    setOpen(false)
                }}
                onHide={() => {
                    setOpen(false)
                }}
                show={open}
                size='600px'
                zIndex={getGlobalStyle('--z-index-high')}
            >
                <Column>
                    <Divider marginTop={getGlobalStyle('--spacing-3xl')} />
                    <Text size='5xl' weight='semibold'>
                        Ingresa tu tarjeta

                    </Text>
                    <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                    <Text size='sm'>
                        Paga seguro con estos medios de pago

                    </Text>
                    <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                </Column>
                <Row justifyContent='space-between' alignItems='center'>
                    <Text size='sm' weight='semibold' styles={{ width: '100%' }}>
                        Datos de la tarjeta
                    </Text>
                    <Divider marginTop={getGlobalStyle('--spacing-4xl')} />

                    <Row justifyContent='end'>
                        {paymentMethodCards.map((card) => {
                            return (
                                <div key={card.name} style={{ width: 'min-content', marginLeft: getGlobalStyle('--spacing-xs') }}>
                                    <Icon icon={card.icon} size={40} />
                                </div>
                            )
                        })}
                    </Row>
                </Row>
                <Card disabled={false} {...values} onChange={onChange} iconType={icon[cardType]} />

            </AwesomeModal>
            <div className={styles.content} >
                <div className={styles.col}>
                    <Column>
                        <Divider marginTop={getGlobalStyle('--spacing-4xl')} />
                        <Text size='5xl' weight='semibold'>
                            Pagar y confirmar
                        </Text>
                        <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                        <Text size='sm'>
                            Elige tu método de pago favorito.
                        </Text>
                        <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                    </Column>
                    <div className={styles.payment_method_type_header} >
                        <Column>
                            <Row justifyContent='space-between' alignItems='center'>
                                <Text size='sm' weight='semibold' styles={{ width: '100%' }}>
                                    Datos de la tarjeta
                                </Text>

                                <Row justifyContent='end'>
                                    {paymentMethodCards.map((card) => {
                                        return (
                                            <div key={card.name} style={{ width: 'min-content', marginLeft: getGlobalStyle('--spacing-xs') }}>
                                                <Icon icon={card.icon} size={40} />
                                            </div>
                                        )
                                    })}
                                </Row>
                            </Row>
                            <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                            <div className={styles['card-payment_add-card_button']} onClick={() => {
                                return setOpen(!open)
                            }}>
                                <Text size='md'>
                                    Ingresa tu tarjeta
                                </Text>
                            </div>
                            <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                            <Text size='sm' weight='semibold'>
                                Datos de facturación
                            </Text>
                            <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                            <InputHooks onChange={handleChange}  required={true} value={dataForm.email} name='email' title='Correo electronico' />
                            <InputHooks onChange={handleChange}  required={true} value={dataForm.address} name='address' title='Direccion de residencia' />
                            <InputHooks onChange={handleChange}  required={true} value={dataForm.city} name='city' title='Cuidad' />
                            <InputHooks onChange={handleChange}  required={true} value={dataForm.barrio} name='barrio' title='Barrio' />
                        </Column>
                    </div>
                </div>
                <div className={styles.col}>
                    <Divider marginTop={getGlobalStyle('--spacing-5xl')} />
                    <div className={styles.payment_method_type_header} >
                        <Text size='sm' weight='semibold'>
                            Resumen de compra
                        </Text>
                    </div>
                    <Divider marginTop={getGlobalStyle('--line-height-sm')} />
                    <RippleButton radius='5px'>
                        Pagar
                    </RippleButton>
                </div>
            </div>
        </div>
    )
}
