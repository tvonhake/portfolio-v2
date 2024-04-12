import React, { useState, useRef, useEffect } from 'react';
import './styles.css'; // Import your CSS file
import ProjectsCommand from './commands/projectscommand';
import SkillsCommand from './commands/skillscommand';
import AboutCommand from './commands/aboutcommand';
import ContactCommand from './commands/contactcommand';

function Terminal() {
    const [inputValue, setInputValue] = useState('');
    const [outputContent, setOutputContent] = useState([
        "Welcome to Trevor von Hake's Portfolio",
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
            setCommandHistory(prevHistory => {
                const updatedHistory = [...prevHistory, inputValue];
                console.log('Updated command history:', updatedHistory);
                return updatedHistory;
            });
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
                <span style={{ color: '#6699cc' }}>{now.getDate()}</span>
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
    
        newOutputContent.push(<br />); // Add <br> after help command
        // Add the timestamp and last command to the output content
        newOutputContent.push(timestamp);
    
        switch (command.toLowerCase()) {
            case 'help':
                newOutputContent.push(
                    "List of available commands:",
                    "- projects",
                    "- skills",
                    "- about",
                    "- contact",
                    "- lightmode",
                    "- clear",
                    "- help",
                    <br />,
                    "NOTE: autocomplete is on, try it out! (type at least 3 chars, then tab)"
                );
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
            case 'lightmode':
                newOutputContent.push("Are you sure you want to enable light mode? (y/n)");
                break;
            case 'github -open':
                // Open GitHub link in a new tab
                window.open('https://github.com/tvonhake', '_blank');
                break;
            case 'linkedin -open':
                // Open LinkedIn in a new tab
                window.open('https://www.linkedin.com/in/trevorvonhake/', '_blank');
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
    
        let characterAdded = false;
    
        const handleKeyPress = (event) => {
            const key = event.key;
    
            if (!inputRef.current.contains(document.activeElement) && (/^[a-zA-Z0-9]$/.test(key) || key === 'Enter')) {
                inputRef.current.focus();
            }
    
            // Unfocus input if Escape key is pressed
            if (key === 'Escape') {
                inputRef.current.blur();
            }
    
            // Autocomplete suggestions for each command
            if (inputRef.current.value.length >= 3 && event.key === 'Tab') {
                event.preventDefault(); // Prevent default tab behavior
    
                // Suggestions for each command
                const suggestions = [
                    'projects',
                    'skills',
                    'about',
                    'contact',
                    'clear',
                    'lightmode',
                    'github -open',
                    'linkedin -open',
                    'help'
                ];
    
                // Find the longest common prefix among suggestions and current input value
                const prefix = suggestions.find(suggestion => suggestion.startsWith(inputRef.current.value.toLowerCase()));
    
                // Update input value with the autocompleted suggestion
                if (prefix) {
                    setInputValue(prefix);
                }
            }
        };
    
        const handleInputChange = (event) => {
            const value = event.target.value.toLowerCase();
    
            // Check if the input value is 'y' or 'n' and the last command was 'lightmode'
            if (value === 'y' || value === 'n') {
                if (commandHistory[commandHistory.length - 1]?.toLowerCase() === 'lightmode') {
                    // Print GIF based on input value
                    const gifURL = value === 'y' ? 'https://media.giphy.com/media/1zSz5MVw4zKg0/giphy.gif?cid=790b7611gq18l9576gzg4vpvbvqyy6h91c6481x6r21gfwnu&ep=v1_gifs_search&rid=giphy.gif&ct=g' : 'https://media.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif?cid=790b7611a6mrdvhczzwyjdxyqiygxixhn9jbdjajenw2nln5&ep=v1_gifs_search&rid=giphy.gif&ct=g';
                    setOutputContent([...outputContent, <img src={gifURL} alt="GIF" style={{ height: '200px' }} />]);
    
                    // Clear the input value
                    setInputValue('');
                }
            }
        };
    
        document.addEventListener('keydown', handleKeyPress);
        inputRef.current.addEventListener('input', handleInputChange);
    
        // Function to handle clicks outside the terminal
        const handleClickOutside = (event) => {
            if (!terminalRef.current.contains(event.target)) {
                inputRef.current.blur(); // Unfocus the input element
            }
        };
    
        // Add event listener for clicks outside the terminal
        document.addEventListener('click', handleClickOutside);
    
        // Handle touch events to close keyboard on mobile
        const handleTouchEnd = () => {
            inputRef.current.blur(); // Blur the input element to close the keyboard
        };
    
        // Add event listener for touch end events
        document.addEventListener('touchend', handleTouchEnd);
    
        // Clean up by removing the event listeners when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            inputRef.current.removeEventListener('input', handleInputChange);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [commandHistory, inputValue]);

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
