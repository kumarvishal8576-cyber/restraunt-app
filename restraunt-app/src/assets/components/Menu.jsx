import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";

const foodData = [ { id: 1, name: "Pizza", price: 200, category: "Fast Food", img: "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg" }, 
  { id: 2, name: "Burger", price: 120, category: "Fast Food", img: "https://t4.ftcdn.net/jpg/02/74/99/01/360_F_274990113_ffVRBygLkLCZAATF9lWymzE6bItMVuH1.jpg" },
  { id: 3, name: "Pasta", price: 150, category: "Fast Food", img: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg" }, 
  { id: 4, name: "Biryani", price: 250, category: "Non-Veg", img: "https://static.vecteezy.com/system/resources/thumbnails/040/703/949/small/ai-generated-royal-feast-master-the-art-of-chicken-biryani-at-home-generative-ai-photo.jpg" }, 
  { id: 5, name: "Fried Chicken", price: 180, category: "Non-Veg", img: "https://vaya.in/recipes/wp-content/uploads/2018/05/Fried-Chicken.jpg" },
  { id: 6, name: "Sandwich", price: 90, category: "Fast Food", img: "https://natashaskitchen.com/wp-content/uploads/2021/08/Grilled-Cheese-Sandwich-SQ.jpg" }, 
  { id: 7, name: "French Fries", price: 80, category: "Fast Food", img: "https://cdn.shopify.com/s/files/1/1867/0841/files/pexels-kalz_-2498440_480x480.jpg" },
  { id: 8, name: "Momos", price: 110, category: "Veg", img: "https://www.kuchpakrahahai.in/wp-content/uploads/2026/02/vegetable-momos.jpg" },
  { id: 9, name: "Paneer Tikka", price: 170, category: "Veg", img: "https://c.ndtvimg.com/2024-07/9fe2b05g_paneer-tikka_625x300_01_July_24.jpg" }, 
  { id: 10, name: "Noodles", price: 140, category: "Fast Food", img: "https://images.getrecipekit.com/20241008094433-blog-20templates-20-3.webp" }, 
      
      { id: 11, name: "Ice Cream", price: 60, category: "Sweets", img: "https://cdn.aboutamom.com/uploads/2024/12/a-cookies_and_cream_ice_cream_recipe-feature-1.jpeg" }, 
      { id: 12, name: "Cold Coffee", price: 100, category: "Beverages", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDfkqGfQJDgcVAayEOg13MVbXAM1sB8loBw&s" }, 
      { id: 13, name: "Chicken Tikka", price: 220, category: "Non-Veg", img: "https://www.spiceandcolour.com/wp-content/uploads/2020/06/receta-brochetas-de-pollo-murg-tikka-01.jpg" }, 
      { id: 14, name: "Veg Spring Rolls", price: 130, category: "Veg", img: "https://www.kuchpakrahahai.in/wp-content/uploads/2023/08/Vegetable-spring-rolls-recipe.jpg" }, 
      { id: 15, name: "Garlic Bread", price: 90, category: "Fast Food", img: "https://mccormick.widen.net/content/wb5qlil3et/web/garlic_bread_90089.jpg" }, 
      { id: 16, name: "Cheese Pizza", price: 240, category: "Fast Food", img: "https://c.ndtvimg.com/2018-11/o2l9mdao_pizza_625x300_01_November_18.jpg" }, 
      { id: 17, name: "Grilled Sandwich", price: 110, category: "Fast Food", img: "https://asimplepantry.com/wp-content/uploads/2015/08/Bacon-Jam-Grilled-Cheese-1-1.jpg" }, 
      { id: 18, name: "Masala Dosa", price: 140, category: "Veg", img: "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-500x500.jpg" },
      { id: 19, name: "Chole Bhature", price: 160, category: "Veg", img: "https://www.hercircle.in/hcm/Engage/D/C948F66E-4EB5-4948-BD68-44D3DC8C9395.JPG" },
      { id: 20, name: "Butter Chicken", price: 280, category: "Non-Veg", img: "https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken--600x600.jpg" }, 
        
        { id: 21, name: "Dal Makhani", price: 200, category: "Veg", img: "https://c.ndtvimg.com/2024-02/ohpng4i_dal-makhani_625x300_14_February_24.jpg" }, 
        { id: 22, name: "Tandoori Roti", price: 30, category: "Veg", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRtvlAdXuKGZqeNgFqWKz8j6f3MVb3NL1vg&s" }, 
        { id: 23, name: "Veg Fried Rice", price: 150, category: "Veg", img: "https://www.kuchpakrahahai.in/wp-content/uploads/2026/03/fried-rice.jpg" }, 
        { id: 24, name: "Chicken Noodles", price: 170, category: "Non-Veg", img: "https://www.licious.in/blog/wp-content/uploads/2023/02/shutterstock_521267689.jpg" },
        { id: 25, name: "Chocolate Cake", price: 120, category: "Sweets", img: "https://www.theredheadbaker.com/wp-content/uploads/2020/10/decadent-chocolate-layer-cake-featured-735x735.jpg" },
        { id: 26, name: "Brownie", price: 100, category: "Sweets", img: "https://www.generalmillsindiabfs.in/wp-content/uploads/2021/04/Oreo-Brownie.jpg" }, 
        { id: 27, name: "Mango Shake", price: 90, category: "Beverages", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/04/mango-milkshake-recipe.jpg" },
        { id: 28, name: "Lassi", price: 80, category: "Beverages", img: "https://themagicsaucepan.com/wp-content/uploads/2018/05/20180511-salt-lassi-0061-500x500.jpg" },
        { id: 29, name: "Mocktail", price: 150, category: "Beverages", img: "https://frobishers.com/cdn/shop/articles/1.png" }, 
        { id: 30, name: "Espresso", price: 110, category: "Beverages", img: "https://sumatocoffee.com/cdn/shop/articles/espresso_d93cf1fb-0d4d-4da2-877f-c8226560ea4a.png?v=1758145494&width=640" }, ];

const Menu = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");


  const placeOrder = () => {
  if (cart.length === 0) return;

  navigate("/payment", { state: { cart } });
};

  //  FILTER
  const filteredFood =
    selectedCategory === "All"
      ? foodData
      : foodData.filter((item) => item.category === selectedCategory);

  // 🛒 ADD
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  //  BILLING
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="menu-container">
      <h1 className="title">🍽 Our Menu</h1>

      {/*  FILTER BUTTONS */}
      <div className="filters">
        {["All", "Veg", "Non-Veg", "Fast Food", "Beverages", "Sweets"].map(
          (cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/*  FOOD GRID */}
      <div className="grid">
        {filteredFood.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {/*  button animation auto from CSS */}
            <button onClick={() => addToCart(item)}>Add</button>
          </div>
        ))}
      </div>

      {/*  CART */}
      <div className="cart">
        <h2>🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>🍽 Add something delicious!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item animate">
                <div>
                  <span>{item.name}</span>
                  <p className="item-price">
                    ₹{item.price} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </p>
                </div>
                                          
                <div className="qty">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            ))}
                                        
            {/*  ORDER SUMMARY */}
            <div className="bill">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="bill-row">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="bill-row total-row">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="order-btn" onClick={placeOrder}>
              Place Order
             </button>
          </>
        )}
      </div>

    </div>
  );
};

export default Menu;