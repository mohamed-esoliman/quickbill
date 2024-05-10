import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const Form = ({updatePdfUri, needReset}) => {

    const navigate = useNavigate();

    let defaultDueDate = new Date();
    defaultDueDate.setMonth(defaultDueDate.getMonth() + 1);
    defaultDueDate = defaultDueDate.toLocaleDateString();

    const emptyInvoice = {
            currentDate: new Date().toLocaleDateString(),
            dueDate: defaultDueDate,
            invoiceNumber: '',
            billToPerson: {
                name: "",
                email: "",
                address: ""
            },
            billFromPerson: {
                name: "",
                email: "",
                address: ""
            },
            items: [
                {id: 1, description: "", quantity: 0, price: 0, total: 0},
            ],
            currency: '$',
            discount: 0,
            tax: 0,
            subtotal: 0,
            totalDiscount: 0,
            totalTax: 0,
            grandTotal: 0
        }

    const [invoiceData, setInvoiceData] = useState(emptyInvoice);

    useEffect(
        () => {
            console.log(needReset);
            if (needReset === 'true') {
                console.log('resetting');
                setInvoiceData(emptyInvoice);
            }
        }, [needReset]
    )

    const handleChange = (propPath, value, invoiceData) => {
        if (!propPath) return;
        
        const newInvoiceData = { ...invoiceData };
        const path = propPath.split('.');
        let current = newInvoiceData;
        for (let i = 0; i < path.length - 1; i++) {
            if (!current[path[i]] || typeof current[path[i]] !== 'object'){
                current[path[i]] = {};
            }
            
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        setInvoiceData(newInvoiceData);
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        const newId = invoiceData.items[invoiceData.items.length - 1].id + 1;
        const newItems = [...invoiceData.items, {id: newId, description: "", quantity: 0, price: 0, total: 0}];
        handleChange('items', newItems, invoiceData);
    }

    const handleRemoveItem = (id) => {
        const newItems = invoiceData.items.filter(item => item.id !== id);
        handleChange('items', newItems, invoiceData);
    }

    const handleDescriptionChange = (id, description) => {
        const newItems = invoiceData.items.map(item =>
            item.id === id ? {...item, description: description} : item        
        );
        handleChange('items', newItems, invoiceData);
    }
    
    const handleQuantityChange = (id, quantity) => {
        const newItems = invoiceData.items.map(item =>
            item.id === id ? {...item, quantity: parseInt(quantity) || 0} : item        
        );
        handleChange('items', newItems, invoiceData);
    }
    
    const handlePriceChange = (id, price) => {
        const newItems = invoiceData.items.map(item =>
            item.id === id ? {...item, price: parseFloat(price) || 0} : item        
        );
        handleChange('items', newItems, invoiceData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        for (let i = 0; i < invoiceData.items.length; i++) {
            invoiceData.items[i].total = invoiceData.items[i].quantity * invoiceData.items[i].price;
        }

        invoiceData.subtotal = invoiceData.items.reduce((acc, item) => acc + item.total, 0);
        invoiceData.totalDiscount = invoiceData.subtotal * (invoiceData.discount / 100);
        invoiceData.totalTax = invoiceData.subtotal * (invoiceData.tax / 100);
        invoiceData.grandTotal = invoiceData.subtotal - invoiceData.totalDiscount + invoiceData.totalTax;

        generatePdf(invoiceData, () => {navigate('/pdfPreview')});
    }

    const generatePdf = (invoiceData, navigation) => {
        const doc = new jsPDF();

        doc.setFillColor(0, 139, 139);
        doc.rect(0, 0, 210, 30, 'F');
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.text('INVOICE', 105, 20, { align: "center" });

        doc.setTextColor(0);

        doc.setFontSize(11);
        doc.text(`Date: ${invoiceData.currentDate}`, 20, 40);
        doc.text(`Due Date: ${invoiceData.DueDate}`, 20, 46);
        doc.text(`Invoice Number.: ${invoiceData.invoiceNumber}`, 20, 52);

        doc.setFontSize(12);
        doc.text('Bill To:', 20, 60);
        doc.setFontSize(11);
        doc.text(invoiceData.billToPerson.name, 20, 66);
        doc.text(invoiceData.billToPerson.email, 20, 72);
        doc.text(invoiceData.billToPerson.address, 20, 78);
        doc.text('Bill From:', 110, 60);
        doc.text(invoiceData.billFromPerson.name, 110, 66);
        doc.text(invoiceData.billFromPerson.email, 110, 72);
        doc.text(invoiceData.billFromPerson.address, 110, 78);
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(20, 85, 190, 85);

        autoTable(doc, {
            startY: 90,
            theme: 'grid',
            head: [['Item', 'Quantity', 'Price', 'Total']],
            body: invoiceData.items.map(item => [item.description, item.quantity, item.price.toFixed(2), item.total.toFixed(2)]),
            styles: {
            fillColor: [255, 255, 255],
            },
            headStyles: {
            fillColor: [83, 146, 230],
            },
            columnStyles: {
            0: {cellWidth: 60},
            1: {cellWidth: 30},
            2: {cellWidth: 40},
            3: {cellWidth: 40},
            },
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        doc.text(`Subtotal: ${invoiceData.currency} ${invoiceData.subtotal.toFixed(2)}`, 120, finalY);
        doc.text(`Total Discount (${invoiceData.discount}%): ${invoiceData.currency} ${invoiceData.totalDiscount.toFixed(2)}`, 120, finalY + 6);
        doc.text(`Total Tax (${invoiceData.tax}%): ${invoiceData.currency} ${invoiceData.totalTax.toFixed(2)}`, 120, finalY + 12);
        doc.setFontSize(12);
        doc.setFont("bold");  
        doc.text(`Grand Total: ${invoiceData.currency} ${invoiceData.grandTotal.toFixed(2)}`, 120, finalY + 20);
        
        // doc.save('invoice.pdf');
        updatePdfUri(doc.output('datauristring'));

        if (navigation) {
            navigation();
        }
    }

    return (
        <div className="form">
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className='formContent'>
                    <div className="left">
                        <div className="invoiceInfo">
                            <span>
                                <label>Current Date: {'\n\n'}</label>
                                <label>{invoiceData.currentDate}</label>
                            </span>
                            <span>
                                <label>Due Date: </label>
                                <input type="date" value = {invoiceData.dueDate} onChange={(e) => {handleChange("dueDate", e.target.value, invoiceData)}}/>
                            </span>
                            <span>
                                <label>Invoice Number: </label>
                                <input type="number" value = {invoiceData.invoiceNumber} onChange={(e) => {handleChange("invoiceNumber", e.target.value, invoiceData)}}/>
                            </span>
                        </div>
                        <div className='toFrom'>
                            <div className="billTo">
                                <label>Bill To:</label>
                                <input type="text" value = {invoiceData.billToPerson.name} onChange={(e) => {handleChange("billToPerson.name", e.target.value, invoiceData)}}/>
                                <input type="text" value = {invoiceData.billToPerson.email} onChange={(e) => {handleChange("billToPerson.email", e.target.value, invoiceData)}}/>
                                <input type="text" value = {invoiceData.billToPerson.address} onChange={(e) => {handleChange("billToPerson.address", e.target.value, invoiceData)}}/>
                            </div>
                            <div className="billFrom">
                                <label>Bill From:</label>
                                <input type="text" value = {invoiceData.billFromPerson.name} onChange={(e) => {handleChange("billFromPerson.name", e.target.value, invoiceData)}}/>
                                <input type="text" value = {invoiceData.billFromPerson.email} onChange={(e) => {handleChange("billFromPerson.email", e.target.value, invoiceData)}}/>
                                <input type="text" value = {invoiceData.billFromPerson.address} onChange={(e) => {handleChange("billFromPerson.address", e.target.value, invoiceData)}}/>
                            </div>
                        </div>

                        <div className="items">
                            <span className="item">
                                <label>Item</label>
                                <label>Quantity</label>
                                <label>Price</label>
                                <label className='total'>Total</label>
                            </span>
                            {invoiceData.items.map((item) => (
                                <div key={item.id} className="itemInput">
                                    <input type="text" value = {item.description} onChange={(e) => handleDescriptionChange(item.id, e.target.value)}/>
                                    <input type="number" value = {item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)}/>
                                    <input type="number" value = {item.price} onChange={(e) => handlePriceChange(item.id, e.target.value)}/>
                                    <label>{item.quantity * item.price}</label>
                                    {invoiceData.items.length>1 ? <button onClick={() => handleRemoveItem(item.id)}>Remove</button>: null}
                                </div>
                            ))}
                            <button onClick={handleAddItem}>Add Item</button>
                        </div>
                    </div>

                    <div className="right">
                        <div className='financialInfo'>
                            <span>
                                <label>Currency</label>
                                <select value = {invoiceData.currency} onChange={(e) => {handleChange("currency", e.target.value, invoiceData)}}>
                                    <option>$</option>
                                    <option>€</option>
                                    <option>£</option>
                                    <option>₹</option>
                                    <option>¥</option>
                                    <option>₽</option>
                                    <option>₿</option>
                                </select>
                            </span>
                            <span>
                                <label>Discount (%)</label>
                                <input type="number" value = {invoiceData.discount} onChange={(e) => {handleChange("discount", e.target.value, invoiceData)}}/>
                            </span>
                            <span>
                                <label>Tax (%)</label>
                                <input type="number" value = {invoiceData.tax} onChange={(e) => {handleChange("tax", e.target.value, invoiceData)}}/>
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