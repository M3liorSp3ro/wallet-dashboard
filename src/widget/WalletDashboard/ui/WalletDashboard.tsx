import { Button, Card, Flex, Space, Spin, Typography } from "antd";
import { useState } from "react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { fetchEthPrice } from "../utils";

const { Title, Text } = Typography;

export const WalletDashboard: React.FC = () => {

    const [ethPrice, setEthPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected, connector } = useAccount();
    const { data: balanceData } = useBalance({ address });

    return (
        <Card style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
            <Title level={3}>Wallet Dashboard</Title>

            {
                !isConnected
                    ? (
                        <Flex
                            vertical
                            gap={15}
                        >
                            {
                                connectors.map((connector) => {
                                    return (
                                        <Button key={connector.uid} type="primary" onClick={() => connect({ connector })}>
                                            Подключить кошелек {connector.name}
                                        </Button>
                                    )
                                })
                            }

                        </Flex>
                    )
                    : (
                        <Space direction="vertical">
                            <Text>Кошелек: {connector?.name}</Text>
                            <Text>Адрес: {address?.slice(0, 5)}...{address?.slice(-4)}</Text>
                            <Text>Баланс: {balanceData?.value} ETH</Text>

                            {loading ? (
                                <Spin size="large" />
                            ) : (
                                <div>
                                    <Button type="primary" onClick={() => fetchEthPrice(setEthPrice, setLoading)}>
                                        Получить цену ETH
                                    </Button>
                                    {ethPrice !== null && (
                                        <div style={{ marginTop: '20px' }}>
                                            <Text type="secondary">Текущая цена ETH</Text>
                                            <div>
                                                <Title level={4}>${ethPrice}</Title>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <Button type="primary" danger onClick={() => disconnect()}>
                                Отключиться от кошелька
                            </Button>
                        </Space>
                    )}

        </Card>
    );
}