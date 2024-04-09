import React, { useState } from 'react';



const Form = () => {
    const currentDate = new Date().toLocaleDateString();
    
    const [items, setItems] = useState([{id: 1, description: "", quantity: 0, price: 0, total: 0}]);

    const handleAddItem = (event) => {
        event.preventDefault();
        setItems([...items, {id: items.length + 1, description: "", quantity: 0, price: 0, total: 0}]);
        console.log(items);
    }

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    }

    const handlePriceChange = (id, price) => {
        setItems(items.map(item =>
            item.id === id ? {...item, price: parseFloat(price) || 0} : item        
        ));
    }

    const handleQuantityChange = (id, quantity) => {
        setItems(items.map(item =>
            item.id === id ? {...item, quantity: parseInt(quantity) || 0} : item        
        ));
    }



    return (
        <div className="form">
            <form onSubmit={e => e.preventDefault()}>
                <div className='formContent'>
                    <div className="left">
                        <div className="invoiceInfo">
                            <span>
                                <label>Current Date: {'\n\n'}</label>
                                <label>{currentDate}</label>
                            </span>
                            <span>
                                <label>Due Date: </label>
                                <input type="date" />
                            </span>
                            <span>
                                <label>Invoice Number: </label>
                                <input type="text" />
                            </span>
                        </div>
                        <div className='toFrom'>
                            <div className="billTo">
                                <label>Bill To:</label>
                                <input type="text" placeholder="Name"/>
                                <input type="text" placeholder="Email"/>
                                <input type="text" placeholder="Address"/>
                            </div>
                            <div className="billFrom">
                                <label>Bill From:</label>
                                <input type="text" placeholder="Name"/>
                                <input type="text" placeholder="Email"/>
                                <input type="text" placeholder="Address"/>
                            </div>
                        </div>

                        <div className="items">
                            <span className="item">
                                <label>Item</label>
                                <label>Quantity</label>
                                <label>Price</label>
                                <label>Total</label>
                            </span>
                            {items.map((item) => (
                                <div key={item.id} className="itemInput">
                                    <input type="text" placeholder="Item Description" />
                                    <input type="number" placeholder="Quantity" onChange={(e) => handleQuantityChange(item.id, e.target.value)}/>
                                    <input type="number" placeholder="Price" onChange={(e) => handlePriceChange(item.id, e.target.value)}/>
                                    <label>{item.quantity * item.price}</label>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            ))}
                            <button onClick={handleAddItem}>Add Item</button>
                        </div>
                    </div>

                    <div className="right">
                        <div className='financialInfo'>
                            <span>
                                <label>Currency</label>
                                <select>
                                    <option>USD</option>
                                    <option>EUR</option>
                                    <option>GBP</option>
                                </select>
                            </span>
                            <span>
                                <label>Discount (%)</label>
                                <input type="number" />
                            </span>
                            <span>
                                <label>Tax (%)</label>
                                <input type="number" />
                            </span>
                        </div>
                        <button type="submit">Generate Invoice</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default Form;