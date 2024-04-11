// ProjectsCommand.js
import React from "react";

function ProjectsCommand() {
    const handleGithubLinkClick = () => {
        window.open('https://github.com/tvonhake', '_blank');
    };

    return (
        <>
            <p>- <span onClick={handleGithubLinkClick} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>Click Here</span> to visit my GitHub profile</p>
            {/* Add more projects as needed */}
        </>
    );
}

export default ProjectsCommand;