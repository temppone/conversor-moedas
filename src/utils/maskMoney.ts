export const maskReais = (value: string): string => {
    return (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

export const unMaskReais = (value: number | string): number | string => {
    return typeof value === "number" ? value : Number(value.replace(/\D/g, ""));
};