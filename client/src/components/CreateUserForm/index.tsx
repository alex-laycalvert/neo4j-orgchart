import React, { ChangeEvent, useState } from "react";
import { createUser } from "../../requests/user";

interface Props {
    onCreateUser: (createdUser: Neo4jOrgChart.User) => void;
}

const CreateUserForm: React.FC<Props> = ({ onCreateUser }) => {
    const [userProposal, setUserProposal] =
        useState<Neo4jOrgChart.UserProposal>({
            firstName: null,
            lastName: null,
            occupation: null,
        });

    const resetForm = () => {
        setUserProposal({
            firstName: null,
            lastName: null,
            occupation: null,
        });
    };

    const submitForm = async () => {
        try {
            const result = await createUser(userProposal);
            onCreateUser(result.data);
            resetForm();
        } catch (e) {
            console.error(e);
            return;
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserProposal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <h2>Create User</h2>
            <form action="">
                <label htmlFor="firstName">First Name </label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    required
                />
                <br />
                <br />
                <label htmlFor="lastName">Last Name </label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    required
                />
                <br />
                <br />
                <label htmlFor="occupation">Occupation </label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    id="occupation"
                    name="occupation"
                    placeholder="Occupation"
                    required
                />
                <br />
                <br />
                <button onClick={submitForm}>Submit</button>
            </form>
        </div>
    );
};

export default CreateUserForm;
