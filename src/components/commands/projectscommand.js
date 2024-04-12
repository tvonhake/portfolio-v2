import React from "react";

function ProjectsCommand() {
    const handleGithubLinkClick = () => {
        window.open('https://github.com/tvonhake', '_blank');
    };

    return (
        <>
            <p>- <span onClick={handleGithubLinkClick} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#6699cc' }}>Click Here</span> to visit my GitHub profile (or use command 'github --open')</p>
        </>
    );
}

export default ProjectsCommand;