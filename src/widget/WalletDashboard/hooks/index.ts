import { useQuery } from "@apollo/client";
import { apolloClient } from "@app/configs";
import { GET_ETH_PRICE } from "../gql";

export const useEthPrice = () => {
    return useQuery(
        ['ethPrice'], // Ключ запроса
        async () => {
            const { data } = await apolloClient.query({
                query: GET_ETH_PRICE,
            });
            return data?.bundle?.ethPriceUSD; // Получаем цену ETH
        },
        {
            refetchInterval: 60000, // Перезапрашиваем цену каждую минуту
        }
    );
};