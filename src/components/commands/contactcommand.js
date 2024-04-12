import React from "react";

function ContactCommand() {
    const handleLinkedinLinkClick = () => {
        window.open('https://www.linkedin.com/in/trevorvonhake/', '_blank');
    };

    return (
        <>
            <p><a href="mailto:tvonhake@outlook.com" style={{ cursor: 'pointer', textDecoration: 'underline', color: '#6699cc' }}>Email</a></p>
            <p><span onClick={handleLinkedinLinkClick} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#6699cc' }}>LinkedIn</span> (or use command 'linkedin -open')</p>
        </>
    );
}

export default ContactCommand;