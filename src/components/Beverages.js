import React, { useEffect, useState } from 'react';
import { Card, Flex  } from 'antd';
import { beveragesService } from '../server/beverages';

export default function Beverages() {
    const { Meta } = Card;

    const [beverages, setBeverages] = useState([]);

    const loadBeverages = async () => {
        const response = await beveragesService.get();
        const items = response.data;

        setBeverages(response.data);
    }
    
    useEffect(() => {
        loadBeverages();
    }, []);

    return(
        <div>
          <Flex style={{justifyContent: "flex-start"}} wrap="wrap" gap="small" >
            {beverages.map(beverage => (
                <div key={beverages.id} >
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<div style={{height: 250, padding: '1px'}}>
                            <img className="imageStyle" alt="beverage" src={beverage.imageUrl} />
                          </div>}
                    >
                        <Meta title={beverage.name} description={beverage.description} />
                    </Card>
                </div>
            ))}
          </Flex>
        </div>
    )

}