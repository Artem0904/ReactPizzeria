import React, { useEffect, useState } from 'react';
import { Card, Flex, Carousel  } from 'antd';
import { pizzasService } from '../server/pizzas';
import { beveragesService } from '../server/beverages';

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

    const [beverages, setBeverages] = useState([]);

    const loadBeverages = async () => {
        const response = await beveragesService.get();
        const items = response.data;

        setBeverages(response.data);
    }
    
    useEffect(() => {
        loadBeverages();
    }, []);

    return (
      <div>
        <div>
              <h1 style={{ textAlign: "center" }}>Pizzeriaaa{":)"}</h1>
              <Carousel autoplay>
                  <div>
                      <img style={CarouselImageStyle} alt='test' src="https://www.nordicware.com/wp-content/uploads/2021/05/46400_traditional_pizza_pan_02_e.jpg" />
                  </div>
                  <div>
                      <img style={CarouselImageStyle} alt='test' src="https://www.vincenzosplate.com/wp-content/uploads/2021/08/610x350-Photo-5_863-How-to-Make-MEATLOVERS-PIZZA-Like-an-Italian-V1.jpg" />
                  </div>
                  <div>
                      <img style={CarouselImageStyle} alt='test' src="https://www.shutterstock.com/image-photo/cheese-pizza-lovers-600nw-1101316754.jpg" />
                  </div>
              </Carousel>

          </div>

        <div>
          <h1 style={h1Style}>Pizzas</h1>
          <Flex style={{justifyContent: "space-between"}} wrap="wrap" gap="small" >
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
        </div>

        <div>
          <h1 style={h1Style}>Beverages</h1>
          <Flex style={{justifyContent: "space-between"}} wrap="wrap" gap="small" >
            {beverages.map(beverage => (
                <div key={beverages.id} >
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<div style={{height: 250, padding: '1px'}}>
                            <img style={imageStyles} alt="beverage" src={beverage.imageUrl} />
                          </div>}
                    >
                        <Meta title={beverage.name} description={beverage.description} />
                    </Card>
                </div>
            ))}
          </Flex>
        </div>
      </div>
    )
}

const imageStyles = { 
  width: '100%',
  height: '100%',  
  objectFit: "cover",
  borderRadius: 6

}

const CarouselImageStyle = {
  objectFit: "cover",
  width: "100%",
  height: "400px"
};

const h1Style = {
  textAlign: "center"
}