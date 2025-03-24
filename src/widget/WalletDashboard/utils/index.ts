export const fetchEthPrice = (
    setEthPrice: React.Dispatch<React.SetStateAction<number | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    setLoading(true);

    // Эмулируем асинхронный запрос (например, с задержкой)
    setTimeout(() => {
        const mockPrice = 2500;
        setEthPrice(mockPrice);
        setLoading(false);
    }, 2000);
};