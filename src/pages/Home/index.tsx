import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ptShort } from 'yup-locale-pt'
import { number, object } from 'yup/lib/locale'
import { GET_RATES } from '../../api/awesomeApi'
import Button from '../../components/Button'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import useFetch from '../../Hooks/useFetach'
import { ConvertForm, HomeContainer, ResultContainer } from './styles'

const currenciesAvailable = {
    'USD': ['EUR', 'BRL'],
    'EUR': ['USD', 'BRL'],
    'BRL': ['USD', 'EUR'],
}

interface IReponseApi {
    "code": string,
    "codein": string,
    "name": string,
    "high": string,
    "low": string,
    "varBid": string,
    "pctChange": string,
    "bid": string,
    "ask": string,
    "timestamp": string,
    "create_date": string,
}


interface IFormData {
    valueToConvert: number;
    currency: keyof typeof currenciesAvailable;
}

interface IConvertedValue {
    code: string,
    value: number | string
}


const Home = () => {
    const { request, loading, error } = useFetch();
    const [results, setResults] = useState<IReponseApi[]>([]);
    const [convertedValues, setConvertedValues] =
        useState<IConvertedValue[]>([]);
    const [showResult, setShowResult] = useState(false);

    yup.setLocale(ptShort);

    const schema = yup.object().shape({
        valueToConvert: yup.number().required('O valor é obrigatório'),
        currency: yup.string().required('A moeda é obrigatória')
    });

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const getConvertedValues = async (data: IFormData) => {
        setResults([]);
        setConvertedValues([]);
        const selectedCurrencyAvailable = currenciesAvailable[data.currency];
        const { response } = await request(
            GET_RATES(data.currency,
                selectedCurrencyAvailable[0],
                selectedCurrencyAvailable[1]
            ));

        Object.keys(response.data).forEach(key => {
            setResults(prevState => [...prevState, response.data[key]]);
        });

        results.map((item: IReponseApi) => {
            const value = (data.valueToConvert * Number(item.bid));
            setConvertedValues(
                prevState => [
                    ...prevState,
                    { code: item.code, value }
                ]
            );
        });

        if (results.length > 0) {
            setShowResult(true);
        }
    };

    const onSubmit = (data: IFormData) => {
        getConvertedValues(data);
    };

    return (
        <HomeContainer>
            <ConvertForm action="" onSubmit={handleSubmit(onSubmit)}>
                <PageHeader
                    title="Valor para converter"
                    caption="Informe o valor da moeda para conversão"
                />
                <Controller
                    control={control}
                    name="valueToConvert"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Valor"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={Number(value) || ''}
                            inputError={errors?.valueToConvert?.message}
                            placeholder="0,00"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="currency"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                            options={
                                Object.keys(currenciesAvailable)
                                    .map((currency) => ({
                                        label: currency,
                                        value: currency,
                                    }))}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value || ''}
                            id='currency'
                            name='currency'
                            inputError={errors?.currency?.message}
                            placeholder="Selecione a moeda"
                        />

                    )}
                />

                <Button type="submit" name={loading ? "loading..." : "Converter"} />
            </ConvertForm>

            {showResult && (
                <ResultContainer>
                    <PageHeader
                        title="Resultado da conversão"
                        caption="Resultado da conversão - Cotação do dia"
                    />
                    <Input label="Data da consulta" inputError="" disabled />

                    {convertedValues?.map((item: IConvertedValue) => (
                        <Input
                            label={item.code}
                            value={Number(item.value).toFixed(2)}
                            inputError=""
                            disabled />
                    ))}
                </ResultContainer>
            )}
        </HomeContainer>
    )
}

export default Home
