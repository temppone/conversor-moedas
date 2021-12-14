import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ptShort } from "yup-locale-pt";
import { GET_RATES } from "../../api/awesomeApi";
import Button from "../../components/Button";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import useFetch from "../../Hooks/useFetch";
import { getCurrentDate } from "../../utils/getActualDate";
import { ConvertForm, HomeContainer, ResultContainer } from "./styles";

const currenciesAvailable = {
    USD: ["EUR", "BRL"],
    EUR: ["USD", "BRL"],
    BRL: ["USD", "EUR"],
};

interface IReponseApi {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
}

export interface IResponseApiData {
    [key: string]: IReponseApi;
}

interface IFormData {
    valueToConvert: string;
    currency: keyof typeof currenciesAvailable;
}

const Home = () => {
    const { request, loading, error } = useFetch();
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState({} as IResponseApiData);

    yup.setLocale(ptShort);

    const schema = yup.object().shape({
        valueToConvert: yup.string().required("O valor é obrigatório"),
        currency: yup.string().required("A moeda é obrigatória"),
    });

    const {
        handleSubmit,
        control,
        setError,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const getConvertedValues = async (data: IFormData) => {
        console.log(data.currency)
        if (Number(data.currency) === 0) {
            setError("currency", { message: "A moeda é obrigatória" });
            return;
        }

        const selectedCurrencyAvailable = currenciesAvailable[data.currency];
        const { response } = await request(
            GET_RATES(
                data.currency,
                selectedCurrencyAvailable[0],
                selectedCurrencyAvailable[1]
            )
        );

        setResultData(response.data);

        setShowResult(true);

        if (error) {
            setShowResult(false);
            setError("valueToConvert", { message: "O valor não pode ser convertido" });
        }
    };

    const onSubmit = async (data: IFormData) => {
        await getConvertedValues(data);
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
                            value={value || ""}
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
                            label="Moeda"
                            options={Object.keys(currenciesAvailable).map((currency) => ({
                                label: currency,
                                value: currency,
                            }))}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value || ""}
                            id="currency"
                            name="currency"
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

                    <Input label="Data da consulta" inputError="" disabled value={getCurrentDate("/")} />

                    {Object.keys(resultData).map((item) => {
                        const value = getValues('valueToConvert') * +resultData[item].bid;
                        return (
                            <Input
                                label={resultData[item].code}
                                value={value.toFixed(2)}
                                inputError=""
                                disabled
                            />
                        );
                    })}
                </ResultContainer>
            )}
        </HomeContainer>
    );
};

export default Home;