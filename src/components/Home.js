import React, { useEffect, useState } from 'react';
import { Card, Flex  } from 'antd';
import { pizzasService } from '../server/pizzas';

export default function Home() {
    const { Meta } = Card;

    const [pizzas, setPizzas] = useState([]);

    const loadPizzas = async () => {
        const response = await pizzasService.get();
        const items = response.data;

        setPizzas(response.data);
    }
    
    useEffect(() => {
        loadPizzas();
    }, []);

    const App = () => (
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="pizza" src="" />}
      >
        <Meta title="" description="" />
      </Card>
    );

    return (
        <Flex wrap gap="small" dataSource={pizzas}>
          {Array.from({length: 24,},
            (_, i) => (
                <div>{App()}</div>
            ),
          )}
        </Flex>
    )
}

