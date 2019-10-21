import React, {useState, useEffect} from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Styled from "styled-components";

const UserBox = Styled.div
`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    margin: 0 auto;
    Form{
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        input{
            width: 400px;
            height: 20px;
            margin-top: 20px;
            text-align: center;
        }
        button{
            margin: 10px;
            background-color: transparent;
            color: #000000 !important;
        }
    }
    ul{
        list-style: none;
        border: 1px solid lightgrey;
        border-radius: 10%;
        background: lightblue;
        margin: 10px;
    }
`
const Welcome = Styled.div
`

`

const UserForm = ({values, touched, errors, status}) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        status && setUsers(users => [...users, status])
    }, [status])
    return(
        <UserBox>
            <Welcome>
                <h1>Welcome to Onboarding</h1>
                <p>Please fill out the boxes below if you are not on the list.</p>
            </Welcome>
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="password" name="password" placeholder="password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container">
                    {""}
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms-of-service"
                        checked={values.termsOfService}
                    />
                    <span className="checkmark" />
                </label>
                <button type="submit">Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
        </UserBox>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || ""
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, {setStatus}) {
        Axios.post('https://reqres.in/api/users', values)
            .then(res => {setStatus(res.data); console.log(res.data);})
            .catch(err => {
                console.log(err.response);
            })
    }
})(UserForm);


export default FormikUserForm;
// - Name
// - Email
// - Password
// - Terms of Service (checkbox)
// - A Submit button to send our form data to the server.