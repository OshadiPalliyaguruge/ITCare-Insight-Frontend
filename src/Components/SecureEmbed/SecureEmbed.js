import React from 'react';

/**
 * Component to embed a secure Power BI report using iframe.
 * Replace YOUR_SECURE_EMBED_URL with the actual secure embed URL from Power BI.
 */
const SecureEmbed = () => {
    // Replace with the actual secure embed URL for your Power BI report
    const powerBIEmbedUrl = "https://app.powerbi.com/reportEmbed?reportId=5591385c-a50a-40d9-9cda-2e3e95970fa9&autoAuth=true&ctid=5bc377d1-dbba-446e-b46f-fc82af1875fd";

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <iframe
                src={powerBIEmbedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Secure Power BI Report"
            ></iframe>
        </div>
    );
};

export default SecureEmbed;




