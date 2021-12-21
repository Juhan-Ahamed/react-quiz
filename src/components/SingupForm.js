import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Checkbox from './Checkbox';
import Form from './Form';
import TextInput from './TextInput';

export default function SingUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");

    const {signup} = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    async function handleSubmit(e) {
        e.preventDefault();

        // do validation
        if (password !== confirmPassword) {
            return setError("Password don't match!");
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password, username);
            navigate("/");
        } catch(err) {
            console.log(err);
            setLoading(false);
            setError("Failed to create an accout!")
        }
    };

    return (
        <Form style={{height: "500px"}} onSubmit={handleSubmit}>
        <TextInput required value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Name" icon="person" />
        <TextInput
        required
        value={email} onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter Email"
          icon="alternate_email"
        />
        <TextInput required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" icon="lock" />
        <TextInput
        required
        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          icon="lock_clock"
        />
        <Checkbox required value={agree} onChange={(e) => setAgree(e.target.value)} text="I agree to the Terms &amp; Conditions" />
        <Button disabled={loading} type="submit">
          <span>Submit now</span>
        </Button>

        {error && <p className="error">{error}</p>}

        <div className="info">
          Already have an account? <Link to="/login">Login</Link> instead.
        </div>
      </Form>
    )
}
