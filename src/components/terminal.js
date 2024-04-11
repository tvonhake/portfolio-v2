import React, { useState, useRef, useEffect } from 'react';
import './styles.css'; // Import your CSS file
import ProjectsCommand from './commands/projectscommand';
import SkillsCommand from './commands/skillscommand';
import AboutCommand from './commands/aboutcommand';
import ContactCommand from './commands/contactcommand';

function Terminal() {
    const [inputValue, setInputValue] = useState('');
    const [outputContent, setOutputContent] = useState([
        "Welcome to Trevor's Portfolio",
        "Type 'help' for a list of commands."
    ]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const welcomeMessage = "Welcome to Trevor's Portfolio";

    const [enteredCommands, setEnteredCommands] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleCommand(inputValue);
            setCommandHistory([inputValue, ...commandHistory]); // Add the entered command to history
            setInputValue('');
            setHistoryIndex(-1); // Reset history index after submitting a new command
        } else if (event.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length - 1) {
                setHistoryIndex(historyIndex + 1);
                setInputValue(commandHistory[historyIndex + 1]);
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex >= 0) {
                setHistoryIndex(historyIndex - 1);
                setInputValue(commandHistory[historyIndex - 1] || '');
            }
        }
    };

    const getCurrentTimestamp = (command) => {
        const now = new Date();
        const timestamp = (
            <div>
                <span style={{ color: 'blue' }}>{now.getDate()}</span>
                <span style={{ color: 'green' }}>{now.toLocaleString('default', { month: 'long' })}</span>
                <span style={{ color: 'red' }}>{now.getFullYear()}</span>
                <span style={{ color: 'orange' }}>{now.toLocaleTimeString()}</span>
                <span style={{ color: 'white' }}> ~ </span>
                <span style={{ color: 'white' }}>{command}</span>
            </div>
        );
        return timestamp;
    };
    
    
    const handleCommand = (command) => {
        const timestamp = getCurrentTimestamp(command);
    
        let newOutputContent = [...outputContent]; // Create a copy of the current output content array
    
        // Add the timestamp and last command to the output content
        newOutputContent.push(timestamp);
    
        switch (command.toLowerCase()) {
            case 'help':
                newOutputContent.push(
                    "List of available commands:",
                    "- projects",
                    "- skills",
                    "- about",
                    "- contact"
                );
                newOutputContent.push(<br />); // Add <br> after help command
                break;
            case 'projects':
                newOutputContent.push(<ProjectsCommand />);
                break;
            case 'skills':
                newOutputContent.push(<SkillsCommand />);
                break;
            case 'about':
                newOutputContent.push(<AboutCommand />);
                break;
            case 'contact':
                newOutputContent.push(<ContactCommand />);
                break;
            case 'clear':
                newOutputContent = [welcomeMessage]; // Clear all previous text except the welcome message
                break;
            default:
                newOutputContent.push("Command not found. Type 'help' for a list of commands.");
        }
    
        // Update the state with the new output content
        setOutputContent(newOutputContent);
    
        // Scroll to the bottom of the output after component updates
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 0);
    };
    

    const terminalRef = useRef(null); // Ref to access the terminal DOM element
    const inputRef = useRef(null); // Ref to access the input DOM element

    const handleTerminalClick = () => {
        inputRef.current.focus(); // Focus on the input element
    };

    useEffect(() => {
        // Focus on the input element when the component mounts
        inputRef.current.focus();

        // Refocus on command line if enter is pressed and command line is not focused
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && !inputRef.current.contains(document.activeElement)) {
                inputRef.current.focus(); // Refocus on the input
            }
        };
    
        document.addEventListener('keydown', handleKeyPress);
    
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    
        // Function to handle clicks outside the terminal
        const handleClickOutside = (event) => {
            if (!terminalRef.current.contains(event.target)) {
                inputRef.current.blur(); // Unfocus the input element
            }
        };
    
        // Add event listener for clicks outside the terminal
        document.addEventListener('click', handleClickOutside);
    
        // Clean up by removing the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="terminal" ref={terminalRef}>
            <div className="output">
                {outputContent.map((line, index) => (
                    <div key={index}>
                        {typeof line === 'string' ? (
                            <p>{line}</p>
                        ) : (
                            line
                        )}
                    </div>
                ))}
            </div>
            <div className="input" onClick={handleTerminalClick}>
                <span>&gt;</span>
                <input
                    type="text"
                    value={inputValue}
                    ref={inputRef}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterPress}
                    autoFocus
                />
            </div>
        </div>
    );
}

export default Terminal;
