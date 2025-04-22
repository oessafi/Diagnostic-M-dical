import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';

const CasUrgent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    // Debounce function to limit API calls
    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    };

    const debouncedInput = useDebounce(input, 300);

    useEffect(() => {
        const handleSendMessage = async () => {
            if (debouncedInput.trim() === '') return;

            const userMessage = { sender: 'user', text: debouncedInput };
            setMessages((prevMessages) => [...prevMessages, userMessage]);

            const maxRetries = 5;
            let retryCount = 0;
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            while (retryCount < maxRetries) {
                try {
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`,  // Fixed template literal
                        },
                        body: JSON.stringify({
                            model: 'gpt-3.5-turbo',
                            messages: [{ role: 'user', content: debouncedInput }],
                            max_tokens: 100,
                            temperature: 0.7,
                        }),
                    });

                    if (!response.ok) {
                        if (response.status === 429) {
                            console.warn('Rate limit exceeded. Retrying...');
                            retryCount++;
                            await delay(1000 * Math.pow(2, retryCount)); // Exponential backoff
                            continue;
                        } else {
                            const errorDetails = await response.text();
                            console.error('OpenAI API error response:', errorDetails);
                            throw new Error('Failed to fetch data from OpenAI');
                        }
                    }

                    const data = await response.json();
                    if (data?.choices?.[0]?.message?.content) {
                        const chatbotResponse = {
                            sender: 'bot',
                            text: data.choices[0].message.content,
                        };
                        setMessages((prevMessages) => [...prevMessages, chatbotResponse]);
                        break;
                    } else {
                        throw new Error('Invalid response structure from OpenAI API');
                    }
                } catch (error) {
                    console.error('Error occurred:', error);
                    const errorMessage = { sender: 'bot', text: 'Error analyzing symptoms. Please try again.' };
                    setMessages((prevMessages) => [...prevMessages, errorMessage]);
                    break;
                }
            }
        };

        handleSendMessage();
    }, [debouncedInput, apiKey]);

    console.log("Messages: ", messages);
    console.log("Input: ", input);

    return (
        <>
            <Helmet>
                <title>Cas Urgent - MediAi Care</title>
            </Helmet>
            <Navbar className="mb-4" />
            <div className="container mt-4">
                <h2 className="text-center mb-4 mt-4 d-flex align-items-center justify-content-center">
                    <MessageCircle className="me-2" /> Cas Urgent - Chatbot Médical
                </h2>
                <div className="card mx-auto shadow-lg" style={{ maxWidth: '500px', marginBottom: '50px' }}>
                    <div className="card-body">
                        <div
                            className="chat-box mb-3"
                            style={{
                                height: '300px',
                                overflowY: 'auto',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                padding: '10px',
                            }}
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`p-2 mb-2 text-white rounded ${
                                        msg.sender === 'user' ? 'bg-primary text-end' : 'bg-secondary text-start'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Describe your symptoms..."
                                className="form-control"
                            />
                            <Button onClick={() => setInput('')} variant="primary">
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CasUrgent;
