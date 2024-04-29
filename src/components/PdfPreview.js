import React from 'react';
import { Link } from 'react-router-dom';

const PdfPreview = ({iframeSrc}) => {
    
    return (
        <div>
            <div className='pdfPreview'>
                <iframe
                    src={iframeSrc}
                    style={{ width: '100%', height: '500px', border: 'none' }}
                    title="PDF Preview"
                    frameBorder="0"
                ></iframe>
            </div>
            <div className='editButton'>
                <Link to="/">
                    <button>Edit Invoice</button>
                </Link>
            </div>
        </div>
    );
}
 
export default PdfPreview;