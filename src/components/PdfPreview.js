import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PdfPreview = ({iframeSrc}) => {
    
    const navigate = useNavigate();

    return (
        <div>
            <div className='pdfPreview'>
                {iframeSrc ? (
                    <iframe
                        src={iframeSrc}
                        style={{ width: '100%', height: '500px', border: 'none' }}
                        title="PDF Preview"
                        frameBorder="0"
                    ></iframe>
                ) : (
                    <p> PDF LOADING </p>
                )}
            </div>
            <div className='buttons'>
                <button onClick={() => {navigate("/", { reset:'true' })}}>Edit Invoice</button>
                <button onClick={() => {navigate("/newInvoice", { reset:'false'})}}>New Receipt</button>
            </div>
        </div>
    );
}
 
export default PdfPreview;