import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

import { useState } from "react";

const NewMessage = ({ addNewMessage }) => {
    const [newMessage, setNewMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        addNewMessage(newMessage);

        setNewMessage("");
    };

    return (
        <Form onSubmit={onSubmit}>
            <div className="form-row align-items-center new-message-box">
                <InputGroup className="mb-3">
                    <FormControl
                        aria-label="message"
                        as="textarea"
                        placeholder="Type here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        required
                        className="new-message"
                    />
                    <Button
                        size="sm"
                        as="input"
                        type="submit"
                        value="Send"
                        readOnly
                    />
                </InputGroup>
            </div>
        </Form>
    );
};

export default NewMessage;