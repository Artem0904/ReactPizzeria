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


    return (
      <Flex wrap="wrap" gap="small" >
        {pizzas.map(pizza => (
            <div key={pizza.id} >
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<div style={{height: 250}}>
                        <img style={imageStyles} alt="pizza" src={pizza.imageUrl} />
                      </div>}
                >
                    <Meta title={pizza.name} description={pizza.description} />
                </Card>
            </div>
        ))}
      </Flex>
    )
}

const imageStyles = { 
  width: '100%',
  height: '100%',  
  objectFit: "cover",
  borderRadius: 6
}